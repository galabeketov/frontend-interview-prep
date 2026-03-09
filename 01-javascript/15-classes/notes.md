# 15 — Classes

## 📖 Nazariya

`class` — Constructor function va prototype'ning "syntactic sugar"i.

### Asoslar
```js
class Animal {
  // Class field (ES2022)
  #name; // private field

  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  // Method
  speak() {
    return `${this.#name}: ${this.sound}!`;
  }

  // Getter/Setter
  get name() { return this.#name; }
  set name(val) {
    if (!val) throw new Error("Name required");
    this.#name = val;
  }

  // Static method
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

// Inheritance
class Dog extends Animal {
  #tricks = [];

  constructor(name) {
    super(name, "Vov"); // parent constructor
  }

  learn(trick) {
    this.#tricks.push(trick);
  }

  // Override
  speak() {
    return `${super.speak()} (juda baland!)`;
  }
}
```

### Private fields (#)
```js
class Counter {
  #count = 0;           // private field
  static #instances = 0; // private static

  constructor() {
    Counter.#instances++;
  }

  increment() { this.#count++; }
  get value() { return this.#count; }
  static getInstances() { return Counter.#instances; }
}
```

### Mixins pattern
```js
const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
  static deserialize(json) { return Object.assign(new this(), JSON.parse(json)); }
};

const Validatable = (Base) => class extends Base {
  validate() { return Object.keys(this).every(k => this[k] !== null); }
};

class User extends Serializable(Validatable(class {})) {
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
  }
}
```

---

## 🎯 Masalalar

### Masala 1
```js
// EventEmitter class yozing
class EventEmitter {
  // on(event, fn)
  // off(event, fn)
  // emit(event, ...args)
  // once(event, fn) — faqat bir marta
}
```

### Masala 2
```js
// Observable class yozing
class Observable {
  constructor(fn) { this._fn = fn; }
  subscribe(observer) { /* ... */ }
  // map(fn) — transform
  // filter(fn) — filter
}
```
