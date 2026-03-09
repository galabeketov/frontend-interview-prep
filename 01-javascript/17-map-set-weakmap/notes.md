# 17 — Map, Set, WeakMap, WeakSet

## 📖 Nazariya

### Map — key-value, har qanday key bo'lishi mumkin
```js
const map = new Map();
map.set("name", "Ali");
map.set(42, "number key");
map.set({}, "object key");

map.get("name");     // "Ali"
map.has("name");     // true
map.size;            // 3
map.delete("name");
map.clear();

// Iterate
for (const [key, value] of map) { }
map.forEach((value, key) => { });
[...map.keys()]
[...map.values()]
[...map.entries()]
```

**Object vs Map:**
| | Object | Map |
|---|---|---|
| Key turi | String/Symbol | Har qanday |
| Size | manual | .size |
| Iterate | murakkab | built-in |
| Performance | oddiy | katta data uchun yaxshi |

---

### Set — unique qiymatlar
```js
const set = new Set([1, 2, 2, 3, 3]);
console.log(set); // {1, 2, 3}

set.add(4);
set.has(2);    // true
set.delete(2);
set.size;      // 3

// Array → unique
const unique = [...new Set(arr)];

// Set operatsiyalari
const a = new Set([1,2,3]);
const b = new Set([2,3,4]);
const union        = new Set([...a, ...b]);        // {1,2,3,4}
const intersection = new Set([...a].filter(x => b.has(x))); // {2,3}
const difference   = new Set([...a].filter(x => !b.has(x))); // {1}
```

---

### WeakMap / WeakSet — garbage collection
```js
// WeakMap — key faqat object bo'lishi kerak
// Key o'chirilsa — entry avtomatik o'chadi
const cache = new WeakMap();

function getMetadata(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, { createdAt: Date.now() });
  }
  return cache.get(obj);
}

// WeakSet — DOM elementlar kuzatish uchun
const seen = new WeakSet();
function process(el) {
  if (seen.has(el)) return;
  seen.add(el);
  // jarayon
}
```

---

## 🎯 Masalalar

### Masala 1
```js
// LRU Cache implement qiling (Map yordamida)
class LRUCache {
  constructor(capacity) { /* ... */ }
  get(key) { /* ... */ }
  put(key, value) { /* ... */ }
}
```

### Masala 2
```js
// Array da duplicate topish (Set yordamida)
function findDuplicates(arr) { /* ... */ }
findDuplicates([1,2,2,3,3,4]); // [2,3]
```
