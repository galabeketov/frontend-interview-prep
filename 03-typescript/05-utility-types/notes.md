# 05 — Utility Types

## 📖 Nazariya

TypeScript built-in utility types — mavjud type'larni transform qilish uchun.

### Eng ko'p ishlatiladiganlar

```ts
interface User {
  id:       number;
  name:     string;
  email:    string;
  password: string;
  age?:     number;
  role:     "admin" | "user";
}
```

#### `Partial<T>` — barcha fieldlar ixtiyoriy

```ts
type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

function updateUser(id: number, updates: Partial<User>) { }
updateUser(1, { name: "New Name" }); // ✅
```

#### `Required<T>` — barcha fieldlar majburiy

```ts
type RequiredUser = Required<User>;
// age endi majburiy
```

#### `Readonly<T>` — barcha fieldlar readonly

```ts
type FrozenUser = Readonly<User>;
const user: FrozenUser = { id:1, name:"Ali", email:"...", password:"...", role:"user" };
// user.name = "Vali"; // ❌
```

#### `Pick<T, K>` — faqat tanlangan fieldlar

```ts
type UserPreview = Pick<User, "id" | "name" | "role">;
// { id: number; name: string; role: "admin" | "user" }

type Credentials = Pick<User, "email" | "password">;
```

#### `Omit<T, K>` — field(lar)ni olib tashlash

```ts
type PublicUser  = Omit<User, "password">;
type UserDto     = Omit<User, "password" | "id">;
type NewUser     = Omit<User, "id">;  // id hali yo'q
```

#### `Record<K, V>` — key-value map

```ts
type RolePermissions = Record<User["role"], string[]>;
const perms: RolePermissions = {
  admin: ["read", "write", "delete"],
  user:  ["read"],
};

type UserById = Record<number, User>;
type Cache    = Record<string, unknown>;
```

#### `Exclude<T, U>` va `Extract<T, U>`

```ts
type StringOrNumber = string | number | boolean;

type OnlyStringOrNumber = Exclude<StringOrNumber, boolean>;
// string | number

type OnlyBoolean = Extract<StringOrNumber, boolean>;
// boolean

type NonNullableStr = Exclude<string | null | undefined, null | undefined>;
// string
```

#### `ReturnType<T>` va `Parameters<T>`

```ts
function fetchUsers(page: number, filter: string): Promise<User[]> { }

type FetchReturn = ReturnType<typeof fetchUsers>;   // Promise<User[]>
type FetchParams = Parameters<typeof fetchUsers>;    // [page: number, filter: string]

// Useful: handler'lar uchun
type SubmitHandler = (data: Parameters<typeof fetchUsers>) => void;
```

#### `NonNullable<T>`

```ts
type MaybeUser = User | null | undefined;
type DefiniteUser = NonNullable<MaybeUser>; // User
```

#### `Awaited<T>` — Promise ichini ochish

```ts
type Resolved = Awaited<Promise<User>>;         // User
type Nested   = Awaited<Promise<Promise<string>>>; // string
```

---

### Custom utility types

```ts
// DeepPartial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Mutable — readonly'ni olib tashlash
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// OptionalKeys — optional keylarni olish
type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

// RequiredKeys
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
```

---

## 🧠 Intervyu savollari

1. `Partial` vs `Required` farqi?
2. `Pick` vs `Omit` farqi?
3. `Exclude` vs `Extract` farqi?
4. `ReturnType` qachon foydali?
5. `Record` vs index signature?

---

## 🎯 Masalalar

```ts
// Masala 1: CreateDto, UpdateDto, ResponseDto yarating
interface Product { id: number; name: string; price: number; category: string; createdAt: string }
type CreateProductDto  = ???   // id va createdAt yo'q
type UpdateProductDto  = ???   // hammasi optional, id yo'q
type ProductResponse   = ???   // hammasi bor, password yo'q (lekin bu Productda yo'q)

// Masala 2: type safe event handler map
type EventMap = { click: MouseEvent; keydown: KeyboardEvent; input: InputEvent };
type HandlerMap = ???   // { click: (e: MouseEvent) => void; ... }

// Masala 3: DeepPartial implement
type DeepPartial<T> = ???
```
