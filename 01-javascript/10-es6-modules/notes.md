# 10 — ES6 Modules

## 📖 Nazariya

### Named vs Default export

```js
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calculator { /* ... */ }

// import
import Calculator, { PI, add } from "./math.js";
import * as Math from "./math.js"; // namespace import
import { add as sum } from "./math.js"; // rename
```

### Dynamic import
```js
// Lazy loading
const { default: Chart } = await import("./Chart.js");

// Conditional
if (isAdmin) {
  const { adminPanel } = await import("./admin.js");
}
```

### Re-export
```js
// index.js — barrel export
export { Button } from "./Button.js";
export { Input } from "./Input.js";
export { default as Modal } from "./Modal.js";
```

### Module vs Script farqi
| Module | Script |
|--------|--------|
| Strict mode default | Strict mode yo'q |
| O'z scope'i | Global scope |
| Bir marta bajariladi | Har safar |
| `import`/`export` | Yo'q |

---

## 🎯 Masalalar

### Masala 1
```js
// Circular dependency muammosini tushuntiring
// a.js: import { b } from "./b.js"; export const a = 1;
// b.js: import { a } from "./a.js"; export const b = a + 1;
// Muammo nima?
```

### Masala 2
```js
// utils folder uchun barrel export yarating
// utils/string.js, utils/array.js, utils/date.js
// Hammasi utils/index.js orqali import qilinsin
```
