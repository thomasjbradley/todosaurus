const InterfaceManager = function (focusManager, actionManager) {
  "use strict";

  let methods = {};
  let elements = {};
  let currentContext = false;
  let contexts = {};
  let dialogueOpen = false;

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  const reset = () => {
    Mousetrap.reset();
  };

  const handleMouseEvents = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    // e.stopImmediatePropagation();
    // return false;
  };

  const bindKeyEvent = (keys, callback) => {
    Mousetrap.bind(keys, (e, combo) => {
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

  const bindKeyEvents = (keys) => {
    _.each(keys, function (elem) {
      bindKeyEvent(elem.keys, elem.callback);
    });
  };

  const bindKeyActions = (keys) => {
    _.each(keys, function (elem, index) {
      bindKeyEvent(elem, function (e, combo) {
        if (e !== undefined && Object.hasOwn(e, "bubbles")) {
          e.preventDefault();
        }
        actionManager.trigger(index, e, combo);
      });
    });
  };

  const setContext = (title, ka, cb) => {
    contexts[title] = {
      keyActions: ka,
      callback: cb,
    };
  };

  const sentContextCallbacks = (title) => {
    _.each(contexts, (item, key) => {
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

  const switchContext = (title) => {
    if (title !== currentContext) {
      reset();
      bindKeyActions(contexts[title].keyActions);
      sentContextCallbacks(title);
      return true;
    }
    currentContext = title;
    return false;
  };

  const add = (name, elem, events) => {
    elements[name] = elem;
  };

  const get = (name) => {
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
