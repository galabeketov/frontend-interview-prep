# 18 — Functional Programming

## 📖 Nazariya

### Asosiy g'oyalar

1. **Pure functions** — same input = same output
2. **Immutability** — ma'lumotlarni o'zgartirma
3. **Higher-order functions** — funksiya qabul qiladi/qaytaradi
4. **Function composition** — kichik funksiyalardan katta hosil qil
5. **Avoid side effects** — tashqi dunyoni o'zgartirma

---

### Immutability
```js
// ❌ Mutating
const addItem = (arr, item) => { arr.push(item); return arr; };

// ✅ Immutable
const addItem = (arr, item) => [...arr, item];
const updateUser = (user, updates) => ({ ...user, ...updates });
const removeItem = (arr, id) => arr.filter(item => item.id !== id);
```

### Composition
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processUser = pipe(
  user => ({ ...user, name: user.name.trim() }),
  user => ({ ...user, email: user.email.toLowerCase() }),
  user => ({ ...user, age: Number(user.age) })
);
```

### Currying
```js
const curry = fn => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const add = curry((a, b, c) => a + b + c);
const add5 = add(5);
const add5and3 = add5(3);
add5and3(2); // 10
```

### Functor (mappable)
```js
// Maybe — null safety
class Maybe {
  constructor(value) { this._value = value; }
  static of(value) { return new Maybe(value); }
  isNothing() { return this._value == null; }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value));
  }
  getOrElse(defaultVal) {
    return this.isNothing() ? defaultVal : this._value;
  }
}

Maybe.of(user)
  .map(u => u.address)
  .map(a => a.city)
  .getOrElse("Unknown"); // null/undefined safe
```

---

## 🎯 Masalalar

### Masala 1
```js
// Immutable state manager yozing
// Redux-like, lekin sodda
function createReducer(initialState, handlers) { /* ... */ }
```

### Masala 2
```js
// transducer — compose qilingan map/filter (performance)
const transduce = (xf, reducer, init, coll) => { /* ... */ };
```
