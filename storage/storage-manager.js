const StorageManager = function () {
  "use strict";

  const todos = "todo.txt";
  const done = "done.txt";
  let folder = "";
  let methods = {};
  const subscriptions = [];
  let storage;

  const errors = {
    NO_FOLDER: "1",
    NOT_FOUND: "2",
  };

  const getPath = () => {
    return folder + "/" + todos;
  };

  const getArchivePath = () => {
    return folder + "/" + done;
  };

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(filtered);
    });
  };

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  const informer = (func) => {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  const isFolderSaved = () => {
    const savedFolder = localStorage.getItem("folder");
    if (!savedFolder || _.isEmpty(savedFolder)) {
      return false;
    } else {
      folder = savedFolder;
      return true;
    }
  };

  const set = (s) => {
    storage = s;
  };

  const getFolder = (f) => {
    return folder;
  };

  const setFolder = (f) => {
    localStorage.setItem("folder", f);
    folder = f;
  };

  const getMTime = async () => {
    if (storage) {
      return await storage.getMTime();
    }
    return new Date();
  };

  const save = async (data) => {
    storage.save(getPath(), data);
  };

  const saveArchive = async (data) => {
    storage.append(getArchivePath(), data);
  };

  const read = async (callback) => {
    let data;
    if (!isFolderSaved()) {
      callback(new Error(errors.NO_FOLDER));
      return;
    }
    try {
      data = await storage.read(getPath());
    } catch (e) {
      callback(new Error(errors.NOT_FOUND));
      return;
    }
    callback(null, data);
  };

  methods = {
    errors: errors,
    subscribe: chainer(subscribe),
    set: chainer(set),
    getFolder: getFolder,
    setFolder: chainer(setFolder),
    getPath: getPath,
    getMTime: getMTime,
    save: save,
    saveArchive: saveArchive,
    read: read,
  };
  return methods;
};
