# 03 — Functions in TypeScript

## 📖 Nazariya

### Function type annotation

```ts
// Parameter va return type
function add(a: number, b: number): number { return a + b; }

// Arrow
const multiply = (a: number, b: number): number => a * b;

// Optional & Default
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Salom"}, ${name}!`;
}

// Rest
function sum(...nums: number[]): number {
  return nums.reduce((a, n) => a + n, 0);
}
```

### Function type

```ts
type Callback      = (error: Error | null, result?: string) => void;
type Transformer   = (input: string) => string;
type Predicate<T>  = (item: T) => boolean;
type Comparator<T> = (a: T, b: T) => number;

// Interface bilan
interface HttpHandler {
  (req: Request, res: Response): void;
}
```

### Overloads

```ts
function format(value: string): string;
function format(value: number, decimals?: number): string;
function format(value: string | number, decimals = 2): string {
  if (typeof value === "string") return value.trim();
  return value.toFixed(decimals);
}

format("  hello  ");   // ✅ string
format(3.14159, 2);    // ✅ number
```

### Generic functions

```ts
function identity<T>(value: T): T { return value; }
function first<T>(arr: T[]): T | undefined { return arr[0]; }
function last<T>(arr: T[]): T | undefined { return arr[arr.length - 1]; }

function map<T, U>(arr: T[], fn: (item: T, index: number) => U): U[] {
  return arr.map(fn);
}

function filter<T>(arr: T[], predicate: Predicate<T>): T[] {
  return arr.filter(predicate);
}
```

### this type

```ts
interface Counter {
  count: number;
  increment(this: Counter): Counter;
  reset(this: Counter): Counter;
}

const counter: Counter = {
  count: 0,
  increment() { this.count++; return this; },
  reset()     { this.count = 0; return this; },
};

counter.increment().increment().reset();
```

### Parameter decorators — `Parameters<T>`, `ReturnType<T>`

```ts
function logCall<T extends (...args: any[]) => any>(fn: T) {
  return function(...args: Parameters<T>): ReturnType<T> {
    console.log(`Calling ${fn.name} with:`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

const loggedAdd = logCall(add);
loggedAdd(2, 3); // logs call and result
```

---

## 🧠 Intervyu savollari

1. Function overload nima?
2. `Parameters<T>` va `ReturnType<T>` nima?
3. Generic constraint qanday?
4. Optional va default parameter farqi?

---

## 🎯 Masalalar

```ts
// Masala 1: pipe funksiyasi — type safe
function pipe<A, B>(fn: (a: A) => B): (a: A) => B;
function pipe<A, B, C>(f1: (a: A) => B, f2: (b: B) => C): (a: A) => C;
// ...

// Masala 2: memoize — type safe
function memoize<T extends (...args: any[]) => any>(fn: T): T;

// Masala 3: curry — type safe
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C;
```
