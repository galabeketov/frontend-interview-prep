// 05 - useRef - Examples

import { useRef, useState, useEffect, forwardRef } from "react";

// Masala 1 - useClickOutside
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// Masala 2 - Stopwatch
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => setTime(t => t + 10), 10);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const format = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}.${String(ms%1000).padStart(3,"0")}`;
  };

  return (
    <div>
      <div>{format(time)}</div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// forwardRef example
const Input = forwardRef(({ label, error, ...props }, ref) => (
  <div>
    {label && <label>{label}</label>}
    <input ref={ref} {...props} />
    {error && <span className="error">{error}</span>}
  </div>
));
Input.displayName = "Input";
