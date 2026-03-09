// 06 - useMemo & useCallback - Examples

import { useState, useMemo, useCallback, memo } from "react";

// React.memo - props o'zgarmasa re-render bo'lmaydi
const ProductCard = memo(function ProductCard({ product, onBuy }) {
  console.log("ProductCard render:", product.name);
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price} so'm → {product.discounted} so'm</p>
      <button onClick={() => onBuy(product.id)}>Sotib olish</button>
    </div>
  );
});

// Masala 1 - Optimizatsiya
function ProductList({ products, onBuy }) {
  const processed = useMemo(() => {
    console.log("Processing products...");
    return products
      .filter(p => p.inStock)
      .sort((a, b) => a.price - b.price)
      .map(p => ({ ...p, discounted: Math.round(p.price * 0.9) }));
  }, [products]);

  // useCallback - ProductCard memo bilan ishlashi uchun
  const handleBuy = useCallback((id) => {
    onBuy(id);
  }, [onBuy]);

  return processed.map(p => (
    <ProductCard key={p.id} product={p} onBuy={handleBuy} />
  ));
}

// Real example - search with debounce + filter
function SearchableList({ items }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...items]
      .filter(item => item.name.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.price - b.price;
      });
  }, [items, query, sortBy]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Nom</option>
        <option value="price">Narx</option>
      </select>
      <p>Topildi: {filtered.length}</p>
      {filtered.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
