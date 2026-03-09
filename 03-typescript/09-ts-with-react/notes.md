# 09 — TypeScript with React

## 📖 Nazariya

### Component Props typing

```tsx
// Props interface
interface ButtonProps {
  label:     string;
  onClick:   () => void;
  variant?:  "primary" | "secondary" | "danger";
  size?:     "sm" | "md" | "lg";
  disabled?: boolean;
  loading?:  boolean;
  children?: React.ReactNode;
  className?: string;
}

function Button({ label, onClick, variant = "primary", loading = false, disabled }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : label}
    </button>
  );
}
```

### Children types

```tsx
React.ReactNode     // istalgan JSX (eng universal)
React.ReactElement  // faqat JSX element (string emas)
React.FC            // functional component (children bilan emas, eski)
JSX.Element         // React.ReactElement bilan bir xil

// Aniq children typing
interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}
```

### Event handlers

```tsx
// Input
onChange: React.ChangeEvent<HTMLInputElement>
onBlur:   React.FocusEvent<HTMLInputElement>
onKeyDown: React.KeyboardEvent<HTMLInputElement>

// Form
onSubmit: React.FormEvent<HTMLFormElement>

// Mouse
onClick:     React.MouseEvent<HTMLButtonElement>
onMouseEnter: React.MouseEvent<HTMLDivElement>

// Drag
onDragStart: React.DragEvent<HTMLDivElement>

// Shorthand — handler function type
type InputHandler  = React.ChangeEventHandler<HTMLInputElement>;
type SubmitHandler = React.FormEventHandler<HTMLFormElement>;
type ClickHandler  = React.MouseEventHandler<HTMLButtonElement>;
```

### useState typing

```tsx
const [count,  setCount]  = useState<number>(0);
const [user,   setUser]   = useState<User | null>(null);
const [items,  setItems]  = useState<string[]>([]);
const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
```

### useRef typing

```tsx
const inputRef  = useRef<HTMLInputElement>(null);
const timerRef  = useRef<ReturnType<typeof setTimeout>>(null);
const countRef  = useRef<number>(0);

// DOM ref
inputRef.current?.focus(); // optional chaining — null bo'lishi mumkin
```

### Custom hook typing

```tsx
interface UseFetchReturn<T> {
  data:    T | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data,    setData]    = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const refetch = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(url)
      .then(r => r.json() as Promise<T>)
      .then(d  => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => refetch(), [refetch]);
  return { data, loading, error, refetch };
}

// Ishlatish
const { data: users, loading } = useFetch<User[]>("/api/users");
```

### Generic component

```tsx
interface ListProps<T> {
  items:      T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = "Empty" }: ListProps<T>) {
  if (!items.length) return <p>{emptyMessage}</p>;
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  );
}

// Ishlatish
<List<User>
  items={users}
  keyExtractor={u => u.id}
  renderItem={u => <UserCard user={u} />}
/>
```

### Context typing

```tsx
interface AuthContextType {
  user:    User | null;
  loading: boolean;
  login:   (credentials: { email: string; password: string }) => Promise<void>;
  logout:  () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
```

---

## 🧠 Intervyu savollari

1. `React.FC` ishlatish yaxshimi?
2. Children uchun qaysi type?
3. Event handler type qanday?
4. Generic component qanday?
5. Custom hook return type qanday?

---

## 🎯 Masalalar

```tsx
// Masala 1: type safe useReducer
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number };

function reducer(state: number, action: Action): number {}

// Masala 2: Polymorphic component (as prop)
interface BoxProps<T extends React.ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
}
type PolymorphicBox = <T extends React.ElementType = "div">(
  props: BoxProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof BoxProps<T>>
) => JSX.Element;
```
