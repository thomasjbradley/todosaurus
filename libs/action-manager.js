var ActionManager = function () {
  "use strict";

  var
    methods = {},
    actions = {}
  ;

  var action = function (action, callback) {
    actions[action] = callback;
  };

  var trigger = function (action) {
    actions[action].apply(this, Array.prototype.slice.call(arguments, 1));
  };

  methods =  {
    action: action,
    trigger: trigger
  };

  return methods;
};
