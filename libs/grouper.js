const Grouper = function (generics) {
  "use strict";

  let methods = {};
  const subscriptions = [];
  const matchers = {
    "+": "\\{{tag}}(?:$|\\s)",
    "@": "\\{{tag}}(?:$|\\s)",
    "!": "^(?:x\\s)?\\({{tag}}\\)",
  };
  let groups = {};
  let grouped;

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(grouped);
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
    return grouped.length;
  };

  const setGroup = (name, g) => {
    groups[name] = g;
  };

  const getGroup = (name) => {
    return groups[name];
  };

  const getFilter = (tag) => {
    const rawTag = groups[tag[0]][tag[1]];
    const fullTag = tag[0] == "!" ? rawTag.substr(0, 1) : rawTag;
    const re = new RegExp(matchers[tag[0]].replace("{{tag}}", fullTag), "ig");
    return re;
  };

  const matchesGeneric = (text) => {
    return _.every(generics, (gen) => {
      return !!(text.indexOf(gen) > -1);
    });
  };

  const matchesGroup = (text, tag) => {
    if (!tag || !_.isArray(tag)) {
      return true;
    }
    if (getFilter(tag).test(text)) {
      return true;
    }
    return matchesGeneric(text);
  };

  const findTagStartingWith = (text, groupStart) => {
    let match;
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

  const getGroupedItems = (todos, tag) => {
    return _.filter(todos, (item) => {
      return matchesGroup(item.getFullText(), tag);
    });
  };

  const group = (todos, tag) => {
    if (tag === undefined || _.isEmpty(tag) || !_.isArray(tag)) {
      grouped = todos;
    } else {
      grouped = getGroupedItems(todos, tag);
    }
  };

  const getIndex = (id) => {
    const items = _.map(grouped, (item) => {
      return item.id();
    });
    return items.indexOf(id);
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getGroup: getGroup,
    setGroup: chainer(setGroup),
    matchesGroup: matchesGroup,
    findTagStartingWith: findTagStartingWith,
    group: informer(group),
    getIndex: getIndex,
  };
  return methods;
};
