var Control = function (elem, actionManager) {
  "use strict";

  var
    that = {
      keyEvents: []
    },
    events = {},
    eventsBound = false
  ;

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
    if (eventsBound === true) {
      return false;
    }

    if (!_.isUndefined(ev)) {
      events = ev;
    }

    _.each(events, function (callback, key) {
      that.elem.addEventListener(key, callback, false);
    });

    eventsBound = true;
  };

  var bindKeyEvents = function (events) {
    that.keyEvents = that.keyEvents.concat(events);
  };

  var killEvents = function () {
    _.each(events, function (callback, key) {
      that.elem.removeEventListener(key, callback);
    });

    eventsBound = false;
  };

  if (_.isString(elem)) {
    that.elem = document.getElementById(elem);
  };

  that = _.extend(that, {
    chainer: chainer,
    getActionManager: getActionManager,
    bindEvents: chainer(bindEvents),
    bindKeyEvents: chainer(bindKeyEvents),
    killEvents: chainer(killEvents)
  });

  return that;
};
