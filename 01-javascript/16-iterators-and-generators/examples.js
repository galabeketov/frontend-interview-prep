// 16 — Iterators & Generators — Examples & Solutions

// Masala 1 — range generator
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) yield i;
}
console.log([...range(0, 10, 2)]); // [0,2,4,6,8,10]

// Masala 2 — Iterable LinkedList
class Node {
  constructor(value) { this.value = value; this.next = null; }
}
class LinkedList {
  constructor() { this.head = null; }
  add(value) {
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  [Symbol.iterator]() {
    let curr = this.head;
    return {
      next() {
        if (curr) {
          const value = curr.value;
          curr = curr.next;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}
const list = new LinkedList();
list.add(1); list.add(2); list.add(3);
for (const val of list) console.log(val); // 1,2,3
console.log([...list]); // [1,2,3]

// Async generator
async function* streamData(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield await res.json();
  }
}
