# 02 — Interfaces & Type Aliases

## 📖 Nazariya

### Interface

```ts
interface User {
  readonly id:   number;     // o'zgartirib bo'lmaydi
  name:          string;
  email:         string;
  age?:          number;     // ixtiyoriy
  role:          "admin" | "user" | "guest";
}
```

### Type alias

```ts
type User = {
  readonly id: number;
  name:        string;
  email:       string;
  age?:        number;
  role:        "admin" | "user" | "guest";
};
```

---

### Interface vs Type — farqlar

| | Interface | Type |
|---|---|---|
| Extend | `extends` | `&` intersection |
| Primitive alias | ❌ | ✅ `type ID = string` |
| Union | ❌ | ✅ `type X = A \| B` |
| Declaration merging | ✅ | ❌ |
| Tuple | ❌ | ✅ |
| Computed keys | ❌ | ✅ |

```ts
// Interface extends
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// Type intersection
type Animal = { name: string }
type Dog    = Animal & { breed: string }

// Interface declaration merging (lib.d.ts bilan ishlaganda foydali)
interface Window { myCustomProp: string }
interface Window { anotherProp: number }
// Ikkalasi merge bo'ladi!

// Type — union, primitive, tuple (interface qila olmaydi)
type StringOrNumber = string | number;
type Point          = [number, number];
type Callback       = (error: Error | null, result?: unknown) => void;
```

**Qoida:** Object shape uchun `interface`, qolgan hamma narsa uchun `type`.

---

### Index signature

```ts
// Key turi dinamik
interface StringMap  { [key: string]: string }
interface NumberMap  { [key: string]: number }
interface FlexObject { [key: string]: unknown }

const env: StringMap = { HOST: "localhost", PORT: "3000" };

// Record utility type (qulay alternativa)
type StringMap2 = Record<string, string>;
type UserMap    = Record<string, User>;
```

### Extending & Implementing

```ts
interface Animal {
  name:  string;
  speak(): string;
}

interface Pet extends Animal {
  owner: string;
}

interface DomesticPet extends Pet {
  vaccinated: boolean;
}

// Class implements interface
class Dog implements DomesticPet {
  name:       string;
  owner:      string;
  vaccinated: boolean;

  constructor(name: string, owner: string) {
    this.name       = name;
    this.owner      = owner;
    this.vaccinated = false;
  }

  speak() { return `${this.name} barks!`; }
}
```

### Callable & Constructable interface

```ts
// Callable
interface Formatter {
  (value: string): string;
  prefix: string;
}

// Constructable
interface UserConstructor {
  new (name: string): User;
}
```

---

## 🧠 Intervyu savollari

1. Interface va type farqi, qachon nimani?
2. Declaration merging nima?
3. `readonly` vs `const` farqi?
4. Index signature nima?
5. Interface implements qanday?

---

## 🎯 Masalalar

```ts
// Masala 1: API types
interface PaginatedResponse<T> {
  // data, page, totalPages, totalItems, hasNext, hasPrev
}

// Masala 2: Form field
interface FormField<T = string> {
  // value, error, touched, onChange, onBlur
}

// Masala 3: event emitter interface
interface TypedEventEmitter<Events extends Record<string, unknown>> {
  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void;
  off<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void;
  emit<K extends keyof Events>(event: K, data: Events[K]): void;
}
```
