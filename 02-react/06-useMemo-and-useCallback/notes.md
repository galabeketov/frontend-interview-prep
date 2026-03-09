# 06 - useMemo and useCallback

## Nazariya

### useMemo - qimmat hisob-kitobni cache qiladi

```jsx
const value = useMemo(() => expensiveCalc(a, b), [a, b]);
```

### useCallback - funksiyani cache qiladi

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Qachon ishlatish kerak?

#### useMemo - ha
```jsx
// Katta array filtering/sorting
const filtered = useMemo(
  () => products.filter(p => p.category === cat).sort(...),
  [products, cat]
);

// Katta ob'ekt yaratish (child prop sifatida)
const config = useMemo(() => ({ theme, lang, user }), [theme, lang, user]);
```

#### useCallback - ha
```jsx
// Child componentga prop sifatida uzatilsa (React.memo bilan birgalikda)
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []);

// useEffect dependency bo'lsa
useEffect(() => {
  socket.on("message", handleMessage);
  return () => socket.off("message", handleMessage);
}, [handleMessage]); // useCallback bo'lmasa - cheksiz loop
```

#### Keraksiz hollar
```jsx
// Oddiy primitive hisob - kerak emas
const double = useMemo(() => count * 2, [count]); // ortiqcha

// Faqat o'zida ishlatilsa - kerak emas
const handleClick = useCallback(() => setCount(c => c+1), []); // ortiqcha agar child yo'q
```

### React.memo bilan

```jsx
const ExpensiveChild = React.memo(({ onDelete, items }) => {
  return items.map(item => (
    <div key={item.id}>
      {item.name}
      <button onClick={() => onDelete(item.id)}>O'chir</button>
    </div>
  ));
});

function Parent() {
  const [items, setItems] = useState([...]);

  // useCallback olmasa - har render da yangi funksiya = memo ishlamaydi
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return <ExpensiveChild items={items} onDelete={handleDelete} />;
}
```

---

## Intervyu savollari

1. useMemo va useCallback farqi?
2. Qachon ishlatish kerak, qachon kerak emas?
3. React.memo nima?
4. useMemo reference equality ni saqlaydi, bu nima demak?

---

## Masalalar

### Masala 1
```jsx
// Bu kodni optimizatsiya qiling
function ProductList({ products, onBuy }) {
  const expensive = products
    .filter(p => p.inStock)
    .sort((a, b) => a.price - b.price)
    .map(p => ({ ...p, discounted: p.price * 0.9 }));

  return expensive.map(p => (
    <ProductCard key={p.id} product={p} onBuy={onBuy} />
  ));
}
```
