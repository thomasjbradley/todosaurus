var SearchControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);

  that.bindEvents({
    keyup: function (e) {
      that.getActionManager().trigger('app:search:trigger');
    },
    focus: function (e) {
      e.preventDefault();
      that.getActionManager().trigger('app:search:focus');
    },
    blur: function (e) {
      e.preventDefault();
      that.getActionManager().trigger('app:search:blur');
    }
  });

  that.bindKeyEvents([
    {
      keys: ['enter', 'return', 'tab', 'shift+tab'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:blur');
      }
    },
    {
      keys: ['esc'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('app:search:clear');
      }
    }
  ]);

  return that;
};
