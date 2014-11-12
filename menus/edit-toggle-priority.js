menu['edit:toggle-priority'].submenu = new gui.Menu();

menu['edit:toggle-priority:a'] = new gui.MenuItem({
  label: 'A: Now',
  key: '1',
  modifiers: ''
});

menu['edit:toggle-priority:b'] = new gui.MenuItem({
  label: 'B:  Today',
  key: '2',
  modifiers: ''
});

menu['edit:toggle-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow',
  key: '3',
  modifiers: ''
});

menu['edit:toggle-priority:d'] = new gui.MenuItem({
  label: 'D: This Week',
  key: '4',
  modifiers: ''
});

menu['edit:toggle-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week',
  key: '5',
  modifiers: ''
});

_.each(menu, function (item, key) {
  if (key.indexOf('edit:toggle-priority:') > -1) {
    menu['edit:toggle-priority'].submenu.append(item);
  }
});
