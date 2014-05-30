var Grouper = function (generics) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    groups = {},
    grouped
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(grouped);
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
    return grouped.length;
  };

  var setGroup = function (name, g) {
    groups[name] = g;
  };

  var getGroup = function (name) {
    return groups[name];
  }

  var getFilter = function (tag) {
    var re = new RegExp('\\' + groups[tag[0]][tag[1]] + '(?:$|\\s)', 'ig');
    return re;
  }

  var matchesGeneric = function (text) {
    return _.every(generics, function (gen) {
      return !!(text.indexOf(gen) > -1);
    });
  };

  var matchesGroup = function (text, tag) {
    var matcher;

    if (!tag || !_.isArray(tag)) {
      return true;
    }

    if (getFilter(tag).test(text)) {
      return true;
    }

    return matchesGeneric(text);
  };

  var getGroupedItems = function (todos, tag) {
    return _.filter(todos, function (item) {
      return matchesGroup(item.text(), tag);
    });
  };

  var group = function (todos, tag) {
    if (_.isUndefined(tag) || _.isEmpty(tag) || !_.isArray(tag)) {
      grouped = todos;
    } else {
      grouped = getGroupedItems(todos, tag);
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getGroup: getGroup,
    setGroup: chainer(setGroup),
    matchesGroup: matchesGroup,
    group: informer(group)
  };

  return methods;
};
