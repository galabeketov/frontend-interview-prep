// 11 - Performance - Examples

import { useState, useMemo, useCallback, memo, lazy, Suspense } from "react";

// Masala 1 - Optimized App
const ItemList = memo(function ItemList({ items, onDelete }) {
  console.log("ItemList render");
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>x</button>
        </li>
      ))}
    </ul>
  );
});

function OptimizedApp({ items: initialItems }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [items, setItems] = useState(initialItems);

  // useMemo - text o'zgarganda re-compute bo'lmaydi
  const processedItems = useMemo(() => {
    console.log("Processing items...");
    return items
      .filter(i => i.active)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // useCallback - ItemList memo bilan ishlashi uchun
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ItemList items={processedItems} onDelete={handleDelete} />
    </>
  );
}

// Code splitting
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Grafikni ko'rsatish</button>
      {showChart && (
        <Suspense fallback={<div>Yuklanmoqda...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
