const LocalStorageHelper = function () {
  "use strict";

  let methods = {};

  const getMTime = async () => {
    return new Date(localStorage.getItem("mtime"));
  };

  const append = async (key, data) => {
    let old = localStorage.getItem(key);
    if (_.isEmpty(old)) {
      old = "";
    }
    localStorage.setItem(key, old + "\n" + data.join("\n") + "\n");
  };

  const save = async (key, data) => {
    localStorage.setItem(key, data.join("\n") + "\n");
  };

  const read = async (key) => {
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
    getMTime: getMTime,
    append: append,
    save: save,
    read: read,
  };
  return methods;
};
