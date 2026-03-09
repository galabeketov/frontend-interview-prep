// 10 — ES6 Modules — Examples

// Named exports
export const formatDate = (date) => new Intl.DateTimeFormat("uz").format(date);
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Default export
export default {
  formatDate,
  capitalize
};

// Masala 2 — Barrel export pattern
// utils/string.js
export const trim = s => s.trim();
export const truncate = (s, n) => s.length > n ? s.slice(0, n) + "..." : s;

// utils/array.js
export const unique = arr => [...new Set(arr)];
export const chunk = (arr, n) => Array.from({length: Math.ceil(arr.length/n)}, (_, i) => arr.slice(i*n, i*n+n));

// utils/index.js (barrel)
// export * from "./string.js";
// export * from "./array.js";

// Masala 1 — Circular dependency yechimi
// a.js va b.js bir-birini import qilsa — a undefined bo'lishi mumkin
// Yechim: umumiy narsalarni alohida faylga chiqarish
// common.js: export const shared = 1;
// a.js: import { shared } from "./common.js"
// b.js: import { shared } from "./common.js"
