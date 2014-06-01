menu['edit:assign-priority'].submenu = new gui.Menu();

menu['edit:assign-priority:a'] = new gui.MenuItem({
  label: 'A: Now                                1',
  type: 'checkbox'
});

menu['edit:assign-priority:b'] = new gui.MenuItem({
  label: 'B:  Today                          2',
  type: 'checkbox'
});

menu['edit:assign-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow          3',
  type: 'checkbox'
});

menu['edit:assign-priority:d'] = new gui.MenuItem({
  label: 'D: This Week          4',
  type: 'checkbox'
});

menu['edit:assign-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week        5',
  type: 'checkbox'
});

_.each(menu, function (item, key) {
  if (key.indexOf('edit:assign-priority:') > -1) {
    menu['edit:assign-priority'].submenu.append(item);
  }
});
