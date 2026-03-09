// 04 — Generics | Examples

// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic Result type
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

function safeDiv(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: "Division by zero" };
  return { ok: true, value: a / b };
}

const r = safeDiv(10, 2);
if (r.ok) console.log(r.value); // 5
else      console.error(r.error);

// Masala 1 — Stack<T>
class Stack<T> {
  private items: T[] = [];
  push(item: T): this    { this.items.push(item); return this; }
  pop(): T | undefined   { return this.items.pop(); }
  peek(): T | undefined  { return this.items[this.items.length - 1]; }
  isEmpty(): boolean     { return this.items.length === 0; }
  get size(): number     { return this.items.length; }
  toArray(): T[]         { return [...this.items]; }
}

const numStack = new Stack<number>();
numStack.push(1).push(2).push(3);
console.log(numStack.peek());  // 3
console.log(numStack.pop());   // 3
console.log(numStack.size);    // 2

const strStack = new Stack<string>();
strStack.push("a").push("b");
// strStack.push(1); // ❌ number type xato!

// Masala 2 — zip
function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {
  const len = Math.min(arrA.length, arrB.length);
  return Array.from({ length: len }, (_, i) => [arrA[i], arrB[i]]);
}

console.log(zip([1, 2, 3], ["a", "b", "c"]));
// [[1,"a"],[2,"b"],[3,"c"]]

console.log(zip(["x", "y"], [true, false]));
// [["x",true],["y",false]]

// Masala 3 — DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config = {
  server: { host: string; port: number };
  db:     { url: string; name: string };
};

type ReadonlyConfig = DeepReadonly<Config>;
const config: ReadonlyConfig = {
  server: { host: "localhost", port: 3000 },
  db:     { url: "mongodb://...", name: "mydb" },
};
// config.server.host = "other"; // ❌ readonly!

// Generic Repository
interface Entity { id: number }

class InMemoryRepo<T extends Entity> {
  private store = new Map<number, T>();

  save(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: number): T | undefined {
    return this.store.get(id);
  }

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  delete(id: number): boolean {
    return this.store.delete(id);
  }
}

interface User extends Entity { name: string; email: string }
const userRepo = new InMemoryRepo<User>();
userRepo.save({ id: 1, name: "Ali", email: "ali@mail.com" });
console.log(userRepo.findById(1)); // { id:1, name:"Ali", ... }
