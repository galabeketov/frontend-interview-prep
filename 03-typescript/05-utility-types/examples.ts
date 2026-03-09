// 05 — Utility Types | Examples

interface User {
  id:       number;
  name:     string;
  email:    string;
  password: string;
  age?:     number;
  role:     "admin" | "user";
}

// Partial — update uchun
function updateUser(id: number, updates: Partial<Omit<User, "id">>): User {
  throw new Error("not implemented");
}
updateUser(1, { name: "New Name" });       // ✅
updateUser(1, { name: "Ali", age: 26 });   // ✅

// Pick — public profile
type UserProfile  = Pick<User, "id" | "name" | "role">;
type Credentials  = Pick<User, "email" | "password">;
type PublicUser   = Omit<User, "password">;

// Record
type Permissions  = Record<User["role"], string[]>;
const perms: Permissions = {
  admin: ["read", "write", "delete", "manage"],
  user:  ["read"],
};

// ReturnType & Parameters
async function fetchUsers(page: number, pageSize: number, filter?: string): Promise<User[]> {
  return [];
}
type FetchResult = Awaited<ReturnType<typeof fetchUsers>>; // User[]
type FetchArgs   = Parameters<typeof fetchUsers>;          // [number, number, string?]

// Masala 1 — Product DTOs
interface Product {
  id:        number;
  name:      string;
  price:     number;
  category:  string;
  createdAt: string;
  updatedAt: string;
}

type CreateProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;
type UpdateProductDto = Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>;
type ProductResponse  = Readonly<Product>;

const newProduct: CreateProductDto = {
  name: "MacBook", price: 1500, category: "Electronics"
};
const update: UpdateProductDto = { price: 1400 }; // faqat price update

// Masala 2 — HandlerMap
type EventHandlers = {
  click:    MouseEvent;
  keydown:  KeyboardEvent;
  input:    InputEvent;
  submit:   SubmitEvent;
};
type HandlerMap = { [K in keyof EventHandlers]: (e: EventHandlers[K]) => void };

// Masala 3 — DeepPartial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>
    : T[K];
};

interface Config {
  server: { host: string; port: number; ssl: boolean };
  db:     { url: string; poolSize: number };
}

const partialConfig: DeepPartial<Config> = {
  server: { port: 8080 },  // host va ssl ixtiyoriy
};
