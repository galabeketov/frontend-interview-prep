# 10 — Advanced Patterns

## 📖 Nazariya

### Mapped Types

```ts
// Har bir key uchun type transform
type Readonly<T>  = { readonly [K in keyof T]: T[K] };
type Optional<T>  = { [K in keyof T]?: T[K] };
type Nullable<T>  = { [K in keyof T]: T[K] | null };
type Stringify<T> = { [K in keyof T]: string };

// Conditional mapped type
type FunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// Example
interface API {
  getUser:    () => User;
  setUser:    (u: User) => void;
  userName:   string;
  userId:     number;
}
type MethodNames = FunctionProps<API>; // "getUser" | "setUser"
```

### Template Literal Types

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent   = EventName<"click">;    // "onClick"
type ChangeEvent  = EventName<"change">;   // "onChange"

// CSS property
type CSSProp = `${string}-${string}`;

// API routes
type ApiRoute = `/api/${string}`;

// Getter/Setter types
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
type Setters<T> = { [K in keyof T as `set${Capitalize<string & K>}`]: (v: T[K]) => void };
```

### Infer keyword

```ts
// Function return type extract
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Promise unwrap
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

// Array element type
type ElementType<T> = T extends (infer U)[] ? U : never;
type A = ElementType<string[]>; // string

// First element
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type F = First<[string, number, boolean]>; // string
```

### Branded Types — type safety

```ts
// Ikki xil string'ni farqlash
type UserId    = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

function createUserId(id: string):    UserId    { return id as UserId; }
function createProductId(id: string): ProductId { return id as ProductId; }

function getUser(id: UserId) { }

const userId    = createUserId("usr_123");
const productId = createProductId("prd_456");

getUser(userId);    // ✅
// getUser(productId); // ❌ type error!
// getUser("raw_id"); // ❌ type error!
```

### Discriminated Union + Exhaustive Check

```ts
type Action =
  | { type: "ADD";    payload: string }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

function handleAction(action: Action) {
  switch (action.type) {
    case "ADD":    return console.log("Adding:", action.payload);
    case "REMOVE": return console.log("Removing:", action.id);
    case "CLEAR":  return console.log("Clearing");
    default:       return assertNever(action); // yangi type qo'shilsa TS xato beradi
  }
}
```

---

## 🧠 Intervyu savollari

1. Mapped type nima?
2. Template literal type nima?
3. `infer` keyword nima uchun?
4. Branded type nima uchun kerak?
5. Exhaustive check nima?

---

## 🎯 Masalalar

```ts
// Masala 1: EventEmitter — template literal bilan
type Events = { click: { x: number; y: number }; load: void; error: Error };
type EventHandler<T> = T extends void ? () => void : (data: T) => void;
type HandlerMap<T> = { [K in keyof T as `on${Capitalize<string & K>}`]: EventHandler<T[K]> };

// Masala 2: Builder result type inference
class FormBuilder<T extends Record<string, unknown> = {}> {
  addField<K extends string, V>(name: K, defaultValue: V): FormBuilder<T & Record<K, V>>;
  build(): T;
}
```
