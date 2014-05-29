var FileSystemHelper = function () {
  "use strict";

  var
    isNode = (typeof require !== 'undefined'),
    methods = {},
    path = '/Users/thomasjbradley/Dropbox/Todoifer',
    fs
  ;

  var save = function (key, data) {
    fs.writeFile(path + '/' + key, data.join('\n'));
  };

  var read = function (key) {
    var
      items = [],
      data = ''
    ;

    try {
      data = fs.readFileSync(path + '/' + key, 'utf-8');
    } catch (e) {

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
