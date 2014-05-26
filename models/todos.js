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
    _.each(items, function (elem) {
      todos.push(new Todo(elem));
    });
  };

  var length = function () {
    return todos.length;
  };

  var addItemAt = function (item, index) {
    if (typeof(index) === 'undefined' || index === 0) {
      return todos.unshift(new Todo(item));
    }

    if (index >= todos.length || index === -1) {
      return todos.push(new Todo(item));
    }

    if (index < -1) {
      throw new Error('Index argument must be greater than or equal to -1.');
    }

    return todos.splice(index, 0, new Todo(item));
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

  var get = function (id) {
    return _.findWhere(todos, {id: id});
  };

  var getByIndex = function (index) {
    return todos[index];
  };

  var getAll = function () {
    return todos;
  };

  var remove = function (id) {
    var index = _.findIndex(todos, function (item) {
      return item.id == id;
    });

    removeByIndex(index);
  };

  var removeByIndex = function (index) {
    todos.splice(index, 1);
  };

  methods =  {
    subscribe: chainer(subscribe),
    populate: informer(populate),
    length: length,
    addAt: informer(addAt),
    append: informer(append),
    prepend: informer(prepend),
    get: get,
    getByIndex: getByIndex,
    getAll: getAll,
    remove: informer(remove),
    removeByIndex: informer(removeByIndex)
  };

  return methods;
};
