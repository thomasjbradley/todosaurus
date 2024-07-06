const InputControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  const findWrapper = () => {
    let current = that.elem.parentNode;
    while (current.className.indexOf("input-wrapper") < 0) {
      current = current.parentNode;
    }
    return current;
  };

  const setRawValue = (val) => {
    that.elem.value = val;
  };

  const value = (val) => {
    if (val === undefined) {
      return that.elem.value;
    } else {
      that.elem.value = val.trim();
      return that;
    }
  };

  const setCaretPosition = (startPos, endPos) => {
    if (endPos === undefined) {
      endPos = startPos;
    }
    that.elem.setSelectionRange(startPos, endPos);
  };

  const setPosition = (pos) => {
    if (pos === undefined) {
      return;
    }
    findWrapper().style.left = pos.left + "px";
    findWrapper().style.top = pos.top + "px";
  };

  const show = (pos) => {
    console.log("SHOW!!", that.elem, pos);
    that.elem.disabled = false;
    that.playEvents();
    actionManager.trigger("app:context:input", that.keyEvents);
    findWrapper().setAttribute("data-state", "visible");
    setPosition(pos);
  };

  const hide = () => {
    that.elem.disabled = true;
    that.stopEvents();
    actionManager.trigger("app:context:default");
    findWrapper().setAttribute("data-state", "hidden");
    that.elem.blur();
  };

  const isVisible = () => {
    return findWrapper().getAttribute("data-state") === "visible";
  };

  const select = () => {
    that.elem.select();
  };

  const focus = () => {
    that.playEvents();
    that.elem.focus();
    actionManager.trigger("app:context:input", that.keyEvents);
    findWrapper().setAttribute("data-focused", "true");
  };

  const blur = () => {
    that.stopEvents();
    that.elem.blur();
    actionManager.trigger("app:context:default");
    findWrapper().setAttribute("data-focused", "false");
  };

  const enable = () => {
    that.elem.disabled = false;
  };

  const disable = () => {
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
