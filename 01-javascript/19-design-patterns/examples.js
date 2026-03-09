// 19 - Design Patterns - Examples

// Traffic Light
class TrafficLight {
  #states = ["red", "green", "yellow"];
  #current = 0;
  next() { this.#current = (this.#current + 1) % this.#states.length; return this; }
  getState() { return this.#states[this.#current]; }
}

// Middleware
class App {
  #middlewares = [];
  use(fn) { this.#middlewares.push(fn); return this; }
  run(req) {
    let idx = 0;
    const next = () => { if (idx < this.#middlewares.length) this.#middlewares[idx++](req, next); };
    next();
  }
}

const app = new App();
app.use((req, next) => { req.timestamp = Date.now(); next(); });
app.use((req, next) => { req.user = "Ali"; next(); });
app.use((req) => { console.log("Final:", req); });
app.run({ path: "/home" });
