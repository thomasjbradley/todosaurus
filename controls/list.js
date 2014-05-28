var ListControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

  var render = function (items) {
    that.elem.innerHTML = '<li>' + items.join('</li><li>') + '</li>';
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
