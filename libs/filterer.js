var Filterer = function () {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    filtered
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

  var getFilter = function (data) {
    // Found: http://www.quora.com/Algorithms/How-is-the-fuzzy-search-algorithm-in-Sublime-Text-designed
    // Alternative: http://stackoverflow.com/questions/16907825/how-to-implement-sublime-text-like-fuzzy-search
    var r, re, specials = ['^', '$', '.', '|', '[', ']', '(', ')', '{', '}', ':', '*', '+', '?', '\\', '-'];

    r = _.map(data.split(''), function (item) {
      if (_.indexOf(specials, item) > -1) {
        return '\\' + item;
      } else {
        return item;
      }
    });

    return new RegExp(r.join('.*?'), 'i');
  };

  var matchesFilter = function (text, data) {
    return getFilter(data).test(text);
  }

  var getFilteredItems = function (todos, data) {
    return _.filter(todos, function (item) {
      return matchesFilter(item.text(), data);
    });
  };

  var filter = function (todos, data) {
    if (_.isUndefined(data) || _.isEmpty(data)) {
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
    filter: informer(filter)
  };

  return methods;
};
