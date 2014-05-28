var ListControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var getMarkedClass = function (item) {
    return (item.isMarked()) ? ' item--complete' : '';
  };

  var render = function (items) {
    var output = _.map(items, function (item) {
      var pieces = [
        '<li class="item',
        getMarkedClass(item),
        '">',
        item.text(),
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

  var getItemElement = function (index) {
    return that.elem.getElementsByTagName('li')[index];
  }

  that = _.extend(that, {
    render: that.chainer(render),
    focus: that.chainer(focus),
    blur: that.chainer(blur),
    getItemElement: getItemElement
  });

  return that;
};
