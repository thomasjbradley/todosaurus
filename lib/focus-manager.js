var FocusManager = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    focus = 0,
    max = 1
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(focus);
    });
  };

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  var informer = function (func) {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  var get = function () {
    return focus;
  };

  var set = function (f) {
    focus = f;

    if (f > max) {
      focus = max;
    }

    if (f < 0) {
      focus = 0;
    }
  };

  var setMax = function (m) {
    max = m;

    if (focus > max) {
      focus = max;
    }
  };

  var getMax = function () {
    return max;
  };

  var next = function () {
    focus++;

    if (focus > max) {
      focus--;
    }
  };

  var prev = function () {
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
    prev: informer(prev)
  };

  return methods;
};
