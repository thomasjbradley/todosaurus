var Control = function (elem, actionManager) {
  "use strict";

  var that = {
    keyEvents: [],
    events: [],
    eventsBound: false,
  };

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return that;
    };
  };

  var getActionManager = function () {
    return actionManager;
  };

  var bindEvents = function (ev) {
    that.events = that.events.concat(ev);
  };

  var bindKeyEvents = function (events) {
    that.keyEvents = that.keyEvents.concat(events);
  };

  var playEvents = function () {
    if (that.eventsBound === true) {
      return;
    }

    _.each(that.events, function (item) {
      that.elem.addEventListener(item.event, item.callback, false);
    });

    _.each(that.keyEvents, function (item) {
      Mousetrap.bind(item.keys, item.callback);
    });

    that.eventsBound = true;
  };

  var stopEvents = function () {
    if (that.eventsBound === false) {
      return;
    }

    _.each(that.events, function (item) {
      if (item.forever === undefined || item.forever === false) {
        that.elem.removeEventListener(item.event, item.callback);
      }
    });

    _.each(that.keyEvents, function (item) {
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
