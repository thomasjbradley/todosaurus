var InputControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var findWrapper = function () {
    var current = that.elem.parentNode;

    while (current.className.indexOf('input-wrapper') < 0) {
      current = current.parentNode;
    }
    console.log(current);

    return current;
  };

  var value = function (val) {
    if (_.isUndefined(val)) {
      return that.elem.value;
    } else {
      that.elem.value = val.trim();
      return that;
    }
  };

  var setCaretPosition = function (caretPos) {
    var range;

    if(that.elem.createTextRange) {
      range = that.elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      if(that.elem.selectionStart) {
        that.elem.focus();
        that.elem.setSelectionRange(caretPos, caretPos);
      } else {
        that.elem.focus();
      }
    }
  };

  var setPosition = function (pos) {
    if (_.isUndefined(pos)) {
      return;
    }

    findWrapper().style.left = pos.left + 'px';
    findWrapper().style.top = pos.top + 'px';
  };

  var show = function (pos) {
    actionManager.trigger('app:context:switch', that.keyEvents);
    findWrapper().setAttribute('data-state', 'visible');
    actionManager.trigger('app:list:blur');
    setPosition(pos);
  };

  var hide = function () {
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-state', 'hidden');
    actionManager.trigger('app:list:focus');
  };

  var select = function () {
    that.elem.select();
  };

  var focus = function () {
    that.elem.focus();
    actionManager.trigger('app:context:switch', that.keyEvents);
    findWrapper().setAttribute('data-focused', 'true');
    actionManager.trigger('app:list:blur');
  };

  var blur = function () {
    that.elem.blur();
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-focused', 'false');
    actionManager.trigger('app:list:focus');
  };

  that = _.extend(that, {
    value: value,
    setCaretPosition: that.chainer(setCaretPosition),
    show: that.chainer(show),
    hide: that.chainer(hide),
    select: that.chainer(select),
    focus: that.chainer(focus),
    blur: that.chainer(blur)
  });

  return that;
};
