var NewControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager);

  var isCommittable = function () {
    return that.value();
  };

  var commit = function () {
    that.getActionManager().trigger('app:new:hide');

    return that.getActionManager().trigger('item:update', that.value());
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
      keys: ['mod+enter'],
      callback: function (e) {
        e.preventDefault();

        if (isCommittable()) {
          commit();
        }
      }
    },
    {
      keys: ['enter', 'tab'],
      callback: function (e) {
        var goNext;

        e.preventDefault();

        if (isCommittable()) {
          goNext = commit();

          if (goNext) {
            that.getActionManager().trigger('item:new:after');
          }
        }
      }
    },
    {
      keys: ['shift+tab', 'shift+enter'],
      callback: function (e) {
        var goNext;

        e.preventDefault();

        if (isCommittable()) {
          goNext = commit();

          if (goNext) {
            that.getActionManager().trigger('item:new:before');
          }
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
