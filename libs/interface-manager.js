var InterfaceManager = function (focusManager, actionManager) {
  "use strict";

  var methods = {},
    elements = {},
    currentContext = false,
    contexts = {},
    dialogueOpen = false;
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
    Mousetrap.bind(keys, function (e, combo) {
      try {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
      } catch (ex) {
        // Not browser event object
      }
      callback(e, combo);
      return false;
    });
  };

  var bindKeyEvents = function (keys) {
    _.each(keys, function (elem) {
      bindKeyEvent(elem.keys, elem.callback);
    });
  };

  var bindKeyActions = function (keys) {
    _.each(keys, function (elem, index) {
      bindKeyEvent(elem, function (e, combo) {
        if (e !== undefined && Object.hasOwn(e, "bubbles")) {
          e.preventDefault();
        }

        actionManager.trigger(index, e, combo);
      });
    });
  };

  var setContext = function (title, ka, ms, cb) {
    contexts[title] = {
      keyActions: ka,
      menuStates: ms,
      callback: cb,
    };
  };

  var sentContextCallbacks = function (title) {
    _.each(contexts, function (item, key) {
      if (item.callback === undefined) {
        return;
      }

      if (key === title) {
        item.callback(true);
      } else {
        item.callback(false);
      }
    });
  };

  var switchContext = function (title) {
    if (title !== currentContext) {
      reset();
      bindKeyActions(contexts[title].keyActions);
      sentContextCallbacks(title);
      return true;
    }

    currentContext = title;
    return false;
  };

  var add = function (name, elem, events) {
    elements[name] = elem;
  };

  var get = function (name) {
    return elements[name];
  };

  methods = {
    reset: chainer(reset),
    handleMouseEvents: handleMouseEvents,
    bindKeyEvent: chainer(bindKeyEvent),
    bindKeyEvents: chainer(bindKeyEvents),
    bindKeyActions: chainer(bindKeyActions),
    setContext: chainer(setContext),
    switchContext: chainer(switchContext),
    add: chainer(add),
    get: get,
    dialogueOpen: dialogueOpen,
  };

  return methods;
};
