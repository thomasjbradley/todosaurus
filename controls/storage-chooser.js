const StorageChooserControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  that.browserElem = that.elem.querySelector("#local-storage");
  that.folderElem = that.elem.querySelector("#folder-storage");

  const handleStorageClick = (e) => {
    that.getActionManager().trigger("storage:folder:choose", "local-storage", false);
  };

  const handleFolderClick = async (e) => {
    const dir = await window.showDirectoryPicker({
      id: "todosaurus",
      mode: "readwrite",
      startIn: "desktop",
    });
    that.getActionManager().trigger("storage:folder:choose", "file-storage", dir);
  };

  that.show = function () {
    that.elem.setAttribute("data-state", "visible");
    that.browserElem.addEventListener("click", handleStorageClick, false);
    that.folderElem.addEventListener("click", handleFolderClick, false);
    that.browserElem.disabled = false;
    if (!Object.hasOwn(window, "showDirectoryPicker")) {
      that.folderElem.disabled = true;
      that.folderElem.setAttribute(
        "title",
        "This browser does not support the File System API",
      );
    } else {
      that.folderElem.disabled = false;
    }
  };

  that.hide = function () {
    that.elem.setAttribute("data-state", "hidden");
    that.browserElem.removeEventListener("click", handleStorageClick);
    that.folderElem.removeEventListener("click", handleFolderClick);
    that.browserElem.disabled = true;
    that.folderElem.disabled = true;
  };

  return that;
};
