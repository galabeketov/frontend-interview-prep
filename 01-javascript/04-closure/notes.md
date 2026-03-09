# 04 — Closure

## 📖 Nazariya

### Closure nima?

Closure — funksiya o'zi **yaratilgan scope'dagi o'zgaruvchilarga** kirish imkoniga ega bo'lishi, hatto o'sha scope tugagan bo'lsa ham.

**Formula:** `Closure = Function + Lexical Scope xotirasi`

```js
function outer() {
  const name = "Beketov"; // outer tugasa ham yo'qolmaydi

  function inner() {
    console.log(name); // closure — name ga "bog'landi"
  }

  return inner;
}

const fn = outer(); // outer tugadi
fn(); // "Beketov" — name hali tirik!
```

---

### Xotirada qanday ishlaydi?

```
outer() chaqirildi
  └── name = "Beketov"  ← heap xotirada
  └── inner yaratildi   ← inner, name ga reference saqladi

outer() tugadi
  └── name yo'qolishi kerak edi...
  └── lekin inner hali name ga ishora qilmoqda
  └── Garbage Collector uni o'chirmaydi ✓

fn() chaqirildi
  └── name hali tirik → "Beketov"
```

---

### Closure ning 3 asosiy ishlatilishi

#### 1. Private data (Encapsulation)
```js
function createBankAccount(initial) {
  let balance = initial; // private!

  return {
    deposit(n)  { balance += n; },
    withdraw(n) { balance -= n; },
    getBalance(){ return balance; }
  };
}

const acc = createBankAccount(1000);
acc.deposit(500);
console.log(acc.getBalance()); // 1500
console.log(acc.balance);      // undefined — ko'rinmaydi!
```

#### 2. Factory function (parametrli funksiya yaratish)
```js
function makeMultiplier(factor) {
  return (n) => n * factor; // factor — closure
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

double(5); // 10
triple(5); // 15
// Har biri o'z "factor" ini eslab qoldi
```

#### 3. State saqlash (stateful function)
```js
function makeCounter(start = 0) {
  let count = start;
  return {
    increment() { count++; },
    reset()     { count = start; },
    getCount()  { return count; }
  };
}
```

---

### Closure va Loop — klassik muammo

```js
// ❌ Xato — hammasi 3 chiqadi
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 3, 3, 3
}

// ✅ To'g'ri — let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 0, 1, 2
}

// ✅ To'g'ri — IIFE closure
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}
```

---

### React'da Closure

```js
function Counter() {
  const [count, setCount] = useState(0);

  // handleClick — closure
  // u count ni eslab qoladi
  const handleClick = () => {
    console.log(count); // closure orqali kiradi
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

#### Stale Closure muammosi (React)
```js
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // count bu yerda "stale" (eski qiymat)!
      setCount(count + 1); // ❌ har doim 0+1=1
    }, 1000);
    return () => clearInterval(id);
  }, []); // [] — count yangilanmaydi

  // ✅ Yechim — functional update
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // ✅ har doim to'g'ri
    }, 1000);
    return () => clearInterval(id);
  }, []);
}
```

---

## 🧠 Intervyu savollari

1. Closure nima? O'z so'zingiz bilan tushuntiring.
2. Closure qanday xotirada ishlaydi?
3. Closure ning 3 ta ishlatilishini ayting.
4. Loop + closure muammosi nima va qanday hal qilinadi?
5. Stale closure nima? React'da qanday yuzaga keladi?
6. Closure va Scope farqi nima?

---

## 🎯 Amaliy masalalar

### Masala 1
```js
// Natija nima?
function makeAdder(x) {
  return y => x + y;
}
const add5 = makeAdder(5);
const add10 = makeAdder(10);
console.log(add5(3));    // ?
console.log(add10(3));   // ?
console.log(add5(add10(2))); // ?
```

### Masala 2
```js
// once() — funksiyani faqat bir marta ishlatsin
function once(fn) {
  // ...
}
const greet = once(() => console.log("Hello!"));
greet(); // "Hello!"
greet(); // — (hech narsa)
```

### Masala 3
```js
// memoize() — natijani cache qilsin
function memoize(fn) {
  // ...
}
const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
```

### Masala 4 (qiyin)
```js
// createStore() — Redux ga o'xshash oddiy store
function createStore(initialState) {
  // state private bo'lishi kerak
  // getState() — hozirgi state
  // setState(newState) — state ni o'zgartirsin
  // subscribe(fn) — state o'zgarganda fn chaqirsin
  // unsubscribe(fn) — listenerni o'chirsin
}

const store = createStore({ count: 0 });
const unsub = store.subscribe(state => console.log("Changed:", state));

store.setState({ count: 1 }); // "Changed: { count: 1 }"
store.setState({ count: 2 }); // "Changed: { count: 2 }"
unsub();
store.setState({ count: 3 }); // — (hech narsa)
```

### Masala 5
```js
// Quyidagi bug ni toping va tuzating
const fns = [];
for (var i = 0; i < 5; i++) {
  fns.push(function() { return i; });
}
console.log(fns[0]()); // 5 chiqyapti, 0 bo'lishi kerak
console.log(fns[3]()); // 5 chiqyapti, 3 bo'lishi kerak
```
