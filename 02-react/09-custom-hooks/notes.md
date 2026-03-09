# 09 - Custom Hooks

## Nazariya

Custom hooks - qayta ishlatiladigan stateful logic. Nom "use" bilan boshlanishi shart.

### Qoidalar
1. Nom "use" bilan boshlash
2. Faqat React component yoki boshqa hook ichida chaqirish
3. Conditionally chaqirmaslik

```jsx
// Noto'g'ri - faqat logic extract, UI yo'q
function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Agar bu logic boshqa joyda ham kerak bo'lsa...
}

// To'g'ri - custom hook
function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchUser(id).then(setUser).finally(() => setLoading(false)); }, [id]);
  return { user, loading };
}

function UserCard({ id }) {
  const { user, loading } = useUser(id);
}
```

### Keng tarqalgan custom hooklar

```jsx
// useLocalStorage
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  const set = (v) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [value, set];
}

// useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

// useToggle
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  const reset = useCallback(() => setOn(initial), [initial]);
  return [on, toggle, reset];
}
```

---

## Masalalar

### Masala 1 - usePagination
```jsx
function usePagination({ totalItems, itemsPerPage = 10, initialPage = 1 }) {
  // currentPage, totalPages
  // nextPage, prevPage, goToPage
  // startIndex, endIndex - slice uchun
}
```

### Masala 2 - useAsync
```jsx
function useAsync(asyncFn, deps = []) {
  // status: idle | loading | success | error
  // data, error
  // execute() - manual run
}
```

### Masala 3 - useIntersectionObserver
```jsx
function useIntersectionObserver(options) {
  // ref - DOM elementga
  // isIntersecting - ko'rinishda mi?
  // Infinite scroll uchun
}
```
