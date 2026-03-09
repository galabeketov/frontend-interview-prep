// 14 — Error Handling — Examples & Solutions

// Custom Error classes
class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} topilmadi`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}
class ValidationError extends AppError {
  constructor(fields) {
    super("Validatsiya xatosi", 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
    this.fields = fields;
  }
}

// Masala 1 — safeAsync
async function safeAsync(fn) {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Usage
const { data, error } = await safeAsync(() => fetch("/api/user").then(r => r.json()));
if (error) console.error("Xato:", error.message);
else console.log("Data:", data);

// Masala 2 — Pipeline
class Pipeline {
  constructor() {
    this.steps = [];
    this.errorHandler = null;
  }
  pipe(fn) {
    this.steps.push(fn);
    return this;
  }
  catch(fn) {
    this.errorHandler = fn;
    return this;
  }
  async run(input) {
    try {
      let result = input;
      for (const step of this.steps) {
        result = await step(result);
      }
      return result;
    } catch (err) {
      if (this.errorHandler) return this.errorHandler(err);
      throw err;
    }
  }
}

const pipeline = new Pipeline()
  .pipe(x => x * 2)
  .pipe(x => { if (x > 10) throw new Error("Too big!"); return x; })
  .catch(err => { console.error(err.message); return 0; });

console.log(await pipeline.run(3));  // 6
console.log(await pipeline.run(6));  // "Too big!" → 0
