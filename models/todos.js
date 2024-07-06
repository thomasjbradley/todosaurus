const Todos = function () {
  "use strict";

  let methods = {};
  const subscriptions = [];
  let todos = [];

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(todos);
    });
  };

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  const informer = (func) => {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  const createNewItem = (text) => {
    const todo = new Todo(text);
    todo.subscribe(inform);
    return todo;
  };

  const populate = (items) => {
    todos = [];
    _.each(items, (item) => {
      todos.push(_.isString(item) ? createNewItem(item) : item);
    });
  };

  const length = () => {
    return todos.length;
  };

  const addItemAt = (item, index) => {
    const todo = _.isString(item) ? createNewItem(item) : item;
    if (index === undefined || index === 0) {
      return todos.unshift(todo);
    }
    if (index >= todos.length || index === -1) {
      return todos.push(todo);
    }
    if (index < -1) {
      throw new Error("Index argument must be greater than or equal to -1.");
    }
    return todos.splice(index, 0, todo);
  };

  const addAt = (item, index) => {
    addItemAt(item, index);
  };

  const addBeforeItem = (item, id) => {
    addItemAt(item, getIndex(id));
  };

  const addAfterItem = (item, id) => {
    addItemAt(item, getIndex(id) + 1);
  };

  const append = (item) => {
    return addAt(item, -1);
  };

  const prepend = (item) => {
    return addAt(item, 0);
  };

  const get = (id) => {
    return _.find(todos, (item) => {
      return item.id() == id;
    });
  };

  const getIndex = (id) => {
    var items = _.map(todos, (item) => {
      return item.id();
    });
    return items.indexOf(id);
  };

  const getByIndex = (index) => {
    return todos[index];
  };

  const getAll = () => {
    return todos;
  };

  const findMetadata = (text, re) => {
    return _.map(text.match(re), (item) => {
      return item.trim();
    });
  };

  const getAllTags = (tag) => {
    const re = new RegExp("\\s\\" + tag + "[^\\s]+", "ig");
    const metas = _.map(todos, (item) => {
      return _.uniq(findMetadata(item.text(), re));
    });
    return _.uniq(_.flatten(metas)).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  };

  const getAllFullText = () => {
    return _.map(todos, (item) => {
      return item.getFullText();
    });
  };

  const remove = (id) => {
    var index = _.findIndex(todos, (item) => {
      return item.id() == id;
    });
    removeByIndex(index);
  };

  const removeByIndex = (index) => {
    todos.splice(index, 1);
  };

  methods = {
    subscribe: chainer(subscribe),
    populate: informer(populate),
    createNewItem: createNewItem,
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
    getAllTags: getAllTags,
    getAllFullText: getAllFullText,
    remove: informer(remove),
    removeByIndex: informer(removeByIndex),
  };
  return methods;
};
