var InputControl = function (elem, actionManager) {
  "use strict";

  var
    methods = {},
    keyEvents = []
  ;

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  var getActionManager = function () {
    return actionManager;
  };

  var bindEvents = function (events) {
    _.each(events, function (callback, key) {
      elem.addEventListener(key, callback, false);
    });
  };

  var bindKeyEvents = function (events) {
    keyEvents = events;
  };

  var value = function (val) {
    if (_.isUndefined(val)) {
      return elem.value;
    } else {
      elem.value = val.trim();
      return methods;
    }
  };

  function setCaretPosition(caretPos) {
    var range;

    if(elem.createTextRange) {
      range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      if(elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else {
        elem.focus();
      }
    }
  };

  var show = function () {
    actionManager.trigger('app:context:switch', keyEvents);
    elem.style.display = 'inline-block';
  };

  var hide = function () {
    actionManager.trigger('app:context:default');
    elem.style.display = 'none';
  };

  var select = function () {
    elem.select();
  };

  var focus = function () {
    elem.focus();
    actionManager.trigger('app:context:switch', keyEvents);
  };

  var blur = function () {
    elem.blur();
    actionManager.trigger('app:context:default');
  };

  methods = {
    getActionManager: getActionManager,
    bindEvents: chainer(bindEvents),
    bindKeyEvents: chainer(bindKeyEvents),
    value: value,
    setCaretPosition: chainer(setCaretPosition),
    show: chainer(show),
    hide: chainer(hide),
    select: chainer(select),
    focus: chainer(focus),
    blur: chainer(blur)
  };

  if (_.isString(elem)) {
    elem = document.getElementById(elem);
  };

  // if (!_.isUndefined(obj)) {
  //   _.extend(methods, obj);

  //   if (!_.isUndefined(obj.events)) {
  //     bindEvents(obj.events);
  //   }
  // }

  return methods;
};
