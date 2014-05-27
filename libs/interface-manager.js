var InterfaceManager = function (focusManager, actionManager) {
  "use strict";

  var
    methods = {},
    elements = {},
    defaultKeys
  ;

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  var reset = function () {
    Mousetrap.reset();
  };

  var bindKeyEvent = function (keys, callback) {
    Mousetrap.bind(keys, callback);
  };

  var bindKeyEvents = function (keys) {
    _.each(keys, function (elem) {
      bindKeyEvent(elem.keys, elem.callback);
    });
  };

  var bindKeyActions = function (keys) {
    _.each(keys, function (elem, index) {
      bindKeyEvent(elem, function (e) {
        actionManager.trigger(index, e);
      });
    });
  };

  var bindDefaultKeyActions = function (keys) {
    if (!_.isUndefined(keys)) {
      defaultKeys = keys;
    }

    bindKeyActions(defaultKeys);
  };

  var add = function (name, elem, events) {
    elements[name] = elem;
  };

  var get = function (name) {
    return elements[name];
  };

  methods =  {
    reset: chainer(reset),
    bindKeyEvent: chainer(bindKeyEvent),
    bindKeyEvents: chainer(bindKeyEvents),
    bindKeyActions: chainer(bindKeyActions),
    bindDefaultKeyActions: chainer(bindDefaultKeyActions),
    add: chainer(add),
    get: get
  };

  return methods;
};
