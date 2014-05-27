var EditControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);

  var isCommittable = function () {
    return that.value();
  };

  var commit = function () {
    that.getActionManager().trigger('item:update', that.value());
    that.getActionManager().trigger('app:edit:hide');
  };

  var discard = function () {
    that.getActionManager().trigger('app:edit:hide');
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
      keys: ['enter', 'return'],
      callback: function (e) {
        e.preventDefault();

        if (isCommittable()) {
          commit();
        }
      }
    },
    {
      keys: ['esc'],
      callback: function (e) {
        e.preventDefault();
        discard();
      }
    },
    {
      keys: ['tab'],
      callback: function (e) {
        e.preventDefault();
        commitOrDiscard(isCommittable());
        that.getActionManager().trigger('item:edit:after');
      }
    },
    {
      keys: ['shift+tab'],
      callback: function (e) {
        e.preventDefault();
        commitOrDiscard(isCommittable());
        that.getActionManager().trigger('item:edit:before');
      }
    },
    {
      keys: ['mod+del', 'mod+backspace'],
      callback: function (e) {
        e.preventDefault();
        discard();
        that.getActionManager().trigger('item:remove');
      }
    },
  ]);

  return that;
};
