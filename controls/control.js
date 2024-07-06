const Control = function (elem, actionManager) {
  "use strict";

  let that = {
    keyEvents: [],
    events: [],
    eventsBound: false,
  };

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return that;
    };
  };

  const getActionManager = () => {
    return actionManager;
  };

  const bindEvents = (ev) => {
    that.events = that.events.concat(ev);
  };

  const bindKeyEvents = (events) => {
    that.keyEvents = that.keyEvents.concat(events);
  };

  const playEvents = () => {
    if (that.eventsBound === true) {
      return;
    }
    _.each(that.events, (item) => {
      that.elem.addEventListener(item.event, item.callback, false);
    });
    _.each(that.keyEvents, (item) => {
      Mousetrap.bind(item.keys, item.callback);
    });
    that.eventsBound = true;
  };

  const stopEvents = () => {
    if (that.eventsBound === false) {
      return;
    }
    _.each(that.events, (item) => {
      if (item.forever === undefined || item.forever === false) {
        that.elem.removeEventListener(item.event, item.callback);
      }
    });
    _.each(that.keyEvents, (item) => {
      Mousetrap.unbind(item.keys);
    });
    that.eventsBound = false;
  };

  if (_.isString(elem)) {
    that.elem = document.getElementById(elem);
  }

  that = _.extend(that, {
    chainer: chainer,
    getActionManager: getActionManager,
    bindEvents: chainer(bindEvents),
    bindKeyEvents: chainer(bindKeyEvents),
    playEvents: chainer(playEvents),
    stopEvents: chainer(stopEvents),
  });

  return that;
};
