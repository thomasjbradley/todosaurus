var SearchControl = function (elem) {
  "use strict";

  var that = InputControl(elem);

  that.bindEvents({
    keyup : function (e) {
      that.getActionManager().trigger('app:search:trigger');
    },
    keydown: function (e) {
      switch (e.keyCode) {
        case 13: // Enter
        case 9: // Tab
          e.preventDefault();
          that.getActionManager().trigger('app:search:blur');
          break;
        case 27: // Esc
          e.preventDefault();
          that.getActionManager().trigger('app:search:clear');
          break;
      }
    }
  });

  return that;

  // return new InputControl(elem, {
  //   keybindings: [
  //     {
  //       keys: [],
  //       callback: function (e) {

  //       }
  //     }
  //   ]
  // });
};
