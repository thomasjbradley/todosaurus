var StorageManager = function () {
  "use strict";

  var
    todos = 'todo.txt',
    done = 'done.txt',
    folder = '',
    methods = {},
    subscriptions = [],
    storage
  ;

  var errors = {
    NO_FOLDER: '1',
    NOT_FOUND: '2'
  };

  var getPath = function () {
    return folder + '/' + todos;
  };

  var getArchivePath = function () {
    return folder + '/' + done;
  };

  var subscribe = function (callback) {
    subscriptions.push(callback);
  };

  var inform = function () {
    subscriptions.forEach(function (callback) {
      callback(filtered);
    });
  };

  var chainer = function (func) {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  var informer = function (func) {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  var isFolderSaved = function () {
    var savedFolder = localStorage.getItem('folder');

    if (!savedFolder || _.isEmpty(savedFolder)) {
      return false;
    } else {
      folder = savedFolder;
      return true;
    }
  };

  var set = function (s) {
    storage = s;
  };

  var getFolder = function (f) {
    return folder;
  }

  var setFolder = function (f) {
    localStorage.setItem('folder', f);
    folder = f;
  }

  var save = function (data) {
    storage.save(getPath(), data);
  };

  var saveArchive = function (data) {
    storage.append(getArchivePath(), data);
  };

  var read = function (callback) {
    var data;

    if (!isFolderSaved()) {
      callback(new Error(errors.NO_FOLDER));
      return;
    }

    try {
      data = storage.read(getPath());
    } catch (e) {
      callback(new Error(errors.NOT_FOUND));
      return;
    }

    callback(null, data);
  };

  methods =  {
    errors: errors,
    subscribe: chainer(subscribe),
    set: chainer(set),
    getFolder: getFolder,
    setFolder: chainer(setFolder),
    getPath: getPath,
    save: chainer(save),
    saveArchive: chainer(saveArchive),
    read: read
  };

  return methods;

};
