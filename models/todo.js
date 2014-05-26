var Todo = function (text) {
  "use strict";

  var
    methods = {},
    subscriptions = [],
    id = md5(text + Date.now())
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

  var manageText = function (t) {
    if (typeof(t) === 'undefined') {
      return text;
    } else {
      text = t;
      inform();
      return methods;
    }
  };

  var mark = function () {
    text = 'x ' + text;
  };

  var unmark = function () {
    text = text.replace(/^x /, '');
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

  methods = {
    subscribe: chainer(subscribe),
    id: getId,
    text: manageText,
    mark: informer(mark),
    unmark: informer(unmark),
    isMarked: isMarked,
    toggle: informer(toggle)
  };

  return methods;

};
