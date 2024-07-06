class Buffer {
  subscriptions = [];
  max = 10;
  items = [];

  subscribe(callback) {
    subscriptions.push(callback);
  }

  inform() {
    subscriptions.forEach((callback) => {
      callback(methods);
    });
  }

  length() {
    return this.items.length;
  }

  itemExists(item) {
    return this.items.at(-1) === item;
  }

  push(item) {
    if (!this.itemExists(item)) {
      this.items.push(item);
    }
    if (this.items.length > this.max) {
      this.items.shift();
    }
  }

  pull() {
    return this.items.at(-1);
  }
}
