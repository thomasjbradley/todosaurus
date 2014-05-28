var ListControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var getMarkedClass = function (item) {
    return (item.isMarked()) ? ' item--complete' : '';
  };

  var getClasses = function (item) {
    return [
      getMarkedClass(item)
    ].join('');
  };

  var findMetadata = function (text, tag) {
    var re = new RegExp('\\s\\' + tag + '[^\\s]+', 'ig');

    return _.map(text.match(re), function (item) {
      return item.trim();
    });
  };

  var formatMetadata = function (metadata, cssClass) {
    return _.map(metadata, function (item) {
      return [
        '<li class="item__metadata__single item__metadata__single--' + cssClass + ' pill">',
        item,
        '</li>'
      ].join('');
    }).join('');
  };

  var removeMetaData = function (text, tags) {
    var allMeta = _.flatten(_.map(tags, function (tag) {
      return findMetadata(text, tag);
    }));

    // Will strip out all metadata that's in the middle of the text
    _.each(allMeta, function (tag) {
      text = text.replace(tag, '');
    });

    return text;
  };

  var formatText = function (text) {
    var
      projects = findMetadata(text, '+'),
      contexts = findMetadata(text, '@'),
      textElem = [
        '<div class="item__text">',
         removeMetaData(text, ['+', '@']),
         '</div>'
      ].join(''),
      meta = [
        '<ul class="item__metadata">',
        formatMetadata(projects, 'project'),
        formatMetadata(contexts, 'context'),
        '</ul>'
      ].join('')
    ;

    return textElem + meta;
  };

  var render = function (items) {
    var output = _.map(items, function (item) {
      var pieces = [
        '<li class="item',
        getClasses(item),
        '">',
        formatText(item.text()),
        '</li>'
      ];

      return pieces.join('');
    });

    that.elem.innerHTML = output.join('');
  };

  var focus = function () {
    that.elem.setAttribute('data-focused', 'true');
  };

  var blur = function () {
    that.elem.setAttribute('data-focused', 'false');
  };

  var getAllItemElements = function () {
    return that.elem.querySelectorAll('.item');
  };

  var getItemElement = function (index) {
    return that.elem.querySelectorAll('.item')[index];
  }

  that = _.extend(that, {
    render: that.chainer(render),
    focus: that.chainer(focus),
    blur: that.chainer(blur),
    getAllItemElements: getAllItemElements,
    getItemElement: getItemElement
  });

  return that;
};
