const FileChooserControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  that.input = that.elem.querySelector("#new-file");
  that.switch = that.elem.querySelector("#switch-folder");

  const handleClickOnInput = (e) => {
    that.getActionManager().trigger("storage:file:new");
    that.input.value = "";
  };

  const handleClickOnSwitch = (e) => {
    that.getActionManager().trigger("storage:folder:change");
    that.input.value = "";
  };

  that.show = function (path) {
    that.input.addEventListener("click", handleClickOnInput, false);
    that.switch.addEventListener("click", handleClickOnSwitch, false);
    that.input.disabled = false;
    that.switch.disabled = false;
    that.elem.setAttribute("data-state", "visible");
    that.elem.querySelector("#folder-path").innerHTML = path.replace(
      /\/Users\/[^\/]+/,
      "~"
    );
    that.input.focus();
  };

  that.hide = function () {
    that.elem.setAttribute("data-state", "hidden");
    that.input.removeEventListener("click", handleClickOnInput);
    that.switch.removeEventListener("click", handleClickOnSwitch);
    that.input.disabled = true;
    that.switch.disabled = true;
  };

  return that;
};
