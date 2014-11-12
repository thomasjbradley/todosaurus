menu['view:show-priority'].submenu = new gui.Menu();

menu['view:show-priority:a'] = new gui.MenuItem({
  label: 'A: Now',
  key: '1',
  modifiers: 'shift',
  type: 'checkbox'
});

menu['view:show-priority:b'] = new gui.MenuItem({
  label: 'B:  Today',
  key: '2',
  modifiers: 'shift',
  type: 'checkbox'
});

menu['view:show-priority:c'] = new gui.MenuItem({
  label: 'C: Tomorrow',
  key: '3',
  modifiers: 'shift',
  type: 'checkbox'
});

menu['view:show-priority:d'] = new gui.MenuItem({
  label: 'D: This Week',
  key: '4',
  modifiers: 'shift',
  type: 'checkbox'
});

menu['view:show-priority:e'] = new gui.MenuItem({
  label: 'E:  Next Week',
  key: '5',
  modifiers: 'shift',
  type: 'checkbox'
});

_.each(menu, function (item, key) {
  if (key.indexOf('view:show-priority:') > -1) {
    menu['view:show-priority'].submenu.append(item);
  }
});
