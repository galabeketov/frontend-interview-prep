# 11 - React Performance Optimization

## Nazariya

### Re-render sabablari
1. State o'zgardi
2. Props o'zgardi
3. Parent re-render bo'ldi
4. Context o'zgardi

### Asosiy toollar

#### React.memo - props o'zgarmasa skip
```jsx
const Child = React.memo(function Child({ count, onReset }) {
  console.log("Child render");
  return <button onClick={onReset}>{count}</button>;
});
// Parent re-render bo'lganda, props o'zgarmasa Child render bo'lmaydi
```

#### useMemo - hisob-kitobni cache
```jsx
const sorted = useMemo(
  () => [...items].sort((a,b) => a.name.localeCompare(b.name)),
  [items]
);
```

#### useCallback - funksiyani cache
```jsx
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []);
```

### Code Splitting
```jsx
// Lazy load - faqat kerak bo'lganda yuklaydi
const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### Virtualization - katta listlar uchun
```jsx
// react-virtual yoki react-window
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(vi => (
          <div key={vi.index} style={{ position: "absolute", top: vi.start }}>
            {items[vi.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### React DevTools Profiler
- "Why did this render?" - re-render sababini ko'rish
- Flame chart - render vaqtini ko'rish

---

## Intervyu savollari
1. React.memo nima va qachon ishlatiladi?
2. Key prop performance ga qanday ta'sir qiladi?
3. Context optimization qanday amalga oshiriladi?
4. Code splitting nima va nima uchun kerak?
5. 10,000 qator listni qanday optimize qilasiz?

---

## Masalalar

### Masala 1
```jsx
// Quyidagi kodni optimize qiling
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveList = processItems(items); // qimmat
  const handleDelete = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c+1)}>{count}</button>
      <ItemList items={expensiveList} onDelete={handleDelete} />
    </>
  );
}
```
