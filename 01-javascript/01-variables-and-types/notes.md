# 01 — Variables and Types

## 📖 Nazariya

### O'zgaruvchi e'lon qilish: `var`, `let`, `const`

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function scope | Block scope | Block scope |
| Hoisting | ✅ (undefined) | ✅ (lekin TDZ) | ✅ (lekin TDZ) |
| Re-declare | ✅ | ❌ | ❌ |
| Re-assign | ✅ | ✅ | ❌ |

**TDZ (Temporal Dead Zone)** — `let`/`const` e'lon qilinmasdan oldin ishlatilsa `ReferenceError` chiqadi.

```js
console.log(a); // undefined (var hoisted)
var a = 5;

console.log(b); // ReferenceError (TDZ)
let b = 5;
```

---

### JavaScript Data Types (8 ta)

**Primitive (7 ta):**
- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `null`
- `symbol`

**Reference (1 ta):**
- `object` (Array, Function, Object hammasi object)

---

### Primitive vs Reference — muhim farq

```js
// Primitive — VALUE ko'chiriladi
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 — o'zgarmadi

// Reference — MANZIL ko'chiriladi
let obj1 = { name: "Ali" };
let obj2 = obj1;
obj2.name = "Vali";
console.log(obj1.name); // "Vali" — o'zgardi! Ikkalasi bir xil manzilga ko'rsatadi
```

---

### typeof operatori

```js
typeof "salom"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" ← bu JS dagi mashhur bug!
typeof {}           // "object"
typeof []           // "object" ← array ham object!
typeof function(){} // "function"
typeof Symbol()     // "symbol"
```

---

### Type Conversion (Implicit va Explicit)

```js
// Implicit (avtomatik)
"5" + 3       // "53" (number → string)
"5" - 3       // 2   (string → number)
true + 1      // 2
false + 1     // 1
null + 1      // 1
undefined + 1 // NaN

// Explicit (qo'lda)
Number("42")    // 42
Number("")      // 0
Number("abc")   // NaN
Number(true)    // 1
Number(false)   // 0
Number(null)    // 0
Number(undefined) // NaN

String(42)      // "42"
Boolean(0)      // false
Boolean("")     // false
Boolean(null)   // false
Boolean(undefined) // false
Boolean(NaN)    // false
Boolean("0")    // true ← diqqat!
Boolean([])     // true ← diqqat!
```

---

### Falsy va Truthy qiymatlar

**Falsy (6 ta):**
```js
false, 0, "", null, undefined, NaN
```

**Truthy (qolgan hammasi):**
```js
"0", [], {}, function(){}, -1, Infinity
```

---

### == vs === farqi

```js
// == (loose equality) — type conversion qiladi
0 == false     // true
"" == false    // true
null == undefined // true
1 == "1"       // true

// === (strict equality) — type conversion qilmaydi
0 === false    // false
1 === "1"      // false
null === undefined // false
```

**Best Practice:** Har doim `===` ishlating!

---

### Nullish Coalescing `??` va Optional Chaining `?.`

```js
// ?? — faqat null yoki undefined bo'lsa default qaytaradi
const name = null ?? "Guest";     // "Guest"
const age = 0 ?? 18;              // 0 ← 0 falsy lekin null/undefined emas!
const score = 0 || 18;            // 18 ← || falsy ni hisobga oladi

// ?. — null/undefined bo'lsa xato chiqarmaydi
const user = null;
console.log(user?.name);          // undefined (xato yo'q)
console.log(user?.address?.city); // undefined
```

---

## 🧠 Intervyu savollari

1. `var`, `let`, `const` farqi nima?
2. `typeof null` nima qaytaradi va nima uchun?
3. `==` va `===` farqi nima? Qachon `==` ishlatish mumkin?
4. `0 ?? "default"` natijasi nima? `0 || "default"` chi?
5. Primitive va Reference type farqi nima? Misol keltiring.
6. Quyidagi natija nima: `[] == false`? Nima uchun?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Natija nima va nima uchun?
console.log(typeof null);
console.log(typeof []);
console.log(typeof function(){});
```

### Masala 2
```js
// Natija nima?
let x = 1;
let y = x;
y = 2;
console.log(x); // ?

let obj = { a: 1 };
let obj2 = obj;
obj2.a = 99;
console.log(obj.a); // ?
```

### Masala 3
```js
// Quyidagilarni true/false aniqlang:
console.log(Boolean(0));
console.log(Boolean("0"));
console.log(Boolean([]));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(-1));
```

### Masala 4 (qiyin)
```js
// Natija nima?
console.log(1 + "2" + 3);
console.log(1 + 2 + "3");
console.log("5" - 3);
console.log(true + true);
console.log(null + 1);
console.log(undefined + 1);
```

### Masala 5
```js
// deepCopy funksiyasini yozing
// reference type muammosini hal qiling
const original = { name: "Ali", scores: [1, 2, 3] };
const copy = deepCopy(original);
copy.name = "Vali";
copy.scores.push(4);
console.log(original.name);   // "Ali" bo'lishi kerak
console.log(original.scores); // [1, 2, 3] bo'lishi kerak
```
