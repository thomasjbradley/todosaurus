var Control = function (elem, actionManager) {
  "use strict";

  var
    that = {},
    keyEvents = []
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

  var bindEvents = function (events) {
    _.each(events, function (callback, key) {
      that.elem.addEventListener(key, callback, false);
    });
  };

  var bindKeyEvents = function (events) {
    that.keyEvents = events;
  };

  if (_.isString(elem)) {
    that.elem = document.getElementById(elem);
  };

  that = _.extend(that, {
    chainer: chainer,
    getActionManager: getActionManager,
    bindEvents: chainer(bindEvents),
    bindKeyEvents: chainer(bindKeyEvents)
  });

  return that;
};
