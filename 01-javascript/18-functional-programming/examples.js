// 18 — Functional Programming — Examples & Solutions

// Pure function
const add = (a, b) => a + b;
const double = n => n * 2;
const isEven = n => n % 2 === 0;

// Composition
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const process = pipe(
  arr => arr.filter(isEven),
  arr => arr.map(double),
  arr => arr.reduce(add, 0)
);
console.log(process([1,2,3,4,5,6])); // (2+4+6)*2 = 24

// Currying
const curry = fn => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const multiply = curry((a, b) => a * b);
const triple = multiply(3);
console.log([1,2,3,4].map(triple)); // [3,6,9,12]

// Masala 1 — createReducer
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const counterReducer = createReducer({ count: 0 }, {
  INCREMENT: (state) => ({ ...state, count: state.count + 1 }),
  DECREMENT: (state) => ({ ...state, count: state.count - 1 }),
  RESET: () => ({ count: 0 }),
});

let state = counterReducer(undefined, {});
state = counterReducer(state, { type: "INCREMENT" });
state = counterReducer(state, { type: "INCREMENT" });
console.log(state); // { count: 2 }

// Maybe functor
class Maybe {
  constructor(v) { this._v = v; }
  static of(v) { return new Maybe(v); }
  isNothing() { return this._v == null; }
  map(fn) { return this.isNothing() ? this : Maybe.of(fn(this._v)); }
  getOrElse(d) { return this.isNothing() ? d : this._v; }
}

const user = { address: { city: "Tashkent" } };
const city = Maybe.of(user).map(u => u.address).map(a => a.city).getOrElse("Unknown");
console.log(city); // "Tashkent"
