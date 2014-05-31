var
  gui,
  script,
  env
  _ = window._ || require('lodash'),
  menuFiles = [
    'menu-manager',
    'file',
    'edit',
    'edit-assign-project',
    'edit-assign-context',
    'edit-assign-priority',
    'view',
    'view-show-project',
    'view-show-context',
    'view-show-priority'
  ]
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
    script = document.createElement('script');
    script.src = 'http://localhost:35729/livereload.js';
    document.body.appendChild(script);
  }

  _.each(menuFiles, function (item) {
    script = document.createElement('script');
    script.src = 'menus/' + item + '.js';
    document.body.appendChild(script);
  });

  gui.Window.get().on('focus', function () {
    document.body.classList.add('window--has-focus');
  });

  gui.Window.get().on('blur', function () {
    document.body.classList.remove('window--has-focus');
  });
}
