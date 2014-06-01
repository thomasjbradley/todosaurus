var
  gui,
  script,
  env,
  bindings = {},
  GuiMenu,
  menu = {},
  menuContexts = {},
  clipboard,
  _ = window._ || require('lodash')
;

window.isNode = !!(typeof require !== 'undefined');

if (window.isNode) {
  env = process.env.ENV || 'prod';
  gui = require('nw.gui');

  onload = function() {
    gui.Window.get().show();
    gui.Window.get().focus();
  };

  if (env === 'dev') {
    gui.Window.get().showDevTools();
  }

  GuiMenu = new gui.Menu({ type: 'menubar' });
  gui.Window.get().menu = GuiMenu;
  clipboard = gui.Clipboard.get();

  gui.Window.get().on('focus', function () {
    document.body.classList.add('window--has-focus');
  });

  gui.Window.get().on('blur', function () {
    document.body.classList.remove('window--has-focus');
  });
}

