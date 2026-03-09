// 01 — Basic Types | Examples

// Primitive
const name: string  = "Beketov";
const age:  number  = 28;
const dev:  boolean = true;

// Array
const scores: number[]      = [95, 87, 92];
const tags:   Array<string> = ["react", "typescript"];

// Tuple
const point:  [number, number]         = [10, 20];
const person: [string, number, boolean] = ["Ali", 25, true];

// Destructure tuple
const [x, y]           = point;
const [pName, pAge]    = person;

// Union
type ID = string | number;
let userId: ID = 1;
userId = "usr_abc"; // ✅

// Intersection
type Timestamped = { createdAt: Date; updatedAt: Date };
type WithId      = { id: number };
type BaseEntity  = WithId & Timestamped;

// Literal
type Theme     = "light" | "dark" | "system";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

let theme: Theme = "dark";

// unknown vs any
function safeParse(json: string): unknown {
  return JSON.parse(json);
}
const result = safeParse('{"name":"Ali"}');
// result.name; // ❌ unknown ishlatishdan oldin narrow qilish kerak
if (typeof result === "object" && result !== null && "name" in result) {
  console.log((result as { name: string }).name);
}

// never — exhaustive check
type Shape = "circle" | "square" | "triangle";
function getArea(shape: Shape, size: number): number {
  switch (shape) {
    case "circle":   return Math.PI * size ** 2;
    case "square":   return size ** 2;
    case "triangle": return (size ** 2) / 2;
    default:
      const _exhaustive: never = shape; // yangi shape qo'shilsa TS xato beradi
      throw new Error(`Unknown shape: ${_exhaustive}`);
  }
}

// Masala 1 — ApiResponse
type ApiResponse<T> =
  | { status: "ok";    data: T }
  | { status: "error"; message: string };

async function fetchUser(id: number): Promise<ApiResponse<{ name: string }>> {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) return { status: "error", message: `HTTP ${res.status}` };
    const data = await res.json();
    return { status: "ok", data };
  } catch (e) {
    return { status: "error", message: String(e) };
  }
}

// Usage with type narrowing
async function demo() {
  const response = await fetchUser(1);
  if (response.status === "ok") {
    console.log(response.data.name); // ✅ type safe
  } else {
    console.error(response.message); // ✅ type safe
  }
}

// Masala 2 — Coords
type Coord2D = [x: number, y: number];
type Coord3D = [x: number, y: number, z: number];
type Coord   = Coord2D | Coord3D;

function is3D(coord: Coord): coord is Coord3D {
  return coord.length === 3;
}
