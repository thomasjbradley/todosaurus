var EditControl = function (id) {
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
    elem.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 13:
          actionManager.trigger('item:update', value());
          actionManager.trigger('app:edit:hide');
          break;
        case 27:
          actionManager.trigger('app:edit:hide');
          break;
      }
    }, false);
  };

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
    elem.style.display = 'inline-block';
  };

  var hide = function () {
    elem.style.display = 'none';
  };

  var select = function () {
    elem.select();
  };

  var focus = function () {
    elem.focus();
  };

  methods = {
    bindActionManager: chainer(bindActionManager),
    value: value,
    setCaretPosition: chainer(setCaretPosition),
    show: chainer(show),
    hide: chainer(hide),
    select: chainer(select),
    focus: chainer(focus)
  };

  bindEvents();

  return methods;
};
