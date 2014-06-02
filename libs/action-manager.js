var ActionManager = function () {
  "use strict";

  var
    methods = {},
    actions = {}
  ;

  var action = function (action, cb, t) {
    actions[action] = {
      callback: cb,
      test: t || false
    };
  };

  var trigger = function (action) {
    if (actions[action].test === false) {
      actions[action].callback.apply(this, Array.prototype.slice.call(arguments, 1))
      return;
    }

    if (actions[action].test() === true) {
      actions[action].callback.apply(this, Array.prototype.slice.call(arguments, 1))
    }
  };

  methods =  {
    action: action,
    trigger: trigger
  };

  return methods;
};
