var Orderer = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    ordered
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(ordered);
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
    return ordered.length;
  };

  var getOrderedItems = function (todos, data) {
    return todos;
  };

  var order = function (todos, data) {
    if (_.isUndefined(data) || _.isEmpty(data)) {
      ordered = todos;
    } else {
      ordered = getOrderedItems(todos, data);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    order: informer(order)
  };

  return methods;
};
