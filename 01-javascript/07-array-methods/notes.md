# 07 — Array Methods

## 📖 Nazariya

### Mutating (arrayni o'zgartiradi) vs Non-mutating

| Mutating | Non-mutating |
|----------|-------------|
| push, pop | map |
| shift, unshift | filter |
| splice | reduce |
| sort, reverse | slice |
| fill | find, findIndex |
| | some, every |
| | flat, flatMap |
| | concat |

---

### Eng muhim methodlar

#### map — har elementni o'zgartiradi
```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]
const users = [{name:"Ali"},{name:"Vali"}];
const names = users.map(u => u.name);  // ["Ali","Vali"]
```

#### filter — shartga to'g'ri kelganlarni qaytaradi
```js
const nums = [1, 2, 3, 4, 5];
const even = nums.filter(n => n % 2 === 0); // [2, 4]
```

#### reduce — bitta qiymatga "qaynating"
```js
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Object ga yig'ish
const words = ["apple","banana","apple","cherry","banana","apple"];
const count = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { apple: 3, banana: 2, cherry: 1 }
```

#### find / findIndex
```js
const users = [{id:1,name:"Ali"},{id:2,name:"Vali"}];
const user = users.find(u => u.id === 2);       // {id:2,name:"Vali"}
const idx  = users.findIndex(u => u.id === 2);  // 1
```

#### some / every
```js
const nums = [1, 2, 3, 4, 5];
nums.some(n => n > 4);  // true — kamida bittasi
nums.every(n => n > 0); // true — hammasi
nums.every(n => n > 2); // false
```

#### flat / flatMap
```js
[1,[2,[3,[4]]]].flat();    // [1,2,[3,[4]]] — 1 daraja
[1,[2,[3,[4]]]].flat(Infinity); // [1,2,3,4]

[1,2,3].flatMap(n => [n, n*2]); // [1,2, 2,4, 3,6]
```

#### sort — muhim: default string sifatida sort qiladi!
```js
[10,9,2,1,100].sort();              // [1,10,100,2,9] ❌ string sort
[10,9,2,1,100].sort((a,b) => a-b);  // [1,2,9,10,100] ✅
[10,9,2,1,100].sort((a,b) => b-a);  // [100,10,9,2,1] ✅ descending
```

#### slice vs splice
```js
// slice — non-mutating
const arr = [1,2,3,4,5];
arr.slice(1,3);  // [2,3] — original o'zgarmaydi

// splice — mutating
arr.splice(1,2);         // [2,3] chiqarib oldi
console.log(arr);        // [1,4,5] — original o'zgardi!
arr.splice(1,0,10,11);   // 1-indexdan 2 ta qo'shadi
```

---

### Array yaratish usullari
```js
Array.from({length:5}, (_,i) => i);  // [0,1,2,3,4]
Array.from("hello");                  // ["h","e","l","l","o"]
[...new Set([1,2,2,3,3])];           // [1,2,3] — unique
```

---

## 🧠 Intervyu savollari

1. `map`, `filter`, `reduce` farqi nima?
2. `find` va `filter` farqi nima?
3. `slice` va `splice` farqi nima?
4. Array da duplicate ni qanday o'chirish mumkin?
5. `sort()` nima uchun raqamlar bilan to'g'ri ishlamaydi?
6. `reduce` bilan `map`/`filter` ni implement qiling.

---

## 🎯 Amaliy masalalar

### Masala 1
```js
const students = [
  { name: "Ali", grade: 85 },
  { name: "Vali", grade: 92 },
  { name: "Soli", grade: 78 },
  { name: "Hasan", grade: 95 },
];
// 1. 80 dan yuqori o'quvchilar nomlarini oling
// 2. O'rtacha ballni hisoblang
// 3. Ballga qarab kamayish tartibida saralang
```

### Masala 2
```js
// map va filter ni reduce orqali implement qiling
Array.prototype.myMap = function(fn) { /* reduce ishlating */ };
Array.prototype.myFilter = function(fn) { /* reduce ishlating */ };
```

### Masala 3
```js
// Nested arrayni tekislang (flat'siz)
function flatten(arr) {
  // ...
}
flatten([1,[2,[3,[4,[5]]]]]); // [1,2,3,4,5]
```

### Masala 4
```js
// Groupby funksiyasi yozing
function groupBy(arr, key) { /* ... */ }
const people = [
  { name: "Ali", city: "Tashkent" },
  { name: "Vali", city: "Samarkand" },
  { name: "Soli", city: "Tashkent" },
];
groupBy(people, "city");
// { Tashkent: [...], Samarkand: [...] }
```
