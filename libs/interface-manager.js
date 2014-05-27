var InterfaceManager = function (focusManager, actionManager) {
  "use strict";

  var
    methods = {},
    elements = {}
  ;

  // var addEvents = function (elem, events) {
  //   _.each(events, function (callback, ev) {
  //     elem.addEventListener(ev, callback, false);
  //   });
  // };

  var bindActionManager = function (elem) {
    if (!_.isUndefined(elem.bindActionManager)) {
      elem.bindActionManager(actionManager);
    }
  };

  var add = function (name, elem, events) {
    // addEvents(elem, events);
    bindActionManager(elem);
    elements[name] = elem;
  };

  var get = function (name) {
    return elements[name];
  };

  methods =  {
    add: add,
    get: get
  };

  return methods;
};
