var
  gui,
  script,
  env,
  bindings = {},
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

  yepnope({
    test: (env === 'dev'),
    yep: 'http://localhost:35729/livereload.js',
    load: [
      'menus/menu-manager.js',
      'menus/file.js',
      'menus/edit.js',
      'menus/edit-assign-project.js',
      'menus/edit-assign-context.js',
      'menus/edit-assign-priority.js',
      'menus/view.js',
      'menus/view-show-project.js',
      'menus/view-show-context.js',
      'menus/view-show-priority.js'
    ]
  });

  gui.Window.get().on('focus', function () {
    document.body.classList.add('window--has-focus');
  });

  gui.Window.get().on('blur', function () {
    document.body.classList.remove('window--has-focus');
  });
}
