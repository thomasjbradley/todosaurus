var Filterer = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    filtered
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(filtered);
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

  var length = function () {
    return filtered.length;
  };

  var getByIndex = function (index) {
    return filtered[index];
  };

  var filter = function (todos, filter) {
    filtered = todos;
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getByIndex: getByIndex,
    filter: informer(filter)
  };

  return methods;
};
