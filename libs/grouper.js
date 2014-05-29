var Grouper = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    grouped
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(grouped);
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
    return grouped.length;
  };

  var getGroupedItems = function (todos, data) {
    return todos;
  };

  var group = function (todos, data) {
    if (_.isUndefined(data) || _.isEmpty(data)) {
      grouped = todos;
    } else {
      grouped = getGroupedItems(todos, data);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    group: informer(group)
  };

  return methods;
};
