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

  gui.Window.get().on('focus', function () {
    document.body.classList.add('window--has-focus');
  });

  gui.Window.get().on('blur', function () {
    document.body.classList.remove('window--has-focus');
  });
}

yepnope([
{
  test: window.isNode,
  yep: [
    'menus/file.js',
    'menus/edit.js',
    'menus/edit-toggle-priority.js',
    'menus/view.js',
    'menus/view-show-priority.js',
    'bindings/menu.js',
    'menus/menu-manager.js'
  ],
  load: [
    'utils/fuzzy-match.js',
    'libs/focus-manager.js',
    'libs/action-manager.js',
    'libs/interface-manager.js',
    'controls/control.js',
    'controls/list.js',
    'controls/input.js',
    'controls/progress.js',
    'controls/search.js',
    'controls/jump.js',
    'controls/tags-search.js',
    'controls/edit.js',
    'controls/new.js',
    'controls/tags.js',
    'controls/folder-chooser.js',
    'controls/file-chooser.js',
    'libs/orderer.js',
    'libs/grouper.js',
    'libs/filterer.js',
    'models/todo.js',
    'models/todos.js',
    'models/buffer.js',
    'storage/storage-manager.js',
    'storage/localstorage.js',
    'storage/filesystem.js',
    'actions.js',
    'bindings/default.js',
    'bindings/input.js',
    'menus/context-default.js',
    'menus/context-input.js',
    'app.js'
  ]
},
{
  test: (env === 'dev'),
  yep: 'http://localhost:35729/livereload.js'
}
]);
