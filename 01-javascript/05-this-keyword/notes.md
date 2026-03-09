# 05 — this Keyword

## 📖 Nazariya

`this` — **"kim chaqirdi?"** degan savol. Qayerda yozilganiga emas, **qanday chaqirilganiga** qarab o'zgaradi.

---

### 4 ta asosiy qoida

#### 1. Global context
```js
console.log(this);       // браузер: window | Node: {}
function fn() {
  console.log(this);     // strict mode: undefined | oddiy: window
}
```

#### 2. Object method
```js
const user = {
  name: "Ali",
  greet() {
    console.log(this.name); // this = user
  }
};
user.greet(); // "Ali"
```

#### 3. Method ni ajratib olsang — this yo'qoladi
```js
const fn = user.greet;
fn(); // undefined — "kim chaqirdi?" hech kim
```

#### 4. Arrow function — o'zining this'i yo'q
```js
const user = {
  name: "Ali",
  greet: () => console.log(this.name) // this = global/undefined
};
user.greet(); // undefined ❌
```

---

### call / apply / bind

```js
function greet(city, lang) {
  console.log(`${this.name} — ${city} — ${lang}`);
}
const user = { name: "Ali" };

greet.call(user, "Tashkent", "UZ");        // argumentlar vergul bilan
greet.apply(user, ["Tashkent", "UZ"]);     // argumentlar array bilan
const bound = greet.bind(user, "Tashkent");
bound("UZ");                                // yangi funksiya
```

---

### new keyword
```js
function Person(name) {
  this.name = name; // this = yangi object
}
const ali = new Person("Ali");
console.log(ali.name); // "Ali"
```

---

### Qoida prioriteti (yuqoridan pastga)
1. `new` — eng yuqori
2. `call`, `apply`, `bind`
3. Object method
4. Global / undefined (strict mode)

---

### React'da this

```js
// Class component — bind kerak
class Counter extends React.Component {
  handleClick() {
    this.setState(...); // this yo'qoladi!
  }
  // Yechim 1: constructor da bind
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  // Yechim 2: arrow function (class field)
  handleClick = () => {
    this.setState(...); // ✅
  }
}
```

---

## 🧠 Intervyu savollari

1. `this` qachon `undefined` bo'ladi?
2. Arrow function'da `this` qanday ishlaydi?
3. `call`, `apply`, `bind` farqi nima?
4. `new` keyword nima qiladi?
5. Strict mode'da `this` qanday farqlanadi?

---

## 🎯 Amaliy masalalar

### Masala 1 — Natija nima?
```js
const obj = {
  name: "Ali",
  regular() { console.log(this.name); },
  arrow: () => { console.log(this.name); },
  delayed() {
    setTimeout(function() { console.log(this.name); }, 100);
  },
  delayedArrow() {
    setTimeout(() => { console.log(this.name); }, 100);
  }
};
obj.regular();       // ?
obj.arrow();         // ?
obj.delayed();       // ?
obj.delayedArrow();  // ?
```

### Masala 2
```js
// bind() ni o'zingiz yozing
Function.prototype.myBind = function(context, ...args) {
  // ...
};
```

### Masala 3
```js
// Quyidagi kodni tuzating
const timer = {
  count: 0,
  start() {
    setInterval(function() {
      this.count++;           // bug!
      console.log(this.count);
    }, 1000);
  }
};
timer.start();
```
