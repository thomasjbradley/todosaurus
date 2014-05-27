var EditControl = function (elem) {
  "use strict";

  var that = InputControl(elem);

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

  that.bindEvents({
    keydown: function (e) {
      switch (e.keyCode) {
        case 13: // Enter
          e.preventDefault();
          if (isCommittable()) {
            commit();
          }
          break;
        case 27: // Esc
        case 9: // Tab
          e.preventDefault();
          discard();
          break;
      }
    }
  });

  return that;
};
