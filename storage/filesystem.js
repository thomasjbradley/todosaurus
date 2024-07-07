const FileSystemHelper = function (_dir) {
  "use strict";

  let methods = {};
  let dirHandler;
  let todoFile;
  let doneFile;

  const setup = async (dir) => {
    dirHandler = dir;
    todoFile = await dir.getFileHandle("todo.txt", { create: true });
    doneFile = await dir.getFileHandle("done.txt", { create: true });
  };

  const getFile = (path) => {
    if (path.includes("done.txt")) {
      return doneFile;
    }
    return todoFile;
  };

  const getMTime = async () => {
    const file = await todoFile.getFile();
    return new Date(file.lastModified);
  };

  const append = async (path, data) => {
    const file = getFile(path);
    const size = (await file.getFile()).size;
    const writable = await file.createWritable({ keepExistingData: true });
    await writable.write({
      type: "write",
      position: size,
      data: data.join("\n") + "\n",
    });
    await writable.close();
  };

  const save = async (path, data) => {
    const file = getFile(path);
    const writable = await file.createWritable({ keepExistingData: false });
    await writable.write({ type: "write", data: data.join("\n") + "\n" });
    await writable.close();
  };

  const read = async (path) => {
    const creationTime = Math.floor(new Date() / 1000);
    const file = await todoFile.getFile();
    const data = await file.text();
    let items = [];
    if (file.lastModified >= creationTime && data.trim() === "") {
      throw new Error("Not found.");
    }
    items = _.map(data.split("\n"), function (item) {
      return item.trim();
    });
    return _.compact(items);
  };

  methods = {
    setup: setup,
    getMTime: getMTime,
    append: append,
    save: save,
    read: read,
  };

  return methods;
};
