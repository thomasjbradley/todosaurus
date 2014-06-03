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
      if (!item.isMarked() && !item.hasPriority()) {
        orderGroups.middle.push(item);
      }
    });

    orderGroups.start = orderGroups.start.sort(function (a, b) {
      a = a.getFullText();
      b = b.getFullText();

      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    orderGroups.middle = orderGroups.middle.sort(function (a, b) {
      a = a.getCreatedDate();
      b = b.getCreatedDate();

      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    orderGroups.end = orderGroups.end.sort(function (a, b) {
      a = a.getCompletedDate();
      b = b.getCompletedDate();

      return (a > b) ? -1 : (a < b) ? 1 : 0;
    });

    return [].concat(
      orderGroups.start,
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

  var getIndex = function (id) {
    var items = _.map(ordered, function (item) {
      return item.id();
    });

    return items.indexOf(id);
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getOrderedItems: getOrderedItems,
    order: informer(order),
    getIndex: getIndex
  };

  return methods;
};
