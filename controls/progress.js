const ProgressControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  that.set = function (val, max) {
    that.elem.value = Math.round((val / max) * 100) || 0;
  };

  return that;
};
