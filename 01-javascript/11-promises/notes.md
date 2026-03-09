# 11 — Promises

## 📖 Nazariya

### Promise nima?

Promise — **kelajakda bo'ladigan** qiymatni ifodalovchi object. Uch holati bor:
- `pending` — kutilmoqda
- `fulfilled` — muvaffaqiyatli bajarildi
- `rejected` — xato yuz berdi

```js
const promise = new Promise((resolve, reject) => {
  // asinxron ish
  setTimeout(() => {
    resolve("muvaffaqiyat!"); // yoki reject(new Error("xato"))
  }, 1000);
});

promise
  .then(result => console.log(result)) // "muvaffaqiyat!"
  .catch(err => console.error(err))
  .finally(() => console.log("tugadi"));
```

---

### Promise chaining
```js
fetch("/api/user")
  .then(res => res.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
```

---

### Promise static methodlar

#### Promise.all — hammasi tugashini kutadi
```js
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
// Bitta reject bo'lsa — hammasi reject
```

#### Promise.allSettled — hammasi tugashini kutadi (xato bo'lsa ham)
```js
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("xato"),
  Promise.resolve(3)
]);
// [{status:"fulfilled",value:1}, {status:"rejected",reason:"xato"}, ...]
```

#### Promise.race — birinchi tugaganini qaytaradi
```js
const result = await Promise.race([
  fetch("/api/fast"),
  new Promise((_, reject) => setTimeout(() => reject("timeout"), 3000))
]);
```

#### Promise.any — birinchi fulfilled ni qaytaradi
```js
const result = await Promise.any([
  Promise.reject("1 xato"),
  Promise.resolve("2 muvaffaq"),
  Promise.resolve("3 muvaffaq")
]);
// "2 muvaffaq"
```

---

### Promise va Microtask Queue
```js
console.log("1");
Promise.resolve().then(() => console.log("2")); // microtask
setTimeout(() => console.log("3"), 0);           // macrotask
console.log("4");
// Tartib: 1, 4, 2, 3
```

---

## 🧠 Intervyu savollari

1. Promise ning 3 holati?
2. `Promise.all` va `Promise.allSettled` farqi?
3. `Promise.race` qachon ishlatiladi?
4. Microtask va Macrotask farqi?
5. Promise chain da xato qanday ushlanadi?
6. `then` da qaytarilgan Promise qanday ishlaydi?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Natija tartibini ayting
console.log("start");
Promise.resolve("promise").then(console.log);
setTimeout(() => console.log("timeout"), 0);
console.log("end");
```

### Masala 2
```js
// promisify — callback funksiyani promise ga aylantirsin
function promisify(fn) { /* ... */ }

const sleep = promisify((ms, cb) => setTimeout(cb, ms));
await sleep(1000); // 1 sekund kutadi
```

### Masala 3
```js
// retry — n marta urinib ko'rsin
async function retry(fn, attempts = 3) { /* ... */ }
```

### Masala 4
```js
// timeout — n ms ichida javob bo'lmasa reject
async function withTimeout(promise, ms) { /* ... */ }
```
