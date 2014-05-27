var Buffer = function () {
  var
    methods = {},
    subscriptions = [],
    max = 10,
    items = []
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(methods);
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
    return items.length;
  };

  var itemExists = function (item) {
    return _.last(items) === item;
  };

  var push = function (item) {
    if (!itemExists(item)) {
      items.push(item);
    }

    if (items.length > max) {
      items.shift();
    }
  };

  var pull = function () {
    return _.last(items);
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    push: informer(push),
    pull: pull
  };

  return methods;
};
