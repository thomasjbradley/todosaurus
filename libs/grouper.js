var Grouper = function (generics) {
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

  var getFilter = function (data) {
    return new RegExp('\\' + data, 'ig');
  };

  var matchesGroup = function (text, data) {
    // return getFilter(data).test(text);
    return true;
  };

  var getGroupedItems = function (todos, data) {
    return _.filter(todos, function (item) {
      return matchesGroup(item.text(), data);
    });
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
