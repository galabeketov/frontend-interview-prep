# 13 — Event Loop

## 📖 Nazariya

JavaScript — **single-threaded**, lekin asinxron ishlarni boshqaradi. Bu — Event Loop orqali amalga oshadi.

### Komponentlar

```
┌─────────────────────┐
│     Call Stack      │  ← kod bajariladi
└─────────────────────┘
         ↑
┌─────────────────────┐
│    Microtask Queue  │  ← Promise.then, queueMicrotask
│  (yuqori prioritet) │
└─────────────────────┘
         ↑
┌─────────────────────┐
│   Macrotask Queue   │  ← setTimeout, setInterval, I/O
│  (quyi prioritet)   │
└─────────────────────┘
```

### Ishlash tartibi
1. Call Stack bo'shaydi
2. **Barcha** Microtask lar bajariladi
3. Bitta Macrotask bajariladi
4. Yana Microtask lar tekshiriladi
5. Takrorlanadi

```js
console.log("1");           // Call Stack
setTimeout(() => console.log("2"), 0); // Macrotask
Promise.resolve().then(() => console.log("3")); // Microtask
console.log("4");           // Call Stack

// Natija: 1, 4, 3, 2
```

### Microtask vs Macrotask

| Microtask | Macrotask |
|-----------|-----------|
| Promise.then/catch | setTimeout |
| queueMicrotask | setInterval |
| MutationObserver | setImmediate |
| | I/O callbacks |

---

### requestAnimationFrame
```js
// 60fps — har frame da (16ms) chaqiriladi
// Macrotask dan oldin, lekin Microtask dan keyin
function animate() {
  // animatsiya logikasi
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

## 🧠 Intervyu savollari

1. Event Loop nima?
2. Call Stack nima?
3. Microtask va Macrotask farqi?
4. `setTimeout(fn, 0)` nima qiladi?
5. Promise.then qaysi queue'ga tushadi?

---

## 🎯 Amaliy masalalar

### Masala 1 — Tartibni ayting
```js
console.log("a");
setTimeout(() => console.log("b"), 0);
Promise.resolve().then(() => {
  console.log("c");
  Promise.resolve().then(() => console.log("d"));
});
console.log("e");
// Tartib: ?
```

### Masala 2 — Tartibni ayting
```js
async function main() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
  await new Promise(r => setTimeout(r, 0));
  console.log("3");
}
console.log("start");
main();
console.log("end");
// Tartib: ?
```
