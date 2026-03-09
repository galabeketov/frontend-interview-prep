// 09 - Custom Hooks - Examples

import { useState, useEffect, useCallback, useRef } from "react";

// useLocalStorage
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  const set = useCallback((v) => {
    const toStore = typeof v === "function" ? v(value) : v;
    setValue(toStore);
    localStorage.setItem(key, JSON.stringify(toStore));
  }, [key, value]);
  return [value, set];
}

// Masala 1 - usePagination
export function usePagination({ totalItems, itemsPerPage = 10, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: Math.min(currentPage * itemsPerPage, totalItems),
  };
}

// Masala 2 - useAsync
export function useAsync(asyncFn, deps = []) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus("loading");
    setError(null);
    try {
      const result = await asyncFn(...args);
      setData(result);
      setStatus("success");
      return result;
    } catch (err) {
      setError(err);
      setStatus("error");
      throw err;
    }
  }, deps);

  return { status, data, error, execute, loading: status === "loading" };
}

// Masala 3 - useIntersectionObserver
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
}

// Infinite scroll example
function InfiniteList({ fetchItems }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loaderRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible) setPage(p => p + 1);
  }, [isVisible]);

  useEffect(() => {
    fetchItems(page).then(newItems => setItems(prev => [...prev, ...newItems]));
  }, [page]);

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div ref={loaderRef}>Loading...</div>
    </div>
  );
}
