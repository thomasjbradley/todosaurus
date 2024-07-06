const JumpControl = function (elem, actionManager) {
  "use strict";

  let that = InputControl(elem, actionManager);

  that.bindEvents([
    {
      event: "keyup",
      callback: function (e) {
        if (that.isVisible()) {
          that.getActionManager().trigger("app:jump:trigger");
        }
      },
    },
    {
      event: "blur",
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:jump:hide");
      },
    },
  ]);

  that.bindKeyEvents([
    {
      keys: ["enter", "tab", "shift+tab"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:jump:hide");
      },
    },
    {
      keys: ["esc"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:jump:hide");
      },
    },
  ]);

  return that;
};
