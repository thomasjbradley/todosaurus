menu.view = new gui.MenuItem({ label: 'View' });

menu['view:find'] = new gui.MenuItem({
  label: 'Find                                                               ⌘F',
  action: ''
});

menu['view:find-project'] = new gui.MenuItem({
  label: 'Find By Project                      ⌘P',
  action: ''
});

menu['view:find-context'] = new gui.MenuItem({
  label: 'Find By Context                  ⌘T',
  action: ''
});

menu['view:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['view:show-project'] = new gui.MenuItem({
  label: 'Show Project',
  action: ''
});

menu['view:show-context'] = new gui.MenuItem({
  label: 'Show Context',
  action: ''
});

menu['view:show-priority'] = new gui.MenuItem({
  label: 'Show Priority',
  action: ''
});

menu['view:new-sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['view:sort-file'] = new gui.MenuItem({
  label: 'Order In File                        ⌥⌘0',
  action: ''
});

menu['view:sort-priority'] = new gui.MenuItem({
  label: 'Sort By Priority              ⌥⌘-',
  action: ''
});

menu['view:sort-date'] = new gui.MenuItem({
  label: 'Sort By Date                        ⌥⌘=',
  action: ''
});

menu['view:new-sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['view:clear-search'] = new gui.MenuItem({
  label: 'Clear Search                               ⌘L',
  action: ''
});

menu['view:clear-group'] = new gui.MenuItem({
  label: 'Clear Group                         ⌥⌘L',
  action: ''
});

menu['view:clear-all'] = new gui.MenuItem({
  label: 'Clear All                                       ⇧⌘L',
  action: ''
});

menu.view.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('view:') > -1) {
    menu.view.submenu.append(item);
  }
});

GuiMenu.insert(menu.view, 3);

