# 06 — Type Narrowing

## 📖 Nazariya

Type narrowing — keng type'ni aniqroq type'ga toraytirish.

### typeof narrowing

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // string
  }
  return value.toFixed(2); // number
}
```

### instanceof narrowing

```ts
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message); // Error
  } else if (typeof error === "string") {
    console.error(error);
  } else {
    console.error("Unknown error");
  }
}
```

### in operator narrowing

```ts
interface Cat  { meow(): void }
interface Dog  { bark(): void }
type Pet = Cat | Dog;

function makeSound(pet: Pet) {
  if ("meow" in pet) {
    pet.meow(); // Cat
  } else {
    pet.bark(); // Dog
  }
}
```

### Discriminated union — eng kuchli pattern

```ts
type Shape =
  | { kind: "circle";   radius: number }
  | { kind: "square";   side: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
    default:
      const _never: never = shape; // exhaustive check
      throw new Error(`Unknown: ${_never}`);
  }
}
```

### Type guard functions

```ts
// is — type predicate
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" && obj !== null &&
    "id" in obj && typeof (obj as any).id === "number" &&
    "name" in obj && typeof (obj as any).name === "string"
  );
}

// Ishlatish
const data: unknown = await fetchData();
if (isUser(data)) {
  console.log(data.name); // ✅ User type
}

// Array type guard
function isStringArray(arr: unknown[]): arr is string[] {
  return arr.every(item => typeof item === "string");
}
```

### Assertion functions

```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new Error("Not a user!");
}

// Ishlatish
const data: unknown = await fetchData();
assertUser(data);
data.name; // ✅ User type (throw bo'lmasa)
```

---

## 🧠 Intervyu savollari

1. Type narrowing nima?
2. Discriminated union nima, qachon?
3. Type guard vs type assertion farqi?
4. `is` keyword nima?
5. `asserts` keyword nima?

---

## 🎯 Masalalar

```ts
// Masala 1: API response narrowing
type Success<T> = { type: "success"; data: T };
type Failure     = { type: "error";   message: string; code: number };
type ApiResult<T> = Success<T> | Failure;

function handleResult<T>(result: ApiResult<T>): T { }

// Masala 2: isNonNullable type guard
function isNonNullable<T>(val: T): val is NonNullable<T> { }

// Masala 3: parseUser — unknown'dan User ga xavfsiz parse
function parseUser(data: unknown): User | null { }
```
