const ListControl = function (elem, actionManager) {
  "use strict";

  let that = Control(elem, actionManager);

  const getMarkedClass = (item) => {
    return item.isMarked() ? " item-complete" : "";
  };

  const hasPriorities = () => {
    that.elem.classList.add("todos-has-priorities");
  };

  const getPriorityClass = (item) => {
    if (item.hasPriority()) {
      hasPriorities();
      return " item-has-priority priority-" + item.getPriority().toLowerCase();
    } else {
      return "";
    }
  };

  const getClasses = (item) => {
    return [getMarkedClass(item), getPriorityClass(item)].join("");
  };

  const findMetadata = (text, tag) => {
    var re = new RegExp("\\s\\" + tag + "[^\\s]+", "ig");
    return _.map(text.match(re), function (item) {
      return item.trim();
    });
  };

  const formatMetadata = (metadata, cssClass) => {
    let pillCssClass = "";
    if (cssClass == "context") {
      pillCssClass = " pill-alt";
    }
    return _.map(metadata, (item) => {
      return [
        '<li class="item-metadata-single item-metadata-single-',
        cssClass,
        " pill",
        pillCssClass,
        '">',
        item,
        "</li>",
      ].join("");
    }).join("");
  };

  const removeMetaData = (text, tags) => {
    const allMeta = _.flatten(
      _.map(tags, function (tag) {
        return findMetadata(text, tag);
      }),
    );
    _.each(allMeta, function (tag) {
      text = text.replace(tag, "");
    });
    return text.trim().replace(/\s+/g, " ");
  };

  const getCompletedDate = (item) => {
    if (item.isMarked()) {
      return (
        '<li class="item-metadata-single item-metadata-single-date pill pill-dull pill-clear">' +
        item.getCompletedDate() +
        "</li>"
      );
    }
    return "";
  };

  const formatText = (item) => {
    let text = item.text();
    const projects = findMetadata(text, "+");
    const contexts = findMetadata(text, "@");
    let textElem;
    let meta;
    text = removeMetaData(text, ["+", "@"]);
    textElem = ['<div class="item-text">', text, "</div>"].join("");
    meta = [
      '<ul class="item-metadata">',
      getCompletedDate(item),
      formatMetadata(projects, "project"),
      formatMetadata(contexts, "context"),
      "</ul>",
    ].join("");
    return textElem + meta;
  };

  const render = (items) => {
    let output;
    that.elem.classList.remove("todos-has-priorities");
    output = _.map(items, (item) => {
      const pieces = [
        '<li class="item',
        getClasses(item),
        '">',
        formatText(item),
        "</li>",
      ];
      return pieces.join("");
    });
    that.elem.innerHTML = output.join("");
  };

  const length = () => {
    return that.elem.querySelectorAll(".item").length;
  };

  const focus = () => {
    that.elem.setAttribute("data-focused", "true");
  };

  const blur = () => {
    that.elem.setAttribute("data-focused", "false");
  };

  const getAllItemElements = () => {
    return that.elem.querySelectorAll(".item");
  };

  const getAllItemElementsWith = (sel) => {
    return that.elem.querySelectorAll(".item" + sel);
  };

  const getItemElement = (index) => {
    return that.elem.querySelectorAll(".item")[index];
  };

  that = _.extend(that, {
    render: that.chainer(render),
    length: length,
    focus: that.chainer(focus),
    blur: that.chainer(blur),
    getAllItemElements: getAllItemElements,
    getAllItemElementsWith: getAllItemElementsWith,
    getItemElement: getItemElement,
  });

  return that;
};
