// 15 — Classes — Examples & Solutions

// Masala 1 — EventEmitter
class EventEmitter {
  #events = new Map();

  on(event, fn) {
    if (!this.#events.has(event)) this.#events.set(event, new Set());
    this.#events.get(event).add(fn);
    return this;
  }

  off(event, fn) {
    this.#events.get(event)?.delete(fn);
    return this;
  }

  emit(event, ...args) {
    this.#events.get(event)?.forEach(fn => fn(...args));
    return this;
  }

  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();
emitter.on("data", d => console.log("Received:", d));
emitter.once("connect", () => console.log("Connected!"));
emitter.emit("connect"); // "Connected!"
emitter.emit("connect"); // — (hech narsa)
emitter.emit("data", { id: 1 }); // "Received: {id:1}"

// Masala 2 — Observable (soddalashtirilgan RxJS)
class Observable {
  constructor(fn) { this._fn = fn; }

  subscribe(observer) {
    const obs = typeof observer === "function"
      ? { next: observer }
      : observer;
    this._fn(obs);
    return { unsubscribe: () => {} };
  }

  map(fn) {
    return new Observable(observer => {
      this.subscribe({
        next: val => observer.next(fn(val)),
        error: err => observer.error?.(err),
        complete: () => observer.complete?.()
      });
    });
  }

  filter(fn) {
    return new Observable(observer => {
      this.subscribe({
        next: val => fn(val) && observer.next(val),
        error: err => observer.error?.(err)
      });
    });
  }
}

const obs = new Observable(observer => {
  [1, 2, 3, 4, 5].forEach(n => observer.next(n));
});

obs
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .subscribe(n => console.log(n)); // 20, 40
