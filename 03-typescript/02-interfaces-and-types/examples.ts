// 02 — Interfaces & Types | Examples

// Interface
interface User {
  readonly id: number;
  name:        string;
  email:       string;
  age?:        number;
  role:        "admin" | "user" | "guest";
}

// Type alias — union, primitive bilan
type ID        = string | number;
type Point     = [number, number];
type EventName = "click" | "focus" | "blur" | "change";

// Extending
interface BaseEntity {
  id:        number;
  createdAt: string;
  updatedAt: string;
}
interface Product extends BaseEntity {
  name:     string;
  price:    number;
  category: string;
  inStock:  boolean;
}

// Masala 1 — PaginatedResponse
interface PaginatedResponse<T> {
  data:       T[];
  page:       number;
  pageSize:   number;
  totalItems: number;
  totalPages: number;
  hasNext:    boolean;
  hasPrev:    boolean;
}

const usersPage: PaginatedResponse<User> = {
  data:       [],
  page:       1,
  pageSize:   10,
  totalItems: 100,
  totalPages: 10,
  hasNext:    true,
  hasPrev:    false,
};

// Masala 2 — FormField
interface FormField<T = string> {
  value:    T;
  error:    string | null;
  touched:  boolean;
  onChange: (value: T) => void;
  onBlur:   () => void;
}

// Masala 3 — TypedEventEmitter
interface AppEvents {
  login:      { userId: number; timestamp: Date };
  logout:     { userId: number };
  dataUpdate: { resource: string; id: number };
}

class TypedEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<Function>>();

  on<K extends keyof Events>(event: K, fn: (data: Events[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
  }

  off<K extends keyof Events>(event: K, fn: (data: Events[K]) => void): void {
    this.listeners.get(event)?.delete(fn);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
}

const emitter = new TypedEmitter<AppEvents>();
emitter.on("login", ({ userId, timestamp }) => {
  console.log(`User ${userId} logged in at ${timestamp}`);
});
emitter.emit("login", { userId: 1, timestamp: new Date() });
