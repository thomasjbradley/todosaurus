const FocusManager = function () {
  "use strict";

  let methods = {};
  const subscriptions = [];
  let focus = 0;
  let max = 1;

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(focus);
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

  const get = () => {
    return focus;
  };

  const set = (f) => {
    focus = f;
    if (f > max) {
      focus = max;
    }
    if (f < 0) {
      focus = 0;
    }
  };

  const setMax = (m) => {
    max = m;
    if (focus > max) {
      focus = max;
    }
    if (max < 0) {
      focus = max = 0;
    }
  };

  const getMax = () => {
    return max;
  };

  const next = () => {
    focus++;
    if (focus > max) {
      focus = max;
    }
  };

  const prev = () => {
    focus--;
    if (focus < 0) {
      focus = 0;
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    get: get,
    set: informer(set),
    setMax: chainer(setMax),
    getMax: getMax,
    next: informer(next),
    prev: informer(prev),
  };
  return methods;
};
