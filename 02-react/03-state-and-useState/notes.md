# 03 - State and useState

## Nazariya

### useState asoslari

```jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: "", age: 0 });
const [items, setItems] = useState([]);

// Lazy init - qimmat computation
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem("data")) || [];
});
```

### State update - immutable!

```jsx
setCount(prev => prev + 1);           // functional update
setUser(prev => ({ ...prev, name: "Ali" }));  // object update
setItems(prev => [...prev, newItem]);          // array add
setItems(prev => prev.filter(i => i.id !== id)); // array remove
setItems(prev => prev.map(i => i.id === id ? {...i, done: true} : i)); // update
```

### State nima emas?

```jsx
// Computed - state emas, derive qiling
const total = items.reduce((s, i) => s + i.price, 0); // yoki useMemo

// Timer id, DOM ref - useRef ishlating
const timerRef = useRef(null);
```

### React 18 - automatic batching

```jsx
function handleClick() {
  setCount(c => c + 1);
  setName("Ali");
  setLoading(false);
  // Uchta o'zgartirish - bitta re-render!
}
```

---

## Intervyu savollari

1. setState synchronous mi?
2. Functional update qachon kerak?
3. State va ref farqi?
4. Nima uchun state immutable bo'lishi kerak?

---

## Masalalar

### Masala 1 - Shopping Cart

```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);
  // addItem(product)
  // removeItem(id)
  // updateQuantity(id, qty)
  // total computed
}
```

### Masala 2 - useForm hook

```jsx
function useForm(initialValues, validate) {
  // values, errors, touched
  // handleChange, handleBlur, handleSubmit
}
```
