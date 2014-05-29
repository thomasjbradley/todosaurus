var ProgressControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  that.set = function (val, max) {
    var percent = Math.round(val / max * 100) || 0;

    that.elem.value = percent;
  };

  return that;
};
