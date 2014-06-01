var InterfaceManager = function (focusManager, actionManager) {
  "use strict";

  var
    methods = {},
    elements = {},
    contexts = {}
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

  var handleMouseEvents = function (e) {
    // e.stopPropagation();
    // e.preventDefault();
    // e.stopImmediatePropagation();
    // return false;
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
      bindKeyEvent(elem, function (e, combo) {
        actionManager.trigger(index, e, combo);
      });
    });
  };

  var toggleMenuStates = function (menuStates) {
    _.each(menuStates.enabled, function (item) {
      menu[item].enabled = true;
    });

    _.each(menuStates.disabled, function (item) {
      menu[item].enabled = false;
    });
  };

  var setContext = function (title, ka, ms) {
    contexts[title] = {
      keyActions: ka,
      menuStates: ms
    };
  };

  var switchContext = function (title) {
    reset();
    bindKeyActions(contexts[title].keyActions);

    if (window.isNode) {
      toggleMenuStates(contexts[title].menuStates);
    }
  };

  var add = function (name, elem, events) {
    elements[name] = elem;
  };

  var get = function (name) {
    return elements[name];
  };

  methods =  {
    reset: chainer(reset),
    handleMouseEvents: handleMouseEvents,
    bindKeyEvent: chainer(bindKeyEvent),
    bindKeyEvents: chainer(bindKeyEvents),
    bindKeyActions: chainer(bindKeyActions),
    setContext: chainer(setContext),
    switchContext: chainer(switchContext),
    add: chainer(add),
    get: get
  };

  return methods;
};
