var InterfaceManager = function () {
  "use strict";

  var
    methods = {},
    elements = {}
  ;

  var add = function (name, elem) {
    elements[name] = elem;
  };

  var get = function (name) {
    return elements[name];
  };

  var focus = function (name) {
    elements[name].focus();
  };

  var blur = function (name) {
    elements[name].blur();
  };

  methods =  {
    add: add,
    get: get,
    focus: focus,
    blur: blur
  };

  return methods;
};
