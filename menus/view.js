menu.view = new gui.MenuItem({ label: 'View' });

menu['view:find'] = new gui.MenuItem({
  label: 'Find                                                               ⌘F'
});

menu['view:find-project'] = new gui.MenuItem({
  label: 'Find By Project                      ⌘P'
});

menu['view:find-context'] = new gui.MenuItem({
  label: 'Find By Context                  ⌘T'
});

menu['view:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['view:show-project'] = new gui.MenuItem({
  label: 'Show Project'
});

menu['view:show-context'] = new gui.MenuItem({
  label: 'Show Context'
});

menu['view:show-priority'] = new gui.MenuItem({
  label: 'Show Priority'
});

menu['view:new-sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['view:sort-file'] = new gui.MenuItem({
  label: 'Order In File                        ⌥⌘0'
});

menu['view:sort-priority'] = new gui.MenuItem({
  label: 'Sort By Priority              ⌥⌘-'
});

menu['view:sort-date'] = new gui.MenuItem({
  label: 'Sort By Date                        ⌥⌘='
});

menu['view:new-sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['view:clear-search'] = new gui.MenuItem({
  label: 'Clear Search                               ⌘L'
});

menu['view:clear-group'] = new gui.MenuItem({
  label: 'Clear Group                         ⌥⌘L'
});

menu['view:clear-all'] = new gui.MenuItem({
  label: 'Clear All                                       ⇧⌘L'
});

menu.view.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('view:') > -1) {
    menu.view.submenu.append(item);
  }
});

GuiMenu.insert(menu.view, 3);

