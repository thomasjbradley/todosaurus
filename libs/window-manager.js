var WindowManager = function () {
  "use strict";

  var
    methods = {},
    windows = {}
  ;

  var register = function (key, file, options) {
    windows[key] = {
      ref: false,
      file: file,
      options: options
    };
  };

  var open = function (win, urlHash) {
    urlHash = (!urlHash) ? '' : urlHash;

    if (!_.isEmpty(windows[win].ref)) {
      windows[win].ref.focus();
    } else {
      windows[win].ref = gui.Window.open(windows[win].file + urlHash, windows[win].options);
      windows[win].ref.on('close', function () {
        var w = win;
        close(win, true)
      });
    }
  };

  var close = function (win, force) {
    windows[win].ref.close(force);
    windows[win].ref = false;
  };

  methods =  {
    register: register,
    open: open,
    close: close
  };

  return methods;
};

// This isn't cool -- but I don't know where else to put it
wm = new WindowManager();
