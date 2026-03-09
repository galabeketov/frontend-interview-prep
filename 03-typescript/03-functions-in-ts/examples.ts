// 03 — Functions in TypeScript | Examples

// Overloads
function format(value: string): string;
function format(value: number, decimals?: number): string;
function format(value: string | number, decimals = 2): string {
  if (typeof value === "string") return value.trim();
  return value.toFixed(decimals);
}

console.log(format("  hello  "));  // "hello"
console.log(format(3.14159, 2));   // "3.14"

// Generic functions
function identity<T>(val: T): T { return val; }
function first<T>(arr: T[]): T | undefined { return arr[0]; }
function groupBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= [] as T[]).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

const users = [
  { name: "Ali",  role: "admin" },
  { name: "Vali", role: "user"  },
  { name: "Soli", role: "admin" },
];
const byRole = groupBy(users, u => u.role);
// byRole.admin = [Ali, Soli], byRole.user = [Vali]

// logCall HOC — type safe
function logCall<T extends (...args: any[]) => any>(fn: T) {
  return function(this: unknown, ...args: Parameters<T>): ReturnType<T> {
    console.log(`→ ${fn.name}(`, ...args, ")");
    const result = fn.apply(this, args);
    console.log(`← ${fn.name} returned:`, result);
    return result;
  } as T;
}

const safeAdd = logCall((a: number, b: number) => a + b);
safeAdd(2, 3); // logs + returns 5

// Masala 2 — memoize type safe
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

const expensiveCalc = memoize((n: number): number => n * n);
console.log(expensiveCalc(5)); // 25
console.log(expensiveCalc(5)); // 25 (cached)

// Masala 3 — curry type safe
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b);
}

const add    = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
const add5   = curriedAdd(5);

console.log(add5(3));  // 8
console.log(add5(10)); // 15
