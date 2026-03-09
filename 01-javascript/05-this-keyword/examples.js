// 05 — this — Examples & Solutions

// call / apply / bind
function introduce(city, lang) {
  return `${this.name}, ${city}, ${lang}`;
}
const user = { name: "Ali" };
console.log(introduce.call(user, "Tashkent", "UZ"));
console.log(introduce.apply(user, ["Tashkent", "UZ"]));
const greetAli = introduce.bind(user, "Tashkent");
console.log(greetAli("UZ"));

// Masala 1 — Javoblar
// obj.regular()      → "Ali"      (method call, this = obj)
// obj.arrow()        → undefined  (arrow, this = global)
// obj.delayed()      → undefined  (regular fn, this = global)
// obj.delayedArrow() → "Ali"      (arrow, this = obj)

// Masala 2 — myBind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...moreArgs) {
    return fn.call(context, ...args, ...moreArgs);
  };
};

function greet(city) { return `${this.name} — ${city}`; }
const bound = greet.myBind({ name: "Ali" }, "Tashkent");
console.log(bound()); // "Ali — Tashkent"

// Masala 3 — Fix
const timer = {
  count: 0,
  start() {
    // Yechim 1: arrow function
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }
};
