# 08 — Classes in TypeScript

## 📖 Nazariya

### Access modifiers

```ts
class User {
  public    name:  string;   // hamma ko'ra oladi (default)
  protected email: string;   // class va subclass
  private   #password: string; // faqat class ichida (ES private)
  readonly  id: number;      // o'zgartirib bo'lmaydi

  constructor(id: number, name: string, email: string, password: string) {
    this.id        = id;
    this.name      = name;
    this.email     = email;
    this.#password = password;
  }

  // Shorthand constructor
  // constructor(
  //   public readonly id: number,
  //   public name: string,
  //   protected email: string,
  //   private password: string
  // ) {}
}
```

### Abstract class

```ts
abstract class Repository<T extends { id: number }> {
  protected items: T[] = [];

  abstract validate(entity: T): boolean;

  save(entity: T): T {
    if (!this.validate(entity)) throw new Error("Validation failed");
    const idx = this.items.findIndex(i => i.id === entity.id);
    idx >= 0 ? (this.items[idx] = entity) : this.items.push(entity);
    return entity;
  }

  findById(id: number): T | undefined {
    return this.items.find(i => i.id === id);
  }

  findAll(): T[] { return [...this.items]; }
}

class UserRepository extends Repository<User> {
  validate(user: User): boolean {
    return !!user.name && !!user.email;
  }
}
```

### Implements interface

```ts
interface Serializable {
  serialize(): string;
  toJSON(): Record<string, unknown>;
}

interface Validatable {
  validate(): boolean;
  errors(): string[];
}

class Product implements Serializable, Validatable {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
  ) {}

  serialize(): string { return JSON.stringify(this.toJSON()); }
  toJSON()    { return { id: this.id, name: this.name, price: this.price }; }

  validate(): boolean { return !!this.name && this.price > 0; }
  errors(): string[] {
    const errs: string[] = [];
    if (!this.name)     errs.push("Name is required");
    if (this.price <= 0) errs.push("Price must be positive");
    return errs;
  }
}
```

### Static members

```ts
class Counter {
  private static count = 0;

  static getCount() { return Counter.count; }
  static reset()    { Counter.count = 0; }
  static create()   { Counter.count++; return new Counter(Counter.count); }

  private constructor(public readonly id: number) {}
}

const c1 = Counter.create(); // id: 1
const c2 = Counter.create(); // id: 2
console.log(Counter.getCount()); // 2
```

---

## 🧠 Intervyu savollari

1. `public`, `protected`, `private` farqi?
2. `abstract` class nima?
3. `implements` va `extends` farqi?
4. TypeScript `private` vs JS `#private` farqi?
5. `readonly` vs `const` farqi?

---

## 🎯 Masala

```ts
// Builder pattern — type safe
class QueryBuilder<T> {
  select(...fields: (keyof T)[]): this {}
  where(field: keyof T, value: T[keyof T]): this {}
  limit(n: number): this {}
  offset(n: number): this {}
  build(): string {}
}
```
