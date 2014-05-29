var ProgressControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  that.set = function (val, max) {
    console.log(val, max);
    that.elem.value = Math.round(val / max * 100);
  };

  return that;
};
