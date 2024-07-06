const ActionManager = function () {
  "use strict";

  let methods = {};
  const actions = {};

  const action = (action, cb, t) => {
    actions[action] = {
      callback: cb,
      test: t || false,
    };
  };

  const trigger = function (action) {
    if (actions[action].test === false) {
      return actions[action].callback.apply(
        this,
        Array.prototype.slice.call(arguments, 1),
      );
    }
    if (actions[action].test() === true) {
      return actions[action].callback.apply(
        this,
        Array.prototype.slice.call(arguments, 1),
      );
    }
  };

  methods = {
    action: action,
    trigger: trigger,
  };
  return methods;
};
