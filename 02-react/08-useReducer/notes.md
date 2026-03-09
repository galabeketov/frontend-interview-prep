# 08 - useReducer

## Nazariya

useReducer - murakkab state logic uchun useState alternativasi.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Qachon useReducer?
- Bir necha o'zgaruvchi birgalikda o'zgarganda
- Keyingi state oldingi state ga bog'liq bo'lganda
- State o'zgarish logikasi murakkab bo'lganda

### Asosiy pattern

```jsx
// Action types
const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  SET: "SET",
};

// Reducer - pure function
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + (action.payload ?? 1) };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - (action.payload ?? 1) };
    case ACTIONS.RESET:
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const initialState = { count: 0 };

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</button>
    </div>
  );
}
```

### useReducer + useContext = mini Redux

```jsx
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  return useContext(StoreContext);
}
```

---

## Masalalar

### Masala 1 - Todo List
```jsx
// useReducer bilan to-do list
// ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_COMPLETED
```

### Masala 2 - Async reducer pattern
```jsx
// fetch state: idle, loading, success, error
// FETCH_START, FETCH_SUCCESS, FETCH_ERROR, RESET
```
