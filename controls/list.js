var ListControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var getMarkedClass = function (item) {
    return item.isMarked() ? " item-complete" : "";
  };

  var hasPriorities = function () {
    that.elem.classList.add("todos-has-priorities");
  };

  var getPriorityClass = function (item) {
    if (item.hasPriority()) {
      hasPriorities();
      return " item-has-priority priority-" + item.getPriority().toLowerCase();
    } else {
      return "";
    }
  };

  var getClasses = function (item) {
    return [getMarkedClass(item), getPriorityClass(item)].join("");
  };

  var findMetadata = function (text, tag) {
    var re = new RegExp("\\s\\" + tag + "[^\\s]+", "ig");

    return _.map(text.match(re), function (item) {
      return item.trim();
    });
  };

  var formatMetadata = function (metadata, cssClass) {
    var pillCssClass = "";

    if (cssClass == "context") {
      pillCssClass = " pill-alt";
    }

    return _.map(metadata, function (item) {
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

  var removeMetaData = function (text, tags) {
    var allMeta = _.flatten(
      _.map(tags, function (tag) {
        return findMetadata(text, tag);
      })
    );

    // Will strip out all metadata that's in the middle of the text
    _.each(allMeta, function (tag) {
      text = text.replace(tag, "");
    });

    return text;
  };

  var getCompletedDate = function (item) {
    if (item.isMarked()) {
      return (
        '<li class="item-metadata-single item-metadata-single-date pill pill-dull pill-clear">' +
        item.getCompletedDate() +
        "</li>"
      );
    }

    return "";
  };

  var formatText = function (item) {
    var text = item.text(),
      projects = findMetadata(text, "+"),
      contexts = findMetadata(text, "@"),
      textElem,
      meta;

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

  var render = function (items) {
    var output;

    that.elem.classList.remove("todos-has-priorities");

    output = _.map(items, function (item) {
      var pieces = [
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

  var length = function () {
    return that.elem.querySelectorAll(".item").length;
  };

  var focus = function () {
    that.elem.setAttribute("data-focused", "true");
  };

  var blur = function () {
    that.elem.setAttribute("data-focused", "false");
  };

  var getAllItemElements = function () {
    return that.elem.querySelectorAll(".item");
  };

  var getAllItemElementsWith = function (sel) {
    return that.elem.querySelectorAll(".item" + sel);
  };

  var getItemElement = function (index) {
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
