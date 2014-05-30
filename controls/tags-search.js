var TagsSearchControl = function (elem, actionManager) {
  "use strict";

  var
    that = InputControl(elem, actionManager),
    group = false
  ;

  var group = function (g) {
    if (_.isUndefined(g)) {
      return group;
    } else {
      group = g;
      return that;
    }
  };

  that.bindEvents({
    keyup: function (e) {
      if (that.isVisible()) {
        that.getActionManager().trigger('tags:search:trigger');
      }
    },
    blur: function (e) {
      e.preventDefault();
      that.getActionManager().trigger('tags:search:hide');
    }
  });

  that.bindKeyEvents([
    {
      keys: ['enter', 'return', 'tab', 'shift+tab'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('tags:search:hide');
      }
    },
    {
      keys: ['esc'],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger('tags:search:hide');
        that.getActionManager().trigger('tags:clear');
      }
    }
  ]);

  that = _.extend(that, {
    group: group
  });

  return that;
};
