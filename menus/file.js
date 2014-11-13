menu.file = new gui.MenuItem({ label: 'File' });

menu['file:new'] = new gui.MenuItem({
  label: 'New Item',
  key: 'n',
  modifiers: 'cmd'
});

menu['file:new-bottom'] = new gui.MenuItem({
  label: 'New Item at Bottom',
  key: 'n',
  modifiers: 'cmd-shift'
});

menu['file:new-below'] = new gui.MenuItem({
  label: 'New Item Below',
  key: '↩',
  modifiers: 'cmd'
});

menu['file:new-above'] = new gui.MenuItem({
  label: 'New Item Above',
  key: '↩︎',
  modifiers: 'cmd-shift'
});

menu['file:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['file:focus-up'] = new gui.MenuItem({
  label: 'Move Focus Up',
  key: '↑',
  modifiers: ''
});

menu['file:focus-down'] = new gui.MenuItem({
  label: 'Move Focus Down',
  key: '↓',
  modifiers: ''
});

menu['file:focus-first'] = new gui.MenuItem({
  label: 'Focus First Item',
  key: '↑',
  modifiers: 'cmd'
});

menu['file:focus-last'] = new gui.MenuItem({
  label: 'Focus Last Item',
  key: '↓',
  modifiers: 'cmd'
});

menu['file:focus-jump-up'] = new gui.MenuItem({
  label: 'Jump Focus Up',
  key: 'u',
  modifiers: 'ctrl'
});

menu['file:focus-jump-down'] = new gui.MenuItem({
  label: 'Jump Focus Down',
  key: 'd',
  modifiers: 'ctrl'
});

menu['file:sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['file:jump'] = new gui.MenuItem({
  label: 'Jump to Line',
  key: 'j',
  modifiers: 'cmd'
});

menu['file:sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['file:reload'] = new gui.MenuItem({
  label: 'Reload File',
  key: 'r',
  modifiers: 'cmd',
  enabled: false
});

menu['file:sort-file'] = new gui.MenuItem({
  label: 'Sort File Contents',
  key: 's',
  modifiers: 'cmd-shift',
  enabled: false
});

menu['file:archive'] = new gui.MenuItem({
  label: 'Archive All Completed',
  key: 's',
  modifiers: 'cmd',
  enabled: false
});

menu['file:sep-4'] = new gui.MenuItem({ type: 'separator' });

menu['file:reveal-in-finder'] = new gui.MenuItem({
  label: 'Reveal in Finder',
  key: 'r',
  modifiers: 'ctrl-shift'
});

menu['file:sep-5'] = new gui.MenuItem({ type: 'separator' });

menu['file:switch-directory'] = new gui.MenuItem({
  label: 'Switch Directory',
  key: 'o',
  modifiers: 'cmd'
});

menu.file.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('file:') > -1) {
    menu.file.submenu.append(item);
  }
});

GuiMenu.insert(menu.file, 1);
