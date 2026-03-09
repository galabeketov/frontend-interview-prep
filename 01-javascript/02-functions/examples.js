// ============================================
// 02 — Functions — Examples & Solutions
// ============================================

// ─────────────────────────────────────────
// 1. Function turlari
// ─────────────────────────────────────────

// Declaration
function square(x) { return x * x; }

// Expression
const cube = function(x) { return x * x * x; };

// Arrow
const double = x => x * 2;

// IIFE
const result = (function() {
  const x = 10;
  return x * x;
})();
console.log(result); // 100

// Generator
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

// ─────────────────────────────────────────
// 2. Default, Rest, Spread
// ─────────────────────────────────────────
function greet(name = "Guest", greeting = "Salom") {
  return `${greeting}, ${name}!`;
}
console.log(greet());           // "Salom, Guest!"
console.log(greet("Ali"));      // "Salom, Ali!"
console.log(greet("Ali", "Hey")); // "Hey, Ali!"

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// ─────────────────────────────────────────
// MASALA YECHIMLARI
// ─────────────────────────────────────────

// Masala 1 — Arrow function
const multiply = (a, b) => a * b;

// Masala 2 — once()
function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => console.log("initialized!"));
initialize(); // "initialized!"
initialize(); // — (hech narsa)
initialize(); // — (hech narsa)

// Masala 3 — memoize()
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Hisoblayapman...");
  return n * n;
});

console.log(expensiveCalc(5)); // Hisoblayapman... 25
console.log(expensiveCalc(5)); // 25 (cache)
console.log(expensiveCalc(6)); // Hisoblayapman... 36

// Masala 4 — curry()
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));  // 6
console.log(add(1, 2)(3));  // 6
console.log(add(1, 2, 3));  // 6

// Masala 5 — pipe()
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const transform = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
);
console.log(transform(5)); // 9
