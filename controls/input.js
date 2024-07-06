var InputControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var findWrapper = function () {
    var current = that.elem.parentNode;

    while (current.className.indexOf("input-wrapper") < 0) {
      current = current.parentNode;
    }

    return current;
  };

  var setRawValue = function (val) {
    that.elem.value = val;
  };

  var value = function (val) {
    if (val === undefined) {
      return that.elem.value;
    } else {
      that.elem.value = val.trim();
      return that;
    }
  };

  var setCaretPosition = function (startPos, endPos) {
    if (endPos === undefined) {
      endPos = startPos;
    }

    that.elem.setSelectionRange(startPos, endPos);
  };

  var setPosition = function (pos) {
    if (pos === undefined) {
      return;
    }

    findWrapper().style.left = pos.left + "px";
    findWrapper().style.top = pos.top + "px";
  };

  var show = function (pos) {
    that.elem.disabled = false;
    that.playEvents();
    actionManager.trigger("app:context:input", that.keyEvents);
    findWrapper().setAttribute("data-state", "visible");
    setPosition(pos);
  };

  var hide = function () {
    that.elem.disabled = true;
    that.stopEvents();
    actionManager.trigger("app:context:default");
    findWrapper().setAttribute("data-state", "hidden");
    that.elem.blur();
  };

  var isVisible = function () {
    return findWrapper().getAttribute("data-state") === "visible";
  };

  var select = function () {
    that.elem.select();
  };

  var focus = function () {
    that.playEvents();
    that.elem.focus();
    actionManager.trigger("app:context:input", that.keyEvents);
    findWrapper().setAttribute("data-focused", "true");
  };

  var blur = function () {
    that.stopEvents();
    that.elem.blur();
    actionManager.trigger("app:context:default");
    findWrapper().setAttribute("data-focused", "false");
  };

  var enable = function () {
    that.elem.disabled = false;
  };

  var disable = function () {
    that.elem.disabled = true;
  };

  that = _.extend(that, {
    setRawValue: that.chainer(setRawValue),
    value: value,
    setCaretPosition: that.chainer(setCaretPosition),
    show: that.chainer(show),
    hide: that.chainer(hide),
    isVisible: isVisible,
    select: that.chainer(select),
    focus: that.chainer(focus),
    blur: that.chainer(blur),
    enable: that.chainer(enable),
    disable: that.chainer(disable),
  });

  return that;
};
