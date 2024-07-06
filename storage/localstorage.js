const LocalStorageHelper = function () {
  "use strict";

  let methods = {};

  const append = (key, data) => {
    let old = localStorage.getItem(key);
    if (_.isEmpty(old)) {
      old = "";
    }
    localStorage.setItem(key, old + "\n" + data.join("\n") + "\n");
  };

  const save = (key, data) => {
    localStorage.setItem(key, data.join("\n") + "\n");
  };

  const read = (key) => {
    let items = [];
    if (!localStorage.getItem(key)) {
      throw new Error("Not found.");
    }
    items = _.map(localStorage.getItem(key).split("\n"), function (item) {
      return item.trim();
    });
    return _.compact(items);
  };

  methods = {
    append: append,
    save: save,
    read: read,
  };
  return methods;
};
