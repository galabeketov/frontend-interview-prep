# 09 — Destructuring and Spread/Rest

## 📖 Nazariya

### Array Destructuring
```js
const [a, b, c] = [1, 2, 3];
const [first, , third] = [1, 2, 3];  // skip
const [x, ...rest] = [1, 2, 3, 4];  // rest: [2,3,4]
const [a = 10] = [];                  // default: 10

// Swap
let p = 1, q = 2;
[p, q] = [q, p]; // p=2, q=1
```

### Object Destructuring
```js
const { name, age } = user;
const { name: userName } = user;       // rename
const { city = "Unknown" } = user;     // default
const { address: { street } } = user; // nested
const { a, ...rest } = obj;           // rest

// Function params
function show({ name, age = 0, role = "user" } = {}) {
  return `${name}, ${age}, ${role}`;
}
```

### Spread Operator
```js
// Array
const arr = [...arr1, ...arr2];         // merge
const copy = [...original];             // shallow copy
Math.max(...[1, 2, 3]);                 // spread to args

// Object
const merged = { ...obj1, ...obj2 };   // merge (keyingi overrides)
const copy = { ...original };          // shallow copy
const updated = { ...user, age: 26 }; // immutable update
```

### Rest Parameter
```js
function sum(first, ...rest) {
  return rest.reduce((a, b) => a + b, first);
}
sum(1, 2, 3, 4); // 10
```

### Practical patterns
```js
// API response destructuring
const { data: { users, total }, status } = await fetchUsers();

// useState
const [count, setCount] = useState(0);

// Immutable state update (Redux/React)
const newState = {
  ...state,
  users: [...state.users, newUser]
};
```

---

## 🎯 Masalalar

### Masala 1
```js
// API response dan kerakli ma'lumotlarni oling
const response = {
  status: 200,
  data: {
    user: { id: 1, name: "Ali", email: "ali@test.com" },
    posts: [{ id: 1, title: "Post 1" }],
    meta: { total: 10, page: 1 }
  }
};
// user.name, posts birinchi title, va total ni destructuring bilan oling
```

### Masala 2
```js
// Funksiyani yozing — array ni bir necha qismga bo'lsin
function chunk(arr, size) { /* ... */ }
chunk([1,2,3,4,5,6,7], 3); // [[1,2,3],[4,5,6],[7]]
```
