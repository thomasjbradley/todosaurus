var Todo = function (fullText) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    id = md5(fullText + Date.now()),
    text = fullText,
    data = {
      created: (new Date()).toISOString().substr(0, 10),
      completed: false,
      priority: false
    },
    priorities = ['A', 'B', 'C', 'D', 'E'],
    priorityMatcher = /^(x\s)?\([a-z]\)\s/i
  ;

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(methods);
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

  var parseFullText = function () {
    var tmpText = fullText.trim();

    if (fullText.substr(0, 2) === 'x ') {
      mark(fullText.substr(2, 10));
      tmpText = fullText.slice(12).trim();
    }

    if (tmpText.match(/^\([A-Z]\)\s/)) {
      addPriority(tmpText.substr(0, 3).replace(/[^[A-Z]/g, ''));
      tmpText = tmpText.slice(3).trim();
    }

    if (tmpText.match(/^\d{4}-\d{2}-\d{2}/)) {
      data.created = tmpText.slice(0, 10);
      tmpText = tmpText.slice(11).trim();
    }

    setText(tmpText);
  };

  var getFullText = function () {
    var finalText = data.created + ' ' + text;

    if (hasPriority()) {
      finalText = '(' + getPriority() + ') ' + finalText;
    }

    if (isMarked()) {
      finalText = 'x ' + data.completed + ' ' + finalText;
    }

    return finalText;
  };

  var getId = function () {
    return id;
  };

  var setText = function (t) {
    text = t.trim();
  };

  var manageText = function (t) {
    if (_.isUndefined(t)) {
      return text;
    } else {
      setText(t);
      inform();
      return methods;
    }
  };

  var mark = function (date) {
    if (!_.isUndefined(date)) {
      data.completed = date;
    } else {
      data.completed = (new Date()).toISOString().substr(0, 10);
    }

    data.priority = false;
  };

  var unmark = function () {
    data.marked = false;
    data.completed = false;
  };

  var isMarked = function () {
    return !!data.completed;
  };

  var getCompletedDate = function () {
    return data.completed;
  };

  var toggle = function () {
    if (isMarked()) {
      unmark();
    } else {
      mark();
    }
  };

  var findPriority = function (pri) {
    if (_.isNumber(pri)) {
      if (pri > priorities.length - 1) {
        return _.last(priorities);
      } else {
        return priorities[pri];
      }
    }

    return pri;
  };

  var hasPriority = function () {
    return (data.priority !== false);
  };

  var removePriority = function () {
    data.priority = false;
  };

  var getPriority = function () {
    return data.priority;
  };

  var addPriority = function (pri) {
    if (isMarked()) {
      unmark();
    }

    data.priority = findPriority(pri);
  };

  var togglePriority = function (pri) {
    var priority;

    if (!hasPriority()) {
      addPriority(pri);
      return;
    }

    priority = findPriority(pri);

    if (priority === data.priority) {
      removePriority();
    } else {
      data.priority = priority;
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    id: getId,
    getFullText: getFullText,
    text: manageText,
    mark: informer(mark),
    unmark: informer(unmark),
    isMarked: isMarked,
    getCompletedDate: getCompletedDate,
    toggle: informer(toggle),
    hasPriority: hasPriority,
    getPriority: getPriority,
    removePriority: informer(removePriority),
    addPriority: informer(addPriority),
    togglePriority: informer(togglePriority)
  };

  parseFullText();

  return methods;

};
