var Todo = function (text) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    id = md5(text + Date.now()),
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

  var getId = function () {
    return id;
  };

  var setText = function (t) {
    text = t.trim();
  }

  var manageText = function (t) {
    if (_.isUndefined(t)) {
      return text;
    } else {
      setText(t);
      inform();
      return methods;
    }
  };

  var mark = function () {
    setText('x ' + text);
  };

  var unmark = function () {
    setText(text.replace(/^x /, ''));
  };

  var isMarked = function () {
    return text.substr(0, 2) === 'x ';
  };

  var toggle = function () {
    if (isMarked()) {
      unmark();
    } else {
      mark();
    }
  };

  var hasPriority = function () {
    return priorityMatcher.test(text);
  };

  var removePriority = function () {
    setText(text.replace(priorityMatcher, '$1'));
  };

  var getPriority = function () {
    return text.match(priorityMatcher)[0].replace(/x?\s?[^a-z]/ig, '');
  };

  var addPriority = function (index) {
    var
      alreadyMarked = isMarked(),
      previousPriority = false
      ;

    if (hasPriority()) {
      previousPriority = getPriority();
      removePriority();
    }

    if (previousPriority !== priorities[index]) {
      unmark();

      setText('(' + priorities[index] + ') ' + text);

      if (alreadyMarked) {
        mark();
      }
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    id: getId,
    text: manageText,
    mark: informer(mark),
    unmark: informer(unmark),
    isMarked: isMarked,
    toggle: informer(toggle),
    hasPriority: hasPriority,
    getPriority: getPriority,
    removePriority: informer(removePriority),
    addPriority: informer(addPriority)
  };

  return methods;

};
