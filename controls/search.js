const SearchControl = function (elem, actionManager) {
  "use strict";

  let that = InputControl(elem, actionManager);

  that.bindEvents([
    {
      event: "keyup",
      callback: function (e) {
        that.getActionManager().trigger("app:search:trigger");
      },
    },
    {
      event: "focus",
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:search:focus");
      },
      forever: true,
    },
    {
      event: "blur",
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:search:blur");
      },
      forever: true,
    },
  ]);

  that.bindKeyEvents([
    {
      keys: ["enter", "tab", "shift+tab"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:search:blur");
      },
    },
    {
      keys: ["esc", "ctrl+l", "command+l"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("app:search:blur");
        that.getActionManager().trigger("app:search:clear");
      },
    },
  ]);

  that.playEvents();

  return that;
};
