# 02 — Functions

## 📖 Nazariya

### Function turlari

#### 1. Function Declaration
```js
function greet(name) {
  return `Salom, ${name}!`;
}
```
- **Hoisted** — e'lon qilinmasdan oldin chaqirsa bo'ladi
- `this` — chaqirilgan kontekstga bog'liq

#### 2. Function Expression
```js
const greet = function(name) {
  return `Salom, ${name}!`;
};
```
- **Hoisted emas** — e'lon qilinmasdan oldin chaqirib bo'lmaydi
- Named yoki anonymous bo'lishi mumkin

#### 3. Arrow Function
```js
const greet = (name) => `Salom, ${name}!`;
```
- **O'zining `this`i yo'q** — tashqi scope'dan oladi
- `arguments` object yo'q
- Constructor sifatida ishlatib bo'lmaydi

#### 4. IIFE (Immediately Invoked Function Expression)
```js
(function() {
  const secret = "men tashqaridan ko'rinmayman";
  console.log(secret);
})();
```
- Darhol chaqiriladi
- Global scope'ni ifloslantirmaydi
- Module pattern uchun ishlatilgan (hozir ES modules bor)

#### 5. Constructor Function
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const ali = new Person("Ali", 25);
```
- `new` bilan chaqiriladi
- `this` yangi object ga ishora qiladi
- Hozir `class` bilan almashtirilgan (lekin bilish kerak)

#### 6. Generator Function
```js
function* count() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = count();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```
- `function*` bilan yoziladi
- `yield` — qiymat qaytaradi va pauza qiladi
- Lazy evaluation uchun ishlatiladi

#### 7. Async Function
```js
async function fetchData() {
  const data = await fetch("https://api.example.com/data");
  return data.json();
}
```
- Har doim `Promise` qaytaradi
- `await` — Promise ni kutadi

---

### Function Declaration vs Expression — farq

```js
// Function Declaration — HOISTED
sayHello(); // ✅ ishlaydi!
function sayHello() {
  console.log("Hello");
}

// Function Expression — HOISTED EMAS
// sayBye(); // ❌ ReferenceError
const sayBye = function() {
  console.log("Bye");
};
```

---

### Parameters va Arguments

```js
// Default parameter
function greet(name = "Guest") {
  return `Salom, ${name}!`;
}
greet();        // "Salom, Guest!"
greet("Ali");   // "Salom, Ali!"

// Rest parameter
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Arguments object (arrow functionda yo'q!)
function showArgs() {
  console.log(arguments); // [1, 2, 3]
}
showArgs(1, 2, 3);
```

---

### Arrow Function — muhim farqlar

```js
// 1. Qisqa sintaksis
const double = x => x * 2;
const add = (a, b) => a + b;
const getObj = () => ({ name: "Ali" }); // object qaytarish

// 2. this — tashqi scope'dan oladi
const timer = {
  seconds: 0,
  start() {
    // Regular function — this yo'qoladi
    setInterval(function() {
      // this.seconds++; // ❌ this = window/undefined
    }, 1000);

    // Arrow function — this saqlanadi
    setInterval(() => {
      this.seconds++; // ✅ this = timer object
    }, 1000);
  }
};

// 3. Constructor bo'lmaydi
const Person = (name) => { this.name = name; };
// new Person("Ali"); // ❌ TypeError

// 4. arguments yo'q
const fn = () => {
  // console.log(arguments); // ❌ ReferenceError
};
```

---

### Pure Function

```js
// Pure function — same input = same output, side effect yo'q
function add(a, b) {
  return a + b; // ✅ pure
}

// Impure — tashqi o'zgaruvchiga bog'liq
let total = 0;
function addToTotal(n) {
  total += n; // ❌ impure — side effect bor
  return total;
}
```

---

### Higher Order Function

```js
// Function qaytaradigan yoki function qabul qiladigan function
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Array methodlari — HOF lar
[1, 2, 3].map(x => x * 2);      // [2, 4, 6]
[1, 2, 3].filter(x => x > 1);   // [2, 3]
[1, 2, 3].reduce((a, b) => a + b, 0); // 6
```

---

### Function Composition

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

const transform = pipe(double, addOne, square);
console.log(transform(3)); // double(3)=6 → addOne(6)=7 → square(7)=49
```

---

## 🧠 Intervyu savollari

1. Function declaration va expression farqi nima?
2. Arrow function va regular function farqlari nimalar? (kamida 3 ta)
3. IIFE nima va qachon ishlatiladi?
4. Pure function nima? Nima uchun muhim?
5. Higher Order Function nima? Misol keltiring.
6. `arguments` object nima? Arrow functionda bor mi?
7. Rest parameter `...args` va `arguments` farqi nima?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Quyidagi kodni arrow function ga aylantiring
function multiply(a, b) {
  return a * b;
}
```

### Masala 2
```js
// once() funksiyasini yozing — funksiyani faqat bir marta chaqirsin
function once(fn) {
  // ...
}

const initialize = once(() => console.log("initialized!"));
initialize(); // "initialized!"
initialize(); // hech narsa chiqmasin
initialize(); // hech narsa chiqmasin
```

### Masala 3
```js
// memoize() funksiyasini yozing — natijani cache qilsin
function memoize(fn) {
  // ...
}

const expensiveCalc = memoize((n) => {
  console.log("Hisoblayapman...");
  return n * n;
});

expensiveCalc(5); // "Hisoblayapman..." → 25
expensiveCalc(5); // faqat 25 (cache dan)
expensiveCalc(6); // "Hisoblayapman..." → 36
```

### Masala 4
```js
// curry() funksiyasini yozing
function curry(fn) {
  // ...
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);   // 6
add(1, 2)(3);   // 6
add(1)(2, 3);   // 6
add(1, 2, 3);   // 6
```

### Masala 5
```js
// pipe() funksiyasini yozing
// Funksiyalar ketma-ketligini chap dan o'ng ga bajarsin
const result = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
)(5);
// (5+1)*2-3 = 9
```
