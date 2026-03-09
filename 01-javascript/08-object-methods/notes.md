# 08 — Object Methods

## 📖 Nazariya

### Object yaratish usullari
```js
const obj1 = {};                              // literal
const obj2 = new Object();                   // constructor
const obj3 = Object.create(proto);           // prototype bilan
const obj4 = Object.assign({}, source);      // copy
const obj5 = { ...source };                  // spread copy
```

### Muhim static methodlar

#### Object.keys / values / entries
```js
const user = { name: "Ali", age: 25, city: "Tashkent" };
Object.keys(user);    // ["name","age","city"]
Object.values(user);  // ["Ali",25,"Tashkent"]
Object.entries(user); // [["name","Ali"],["age",25],["city","Tashkent"]]

// entries bilan iterate
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

#### Object.assign — shallow copy
```js
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source); // { a:1, b:2, c:3 }

// Shallow — nested object reference ko'chiriladi!
const obj = { a: 1, nested: { x: 10 } };
const copy = Object.assign({}, obj);
copy.nested.x = 99;
console.log(obj.nested.x); // 99 — o'zgardi!
```

#### Object.freeze / seal
```js
const obj = Object.freeze({ a: 1, b: 2 });
obj.a = 99;    // silent fail (strict mode da xato)
obj.c = 3;     // silent fail
console.log(obj); // { a:1, b:2 }

// seal — yangi property qo'shib bo'lmaydi, bor larni o'zgartirsa bo'ladi
const obj2 = Object.seal({ a: 1 });
obj2.a = 99;  // ✅
obj2.b = 2;   // ❌ silent fail
```

#### Object.fromEntries
```js
const entries = [["name","Ali"],["age",25]];
Object.fromEntries(entries); // { name:"Ali", age:25 }

// entries bilan transform
const prices = { apple: 1, banana: 2, cherry: 3 };
const doubled = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 2])
);
// { apple:2, banana:4, cherry:6 }
```

---

### Destructuring
```js
const { name, age, city = "Unknown" } = user;
const { name: userName } = user; // rename
const { address: { street } } = user; // nested

// Function parameter destructuring
function greet({ name, age = 0 }) {
  return `${name}, ${age}`;
}
```

### Spread va Rest
```js
const merged = { ...obj1, ...obj2 };  // merge
const { a, ...rest } = obj;           // rest — qolganlarini ol
```

---

### Property descriptors
```js
const obj = {};
Object.defineProperty(obj, "id", {
  value: 42,
  writable: false,    // o'zgartirib bo'lmaydi
  enumerable: false,  // loop da ko'rinmaydi
  configurable: false // o'chirib/o'zgartirib bo'lmaydi
});
```

---

## 🧠 Intervyu savollari

1. Shallow copy va deep copy farqi nima?
2. `Object.assign` va spread `{...obj}` farqi?
3. `Object.freeze` nima qiladi?
4. `Object.keys` faqat own property larni qaytaradimi?
5. `in` operator va `hasOwnProperty` farqi?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Deep clone funksiyasini yozing (JSON'siz)
function deepClone(obj) { /* ... */ }
```

### Masala 2
```js
// pick() va omit() yozing
function pick(obj, keys) { /* ... */ }
function omit(obj, keys) { /* ... */ }
pick({ a:1, b:2, c:3 }, ["a","c"]); // { a:1, c:3 }
omit({ a:1, b:2, c:3 }, ["b"]);     // { a:1, c:3 }
```

### Masala 3
```js
// Object ni tekis ko'rinishga keltiring
function flattenObj(obj, prefix = "") { /* ... */ }
flattenObj({ a: { b: { c: 1 } }, d: 2 });
// { "a.b.c": 1, "d": 2 }
```
