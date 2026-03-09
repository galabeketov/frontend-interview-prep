// 13 — Event Loop — Examples & Solutions

// Masala 1 — Natija: a, e, c, d, b
console.log("a");
setTimeout(() => console.log("b"), 0);
Promise.resolve().then(() => {
  console.log("c");
  Promise.resolve().then(() => console.log("d"));
});
console.log("e");
// Tushuntirish:
// a, e — Call Stack
// c — Microtask (Promise.then)
// d — Microtask (ichki Promise.then — c bajarilganda qo'shildi)
// b — Macrotask (setTimeout)

// Masala 2 — Natija: start, 1, end, 2, 3
// start — sync
// 1 — main() ichida sync
// end — main() await da to'xtadi, sync davom etdi
// 2 — await Promise.resolve() — microtask (tez)
// 3 — await setTimeout — macrotask (sekin)
