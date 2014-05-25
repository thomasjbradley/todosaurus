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
    actions[action]();
  };

  methods =  {
    action: action,
    trigger: trigger
  };

  return methods;
};
