# 19 — Design Patterns

## 📖 Nazariya

### Creational Patterns

#### Singleton
```js
class Singleton {
  static #instance;
  constructor() {
    if (Singleton.#instance) return Singleton.#instance;
    Singleton.#instance = this;
  }
  static getInstance() {
    return Singleton.#instance || new Singleton();
  }
}
```

#### Factory
```js
class UserFactory {
  static create(type, data) {
    const types = { admin: AdminUser, guest: GuestUser, member: MemberUser };
    const UserClass = types[type];
    if (!UserClass) throw new Error(`Unknown type: ${type}`);
    return new UserClass(data);
  }
}
```

---

### Structural Patterns

#### Observer (Pub/Sub)
```js
class EventBus {
  #handlers = new Map();
  on(event, fn) { /* ... */ }
  off(event, fn) { /* ... */ }
  emit(event, data) { /* ... */ }
}
```

#### Decorator
```js
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

// Funksional decorator
const withLogging = fn => (...args) => {
  console.log(`Calling with:`, args);
  const result = fn(...args);
  console.log(`Result:`, result);
  return result;
};
```

#### Proxy
```js
const handler = {
  get(target, key) {
    console.log(`Getting ${key}`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`Setting ${key} = ${value}`);
    target[key] = value;
    return true;
  }
};
const proxy = new Proxy({}, handler);
```

---

### Behavioral Patterns

#### Strategy
```js
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy(data); }
}

const bubbleSort = arr => { /* ... */ };
const quickSort = arr => { /* ... */ };

const sorter = new Sorter(quickSort);
```

#### Command
```js
class CommandHistory {
  #history = [];
  execute(command) {
    command.execute();
    this.#history.push(command);
  }
  undo() {
    const command = this.#history.pop();
    command?.undo();
  }
}
```

---

## 🎯 Masalalar

### Masala 1
```js
// State pattern — Traffic Light implement qiling
class TrafficLight {
  // red → green → yellow → red
  // next() — keyingi holatga o'tsin
  // getState() — hozirgi holat
}
```

### Masala 2
```js
// Middleware pattern (Express ga o'xshash)
class App {
  use(fn) { /* ... */ }
  run(req) { /* ... */ }
}
const app = new App();
app.use((req, next) => { req.timestamp = Date.now(); next(); });
app.use((req, next) => { console.log(req); next(); });
```
