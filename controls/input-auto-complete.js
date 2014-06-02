var InputAutoComplete = function ($, interfaceManager) {
  var
    methods = {},
    hiddenTimeouts = {}
  ;

  _.each(['edit', 'new'], function (input) {
    $('#' + input).on('shown.atwho', function (e) {
      interfaceManager.get(input).stopEvents();
    });

    $('#' + input).on('hidden.atwho', function (e) {
      clearTimeout(hiddenTimeouts[input]);

      hiddenTimeouts[input] = setTimeout(function () {
        if ($('.atwho-view:visible').length === 0 && interfaceManager.get(input).isVisible()) {
          interfaceManager.get(input).playEvents();
        }
      }, 80);
    });
  });

  var resetData = function (group, tags) {
    $('#edit, #new').atwho({
      at: group,
      data: _.map(tags, function (item) {
        return item.replace(group, '');
      })
    });
  };

  methods = {
    resetData: resetData
  };

  return methods;
};
