# 12 — Async/Await

## 📖 Nazariya

`async/await` — Promise'ni yanada qulay yozish usuli. Asinxron kodni sinxron ko'rinishda yozish imkonini beradi.

### Asoslar
```js
async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  const user = await res.json();
  return user; // Promise<user> qaytaradi
}

// async function har doim Promise qaytaradi
const result = fetchUser(1); // Promise
```

### Error handling
```js
// try/catch
async function getUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Xato:", err.message);
    throw err; // re-throw
  }
}

// .catch() bilan
getUser(1).catch(err => console.error(err));
```

### Parallel vs Sequential
```js
// ❌ Sequential — sekin (2 sekund)
const user  = await fetchUser(1);   // 1 sekund kutadi
const posts = await fetchPosts(1);  // yana 1 sekund

// ✅ Parallel — tez (1 sekund)
const [user, posts] = await Promise.all([
  fetchUser(1),
  fetchPosts(1)
]);
```

### for...of bilan async
```js
// Ketma-ket bajarish
for (const id of userIds) {
  const user = await fetchUser(id); // biri tugasa keyingisi
}

// Parallel
await Promise.all(userIds.map(id => fetchUser(id)));
```

### Top-level await (ES2022)
```js
// module ichida
const data = await fetch("/api").then(r => r.json());
```

---

## 🧠 Intervyu savollari

1. `async/await` va Promise farqi?
2. `await` faqat `async` function ichida ishlatilishi kerakmi?
3. Parallel request qanday amalga oshiriladi?
4. `async` function nima qaytaradi?
5. Error handling da `try/catch` vs `.catch()` qaysi yaxshi?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Sequential va parallel versiyalarini yozing
async function loadData(ids) {
  // ids = [1,2,3,4,5]
  // Sequential: biri tugagach keyingisi
  // Parallel: hammasi bir vaqtda
}
```

### Masala 2
```js
// async queue — bir vaqtda max N ta request
async function processWithConcurrency(tasks, limit = 3) { /* ... */ }
```

### Masala 3
```js
// Natija nima?
async function fn() {
  return 42;
}
const result = fn();
console.log(result);        // ?
console.log(await result);  // ?
```
