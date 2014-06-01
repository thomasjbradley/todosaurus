var NewControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);

  var isCommittable = function () {
    return that.value();
  };

  var commit = function () {
    that.getActionManager().trigger('app:new:hide');
    that.getActionManager().trigger('item:update', that.value());
  };

  var discard = function () {
    that.getActionManager().trigger('app:new:hide');
    that.getActionManager().trigger('item:delete');
  };

  var commitOrDiscard = function (isCommittable) {
    if (isCommittable) {
      commit();
    } else {
      discard();
    }
  };

  that.bindEvents({
    blur: function (e) {
      e.preventDefault();
      commitOrDiscard(isCommittable());
    }
  });

  that.bindKeyEvents([
    {
      keys: ['mod+enter', 'mod+return'],
      callback: function (e) {
        e.preventDefault();
        if (isCommittable()) {
          commit();
        }
      }
    },
    {
      keys: ['enter', 'return', 'tab'],
      callback: function (e) {
        e.preventDefault();
        if (isCommittable()) {
          commit();
          that.getActionManager().trigger('item:new:after');
        }
      }
    },
    {
      keys: ['shift+tab', 'shift+enter', 'shift+return'],
      callback: function (e) {
        e.preventDefault();
        if (isCommittable()) {
          commit();
          that.getActionManager().trigger('item:new:before');
        }
      }
    },
    {
      keys: ['esc', 'mod+del', 'mod+backspace'],
      callback: function (e) {
        e.preventDefault();
        discard();
      }
    }
  ]);

  return that;
};
