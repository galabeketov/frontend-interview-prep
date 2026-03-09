// 10 — Advanced Patterns | Examples

// Branded types
type UserId    = string & { readonly _brand: "UserId" };
type ProductId = string & { readonly _brand: "ProductId" };
type Email     = string & { readonly _brand: "Email" };

const createUserId    = (id: string): UserId    => id as UserId;
const createProductId = (id: string): ProductId => id as ProductId;
const createEmail     = (raw: string): Email => {
  if (!raw.includes("@")) throw new Error("Invalid email");
  return raw as Email;
};

function fetchUser(id: UserId) {
  console.log("Fetching user:", id);
}
const uid = createUserId("usr_123");
const pid = createProductId("prd_456");
fetchUser(uid); // ✅
// fetchUser(pid); // ❌ type error

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;
type CSSUnit    = "px" | "em" | "rem" | "vh" | "vw" | "%";
type CSSValue   = `${number}${CSSUnit}`;

const padding: CSSValue = "16px";  // ✅
// const bad: CSSValue = "16dp";   // ❌

// Getter generator
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number; email: string }>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Infer examples
type UnwrapPromise<T> = T extends Promise<infer U> ? UnwrapPromise<U> : T;
type ElementOf<T>     = T extends (infer U)[] ? U : never;
type FirstOf<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type LastOf<T extends any[]>  = T extends [...any[], infer L] ? L : never;

type A = UnwrapPromise<Promise<Promise<string>>>;  // string
type B = ElementOf<User[]>;                        // User
type C = FirstOf<[string, number, boolean]>;       // string
type D = LastOf<[string, number, boolean]>;        // boolean

// Exhaustive discriminated union
type NetworkAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: unknown }
  | { type: "FETCH_ERROR";   error: string };

function networkReducer(state: unknown, action: NetworkAction) {
  switch (action.type) {
    case "FETCH_START":   return { loading: true };
    case "FETCH_SUCCESS": return { loading: false, data: action.data };
    case "FETCH_ERROR":   return { loading: false, error: action.error };
    default:
      const _never: never = action;
      throw new Error(`Unhandled action: ${_never}`);
  }
}
