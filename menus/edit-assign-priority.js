menu['edit:assign-priority'].submenu = new gui.Menu();

menu['edit:assign-priority:a'] = new gui.MenuItem({
  label: 'A: Now                                 1',
  action: ''
});

menu['edit:assign-priority:b'] = new gui.MenuItem({
  label: 'B:  Today                          2',
  action: ''
});

menu['edit:assign-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow          3',
  action: ''
});

menu['edit:assign-priority:d'] = new gui.MenuItem({
  label: 'D: This Week          4',
  action: ''
});

menu['edit:assign-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week         5',
  action: ''
});

_.each(menu, function (item, key) {
  if (key.indexOf('edit:assign-priority:') > -1) {
    menu['edit:assign-priority'].submenu.append(item);
  }
});
