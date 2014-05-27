var LocalStorageHelper = function () {
  "use strict";

  var
    methods = {}
  ;

  var save = function (key, data) {
    localStorage.setItem(key, data.join('\n'));
  };

  var read = function (key) {
    return _.compact(localStorage.getItem(key).split('\n'));
  };

  methods =  {
    save: save,
    read: read
  };

  return methods;

};
