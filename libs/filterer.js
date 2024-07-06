const Filterer = function (generics) {
  "use strict";

  let methods = {};
  const subscriptions = [];
  let filtered = [];

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(filtered);
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

  const length = () => {
    return filtered.length;
  };

  const getByIndex = (index) => {
    return filtered[index];
  };

  const getIndex = (id) => {
    const items = _.map(filtered, (item) => {
      return item.id();
    });
    return _.indexOf(items, id);
  };

  const matchesGeneric = (text) => {
    let match = false;
    _.each(generics, (gen) => {
      if (text.indexOf(gen) > -1) {
        match = true;
      }
    });
    return match;
  };

  const matchesFilter = (text, data) => {
    if (!data || FuzzyMatch.contains(text, data)) {
      return true;
    }
    return matchesGeneric(text);
  };

  const getFilteredItems = (todos, data) => {
    return _.filter(todos, (item) => {
      return matchesFilter(item.text(), data);
    });
  };

  const filter = (todos, data) => {
    if (!data) {
      filtered = todos;
    } else {
      filtered = getFilteredItems(todos, data);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getByIndex: getByIndex,
    getIndex: getIndex,
    matchesFilter: matchesFilter,
    filter: informer(filter),
  };
  return methods;
};
