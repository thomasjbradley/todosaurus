var LocalStorageHelper = function () {
  "use strict";

  var
    methods = {}
  ;

  var append = function (key, data) {
    var old = localStorage.getItem(key);

    if (_.isEmpty(old)) {
      old = '';
    }

    localStorage.setItem(key, old + '\n' + data.join('\n'));
  };

  var save = function (key, data) {
    localStorage.setItem(key, data.join('\n'));
  };

  var read = function (key) {
    var items = [];

    if (!localStorage.getItem(key)) {
      throw new Error('Not found.');
    }

    items = _.map(localStorage.getItem(key).split('\n'), function (item) {
      return item.trim();
    });

    return _.compact(items);
  };

  methods =  {
    append: append,
    save: save,
    read: read
  };

  return methods;

};
