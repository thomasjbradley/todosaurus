var Grouper = function (generics) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    matchers = {
      '+': '\\{{tag}}(?:$|\\s)',
      '@': '\\{{tag}}(?:$|\\s)',
      '!': '^(?:x\\s)?\\({{tag}}\\)'
    },
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
    var
      rawTag = groups[tag[0]][tag[1]],
      fullTag = (tag[0] == '!') ? rawTag.substr(0, 1) : rawTag,
      re = new RegExp(matchers[tag[0]].replace('{{tag}}', fullTag), 'ig')
    ;

    return re;
  }

  var matchesGeneric = function (text) {
    return _.every(generics, function (gen) {
      return !!(text.indexOf(gen) > -1);
    });
  };

  var matchesGroup = function (text, tag) {
    if (!tag || !_.isArray(tag)) {
      return true;
    }

    if (getFilter(tag).test(text)) {
      return true;
    }

    return matchesGeneric(text);
  };

  var findTagStartingWith = function (text, groupStart) {
    var match;

    if (!text) {
      return false;
    }

    match = _.find(groups[groupStart], function (item) {
      return FuzzyMatch.startsWith(item, text, groupStart);
    });

    if (!match) {
      return false;
    }

    return [groupStart, _.indexOf(groups[groupStart], match)];
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
    findTagStartingWith: findTagStartingWith,
    group: informer(group)
  };

  return methods;
};
