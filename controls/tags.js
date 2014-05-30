var TagsControl = function (elem, actionManager, opts) {
  "use strict";

  var
    that = Control(elem, actionManager),
    tags = that.elem.querySelector('.tags'),
    noTags = that.elem.querySelector('.no-tags'),
    options = {
      pillClass: ''
    }
  ;

  options = _.extend(options, opts);

  var populateList = function (items) {
    var output = _.map(items, function (item) {
      var pieces = [
        '<li><span class="pill ',
        options.pillClass,
        ' tag">',
        item,
        '</span></li>'
      ];

      return pieces.join('');
    });

    tags.innerHTML = output.join('');
  };

  var deactivateAll = function () {
    _.each(tags.querySelectorAll('[data-state="active"]'), function (item) {
      item.setAttribute('data-state', 'inactive');
    });
  }

  var activate = function (id) {
    tags.querySelectorAll('li')[id].setAttribute('data-state', 'active');
  };

  var show = function () {
    tags.setAttribute('data-state', 'visible');
    noTags.setAttribute('data-state', 'hidden');
  };

  var hide = function () {
    tags.setAttribute('data-state', 'hidden');
    noTags.setAttribute('data-state', 'visible');
  };

  var render = function (items, active) {
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
    render: that.chainer(render)
  });

  return that;
};
