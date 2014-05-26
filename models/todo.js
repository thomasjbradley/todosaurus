var Todo = function (text) {
  "use strict";

  var
    methods = {},
    id = md5(text + Date.now())
  ;

  var getId = function () {
    return id;
  };

  var manageText = function (t) {
    if (typeof(t) === 'undefined') {
      return text;
    } else {
      text = t;
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
    id: getId,
    text: manageText,
    mark: mark,
    unmark: unmark,
    isMarked: isMarked,
    toggle: toggle
  };

  return methods;

};
