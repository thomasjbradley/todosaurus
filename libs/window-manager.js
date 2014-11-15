var WindowManager = function () {
  "use strict";

  var
    methods = {},
    windows = {}
  ;

  var addMenuItem = function (win) {
    windows[win].menu = new gui.MenuItem({
      label: windows[win].title,
      type: 'checkbox',
      checked: true,
      click: function () {
        windows[win].ref.focus();
      }
    });

    menu.win.append(windows[win].menu);
  }

  var clearMenuChecks = function () {
    var nonTouchableMenuItems = 5,
      totalItems = menu.win.items.length,
      i = nonTouchableMenuItems
    ;

    for (i = nonTouchableMenuItems; i < totalItems; i++) {
      menu.win.items[i].checked = false;
    }
  };

  var checkMenuItem = function (win) {
    clearMenuChecks();
    windows[win].menu.checked = true;
  };

  var unCheckMenuItem = function (win) {
    windows[win].menu.checked = false;
  };

  var register = function (key, title, file, options) {
    windows[key] = {
      ref: false,
      title: title,
      file: file,
      options: options,
      isOpen: false
    };
  };

  var registerMain = function (ref) {
    ref.on('close', function (quit) {
      if (quit) {
        windows['main'].ref.close(true);
      } else {
        windows['main'].ref.hide();
        windows['main'].isOpen = false;
      }
    });
    ref.on('focus', function () {
      menu['win:main'].checked = true;
    });
    ref.on('blur', function () {
      menu['win:main'].checked = false;
    });
    windows['main'] = {
      ref: ref,
      isOpen: true
    };
  };

  var createNewWindow = function (win, urlHash) {
    windows[win].ref = gui.Window.open(windows[win].file + urlHash, windows[win].options);
    windows[win].isOpen = true;
    windows[win].ref.on('close', function () {
      var w = win;
      close(w, true)
    });
    windows[win].ref.on('focus', function () {
      var w = win;
      checkMenuItem(w);
    });
    windows[win].ref.on('blur', function () {
      var w = win;
      unCheckMenuItem(w);
    });
  };

  var openMain = function () {
    windows['main'].ref.show();
    windows['main'].ref.focus();
    windows['main'].isOpen = true;
    menu['win:main'].checked = true;
  };

  var open = function (win, urlHash) {
    urlHash = (!urlHash) ? '' : urlHash;
    clearMenuChecks();

    if (win === 'main') {
      openMain();
      return;
    }

    if (!_.isEmpty(windows[win].ref)) {
      windows[win].ref.focus();
    } else {
      createNewWindow(win, urlHash)
      addMenuItem(win);
    }
  };

  var close = function (win, force) {
    windows[win].ref.close(force);
    windows[win].ref = false;
    windows[win].isOpen = false;
    menu.win.remove(windows[win].menu);
  };

  methods =  {
    register: register,
    registerMain: registerMain,
    open: open,
    close: close
  };

  return methods;
};

// This isn't cool here -- but I don't know where else to put it
wm = new WindowManager();
wm.registerMain(gui.Window.get());

gui.App.on('reopen', function () {
  wm.open('main');
});
