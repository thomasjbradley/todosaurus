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

  var getOrderedItems = function (todos) {
    var orderGroups = { start: [], middle: [], end: [] };

    _.each(todos, function (item) {
      if (item.hasPriority()) {
        orderGroups.start.push(item);
        return;
      }
      if (item.isMarked()) {
        orderGroups.end.push(item);
        return;
      }

      orderGroups.middle.push(item);
    });

    return [].concat(
      orderGroups.start.sort(function (a, b) {
        return a.getFullText() - b.getFullText();
      }),
      orderGroups.middle,
      orderGroups.end
    );
  };

  var order = function (todos, isOrdered) {
    if (_.isUndefined(isOrdered) || isOrdered === false) {
      ordered = todos;
    } else {
      ordered = getOrderedItems(todos, isOrdered);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getOrderedItems: getOrderedItems,
    order: informer(order)
  };

  return methods;
};
