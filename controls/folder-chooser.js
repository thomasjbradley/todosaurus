const FolderChooserControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  that.input = that.elem.querySelector("#chosen-folder");

  const handleChangeOnInput = (e) => {
    that.getActionManager().trigger("storage:folder:choose");
  };

  that.show = function () {
    that.input.value = "";
    that.input.addEventListener("change", handleChangeOnInput, false);
    that.elem.setAttribute("data-state", "visible");
    that.input.disabled = false;
    that.input.focus();
  };

  that.hide = function () {
    that.elem.setAttribute("data-state", "hidden");
    that.input.removeEventListener("change", handleChangeOnInput);
    that.input.disabled = true;
  };

  that.getFiles = function () {
    return that.input.files;
  };

  that.showInvisible = function () {
    that.input.value = "";
    that.input.disabled = false;
    that.input.addEventListener("change", handleChangeOnInput, false);
  };

  return that;
};
