menu['edit:toggle-priority'].submenu = new gui.Menu();

menu['edit:toggle-priority:a'] = new gui.MenuItem({
  label: 'A: Now                                1'
});

menu['edit:toggle-priority:b'] = new gui.MenuItem({
  label: 'B:  Today                          2'
});

menu['edit:toggle-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow          3'
});

menu['edit:toggle-priority:d'] = new gui.MenuItem({
  label: 'D: This Week          4'
});

menu['edit:toggle-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week        5'
});

_.each(menu, function (item, key) {
  if (key.indexOf('edit:toggle-priority:') > -1) {
    menu['edit:toggle-priority'].submenu.append(item);
  }
});
