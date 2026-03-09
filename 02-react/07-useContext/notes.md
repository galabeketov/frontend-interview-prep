# 07 - useContext

## Nazariya

Context - "prop drilling" muammosini hal qiladi. Qiymatni daraxt bo'ylab uzatmay, to'g'ridan foydalanish.

```jsx
// 1. Context yaratish
const ThemeContext = createContext("light");

// 2. Provider - qiymat berish
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />
    </ThemeContext.Provider>
  );
}

// 3. Consumer - qiymat olish
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button className={theme} onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
      Toggle
    </button>
  );
}
```

### Best practice - custom hook

```jsx
// context/ThemeContext.jsx
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

### Context performance muammosi

```jsx
// Muammo: har o'zgarganda BARCHA consumers re-render bo'ladi
const AppContext = createContext();
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  // user o'zgarganda theme consumers ham re-render!
  return <AppContext.Provider value={{ user, setUser, theme, setTheme }}>{children}</AppContext.Provider>;
}

// Yechim: contextlarni ajratish
const UserContext = createContext();
const ThemeContext = createContext();
```

### Context vs Zustand/Redux

| | Context | Zustand/Redux |
|---|---|---|
| Qachon | Simple global state | Complex state, frequent updates |
| Performance | Re-render muammosi | Optimizatsiya bor |
| DevTools | Yo'q | Bor |
| Murakkablik | Kam | Ko'p |

---

## Masalalar

### Masala 1
```jsx
// AuthContext yozing
// user, login(credentials), logout, isAuthenticated
```

### Masala 2
```jsx
// Toast/Notification context
// addToast(message, type), removeToast(id)
// ToastContainer - render qilsin
```
