# 05 - useRef

## Nazariya

useRef - re-render qilmasdan qiymat saqlash, yoki DOM elementga kirish.

```jsx
const ref = useRef(initialValue);
// ref.current - qiymat
```

### 2 ta asosiy ishlatish

#### 1. DOM ga kirish
```jsx
function FocusInput() {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}
```

#### 2. Re-render qilmasdan qiymat saqlash
```jsx
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);
}
```

### useRef vs useState
| | useState | useRef |
|---|---|---|
| Re-render | Ha | Yo'q |
| Qiymat saqlash | Ha | Ha |
| DOM | Yo'q | Ha |

### Previous value pattern
```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <p>Hozir: {count}, Oldin: {prevCount}</p>;
}
```

### forwardRef
```jsx
const Input = forwardRef(({ label, ...props }, ref) => (
  <div>
    <label>{label}</label>
    <input ref={ref} {...props} />
  </div>
));

// Parent
const inputRef = useRef();
<Input ref={inputRef} label="Ism" />
inputRef.current.focus();
```

---

## Masalalar

### Masala 1
```jsx
// useClickOutside hook - modal yopish uchun
function useClickOutside(ref, handler) { }
```

### Masala 2
```jsx
// Stopwatch - start/stop/reset
function Stopwatch() { }
```
