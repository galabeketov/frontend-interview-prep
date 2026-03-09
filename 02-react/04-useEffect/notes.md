# 04 - useEffect

## Nazariya

useEffect - side effects uchun: data fetching, subscription, DOM manipulation, timers.

### Sintaksis

```jsx
useEffect(() => {
  // effect
  return () => {
    // cleanup (ixtiyoriy)
  };
}, [dependencies]);
```

### Dependency array

```jsx
// 1. Bo'sh array - faqat mount da
useEffect(() => {
  fetchData();
}, []);

// 2. Dependencies - qiymat o'zgarganda
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// 3. Array yo'q - har render da
useEffect(() => {
  document.title = count;
});
```

### Cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => setTime(Date.now()), 1000);
  return () => clearInterval(id); // cleanup - unmount da
}, []);

useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .then(setData);
  return () => controller.abort(); // fetch ni bekor qilish
}, [url]);
```

### useEffect anti-patterns

```jsx
// 1. Loopsiz dependency
useEffect(() => {
  setCount(count + 1); // count dependency da - cheksiz loop!
}, [count]);

// Fix: functional update
useEffect(() => {
  setCount(prev => prev + 1);
}, []);

// 2. Object/function dependency
const options = { page: 1 }; // har render da yangi reference!
useEffect(() => { fetchData(options); }, [options]); // cheksiz loop

// Fix: useMemo yoki primitive
const page = 1;
useEffect(() => { fetchData({ page }); }, [page]);
```

### useEffect vs useLayoutEffect

```jsx
// useEffect - paint DAN KEYIN (asynchronous)
// useLayoutEffect - paint OLDIN (synchronous) - DOM o'lcham kerak bo'lsa

useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setHeight(rect.height);
}, []);
```

---

## Intervyu savollari

1. useEffect dependency array nima qiladi?
2. Cleanup function qachon chaqiriladi?
3. Cheksiz loop qanday yuzaga keladi va qanday hal qilinadi?
4. useEffect va useLayoutEffect farqi?
5. Strict mode da useEffect nima uchun ikki marta chaqiriladi?

---

## Masalalar

### Masala 1 - useFetch hook

```jsx
function useFetch(url) {
  // data, loading, error
  // url o'zgarganda qayta fetch qilsin
  // cleanup - abort controller
}
```

### Masala 2 - useDebounce

```jsx
function useDebounce(value, delay) {
  // value o'zgarganda delay ms kutib, debounced value qaytarsin
}
```

### Masala 3 - useInterval

```jsx
function useInterval(callback, delay) {
  // delay null bo'lsa - to'xtasin
  // callback o'zgarganda restart bo'lmasin
}
```
