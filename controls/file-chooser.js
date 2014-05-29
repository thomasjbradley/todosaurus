var FileChooserControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  that.input = that.elem.querySelector('#new-file');
  that.switch = that.elem.querySelector('#switch-folder');

  var handleClickOnInput = function (e) {
    that.getActionManager().trigger('storage:file:new');
  };

  var handleClickOnSwitch = function (e) {
    that.getActionManager().trigger('storage:folder:switch');
  }

  that.show = function (path) {
    that.input.addEventListener('click', handleClickOnInput, false);
    that.switch.addEventListener('click', handleClickOnSwitch, false);
    that.elem.setAttribute('data-state', 'visible');
    that.elem.querySelector('#folder-path').innerHTML = path.replace(/\/Users\/[^\/]+/, '~');
    that.input.focus();
  };

  that.hide = function () {
    that.elem.setAttribute('data-state', 'hidden');
    that.input.removeEventListener('click', handleClickOnInput);
    that.switch.removeEventListener('click', handleClickOnSwitch);
  };

  return that;
};
