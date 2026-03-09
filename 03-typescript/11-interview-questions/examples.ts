// 11 — TypeScript Interview | Live Coding Solutions

// ─────────────────────────────────────────
// 1. Result<T, E> — type safe error handling
// ─────────────────────────────────────────
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: "Division by zero" };
  return { ok: true, value: a / b };
}

const r1 = divide(10, 2);
if (r1.ok) console.log("Result:", r1.value); // 5

// ─────────────────────────────────────────
// 2. DeepPartial
// ─────────────────────────────────────────
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// ─────────────────────────────────────────
// 3. OmitNever
// ─────────────────────────────────────────
type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
// { a: string; b: never; c: number } → { a: string; c: number }

// ─────────────────────────────────────────
// 4. TypedEmitter
// ─────────────────────────────────────────
class TypedEmitter<T extends Record<string, unknown>> {
  private listeners = new Map<keyof T, Set<Function>>();

  on<K extends keyof T>(event: K, fn: (data: T[K]) => void): this {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
    return this;
  }

  off<K extends keyof T>(event: K, fn: (data: T[K]) => void): this {
    this.listeners.get(event)?.delete(fn);
    return this;
  }

  emit<K extends keyof T>(event: K, data: T[K]): this {
    this.listeners.get(event)?.forEach(fn => fn(data));
    return this;
  }

  once<K extends keyof T>(event: K, fn: (data: T[K]) => void): this {
    const wrapper = (data: T[K]) => { fn(data); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }
}

interface AppEvents {
  "user:login":   { userId: number; email: string };
  "user:logout":  { userId: number };
  "error":        { message: string; code: number };
}

const bus = new TypedEmitter<AppEvents>();
bus.on("user:login", ({ userId, email }) => {
  console.log(`User ${userId} (${email}) logged in`);
});
bus.emit("user:login", { userId: 1, email: "ali@mail.com" });
// bus.emit("user:login", { userId: "1" }); // ❌ type error

// ─────────────────────────────────────────
// 5. DeepReadonly
// ─────────────────────────────────────────
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// ─────────────────────────────────────────
// 6. NonEmptyArray
// ─────────────────────────────────────────
type NonEmptyArray<T> = [T, ...T[]];

function first<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // T — NOT T | undefined
}

console.log(first([1, 2, 3]));  // 1
// first([]); // ❌ compile error

// ─────────────────────────────────────────
// 7. Type safe localStorage
// ─────────────────────────────────────────
interface StorageSchema {
  "auth:token": string;
  "auth:user":  { id: number; name: string };
  "ui:theme":   "light" | "dark";
}

class TypedStorage<T extends Record<string, unknown>> {
  get<K extends keyof T & string>(key: K): T[K] | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  set<K extends keyof T & string>(key: K, value: T[K]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove<K extends keyof T & string>(key: K): void {
    localStorage.removeItem(key);
  }
}

const storage = new TypedStorage<StorageSchema>();
storage.set("ui:theme", "dark");              // ✅
storage.set("auth:user", { id: 1, name: "Ali" }); // ✅
// storage.set("ui:theme", "blue");            // ❌ type error

// ─────────────────────────────────────────
// 8. Flatten nested object type keys
// ─────────────────────────────────────────
type FlatKeys<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? FlatKeys<T[K], `${P}${K}.`>
    : `${P}${K}`;
}[keyof T & string];

interface FormShape {
  user:    { name: string; email: string };
  address: { city: string; zip: string };
  active:  boolean;
}

type FormKeys = FlatKeys<FormShape>;
// "user.name" | "user.email" | "address.city" | "address.zip" | "active"
