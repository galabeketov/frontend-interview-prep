// ============================================
// 04 — Closure — Examples & Solutions
// ============================================

// ─────────────────────────────────────────
// 1. Basic closure
// ─────────────────────────────────────────
function outer() {
  const name = "Beketov";
  return () => console.log(name);
}
const fn = outer();
fn(); // "Beketov"

// ─────────────────────────────────────────
// 2. Private data
// ─────────────────────────────────────────
function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(n)   { balance += n; console.log(`+${n}. Balans: ${balance}`); },
    withdraw(n)  { balance -= n; console.log(`-${n}. Balans: ${balance}`); },
    getBalance() { return balance; }
  };
}
const acc = createBankAccount(1000);
acc.deposit(500);   // +500. Balans: 1500
acc.withdraw(200);  // -200. Balans: 1300

// ─────────────────────────────────────────
// MASALA YECHIMLARI
// ─────────────────────────────────────────

// Masala 1
const add5 = x => x + 5;
const add10 = x => x + 10;
console.log(add5(3));        // 8
console.log(add10(3));       // 13
console.log(add5(add10(2))); // add10(2)=12, add5(12)=17

// Masala 2 — once()
function once(fn) {
  let called = false;
  return function(...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

// Masala 3 — memoize()
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn(...args));
  };
}

const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
console.log(factorial(5)); // 120
console.log(factorial(5)); // 120 (cache)

// Masala 4 — createStore()
function createStore(initialState) {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState() { return { ...state }; },
    setState(newState) {
      state = { ...state, ...newState };
      listeners.forEach(fn => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn); // unsubscribe
    }
  };
}

const store = createStore({ count: 0 });
const unsub = store.subscribe(s => console.log("Changed:", s));
store.setState({ count: 1 }); // Changed: { count: 1 }
store.setState({ count: 2 }); // Changed: { count: 2 }
unsub();
store.setState({ count: 3 }); // — (hech narsa)

// Masala 5 — Loop bug fix
// Bug: var — function scope, loop tugaganda i=5
const fns = [];
for (var i = 0; i < 5; i++) {
  fns.push(function() { return i; });
}
console.log(fns[0]()); // 5 (bug)

// Fix 1: let
const fns2 = [];
for (let i = 0; i < 5; i++) {
  fns2.push(() => i);
}
console.log(fns2[0]()); // 0 ✅
console.log(fns2[3]()); // 3 ✅

// Fix 2: closure
const fns3 = [];
for (var i = 0; i < 5; i++) {
  fns3.push((j => () => j)(i));
}
console.log(fns3[0]()); // 0 ✅
console.log(fns3[3]()); // 3 ✅
