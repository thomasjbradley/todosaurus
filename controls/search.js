var SearchControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);
  that.timer = null;

  that.triggerSearch = function () {
    that.getActionManager().trigger('app:search:trigger');
  };

  that.bindEvents([
    {
      event: 'keyup',
      callback: function (e) {
        clearInterval(that.timer);
        that.timer = setInterval(that.triggerSearch, 70);
      }
    },
    {
      event: 'focus',
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:focus');
      },
      forever: true
    },
    {
      event: 'blur',
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:blur');
      },
      forever: true
    }
  ]);

  that.bindKeyEvents([
    {
      keys: ['enter', 'tab', 'shift+tab'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:blur');
      }
    },
    {
      keys: ['esc', 'ctrl+l', 'command+l'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:blur');
        that.getActionManager().trigger('app:search:clear');
      }
    }
  ]);

  that.playEvents();

  return that;
};
