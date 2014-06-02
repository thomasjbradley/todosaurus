var Filterer = function (generics) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    filtered = []
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(filtered);
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
    return filtered.length;
  };

  var getByIndex = function (index) {
    return filtered[index];
  };

  var getIndex = function (id) {
    var items = _.map(filtered, function (item) {
      return item.id();
    });

    return _.indexOf(items, id);
  };

  var matchesGeneric = function (text) {
    var match = false;

    _.each(generics, function (gen) {
      if (text.indexOf(gen) > -1) {
        match = true;
      }
    });

    return match;
  };

  var matchesFilter = function (text, data) {
    if (!data || FuzzyMatch.contains(text, data)) {
      return true;
    }

    return matchesGeneric(text);
  }

  var getFilteredItems = function (todos, data) {
    return _.filter(todos, function (item) {
      return matchesFilter(item.text(), data);
    });
  };

  var filter = function (todos, data) {
    if (!data) {
      filtered = todos;
    } else {
      filtered = getFilteredItems(todos, data);
    }
  };

  var getPreviouslyFilteredItems = function () {
    return filtered;
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getByIndex: getByIndex,
    getIndex: getIndex,
    matchesFilter: matchesFilter,
    filter: informer(filter),
    getPreviouslyFilteredItems: getPreviouslyFilteredItems
  };

  return methods;
};
