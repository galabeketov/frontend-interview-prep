# 01 — Basic Types

## 📖 Nazariya

TypeScript — JavaScript + static type system.

### Primitive types

```ts
let name:    string  = "Ali";
let age:     number  = 25;
let active:  boolean = true;
let nothing: null    = null;
let undef:   undefined = undefined;
let big:     bigint  = 100n;
let sym:     symbol  = Symbol("id");
```

### Array

```ts
let nums: number[]       = [1, 2, 3];
let strs: Array<string>  = ["a", "b"];
let mixed: (string | number)[] = [1, "two", 3];
```

### Tuple — fixed length, fixed types

```ts
let point:   [number, number]          = [10, 20];
let entry:   [string, number]          = ["age", 25];
let rgb:     [number, number, number]  = [255, 128, 0];

// Labeled tuple (TS 4.0+)
type Range = [start: number, end: number];
```

### Object

```ts
let user: { name: string; age: number; email?: string } = {
  name: "Ali",
  age:  25,
  // email ixtiyoriy
};
```

### any, unknown, never, void

```ts
// any — type checking o'chiriladi (ishlatma!)
let x: any = 42;
x = "string"; // ✅ xato yo'q
x.foo.bar;    // ✅ xato yo'q — xavfli!

// unknown — xavfsiz any (ishlatishdan oldin type check kerak)
let y: unknown = 42;
// y.toFixed(); // ❌ xato
if (typeof y === "number") y.toFixed(); // ✅

// void — hech narsa qaytarmaydi
function log(msg: string): void { console.log(msg); }

// never — hech qachon qaytmaydi (xato yoki infinite loop)
function throwError(msg: string): never { throw new Error(msg); }
function infinite(): never { while(true) {} }
```

### Union va Intersection

```ts
// Union — A yoki B
type StringOrNumber = string | number;
let id: StringOrNumber = 1;
id = "abc"; // ham ishlaydi

// Intersection — A va B bir vaqtda
type Named  = { name: string };
type Aged   = { age: number };
type Person = Named & Aged;

const p: Person = { name: "Ali", age: 25 };
```

### Literal types

```ts
type Direction = "up" | "down" | "left" | "right";
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;
type BoolLiteral = true | false;

let dir: Direction = "up";
// dir = "diagonal"; // ❌
```

### Type assertion (as)

```ts
const input = document.getElementById("name") as HTMLInputElement;
input.value = "Ali"; // ✅

// Double assertion (xavfli, ehtiyot bo'l)
const x = "hello" as unknown as number;
```

### Non-null assertion (!)

```ts
const el = document.getElementById("app")!; // null emas deb ta'kidlash
el.textContent = "Salom";
```

---

## 🧠 Intervyu savollari

1. `any` va `unknown` farqi?
2. `never` qachon ishlatiladi?
3. Union va Intersection farqi?
4. Type assertion xavfli bo'lishi mumkinmi?
5. Tuple va Array farqi?

---

## 🎯 Masalalar

```ts
// Masala 1: API response type
// success: { status: "ok", data: User }
// error:   { status: "error", message: string }
type ApiResponse<T> = ???

// Masala 2: Koordinata — tuple
// [x, y] yoki [x, y, z]
type Coord2D = ???
type Coord3D = ???

// Masala 3: bu funksiya return type nima?
function process(input: string | number) {
  if (typeof input === "string") return input.toUpperCase();
  return input.toFixed(2);
}
```
