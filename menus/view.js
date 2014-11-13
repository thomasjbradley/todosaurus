menu.view = new gui.MenuItem({ label: 'View' });

menu['view:find'] = new gui.MenuItem({
  label: 'Find',
  key: 'f',
  modifiers: 'cmd'
});

menu['view:find-project'] = new gui.MenuItem({
  label: 'Find By Project',
  key: 'p',
  modifiers: 'cmd'
});

menu['view:find-context'] = new gui.MenuItem({
  label: 'Find By Context',
  key: 't',
  modifiers: 'cmd'
});

menu['view:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['view:show-priority'] = new gui.MenuItem({
  label: 'Show Priority'
});

menu['view:new-sep-2'] = new gui.MenuItem({ type: 'separator' });
/*
menu['view:sort-manually'] = new gui.MenuItem({
  label: 'Sort Manually                   ⌥⌘,',
  type: 'checkbox',
  checked: true,
  enabled: false
});

menu['view:sort-priority'] = new gui.MenuItem({
  label: 'Sort By Priority              ⌥⌘.',
  type: 'checkbox',
  enabled: false
});

menu['view:new-sep-3'] = new gui.MenuItem({ type: 'separator' });
*/
menu['view:clear-search'] = new gui.MenuItem({
  label: 'Clear Search',
  key: 'l',
  modifiers: 'cmd'
});

menu['view:clear-group'] = new gui.MenuItem({
  label: 'Clear Group',
  key: 'l',
  modifiers: 'cmd-alt'
});

menu['view:clear-all'] = new gui.MenuItem({
  label: 'Clear All',
  key: 'l',
  modifiers: 'cmd-shift'
});

menu.view.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('view:') > -1) {
    menu.view.submenu.append(item);
  }
});

GuiMenu.insert(menu.view, 3);

