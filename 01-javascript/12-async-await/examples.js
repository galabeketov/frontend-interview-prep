// 12 — Async/Await — Examples & Solutions

// Masala 1 — Sequential vs Parallel
async function loadData(ids) {
  // Sequential
  const sequential = [];
  for (const id of ids) {
    const data = await fetch(`/api/item/${id}`).then(r => r.json());
    sequential.push(data);
  }

  // Parallel
  const parallel = await Promise.all(
    ids.map(id => fetch(`/api/item/${id}`).then(r => r.json()))
  );

  return { sequential, parallel };
}

// Masala 2 — Concurrency limit
async function processWithConcurrency(tasks, limit = 3) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Masala 3 — Natija
async function fn() { return 42; }
const result = fn();
console.log(result);        // Promise {<fulfilled>: 42}
// console.log(await result); // 42

// Real world pattern — fetch with error handling
async function apiCall(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error(`API Error: ${err.message}`);
  }
}
