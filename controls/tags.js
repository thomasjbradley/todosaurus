var TagsControl = function (elem, actionManager) {
  "use strict";

  var that = Control(elem, actionManager);

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

  that = _.extend(that, {
    render: that.chainer(render)
  });

  return that;
};
