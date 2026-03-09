// 11 — Promises — Examples & Solutions

// Masala 1 — tartib: start, end, promise, timeout
console.log("start");
Promise.resolve("promise").then(console.log);
setTimeout(() => console.log("timeout"), 0);
console.log("end");

// Masala 2 — promisify
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// Masala 3 — retry
async function retry(fn, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise(r => setTimeout(r, delay));
      console.log(`Retry ${i + 1}/${attempts}...`);
    }
  }
}

// Masala 4 — withTimeout
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage
withTimeout(fetch("/api/data"), 3000)
  .then(r => r.json())
  .catch(err => console.error(err.message)); // "Timeout after 3000ms"

// Promise.all example
async function loadDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/stats").then(r => r.json()),
  ]);
  return { users, posts, stats };
}
