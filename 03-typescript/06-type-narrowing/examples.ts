// 06 — Type Narrowing | Examples

// Discriminated union
type ApiResult<T> =
  | { type: "success"; data: T }
  | { type: "error";   message: string; code: number }
  | { type: "loading" };

function handleResult<T>(result: ApiResult<T>): T | null {
  switch (result.type) {
    case "success": return result.data;
    case "error":   console.error(`[${result.code}] ${result.message}`); return null;
    case "loading": return null;
    default:
      const _: never = result;
      throw new Error("Exhaustive check failed");
  }
}

// Type guards
interface User { id: number; name: string; email: string }

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" && obj !== null &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).email === "string"
  );
}

function assertUser(val: unknown): asserts val is User {
  if (!isUser(val)) throw new TypeError("Expected User object");
}

// isNonNullable
function isNonNullable<T>(val: T): val is NonNullable<T> {
  return val !== null && val !== undefined;
}

const values = ["hello", null, "world", undefined, "!"];
const strings = values.filter(isNonNullable); // string[]
console.log(strings); // ["hello","world","!"]

// parseUser
function parseUser(data: unknown): User | null {
  if (!isUser(data)) return null;
  return data;
}

// Advanced narrowing
type NetworkState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error";   error: string };

function renderState(state: NetworkState): string {
  switch (state.status) {
    case "idle":    return "Boshlash uchun so'rov yuboring";
    case "loading": return "Yuklanmoqda...";
    case "success": return `${state.data.length} ta foydalanuvchi`;
    case "error":   return `Xato: ${state.error}`;
  }
}
