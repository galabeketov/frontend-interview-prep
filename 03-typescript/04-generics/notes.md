# 04 — Generics

## 📖 Nazariya

Generics — turli type'lar bilan ishlaydigan reusable kod yozish imkonini beradi.

### Asosiy sintaksis

```ts
// T — type parameter (ixtiyoriy nom)
function identity<T>(value: T): T { return value; }

identity<string>("hello"); // explicit
identity(42);              // inferred — T = number
```

### Generic constraints

```ts
// T faqat key bo'lishi mumkin bo'lgan type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Ali", age: 25 };
getProperty(user, "name"); // ✅ string
getProperty(user, "age");  // ✅ number
// getProperty(user, "email"); // ❌ xato

// T object bo'lishi shart
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// T length bo'lishi shart
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("hello", "world");  // ✅
longest([1, 2], [1]);       // ✅
```

### Generic interface & class

```ts
interface Repository<T extends { id: number }> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class GenericRepository<T extends { id: number }> implements Repository<T> {
  private items: T[] = [];

  async findById(id: number): Promise<T | null> {
    return this.items.find(i => i.id === id) ?? null;
  }

  async findAll(): Promise<T[]> { return [...this.items]; }

  async save(entity: T): Promise<T> {
    const idx = this.items.findIndex(i => i.id === entity.id);
    if (idx >= 0) this.items[idx] = entity;
    else this.items.push(entity);
    return entity;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(i => i.id !== id);
  }
}
```

### Conditional types

```ts
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? "yes" : "no";

type A = IsArray<number[]>; // true
type B = IsArray<string>;   // false
type C = IsString<string>;  // "yes"

// NonNullable — built-in
type NonNullable<T> = T extends null | undefined ? never : T;
type D = NonNullable<string | null | undefined>; // string
```

### Default type parameters

```ts
interface ApiState<T = unknown, E = string> {
  data:    T | null;
  error:   E | null;
  loading: boolean;
}

// T default = unknown, E default = string
const state: ApiState<User>           = { data: null, error: null, loading: true };
const state2: ApiState<User, ApiError> = { data: null, error: null, loading: true };
```

---

## 🧠 Intervyu savollari

1. Generic nima, nima uchun kerak?
2. Generic constraint (`extends`) nima?
3. `keyof T` nima?
4. `T[K]` — indexed access nima?
5. Conditional type nima?

---

## 🎯 Masalalar

```ts
// Masala 1: Stack<T> class
class Stack<T> {
  push(item: T): void {}
  pop(): T | undefined {}
  peek(): T | undefined {}
  isEmpty(): boolean {}
  get size(): number {}
}

// Masala 2: zip<A,B> — ikki array'ni birlashtirish
function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {}
// zip([1,2,3], ["a","b","c"]) → [[1,"a"],[2,"b"],[3,"c"]]

// Masala 3: DeepReadonly<T> — barcha nested propertylarni readonly qilish
type DeepReadonly<T> = ???
```
