_.each(bindings.menu, function (item, key) {
  menu[key].click = function () {
    Mousetrap.trigger(item);
  };
});
