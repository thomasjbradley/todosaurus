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

    return methods;
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(focus);
    });
  };

  var get = function () {
    return focus;
  };

  var set = function (f) {
    if (f > max) {
      focus = max;
    }

    focus = f;

    inform();

    return methods;
  };

  var setMax = function (m) {
    max = m;

    return methods;
  };

  var next = function () {
    focus++;

    if (focus > max) {
      focus--;
    }

    inform();

    return methods;
  };

  var prev = function () {
    focus--;

    if (focus < 0) {
      focus = 0;
    }

    inform();

    return methods;
  };

  methods = {
    subscribe: subscribe,
    get: get,
    set: set,
    setMax: setMax,
    next: next,
    prev: prev
  };

  return methods;
};
