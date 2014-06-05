var EditControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);

  var isCommittable = function () {
    return that.value();
  };

  var commit = function () {
    that.getActionManager().trigger('app:edit:hide');

    return that.getActionManager().trigger('item:update', that.value());
  };

  var discard = function () {
    return that.getActionManager().trigger('app:edit:hide');
  };

  var commitOrDiscard = function (isCommittable) {
    if (isCommittable) {
      return commit();
    } else {
      return discard();
    }
  };

  that.bindEvents([
    {
      event: 'blur',
      callback: function (e) {
        e.preventDefault();
        commitOrDiscard(isCommittable());
      }
    }
  ]);

  that.bindKeyEvents([
    {
      keys: ['enter', 'mod+enter'],
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
        var goNext;

        e.preventDefault();
        goNext = commitOrDiscard(isCommittable());

        if (goNext) {
          that.getActionManager().trigger('item:edit:after');
        }
      }
    },
    {
      keys: ['shift+tab'],
      callback: function (e) {
        var goNext;

        e.preventDefault();
        goNext = commitOrDiscard(isCommittable());

        if (goNext) {
          that.getActionManager().trigger('item:edit:before');
        }
      }
    },
    {
      keys: ['mod+del', 'mod+backspace'],
      callback: function (e) {
        e.preventDefault();
        discard();
        that.getActionManager().trigger('item:delete');
      }
    },
  ]);

  return that;
};
