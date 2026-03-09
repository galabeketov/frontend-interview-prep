# 03 — Scope and Hoisting

## 📖 Nazariya

### Scope nima?

Scope — o'zgaruvchi **qayerda ko'rinishi** va **qayerdan ulanishi** mumkinligi.

### Scope turlari

#### 1. Global Scope
```js
const globalVar = "men hammaga ko'rinaman";

function fn() {
  console.log(globalVar); // ✅
}
```

#### 2. Function Scope
```js
function fn() {
  const localVar = "faqat fn ichida";
  console.log(localVar); // ✅
}
// console.log(localVar); // ❌ ReferenceError
```

#### 3. Block Scope (`let`, `const`)
```js
{
  let blockVar = "faqat blok ichida";
  const blockConst = "men ham";
  var notBlock = "men emas!"; // var block scope emas!
}
// console.log(blockVar); // ❌ ReferenceError
// console.log(blockConst); // ❌ ReferenceError
console.log(notBlock); // ✅ var — function scope
```

#### 4. Module Scope
```js
// module.js
const moduleVar = "faqat bu modulda";
export const publicVar = "tashqariga chiqarildi";
```

---

### Scope Chain

JavaScript o'zgaruvchini **yuqoriga qarab** qidiradi:

```js
const global = "global";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";

    console.log(innerVar); // ✅ o'z scope'i
    console.log(outerVar); // ✅ outer scope'dan
    console.log(global);   // ✅ global scope'dan
  }

  // console.log(innerVar); // ❌ — pastga qaramaydi
}
```

---

### Lexical Scope

JavaScript **lexical (static) scope** ishlatadi — scope **kod yozilgan joyga** qarab belgilanadi, chaqirilgan joyga emas.

```js
const x = "global";

function outer() {
  const x = "outer";
  return function inner() {
    console.log(x); // "outer" — yozilgan joyga qarab
  };
}

const fn = outer();
fn(); // "outer" — chaqirilgan yerda x = "global" bo'lsa ham
```

---

### Hoisting

JavaScript kodni **ikki bosqichda** ishlaydi:
1. **Compilation** — barcha e'lonlarni yuqoriga ko'taradi (hoist)
2. **Execution** — kodni bajaradi

#### var hoisting
```js
console.log(a); // undefined (hoisted, lekin qiymati yo'q)
var a = 5;
console.log(a); // 5

// Aslida shunday ishlaydi:
var a;           // yuqoriga ko'tarildi
console.log(a); // undefined
a = 5;
console.log(a); // 5
```

#### let / const — TDZ (Temporal Dead Zone)
```js
// console.log(b); // ❌ ReferenceError — TDZ da
let b = 5;
console.log(b); // ✅ 5

// let ham hoisted — lekin TDZ tufayli ishlatib bo'lmaydi
```

#### Function Declaration — to'liq hoisted
```js
sayHi(); // ✅ "Hi!" — to'liq hoisted

function sayHi() {
  console.log("Hi!");
}
```

#### Function Expression — hoisted emas
```js
// sayBye(); // ❌ ReferenceError (let bilan)
// sayBye(); // ❌ TypeError (var bilan — var hoisted, lekin undefined)

const sayBye = function() {
  console.log("Bye!");
};
```

#### Class — TDZ
```js
// const obj = new MyClass(); // ❌ ReferenceError
class MyClass {}
```

---

### Hoisting tartibı

1. `var` — `undefined` bilan hoisted
2. Function declarations — to'liq hoisted
3. `let`, `const`, `class` — hoisted lekin TDZ

```js
console.log(typeof fn1); // "function" — to'liq hoisted
console.log(typeof fn2); // "undefined" — var hoisted, qiymatsiz

function fn1() {}
var fn2 = function() {};
```

---

## 🧠 Intervyu savollari

1. Scope nima? Qanday turlari bor?
2. Scope Chain nima?
3. Lexical scope nima? Dynamic scope bilan farqi?
4. Hoisting nima va qanday ishlaydi?
5. `var`, `let`, `const` hoisting da qanday farqlanadi?
6. TDZ (Temporal Dead Zone) nima?
7. Quyidagi natija nima?
```js
var x = 1;
function test() {
  console.log(x);
  var x = 2;
  console.log(x);
}
test();
```

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Natija nima va nima uchun?
function test() {
  console.log(a); // ?
  console.log(b); // ?
  var a = 1;
  let b = 2;
}
test();
```

### Masala 2
```js
// Natija nima?
var x = 1;
function outer() {
  var x = 2;
  function inner() {
    var x = 3;
    console.log(x); // ?
  }
  inner();
  console.log(x); // ?
}
outer();
console.log(x); // ?
```

### Masala 3 (klassik intervyu)
```js
// Natija nima? Nima uchun?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Uni to'g'irlang — 0, 1, 2 chiqsin (3 usul bilan)
```

### Masala 4
```js
// Bu kod ishlaydi yoki yo'q? Nima uchun?
const obj = {
  name: "Ali",
  getName: function() {
    const helper = () => {
      return this.name;
    };
    return helper();
  }
};
console.log(obj.getName()); // ?
```

### Masala 5
```js
// createCounter funksiyasini yozing
// Har bir counter o'z scope'ida ishlashi kerak
function createCounter(name) {
  // ...
}

const counterA = createCounter("A");
const counterB = createCounter("B");

counterA.increment();
counterA.increment();
counterB.increment();

console.log(counterA.value()); // 2
console.log(counterB.value()); // 1
```
