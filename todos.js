var Todos = function () {
  "use strict";

  var
    methods = {},
    todos = [],
    subscriptions = []
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);

    return methods;
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(todos);
    });
  };

  var populate = function (items) {
    todos = items;

    inform();

    return methods;
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

    inform();

    return methods;
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

    inform();

    return methods;
  };

  var remove = function (index) {
    todos.splice(index, 1);

    inform();

    return methods;
  };

  var mark = function (index) {
    todos[index] = 'x ' + todos[index];

    inform();

    return methods;
  };

  var unmark = function (index) {
    todos[index] = todos[index].replace(/^x /, '');

    inform();

    return methods;
  };

  var filter = function (q) {

  };

  methods =  {
    subscribe: subscribe,
    populate: populate,
    addAt: addAt,
    append: append,
    prepend: prepend,
    get: get,
    getAll: getAll,
    updateAt: updateAt,
    remove: remove,
    mark: mark,
    unmark: unmark,
    filter: filter
  };

  return methods;
};
