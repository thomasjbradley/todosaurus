var TagsSearchControl = function (elem, actionManager) {
  "use strict";

  var that = InputControl(elem, actionManager),
    label = document.getElementById("tags-search-label"),
    activeGroup = false;
  var changeLabel = function () {
    if (activeGroup == "+") {
      label.classList.add("i-project");
      label.classList.remove("i-context");
    } else {
      label.classList.add("i-context");
      label.classList.remove("i-project");
    }
  };

  var group = function (g) {
    if (g === undefined) {
      return activeGroup;
    } else {
      activeGroup = g;
      changeLabel();
      return that;
    }
  };

  that.bindEvents([
    {
      event: "keyup",
      callback: function (e) {
        if (that.isVisible()) {
          that.getActionManager().trigger("tags:search:trigger");
        }
      },
    },
    {
      event: "blur",
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("tags:search:hide");
      },
    },
  ]);

  that.bindKeyEvents([
    {
      keys: ["enter", "tab", "shift+tab"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("tags:search:hide");
      },
    },
    {
      keys: ["esc"],
      callback: function (e) {
        e.preventDefault();
        that.getActionManager().trigger("tags:search:hide");
        that.getActionManager().trigger("tags:clear");
      },
    },
  ]);

  that = _.extend(that, {
    group: group,
  });

  return that;
};
