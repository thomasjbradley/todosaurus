menu['view:show-priority'].submenu = new gui.Menu();

menu['view:show-priority:a'] = new gui.MenuItem({
  label: 'A: Now                                1'
});

menu['view:show-priority:b'] = new gui.MenuItem({
  label: 'B:  Today                          2'
});

menu['view:show-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow          3'
});

menu['view:show-priority:d'] = new gui.MenuItem({
  label: 'D: This Week          4'
});

menu['view:show-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week        5'
});

_.each(menu, function (item, key) {
  if (key.indexOf('view:show-priority:') > -1) {
    menu['view:show-priority'].submenu.append(item);
  }
});
