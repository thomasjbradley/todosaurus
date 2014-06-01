var InputControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  if (window.isNode) {
    that.bindKeyEvents([
      {
        keys: ['mod+c'],
        callback: function (e) {
          clipboard.set(window.getSelection().toString(), 'text');
        }
      },
      {
        keys: ['mod+v'],
        callback: function (e) {
          var val = that.elem.value,
            pos = that.elem.selectionStart,
            start = val.slice(0, pos),
            end = val.slice(that.elem.selectionEnd),
            newText = clipboard.get('text')
          ;

          that.elem.value = start + newText + end;
          setCaretPosition(pos + newText.length);
        }
      },
      {
        keys: ['mod+x'],
        callback: function (e) {
          var val = that.elem.value,
            pos = that.elem.selectionStart,
            start = val.slice(0, pos),
            end = val.slice(that.elem.selectionEnd)
          ;

          clipboard.set(window.getSelection().toString(), 'text');
          that.elem.value = start + end;
          setCaretPosition(pos);
        }
      },
      {
        keys: ['mod+a'],
        callback: function (e) {
          that.elem.setSelectionRange(0, 10000)
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

  var value = function (val) {
    if (_.isUndefined(val)) {
      return that.elem.value;
    } else {
      that.elem.value = val.trim();
      return that;
    }
  };

  var setCaretPosition = function (caretPos) {
    that.elem.setSelectionRange(caretPos, caretPos);
  };

  var setPosition = function (pos) {
    if (_.isUndefined(pos)) {
      return;
    }

    findWrapper().style.left = pos.left + 'px';
    findWrapper().style.top = pos.top + 'px';
  };

  var show = function (pos) {
    that.bindEvents();
    actionManager.trigger('app:context:input', that.keyEvents);
    findWrapper().setAttribute('data-state', 'visible');
    setPosition(pos);
  };

  var hide = function () {
    that.killEvents();
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-state', 'hidden');
  };

  var isVisible = function () {
    return (findWrapper().getAttribute('data-state') === 'visible');
  };

  var select = function () {
    that.elem.select();
  };

  var focus = function () {
    that.elem.focus();
    actionManager.trigger('app:context:input', that.keyEvents);
    findWrapper().setAttribute('data-focused', 'true');
  };

  var blur = function () {
    that.elem.blur();
    actionManager.trigger('app:context:default');
    findWrapper().setAttribute('data-focused', 'false');
  };

  that = _.extend(that, {
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
