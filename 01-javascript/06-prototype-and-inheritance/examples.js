// 06 — Prototype — Examples & Solutions

// Prototype chain
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};

const cat = new Animal("Cat");
console.log(cat.speak());                    // "Cat speaks"
console.log(cat.hasOwnProperty("name"));    // true
console.log(cat.hasOwnProperty("speak"));   // false

// Masala 2 — Prototype inheritance
function Vehicle(make, speed) {
  this.make = make;
  this.speed = speed;
}
Vehicle.prototype.describe = function() {
  return `${this.make}, ${this.speed}km/h`;
};

function Car(make, speed, doors) {
  Vehicle.call(this, make, speed); // parent constructor
  this.doors = doors;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.describe = function() {
  return `${Vehicle.prototype.describe.call(this)}, ${this.doors} doors`;
};

const car = new Car("Toyota", 120, 4);
console.log(car.describe()); // "Toyota, 120km/h, 4 doors"
console.log(car instanceof Car);     // true
console.log(car instanceof Vehicle); // true

// Masala 3 — EventEmitter
const eventEmitter = {
  _events: {},
  on(event, fn) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(fn);
    return this;
  },
  off(event, fn) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter(f => f !== fn);
    }
    return this;
  },
  emit(event, data) {
    if (this._events[event]) {
      this._events[event].forEach(fn => fn(data));
    }
    return this;
  }
};

const emitter = Object.create(eventEmitter);
emitter._events = {};

const handler = data => console.log("Event:", data);
emitter.on("click", handler);
emitter.emit("click", { x: 10, y: 20 }); // Event: {x:10,y:20}
emitter.off("click", handler);
emitter.emit("click", {}); // — hech narsa
