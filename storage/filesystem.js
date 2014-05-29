var FileSystemHelper = function () {
  "use strict";

  var
    isNode = (typeof require !== 'undefined'),
    methods = {},
    fs
  ;

  var save = function (path, data) {
    fs.writeFile(path, data.join('\n'));
  };

  var read = function (path) {
    var
      items = [],
      data = ''
    ;

    try {
      data = fs.readFileSync(path, 'utf-8');
    } catch (e) {
      throw new Error('Not found.');
    }

    items = _.map(data.split('\n'), function (item) {
      return item.trim();
    });

    return _.compact(items);
  };

  methods =  {
    save: save,
    read: read
  };

  if (isNode) {
    fs = require('fs');
  }

  return methods;

};
