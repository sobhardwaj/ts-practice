type Callback = (e: unknown) => void

class MyCustomEventEmitter {
  pendingCallbacks: Callback[] = [];
  succeededCallbacks: Callback[] = [];
  failedCallbacks: Callback[] = [];

  onPending(callback: Callback): MyCustomEventEmitter {
    this.pendingCallbacks.push(callback);
    return this;
  }

  onSucceeded(callback: Callback): MyCustomEventEmitter {
    this.succeededCallbacks.push(callback);
    return this;
  }

  onFailed(callback: Callback): MyCustomEventEmitter {
    this.failedCallbacks.push(callback);
    return this;
  }
}

new MyCustomEventEmitter()
    .onPending(e => console.log(e))
    .onSucceeded(e => console.warn(e))
    .onFailed(e => console.error(e));



type Handler<T> = (data: T) => unknown;

class MessageRequestHandler<Ret> {
  pendingHanders: Handler<void>[] = [];
  succeedeHanders: Handler<Awaited<Ret>>[] = [];
  failedHanders: Handler<Error>[] = [];

  constructor(private fn: (...args: any[]) => Ret) { }

  onPending(handler: Handler<void>): this {
    this.pendingHanders.push(handler);
    return this;
  }
  onSucceeded(handler: Handler<Awaited<Ret>>): this {
    this.succeedeHanders.push(handler);
    return this;
  }
  onFailed(handler: Handler<Error>): this {
    this.failedHanders.push(handler);
    return this;
  }

  async execute() {
    return Promise
            .resolve()
            .then(_ => this.pendingHanders.map(handler => handler()))
            .then(_ => this.fn())
            .then(res => this.succeedeHanders.map(handler => handler(res as Awaited<Ret>)))
            .catch(err => this.failedHanders.map(handler => handler(err)));
  }
}

function wrap<T>(fn: () => T) {
  return new MessageRequestHandler(fn);
}

await wrap(() => fetch("/api"))
    .onPending(_ => console.log("fetch in progress")) // this only registers actions
    .onSucceeded(res => console.log("fetch ok", "result", res)) // same
    .onFailed(err => console.error("fecth not ok", "error", err.message)) // same
    .execute(); // call the function and execute the handers

export { };


//class MessageRequestHandler {
//  constructor(fn) {
//    this.fn = fn;
//    this.pendingHanders = [];
//    this.succeedeHanders = [];
//    this.failedHanders = [];
//  }
//  onPending(handler) {
//    this.pendingHanders.push(handler);
//    return this;
//  }
//  onSucceeded(handler) {
//    this.succeedeHanders.push(handler);
//    return this;
//  }
//  onFailed(handler) {
//    this.failedHanders.push(handler);
//    return this;
//  }
//  async execute() {
//    return Promise
//            .resolve()
//            .then(_ => this.pendingHanders.map(handler => handler()))
//            .then(_ => this.fn())
//            .then(res => this.succeedeHanders.map(handler => handler(res)))
//            .catch(err => this.failedHanders.map(handler => handler(err)));
//  }
//}
//function wrap(fn) {
//  return new MessageRequestHandler(fn);
//}
//await wrap(() => fetch("/api"))
//    .onPending(_ => console.log("fetch in progress")) // this only registers actions
//    .onSucceeded(res => console.log("fetch ok", "result", res)) // same
//    .onFailed(err => console.error("fecth not ok", "error", err.message)) // same
//    .execute(); // call the function and execute the handers
//export {};
//
