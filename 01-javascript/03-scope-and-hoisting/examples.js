// ============================================
// 03 — Scope and Hoisting — Examples & Solutions
// ============================================

// ─────────────────────────────────────────
// 1. Scope turlari
// ─────────────────────────────────────────
const global = "global";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    console.log(global);   // ✅
    console.log(outerVar); // ✅
    console.log(innerVar); // ✅
  }
  inner();
  // console.log(innerVar); // ❌
}

// ─────────────────────────────────────────
// 2. Hoisting
// ─────────────────────────────────────────
console.log(typeof greet); // "function"
greet(); // "Hello!"

function greet() {
  console.log("Hello!");
}

// var hoisting
console.log(x); // undefined
var x = 5;

// ─────────────────────────────────────────
// MASALA YECHIMLARI
// ─────────────────────────────────────────

// Masala 1
function test1() {
  console.log(a); // undefined (var hoisted)
  // console.log(b); // ReferenceError (TDZ)
  var a = 1;
  let b = 2;
}

// Masala 2
var y = 1;
function outerFn() {
  var y = 2;
  function innerFn() {
    var y = 3;
    console.log(y); // 3
  }
  innerFn();
  console.log(y); // 2
}
outerFn();
console.log(y); // 1

// Masala 3 — 3 usul
// Muammo: var — function scope, loop tugaganda i=3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

// Yechim 1: let ishlatish (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}

// Yechim 2: Closure (IIFE)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}

// Yechim 3: bind
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 0);
}

// Masala 4
const obj = {
  name: "Ali",
  getName: function() {
    const helper = () => this.name; // arrow — this = obj
    return helper();
  }
};
console.log(obj.getName()); // "Ali" ✅

// Masala 5 — createCounter
function createCounter(name) {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; },
    name() { return name; }
  };
}

const counterA = createCounter("A");
const counterB = createCounter("B");

counterA.increment();
counterA.increment();
counterB.increment();

console.log(counterA.value()); // 2
console.log(counterB.value()); // 1
