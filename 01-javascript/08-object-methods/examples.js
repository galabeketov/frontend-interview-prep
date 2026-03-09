// 08 — Object Methods — Examples & Solutions

// Masala 1 — Deep Clone
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}
const orig = { a: 1, nested: { b: [1, 2, 3] } };
const clone = deepClone(orig);
clone.nested.b.push(4);
console.log(orig.nested.b); // [1,2,3] ✅

// Masala 2 — pick / omit
const pick = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));

const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

console.log(pick({ a:1, b:2, c:3 }, ["a","c"])); // {a:1,c:3}
console.log(omit({ a:1, b:2, c:3 }, ["b"]));     // {a:1,c:3}

// Masala 3 — flattenObj
function flattenObj(obj, prefix = "") {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      Object.assign(acc, flattenObj(val, fullKey));
    } else {
      acc[fullKey] = val;
    }
    return acc;
  }, {});
}
console.log(flattenObj({ a: { b: { c: 1 } }, d: 2 }));
// { "a.b.c": 1, "d": 2 }
