# 20 - JavaScript Interview Questions

## Top Savollar va Javoblar

### Debounce
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Throttle
```js
function throttle(fn, limit) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= limit) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}
```

### Deep Equal
```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || typeof a !== "object" || !a) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every(k => deepEqual(a[k], b[k]));
}
```

### Promise.all implementation
```js
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
```

## Tricky savollar
```js
console.log(0.1 + 0.2 === 0.3); // false
console.log(typeof NaN);          // "number"
console.log(NaN === NaN);         // false
console.log([] + []);             // ""
console.log([] + {});             // "[object Object]"
```
