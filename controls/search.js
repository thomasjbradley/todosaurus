var SearchControl = function (id) {
  "use strict";

  var
    methods = {},
    actionManager,
    elem = document.getElementById(id)
  ;

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  var bindEvents = function () {
    bindKeyUpEvents();
    bindKeyDownEvents();
  };

  var bindKeyUpEvents = function () {
    elem.addEventListener('keyup', function (e) {
      actionManager.trigger('app:search:trigger');
    }, false);
  };

  var bindKeyDownEvents = function () {
    elem.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 13:
          actionManager.trigger('app:search:blur');
          break;
        case 27:
          actionManager.trigger('app:search:clear');
          break;
      }
    }, false);
  }

  var bindActionManager = function (am) {
    actionManager = am;
  };

  var value = function (val) {
    if (_.isUndefined(val)) {
      return elem.value;
    } else {
      elem.value = val.trim();
      return methods;
    }
  };

  var select = function () {
    elem.select();
  };

  var focus = function () {
    elem.focus();
  };

  var blur = function () {
    elem.blur();
  };

  methods = {
    bindActionManager: chainer(bindActionManager),
    value: value,
    select: chainer(select),
    focus: chainer(focus),
    blur: chainer(blur)
  };

  bindEvents();

  return methods;
};
