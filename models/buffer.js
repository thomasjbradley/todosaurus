const Buffer = function () {
  "use strict";

  let methods = {};
  const subscriptions = [];
  const max = 10;
  const items = [];

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(methods);
    });
  };

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  const informer = (func) => {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  const length = () => {
    return items.length;
  };

  const itemExists = (item) => {
    return items.at(-1) === item;
  };

  const push = (item) => {
    if (!itemExists(item)) {
      items.push(item);
    }

    if (items.length > max) {
      items.shift();
    }
  };

  const pull = () => {
    return items.at(-1);
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    push: informer(push),
    pull: pull,
  };
  return methods;
};
