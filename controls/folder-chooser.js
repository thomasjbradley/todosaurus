var FolderChooserControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  that.input = that.elem.querySelector('#chosen-folder');

  var handleChangeOnInput = function (e) {
    that.getActionManager().trigger('storage:folder:choose');
  };

  that.show = function () {
    that.input.addEventListener('change', handleChangeOnInput, false);
    that.elem.setAttribute('data-state', 'visible');
    that.input.focus();
  };

  that.hide = function () {
    that.elem.setAttribute('data-state', 'hidden');
    that.input.removeEventListener('change', handleChangeOnInput);
  };

  that.getFiles = function () {
    return that.input.files;
  };

  return that;
};
