# 14 — Error Handling

## 📖 Nazariya

### Error turlari
```js
new Error("xato xabari");
new TypeError("noto'g'ri tip");
new RangeError("qiymat oraliqda emas");
new ReferenceError("o'zgaruvchi topilmadi");
new SyntaxError("sintaksis xato");
new URIError("noto'g'ri URI");
```

### try/catch/finally
```js
try {
  const data = JSON.parse(invalidJSON); // xato
} catch (err) {
  console.error(err.name);    // "SyntaxError"
  console.error(err.message); // "Unexpected token..."
  console.error(err.stack);   // Stack trace
} finally {
  // har doim bajariladi
  console.log("done");
}
```

### Custom Error
```js
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} topilmadi`, 404);
    this.name = "NotFoundError";
  }
}

throw new NotFoundError("User");
```

### Async error handling
```js
// async/await
async function fetchData() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new AppError("API xato", res.status);
    return await res.json();
  } catch (err) {
    if (err instanceof AppError) {
      // business logic error
    }
    throw err;
  }
}

// Global handler
window.addEventListener("unhandledrejection", event => {
  console.error("Unhandled:", event.reason);
});
```

---

## 🎯 Masalalar

### Masala 1
```js
// Result type pattern (Rust'dan ilhom)
// xato throw qilmasdan, { ok, error } qaytarsin
async function safeAsync(fn) { /* ... */ }
const { data, error } = await safeAsync(() => fetchUser(1));
if (error) console.error(error);
else console.log(data);
```

### Masala 2
```js
// Error boundary — chain da xatoni ushlasin
class Pipeline {
  // .pipe(fn) — keyingi qadam
  // .catch(fn) — xatoni ushla
  // .run(input) — ishga tushir
}
```
