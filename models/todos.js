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

  var createNewItem = function (text) {
    var todo = new Todo(text);
    todo.subscribe(inform);
    return todo;
  };

  var populate = function (items) {
    _.each(items, function (elem) {
      todos.push(createNewItem(elem));
    });
  };

  var length = function () {
    return todos.length;
  };

  var addItemAt = function (item, index) {
    var todo = (_.isString(item)) ? createNewItem(item) : createNewItem(item.text());

    if (_.isUndefined(index) || index === 0) {
      return todos.unshift(todo);
    }

    if (index >= todos.length || index === -1) {
      return todos.push(todo);
    }

    if (index < -1) {
      throw new Error('Index argument must be greater than or equal to -1.');
    }

    return todos.splice(index, 0, todo);
  };

  var addAt = function (item, index) {
    addItemAt(item, index);
  };

  var addBeforeItem = function (item, id) {
    addItemAt(item, getIndex(id));
  };

  var addAfterItem = function (item, id) {
    addItemAt(item, getIndex(id) + 1);
  };

  var append = function (item) {
    return addAt(item, -1);
  };

  var prepend = function (item) {
    return addAt(item, 0);
  };

  var get = function (id) {
    return _.find(todos, function (item) {
      return item.id() == id;
    });
  };

  var getIndex = function (id) {
    var items = _.map(todos, function (item) {
      return item.id();
    });

    return items.indexOf(id);
  };

  var getByIndex = function (index) {
    return todos[index];
  };

  var getAll = function () {
    return todos;
  };

  var findMetadata = function (text, re) {
    return _.map(text.match(re), function (item) {
      return item.trim();
    });
  };

  var getAllMetadataItems = function (tag) {
    var
      re = new RegExp('\\s\\' + tag + '[^\\s]+', 'ig'),
      metas = [];
    ;

    metas = _.map(todos, function (item) {
      return _.unique(findMetadata(item.text(), re));
    });

    return _.unique(_.flatten(metas));
  };

  var remove = function (id) {
    var index = _.findIndex(todos, function (item) {
      return item.id() == id;
    });

    removeByIndex(index);
  };

  var removeByIndex = function (index) {
    todos.splice(index, 1);
  };

  var getString = function () {
    return _.map(todos, function (item) {
      return item.text();
    });
  };

  methods =  {
    subscribe: chainer(subscribe),
    populate: informer(populate),
    length: length,
    addAt: informer(addAt),
    addBeforeItem: informer(addBeforeItem),
    addAfterItem: informer(addAfterItem),
    append: informer(append),
    prepend: informer(prepend),
    get: get,
    getIndex: getIndex,
    getByIndex: getByIndex,
    getAll: getAll,
    getAllMetadataItems: getAllMetadataItems,
    remove: informer(remove),
    removeByIndex: informer(removeByIndex),
    getString: getString
  };

  return methods;
};
