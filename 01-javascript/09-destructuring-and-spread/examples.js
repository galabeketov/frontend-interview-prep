// 09 — Destructuring & Spread — Examples & Solutions

// Masala 1 — API destructuring
const response = {
  status: 200,
  data: {
    user: { id: 1, name: "Ali", email: "ali@test.com" },
    posts: [{ id: 1, title: "Post 1" }],
    meta: { total: 10, page: 1 }
  }
};

const { data: { user: { name }, posts: [{ title }], meta: { total } } } = response;
console.log(name, title, total); // "Ali", "Post 1", 10

// Masala 2 — chunk
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
console.log(chunk([1,2,3,4,5,6,7], 3)); // [[1,2,3],[4,5,6],[7]]

// Immutable state update pattern
const state = { user: { name: "Ali", age: 25 }, loading: false };
const newState = {
  ...state,
  user: { ...state.user, age: 26 },
  loading: true
};
console.log(state.user.age); // 25 — o'zgarmadi
console.log(newState.user.age); // 26
