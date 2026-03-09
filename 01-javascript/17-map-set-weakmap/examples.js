// 17 — Map, Set, WeakMap — Examples & Solutions

// Masala 1 — LRU Cache
class LRUCache {
  #capacity;
  #cache = new Map();

  constructor(capacity) {
    this.#capacity = capacity;
  }

  get(key) {
    if (!this.#cache.has(key)) return -1;
    const val = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, val); // eng oxiriga o'tkazish
    return val;
  }

  put(key, value) {
    if (this.#cache.has(key)) this.#cache.delete(key);
    else if (this.#cache.size >= this.#capacity) {
      this.#cache.delete(this.#cache.keys().next().value); // eng eskisini o'chir
    }
    this.#cache.set(key, value);
  }
}

const lru = new LRUCache(3);
lru.put(1, "a"); lru.put(2, "b"); lru.put(3, "c");
lru.get(1);       // "a", 1 eng oxiriga o'tadi
lru.put(4, "d"); // 2 o'chadi (eng eski)
console.log(lru.get(2)); // -1

// Masala 2 — findDuplicates
function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();
  for (const item of arr) {
    if (seen.has(item)) dupes.add(item);
    else seen.add(item);
  }
  return [...dupes];
}
console.log(findDuplicates([1,2,2,3,3,4])); // [2,3]

// WeakMap cache pattern
const memoCache = new WeakMap();
function computeExpensive(obj) {
  if (memoCache.has(obj)) return memoCache.get(obj);
  const result = Object.keys(obj).length; // expensive
  memoCache.set(obj, result);
  return result;
}
