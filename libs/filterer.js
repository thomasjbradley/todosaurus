var Filterer = function (Filter) {
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

  var getFilteredItems = function (todos, data) {
    // Found: http://www.quora.com/Algorithms/How-is-the-fuzzy-search-algorithm-in-Sublime-Text-designed
    // Alternative: http://stackoverflow.com/questions/16907825/how-to-implement-sublime-text-like-fuzzy-search
    var re = new RegExp(data.split('').join('.*?'), 'i');

    return _.filter(todos, function (item) {
      return re.test(item.text());
    });
  };

  var filter = function (todos, data) {
    if (_.isUndefined(data) || data == '') {
      filtered = todos;
    } else {
      filtered = getFilteredItems(todos, data);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getByIndex: getByIndex,
    filter: informer(filter)
  };

  return methods;
};
