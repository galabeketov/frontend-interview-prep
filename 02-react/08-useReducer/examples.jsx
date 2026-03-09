// 08 - useReducer - Examples

import { useReducer, useCallback } from "react";

// Masala 1 - Todo List
const TODO_ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
      };
    case TODO_ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.payload ? { ...t, done: !t.done } : t)
      };
    case TODO_ACTIONS.DELETE:
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case TODO_ACTIONS.CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter(t => !t.done) };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [text, setText] = useReducer((_, v) => v, "");

  const add = () => {
    if (!text.trim()) return;
    dispatch({ type: TODO_ACTIONS.ADD, payload: text });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Qo'sh</button>
      {state.todos.map(todo => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.done}
            onChange={() => dispatch({ type: TODO_ACTIONS.TOGGLE, payload: todo.id })} />
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.DELETE, payload: todo.id })}>x</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED })}>
        Bajarilganlarni o'chir
      </button>
    </div>
  );
}

// Masala 2 - Async state
function asyncReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":  return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS": return { loading: false, error: null, data: action.payload };
    case "FETCH_ERROR":  return { ...state, loading: false, error: action.payload };
    case "RESET":        return { loading: false, error: null, data: null };
    default: return state;
  }
}

function useAsyncReducer(fetchFn) {
  const [state, dispatch] = useReducer(asyncReducer, { loading: false, error: null, data: null });

  const run = useCallback(async (...args) => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await fetchFn(...args);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [fetchFn]);

  return { ...state, run };
}
