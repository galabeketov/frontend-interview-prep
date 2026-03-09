// 07 — Array Methods — Examples & Solutions

const students = [
  { name: "Ali", grade: 85 },
  { name: "Vali", grade: 92 },
  { name: "Soli", grade: 78 },
  { name: "Hasan", grade: 95 },
];

// 1. 80 dan yuqori
const topStudents = students.filter(s => s.grade > 80).map(s => s.name);
console.log(topStudents); // ["Ali","Vali","Hasan"]

// 2. O'rtacha ball
const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
console.log(avg); // 87.5

// 3. Saralash
const sorted = [...students].sort((a, b) => b.grade - a.grade);
console.log(sorted);

// Masala 2 — myMap, myFilter
Array.prototype.myMap = function(fn) {
  return this.reduce((acc, item, i) => {
    acc.push(fn(item, i, this));
    return acc;
  }, []);
};
Array.prototype.myFilter = function(fn) {
  return this.reduce((acc, item, i) => {
    if (fn(item, i, this)) acc.push(item);
    return acc;
  }, []);
};
console.log([1,2,3].myMap(x => x * 2));    // [2,4,6]
console.log([1,2,3,4].myFilter(x => x%2===0)); // [2,4]

// Masala 3 — flatten
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}
console.log(flatten([1,[2,[3,[4,[5]]]]])); // [1,2,3,4,5]

// Masala 4 — groupBy
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}
const people = [
  { name: "Ali", city: "Tashkent" },
  { name: "Vali", city: "Samarkand" },
  { name: "Soli", city: "Tashkent" },
];
console.log(groupBy(people, "city"));
