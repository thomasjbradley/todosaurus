var InterfaceManager = function () {
  "use strict";

  var
    methods = {},
    elements = {}
  ;

  var addEvents = function (elem, events) {
    _.each(events, function (callback, ev) {
      elem.addEventListener(ev, callback, false);
    });
  };

  var add = function (name, elem, events) {
    addEvents(elem, events);
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
