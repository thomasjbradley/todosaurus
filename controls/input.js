var InputControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  if (window.isNode) {
    that.bindKeyEvents([
      {
        keys: ['mod+c'],
        callback: function (e) {
          document.execCommand('copy');
        }
      },
      {
        keys: ['mod+v'],
        callback: function (e) {
          document.execCommand('paste');
        }
      },
      {
        keys: ['mod+x'],
        callback: function (e) {
          document.execCommand('cut');
        }
      },
      {
        keys: ['mod+a'],
        callback: function (e) {
          document.execCommand('selectall');
        }
      },
      {
        keys: ['mod+z'],
        callback: function (e) {
          document.execCommand('undo');
        }
      },
      {
        keys: ['mod+shift+z'],
        callback: function (e) {
          document.execCommand('redo');
        }
      }
    ]);
  }

  var findWrapper = function () {
    var current = that.elem.parentNode;

    while (current.className.indexOf('input-wrapper') < 0) {
      current = current.parentNode;
    }

    return current;
  };

  var setRawValue = function (val) {
    that.elem.value = val;
  };

  var value = function (val) {
    if (_.isUndefined(val)) {
      return that.elem.value;
    } else {
      that.elem.value = val.trim();
      return that;
    }
  };

  var setCaretPosition = function (startPos, endPos) {
    if (_.isUndefined(endPos)) {
      endPos = startPos;
    }

    that.elem.setSelectionRange(startPos, endPos);
  };

  var setPosition = function (pos) {
    if (_.isUndefined(pos)) {
      return;
    }

    findWrapper().style.left = pos.left + 'px';
    findWrapper().style.top = pos.top + 'px';
  };

  var show = function (pos) {
    that.playEvents();
    actionManager.trigger('app:context:input', that.keyEvents);
    findWrapper().setAttribute('data-state', 'visible');
    setPosition(pos);
  };

  var hide = function () {
    that.stopEvents();
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-state', 'hidden');
    that.elem.blur();
  };

  var isVisible = function () {
    return (findWrapper().getAttribute('data-state') === 'visible');
  };

  var select = function () {
    that.elem.select();
  };

  var focus = function () {
    that.playEvents();
    that.elem.focus();
    actionManager.trigger('app:context:input', that.keyEvents);
    findWrapper().setAttribute('data-focused', 'true');
  };

  var blur = function () {
    that.stopEvents();
    that.elem.blur();
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-focused', 'false');
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
    blur: that.chainer(blur)
  });

  return that;
};
