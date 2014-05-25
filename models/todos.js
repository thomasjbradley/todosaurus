var Todos = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    todos = []
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(todos);
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

  var populate = function (items) {
    todos = items;
  };

  var length = function () {
    return todos.length;
  };

  var addItemAt = function (item, index) {
    if (typeof(index) === 'undefined' || index === 0) {
      return todos.unshift(item);
    }

    if (index >= todos.length || index === -1) {
      return todos.push(item);
    }

    if (index < -1) {
      throw new Error('Index argument must be greater than or equal to -1.');
    }

    return todos.splice(index, 0, item);
  };

  var addAt = function (item, index) {
    addItemAt(item, index);
  };

  var append = function (item) {
    return addAt(item, -1);
  };

  var prepend = function (item) {
    return addAt(item, 0);
  };

  var get = function (index) {
    return todos[index];
  };

  var getAll = function () {
    return todos;
  };

  var updateAt = function (item, index) {
    todos[index] = item;
  };

  var remove = function (index) {
    todos.splice(index, 1);
  };

  var mark = function (index) {
    todos[index] = 'x ' + todos[index];
  };

  var unmark = function (index) {
    todos[index] = todos[index].replace(/^x /, '');
  };

  var toggle = function (index) {
    if (todos[index].match(/^x /)) {
      unmark(index);
    } else {
      mark(index);
    }
  };

  var filter = function (q) {

  };

  methods =  {
    subscribe: chainer(subscribe),
    populate: informer(populate),
    length: length,
    addAt: informer(addAt),
    append: informer(append),
    prepend: informer(prepend),
    get: get,
    getAll: getAll,
    updateAt: informer(updateAt),
    remove: informer(remove),
    mark: informer(mark),
    unmark: informer(unmark),
    toggle: informer(toggle),
    filter: filter
  };

  return methods;
};
