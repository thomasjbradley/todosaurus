var
  gui,
  script,
  env,
  bindings = {},
  GuiMenu,
  menu = {},
  clipboard,
  _ = window._ || require('lodash')
;

window.isNode = !!(typeof require !== 'undefined');

if (window.isNode) {
  env = process.env.ENV || 'prod';
  gui = require('nw.gui');

  if (env !== 'dev') {
    onload = function() {
      gui.Window.get().show();
      gui.Window.get().focus();
    };
  }

  if (env === 'dev') {
    gui.Window.get().show();
    gui.Window.get().showDevTools();
  }

  GuiMenu = new gui.Menu({ type: 'menubar' });
  gui.Window.get().menu = GuiMenu;
  clipboard = gui.Clipboard.get();

  yepnope({
    test: (env === 'dev'),
    yep: 'http://localhost:35729/livereload.js',
    load: [
      'menus/file.js',
      'menus/edit.js',
      'menus/edit-toggle-priority.js',
      'menus/view.js',
      'menus/view-show-priority.js',
      'menus/menu-manager.js'
    ]
  });

  gui.Window.get().on('focus', function () {
    document.body.classList.add('window--has-focus');
  });

  gui.Window.get().on('blur', function () {
    document.body.classList.remove('window--has-focus');
  });
}
