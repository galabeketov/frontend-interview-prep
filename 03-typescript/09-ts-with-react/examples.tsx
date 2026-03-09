// 09 — TypeScript with React | Examples
import { useState, useRef, useEffect, useCallback, useReducer, createContext, useContext } from "react";

// Generic List component
interface ListProps<T> {
  items:        T[];
  renderItem:   (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  loading?:     boolean;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = "Bo'sh", loading }: ListProps<T>) {
  if (loading) return <div>Yuklanmoqda...</div>;
  if (!items.length) return <p style={{ color: "#9ca3af" }}>{emptyMessage}</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  );
}

// useFetch generic hook
interface FetchState<T> {
  data:    T | null;
  loading: boolean;
  error:   string | null;
}

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  const refetch = useCallback(() => {
    let cancelled = false;
    setState(s => ({ ...s, loading: true, error: null }));
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() as Promise<T>; })
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(e  => { if (!cancelled) setState({ data: null, loading: false, error: e.message }); });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => refetch(), [refetch]);
  return { ...state, refetch };
}

// Masala 1 — type safe useReducer
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number }
  | { type: "RESET" };

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case "INCREMENT": return state + 1;
    case "DECREMENT": return state - 1;
    case "SET":       return action.payload;
    case "RESET":     return 0;
    default:
      const _: never = action;
      return state;
  }
}

function Counter({ initial = 0 }: { initial?: number }) {
  const [count, dispatch] = useReducer(counterReducer, initial);
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

// Masala 2 — Polymorphic Box
type BoxProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

function Box<T extends React.ElementType = "div">({ as, children, className, ...rest }: BoxProps<T>) {
  const Component = as ?? "div";
  return <Component className={className} {...rest}>{children}</Component>;
}

// Usage:
// <Box>div kabi</Box>
// <Box as="section" aria-label="main">section kabi</Box>
// <Box as="button" onClick={() => {}}>button kabi, onClick type safe</Box>

export { List, useFetch, Counter, Box };
