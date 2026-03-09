# 16 — Iterators and Generators

## 📖 Nazariya

### Iterator protocol
```js
// Iterator — {next()} metodi bo'lgan object
const iterator = {
  current: 0,
  last: 5,
  next() {
    return this.current <= this.last
      ? { value: this.current++, done: false }
      : { value: undefined, done: true };
  }
};

iterator.next(); // {value:0, done:false}
iterator.next(); // {value:1, done:false}
```

### Iterable protocol
```js
// [Symbol.iterator]() metodi bo'lgan object — for...of bilan ishlaydi
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1,2,3,4,5
[...range]; // [1,2,3,4,5]
```

### Generator function
```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
gen.next(); // {value:1, done:false}
gen.next(); // {value:2, done:false}
gen.next(); // {value:3, done:false}
gen.next(); // {value:undefined, done:true}

// for...of bilan
for (const val of generator()) console.log(val);

// Infinite generator
function* infiniteId() {
  let id = 1;
  while (true) yield id++;
}
const getId = infiniteId();
getId.next().value; // 1
getId.next().value; // 2
```

### yield* — delegate
```js
function* inner() { yield "a"; yield "b"; }
function* outer() {
  yield 1;
  yield* inner(); // inner ni o'z ichiga oladi
  yield 2;
}
[...outer()]; // [1,"a","b",2]
```

---

## 🎯 Masalalar

### Masala 1
```js
// range generator yozing
function* range(start, end, step = 1) { /* ... */ }
[...range(0, 10, 2)]; // [0,2,4,6,8,10]
```

### Masala 2
```js
// Linked List — iterable qiling
class LinkedList {
  // [Symbol.iterator]() — for...of bilan ishlashi kerak
}
```
