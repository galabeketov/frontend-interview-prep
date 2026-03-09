# 17 — React Interview Questions

## 🔥 Top 50 Savol

### JSX & Rendering
1. Virtual DOM nima, qanday ishlaydi?
2. Reconciliation nima?
3. `key` prop nima uchun muhim?
4. Index'ni key sifatida ishlatish xavfli?
5. React.Fragment nima uchun?

### Components & Props
6. Controlled vs Uncontrolled component farqi?
7. Props drilling nima, yechimi?
8. `children` prop nima?
9. Component composition pattern nima?

### State & Hooks
10. useState va useReducer qachon?
11. Functional update nima uchun kerak?
12. State batching nima (React 18)?
13. Hook qoidalari (Rules of Hooks)?
14. useEffect va useLayoutEffect farqi?
15. Dependency array'ning 3 holati?
16. Cleanup function nima uchun?
17. Stale closure React'da?

### Performance
18. Re-render sabablari?
19. React.memo nima?
20. useMemo vs useCallback farqi?
21. Code splitting nima?
22. Virtualization nima, qachon?
23. State colocation nima?
24. Web Vitals: LCP, CLS, FID?

### Context & State Management
25. Context API va Redux farqi, qachon nimani?
26. Context re-render muammosi va yechimi?
27. Zustand, Redux Toolkit farqi?

### Advanced
28. Custom hook yozish qoidalari?
29. Error boundary nima, qachon?
30. Suspense va lazy qanday ishlaydi?
31. forwardRef nima uchun?
32. useImperativeHandle nima?
33. Render props pattern nima?
34. HOC pattern nima?

### Testing
35. RTL falsafasi?
36. getBy vs queryBy vs findBy?
37. userEvent vs fireEvent?

---

## 💡 Qisqa javoblar

### Virtual DOM
```
State o'zgardi → yangi VDOM → eski bilan diff → minimal DOM update
Reconciliation: React diff algoritmning ishlashi
```

### Key prop
```
React'ga list elementlarini aniqlash imkonini beradi.
Index key — element qayta tartiblansa state yo'qoladi.
Stable, unique key (id) ishlatish kerak.
```

### useEffect vs useLayoutEffect
```
useEffect    — async, DOM paint DAN KEYIN
useLayoutEffect — sync, DOM paint OLDIDAN (scrolling, sizing uchun)
```

### React.memo
```
Props o'zgarmasa re-render bo'lmaydi.
Shallow comparison qiladi.
useCallback bilan birgalikda ishlatiladi.
```

### Context re-render
```
Provider value o'zgarganda barcha consumer re-render.
Yechim: useMemo(value), contextlarni ajratish.
```

---

## 🎯 Live Coding Vazifalar

### 1. useFetch
```jsx
function useFetch(url) {
  // loading, data, error, refetch
}
```

### 2. Infinite Scroll
```jsx
function useInfiniteScroll({ fetchFn }) {
  // page, items, loadMore, hasMore, loading
}
```

### 3. useDebounce
```jsx
function useDebounce(value, delay) { }
```

### 4. Virtual List (sodda)
```jsx
function VirtualList({ items, itemHeight, containerHeight, renderItem }) { }
```

---

## ✅ Javoblar

```jsx
// useFetch
function useFetch(url) {
  const [state, setState] = useState({ data:null, loading:true, error:null });
  const refetch = useCallback(() => {
    setState({ data:null, loading:true, error:null });
    fetch(url)
      .then(r => r.json())
      .then(data => setState({ data, loading:false, error:null }))
      .catch(e => setState({ data:null, loading:false, error:e.message }));
  }, [url]);
  useEffect(() => { refetch(); }, [refetch]);
  return { ...state, refetch };
}

// useInfiniteScroll
function useInfiniteScroll({ fetchFn, pageSize = 10 }) {
  const [items, setItems]   = useState([]);
  const [page, setPage]     = useState(1);
  const [hasMore, setMore]  = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newItems = await fetchFn(page, pageSize);
    setItems(prev => [...prev, ...newItems]);
    setMore(newItems.length === pageSize);
    setPage(p => p + 1);
    setLoading(false);
  }, [page, hasMore, loading, fetchFn, pageSize]);

  useEffect(() => { loadMore(); }, []);
  return { items, loadMore, hasMore, loading };
}

// Virtual List
function VirtualList({ items, itemHeight, containerHeight, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIdx = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2;
  const endIdx = Math.min(startIdx + visibleCount, items.length);

  const visibleItems = items.slice(startIdx, endIdx);
  const totalHeight  = items.length * itemHeight;
  const offsetY      = startIdx * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, width: "100%" }}>
          {visibleItems.map((item, i) => (
            <div key={startIdx + i} style={{ height: itemHeight }}>
              {renderItem(item, startIdx + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```
