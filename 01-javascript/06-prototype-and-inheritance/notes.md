# 06 — Prototype and Inheritance

## 📖 Nazariya

### Prototype nima?

JavaScript — **prototype-based** tildir. Har bir object boshqa objectga bog'langan bo'lishi mumkin — bu bog'lanish **prototype chain**.

```js
const arr = [1, 2, 3];
// arr.push() qayerdan keladi?
// arr → Array.prototype → Object.prototype → null
```

---

### __proto__ va prototype

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Salom, men ${this.name}`;
};

const ali = new Person("Ali");
console.log(ali.greet()); // "Salom, men Ali"

// Prototype chain:
// ali.__proto__ === Person.prototype ✅
// Person.prototype.__proto__ === Object.prototype ✅
// Object.prototype.__proto__ === null ✅
```

---

### Prototype Chain — qidirish tartibi

```js
const animal = { breathes: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks);    // true — o'zida bor
console.log(dog.breathes); // true — prototype'dan topdi
console.log(dog.flies);    // undefined — hech yerda yo'q
```

---

### class — prototype ning "syntactic sugar"

```js
// ES6 class — aslida prototype'dan foydalanadi
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} ovoz chiqaradi`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name}: Vov!`;
  }
}

const dog = new Dog("Rex");
dog.speak(); // "Rex ovoz chiqaradi" — Animal'dan meros
dog.bark();  // "Rex: Vov!"

// Aslida:
// dog → Dog.prototype → Animal.prototype → Object.prototype → null
```

---

### hasOwnProperty

```js
const obj = { a: 1 };
const child = Object.create(obj);
child.b = 2;

console.log("b" in child);                  // true
console.log("a" in child);                  // true (inherited)
console.log(child.hasOwnProperty("b"));     // true
console.log(child.hasOwnProperty("a"));     // false — inherited!
```

---

### Object.create vs new

```js
// Object.create — prototype ni to'g'ridan belgilash
const proto = {
  greet() { return `Salom, men ${this.name}`; }
};
const ali = Object.create(proto);
ali.name = "Ali";
ali.greet(); // "Salom, men Ali"

// new — constructor function orqali
function User(name) { this.name = name; }
const user = new User("Ali");
```

---

## 🧠 Intervyu savollari

1. Prototype nima?
2. Prototype chain qanday ishlaydi?
3. `__proto__` va `prototype` farqi nima?
4. `hasOwnProperty` nima uchun kerak?
5. `class` va prototype'ning farqi bormi?
6. `Object.create(null)` nima beradi?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Natija nima?
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};

const cat = new Animal("Cat");
console.log(cat.speak());
console.log(cat.hasOwnProperty("name"));
console.log(cat.hasOwnProperty("speak"));
```

### Masala 2
```js
// Inheritance ni prototype bilan implement qiling
function Vehicle(make, speed) { /* ... */ }
function Car(make, speed, doors) { /* ... */ }
// Car Vehicle'dan meros olsin
// car.describe() → "Toyota, 120km/h, 4 doors"
```

### Masala 3
```js
// Object.create bilan meros
const eventEmitter = {
  on(event, fn) { /* ... */ },
  emit(event, data) { /* ... */ },
  off(event, fn) { /* ... */ }
};
// Bu objectdan foydalanib EventEmitter yarating
```
