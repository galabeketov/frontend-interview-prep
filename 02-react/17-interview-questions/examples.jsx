// 17 — React Interview Questions | Live Coding
import { useState, useEffect, useCallback, useRef, memo } from "react";

// 1. useFetch
export function useFetch(url) {
  const [state, setState] = useState({ data:null, loading:true, error:null });

  const refetch = useCallback(() => {
    let cancelled = false;
    setState({ data:null, loading:true, error:null });
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { if (!cancelled) setState({ data, loading:false, error:null }); })
      .catch(e  => { if (!cancelled) setState({ data:null, loading:false, error:e.message }); });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => refetch(), [refetch]);
  return { ...state, refetch };
}

// 2. useInfiniteScroll
export function useInfiniteScroll({ fetchFn, pageSize = 10 }) {
  const [items,   setItems]   = useState([]);
  const [page,    setPage]    = useState(1);
  const [hasMore, setMore]    = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await fetchFn(page, pageSize);
      setItems(prev => [...prev, ...newItems]);
      setMore(newItems.length === pageSize);
      setPage(p => p + 1);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, fetchFn, pageSize]);

  useEffect(() => { loadMore(); }, []);

  // Scroll trigger
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) loadMore(); });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loadMore]);

  return { items, loadMore, hasMore, loading, sentinelRef };
}

// 3. Virtual List
export function VirtualList({ items, itemHeight = 50, containerHeight = 400, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIdx    = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2;
  const endIdx      = Math.min(startIdx + visibleCount, items.length);
  const totalHeight = items.length * itemHeight;
  const offsetY     = startIdx * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: "auto", border: "1px solid #e5e7eb" }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, width: "100%" }}>
          {items.slice(startIdx, endIdx).map((item, i) => (
            <div key={startIdx + i} style={{ height: itemHeight, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid #f3f4f6" }}>
              {renderItem(item, startIdx + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Compound Component pattern
export function Tabs({ children, defaultTab = 0 }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <div>
      <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb" }}>
        {React.Children.map(children, (child, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: active === i ? "2px solid #6366f1" : "none",
              color: active === i ? "#6366f1" : "inherit",
              fontWeight: active === i ? "bold" : "normal",
            }}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {React.Children.toArray(children)[active]}
      </div>
    </div>
  );
}
export function Tab({ children }) { return <>{children}</>; }
