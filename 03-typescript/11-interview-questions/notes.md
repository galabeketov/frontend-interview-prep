# 11 — TypeScript Interview Questions

## 🔥 Top 50 Savol

### Basic Types
1. TypeScript nima, JavaScript'dan farqi?
2. `any` va `unknown` farqi?
3. `never` qachon ishlatiladi?
4. `void` va `undefined` farqi?
5. Union va Intersection type farqi?
6. Literal type nima?
7. Type assertion (`as`) xavfli bo'lishi mumkinmi?

### Interface & Type
8. `interface` va `type` farqi, qachon nimani?
9. Declaration merging nima?
10. Index signature nima?
11. `readonly` va `const` farqi?
12. `Partial`, `Required`, `Readonly` nima?
13. `Pick`, `Omit` farqi?
14. `Record<K,V>` vs index signature?

### Generics
15. Generic nima, nima uchun kerak?
16. Generic constraint (`extends`) nima?
17. `keyof T` nima?
18. `T[K]` indexed access nima?
19. Conditional type nima?
20. Default type parameter nima?

### Functions
21. Function overload nima?
22. `ReturnType<T>` va `Parameters<T>` nima?
23. `infer` keyword nima?

### Advanced
24. Discriminated union nima?
25. Exhaustive check qanday?
26. Mapped type nima?
27. Template literal type nima?
28. Branded type nima uchun?
29. Type narrowing usullari?
30. Type guard nima (`is`)?
31. Assertion function (`asserts`) nima?

### React + TypeScript
32. Props interface qanday yoziladi?
33. Event handler type?
34. `React.ReactNode` vs `React.ReactElement`?
35. Generic component qanday?
36. `useRef` typing?
37. Custom hook return type?
38. Context typing?
39. `useReducer` action typing?

---

## 💡 Qisqa javoblar

### `any` vs `unknown`
```
any    — type checking o'chiriladi, xavfli
unknown — xavfsiz, ishlatishdan oldin type check qilish kerak
```

### `interface` vs `type`
```
Interface: object shape, declaration merging, extends
Type:      union, intersection, primitive, tuple, conditional
Qoida: object → interface, qolgan → type
```

### `never`
```
1. Hech qachon tugamaydigan funksiya: throw, infinite loop
2. Exhaustive check — switch default'da
3. Conditional type'da impossible case: string & number = never
```

### Discriminated Union
```ts
type Shape = 
  | { kind: "circle";   radius: number }
  | { kind: "square";   side: number }
  // kind — discriminant (unique identifier)
switch (shape.kind) { ... }
```

### Type narrowing usullari (5 ta)
```
1. typeof   — primitives
2. instanceof — class instances
3. in       — object properties
4. discriminated union — switch
5. type guard (is) — custom check
```

### Branded types
```ts
type UserId = string & { _brand: "UserId" };
// Bir xil ko'ringan lekin semantik jihatdan farqli type'larni farqlash
```

---

## 🎯 Live Coding Vazifalar

### 1. Generic Result type
```ts
type Result<T, E = Error> = ???
function divide(a: number, b: number): Result<number, string> {}
```

### 2. DeepPartial
```ts
type DeepPartial<T> = ???
```

### 3. OmitNever — never type bo'lgan fieldlarni olib tashlash
```ts
type OmitNever<T> = ???
type Example = OmitNever<{ a: string; b: never; c: number }>;
// { a: string; c: number }
```

### 4. type safe EventEmitter
```ts
class TypedEmitter<T extends Record<string, unknown>> {
  on<K extends keyof T>(event: K, fn: (data: T[K]) => void): void {}
  emit<K extends keyof T>(event: K, data: T[K]): void {}
}
```

### 5. Readonly deep object
```ts
type DeepReadonly<T> = ???
```

### 6. NonEmptyArray
```ts
type NonEmptyArray<T> = ???
function first<T>(arr: NonEmptyArray<T>): T {}  // undefined qaytarmaydi!
```

---

## ✅ Javoblar

```ts
// 1. Result type
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: "Division by zero" };
  return { ok: true, value: a / b };
}

const r = divide(10, 2);
if (r.ok) console.log(r.value); // 5
else      console.error(r.error);

// 2. DeepPartial
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// 3. OmitNever
type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
type E = OmitNever<{ a: string; b: never; c: number }>;
// { a: string; c: number }

// 4. TypedEmitter
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
}

// Usage
interface AppEvents {
  login:   { userId: number };
  logout:  { userId: number };
  message: { text: string; from: string };
}

const emitter = new TypedEmitter<AppEvents>();
emitter.on("login", ({ userId }) => console.log("Login:", userId));
emitter.emit("login", { userId: 1 });
// emitter.emit("login", { email: "x" }); // ❌ type error

// 5. DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 6. NonEmptyArray
type NonEmptyArray<T> = [T, ...T[]];

function first<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // guaranteed — T, not T | undefined
}

first([1, 2, 3]);   // ✅ number
// first([]);       // ❌ type error — empty array
```
