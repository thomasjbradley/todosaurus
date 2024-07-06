const TagsControl = function (elem, actionManager, opts) {
  "use strict";

  let that = Control(elem, actionManager);
  const tags = that.elem.querySelector(".tags");
  const noTags = that.elem.querySelector(".no-tags");
  let options = {
    pillClass: "",
  };

  options = _.extend(options, opts);

  const populateList = (items) => {
    var output = _.map(items, (item) => {
      var pieces = [
        '<li><span class="pill ',
        options.pillClass,
        ' tag">',
        item,
        "</span></li>",
      ];
      return pieces.join("");
    });
    tags.innerHTML = output.join("");
  };

  const deactivateAll = () => {
    _.each(tags.querySelectorAll('[data-state="active"]'), function (item) {
      item.setAttribute("data-state", "inactive");
    });
  };

  const activate = (id) => {
    tags.querySelectorAll("li")[id].setAttribute("data-state", "active");
  };

  const show = () => {
    tags.setAttribute("data-state", "visible");
    noTags.setAttribute("data-state", "hidden");
  };

  const hide = () => {
    tags.setAttribute("data-state", "hidden");
    noTags.setAttribute("data-state", "visible");
  };

  const render = (items, active) => {
    if (_.isEmpty(items)) {
      hide();
    } else {
      populateList(items, active);
      show();
    }
  };

  that = _.extend(that, {
    deactivateAll: that.chainer(deactivateAll),
    activate: that.chainer(activate),
    show: that.chainer(show),
    hide: that.chainer(hide),
    render: that.chainer(render),
  });

  return that;
};
