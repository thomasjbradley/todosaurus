menu.edit = new gui.MenuItem({ label: 'Edit' });

menu['edit:undo'] = new gui.MenuItem({
  label: 'Undo',
  key: 'z',
  modifiers: 'cmd',
  enabled: false
});

menu['edit:redo'] = new gui.MenuItem({
  label: 'Redo',
  key: 'z',
  modifiers: 'cmd-shift',
  enabled: false
});

menu['edit:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['edit:cut'] = new gui.MenuItem({
  label: 'Cut',
  key: 'x',
  modifiers: 'cmd'
});

menu['edit:copy'] = new gui.MenuItem({
  label: 'Copy',
  key: 'c',
  modifiers: 'cmd'
});

menu['edit:paste'] = new gui.MenuItem({
  label: 'Paste',
  key: 'v',
  modifiers: 'cmd'
});

menu['edit:paste-before'] = new gui.MenuItem({
  label: 'Paste Before',
  key: 'v',
  modifiers: 'cmd-shift'
});

menu['edit:delete'] = new gui.MenuItem({
  label: 'Delete                                                                                ⌫'
});

menu['edit:duplicate'] = new gui.MenuItem({
  label: 'Duplicate',
  key: 'd',
  modifiers: 'cmd-shift'
});

menu['edit:select-all'] = new gui.MenuItem({
  label: 'Select All',
  key: 'a',
  modifiers: 'cmd',
  enabled: false
});

menu['edit:new-sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['edit:update'] = new gui.MenuItem({
  label: 'Update                                                            Return'
});

menu['edit:insert-start'] = new gui.MenuItem({
  label: 'Insert at Start',
  key: 'i',
  modifiers: ''
});

menu['edit:insert-end'] = new gui.MenuItem({
  label: 'Insert at End',
  key: 'a',
  modifiers: ''
});

menu['edit:update-clear'] = new gui.MenuItem({
  label: 'Update & Clear',
  key: 'c',
  modifiers: ''
});

menu['edit:new-sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['edit:toggle-complete'] = new gui.MenuItem({
  label: 'Toggle Complete           Space'
});

menu['edit:toggle-priority'] = new gui.MenuItem({
  label: 'Toggle Priority'
});

menu['edit:remove-priority'] = new gui.MenuItem({
  label: 'Remove Priority',
  key: '0',
  modifiers: 'cmd'
});

menu['edit:new-sep-5'] = new gui.MenuItem({ type: 'separator' });

menu['edit:move-up'] = new gui.MenuItem({
  label: 'Move Up                                                             ⇧⌘↑'
});

menu['edit:move-down'] = new gui.MenuItem({
  label: 'Move Down                                                  ⇧⌘↓'
});

menu.edit.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('edit:') > -1) {
    menu.edit.submenu.append(item);
  }
});

GuiMenu.insert(menu.edit, 2);

