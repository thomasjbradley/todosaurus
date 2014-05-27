var Storage = function () {
  "use strict";

  var
    methods = {},
    storage
  ;

  var set = function (s) {
    storage = s;
  };

  var save = function (key, data) {
    storage.save(key, data);
  };

  var read = function (key) {
    return storage.read(key);
  };

  methods =  {
    set: set,
    save: save,
    read: read
  };

  return methods;

};
