// ============================================
// 01 — Variables and Types — Examples & Tasks
// ============================================

// ─────────────────────────────────────────
// 1. var vs let vs const
// ─────────────────────────────────────────
var a = 1;
var a = 2; // ✅ var re-declare qilsa bo'ladi

let b = 1;
// let b = 2; // ❌ SyntaxError

const c = 1;
// c = 2; // ❌ TypeError

// Block scope
{
  var x = "var"; // tashqarida ham ko'rinadi
  let y = "let"; // faqat block ichida
}
console.log(x); // "var"
// console.log(y); // ❌ ReferenceError

// ─────────────────────────────────────────
// 2. Primitive vs Reference
// ─────────────────────────────────────────
let num1 = 10;
let num2 = num1;
num2 = 20;
console.log(num1); // 10 — o'zgarmadi

let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] — o'zgardi!

// Yechim: spread bilan copy
let arr3 = [...arr1];
arr3.push(5);
console.log(arr1); // [1, 2, 3, 4] — o'zgarmadi

// ─────────────────────────────────────────
// 3. Type Conversion
// ─────────────────────────────────────────
console.log(Number("42"));    // 42
console.log(Number(""));      // 0
console.log(Number("abc"));   // NaN
console.log(Number(true));    // 1
console.log(Number(null));    // 0
console.log(Number(undefined)); // NaN

// ─────────────────────────────────────────
// 4. Falsy / Truthy
// ─────────────────────────────────────────
const values = [0, "", null, undefined, NaN, false, "0", [], {}, -1];
values.forEach(v => {
  console.log(`${JSON.stringify(v)} → ${Boolean(v)}`);
});

// ─────────────────────────────────────────
// 5. ?? vs ||
// ─────────────────────────────────────────
const score1 = 0 || "default";  // "default" — 0 falsy
const score2 = 0 ?? "default";  // 0 — 0 null/undefined emas

console.log(score1); // "default"
console.log(score2); // 0

// ─────────────────────────────────────────
// MASALA YECHIMLARI
// ─────────────────────────────────────────

// Masala 1
console.log(typeof null);        // "object" (JS bug)
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"

// Masala 4
console.log(1 + "2" + 3);  // "123" — left to right, birinchi "12" string
console.log(1 + 2 + "3");  // "33"  — birinchi 3 number, keyin "3" string
console.log("5" - 3);      // 2     — - string ni numbrega aylantiradi
console.log(true + true);  // 2
console.log(null + 1);     // 1
console.log(undefined + 1); // NaN

// Masala 5 — deepCopy
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
  // Yoki: structuredClone(obj) — zamonaviy usul
}

const original = { name: "Ali", scores: [1, 2, 3] };
const copy = deepCopy(original);
copy.name = "Vali";
copy.scores.push(4);

console.log(original.name);   // "Ali" ✅
console.log(original.scores); // [1, 2, 3] ✅

// ─────────────────────────────────────────
// BONUS: Array ni tekshirish
// ─────────────────────────────────────────
const arr = [1, 2, 3];
console.log(typeof arr);        // "object" — bu noto'g'ri ko'rsatadi
console.log(Array.isArray(arr)); // true ✅ — to'g'ri usul
