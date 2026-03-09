// 20 - Interview Questions - Live Coding

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= limit) { lastTime = now; return fn.apply(this, args); }
  };
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || !a || typeof b !== "object" || !b) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every(k => deepEqual(a[k], b[k]));
}

const flatten = arr => arr.reduce((acc, item) =>
  acc.concat(Array.isArray(item) ? flatten(item) : item), []);

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    if (!promises.length) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(v => { results[i] = v; if (++count === promises.length) resolve(results); })
        .catch(reject);
    });
  });
}

console.log(deepEqual({a:1,b:{c:2}}, {a:1,b:{c:2}})); // true
console.log(flatten([1,[2,[3,[4]]]])); // [1,2,3,4]
