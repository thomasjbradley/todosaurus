menu.edit = new gui.MenuItem({ label: 'Edit' });

menu['edit:undo'] = new gui.MenuItem({
  label: 'Undo                                                                                  ⌘Z',
  action: ''
});

menu['edit:redo'] = new gui.MenuItem({
  label: 'Redo                                                                           ⇧⌘Z',
  action: ''
});

menu['edit:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['edit:cut'] = new gui.MenuItem({
  label: 'Cut                                                                                         ⌘X',
  action: ''
});

menu['edit:copy'] = new gui.MenuItem({
  label: 'Copy                                                                                   ⌘C',
  action: ''
});

menu['edit:paste'] = new gui.MenuItem({
  label: 'Paste                                                                                  ⌘V',
  action: ''
});

menu['edit:paste-before'] = new gui.MenuItem({
  label: 'Paste Before                                               ⇧⌘V',
  action: ''
});

menu['edit:delete'] = new gui.MenuItem({
  label: 'Delete                                                                                ⌫',
  action: ''
});

menu['edit:duplicate'] = new gui.MenuItem({
  label: 'Duplicate                                                                  ⌘D',
  action: ''
});

menu['edit:select-all'] = new gui.MenuItem({
  label: 'Select All                                                                   ⌘A',
  action: ''
});

menu['edit:new-sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['edit:update'] = new gui.MenuItem({
  label: 'Update                                                            Return',
  action: ''
});

menu['edit:insert-start'] = new gui.MenuItem({
  label: 'Insert at Start                                                      I',
  action: ''
});

menu['edit:insert-end'] = new gui.MenuItem({
  label: 'Insert at End                                                         A',
  action: ''
});

menu['edit:completely-change'] = new gui.MenuItem({
  label: 'Completely Change                              C',
  action: ''
});

menu['edit:new-sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['edit:mark'] = new gui.MenuItem({
  label: 'Mark Complete               Space',
  altLabel: 'Mark Incomplete            Space',
  action: ''
});

menu['edit:new-sep-4'] = new gui.MenuItem({ type: 'separator' });

menu['edit:assign-project'] = new gui.MenuItem({
  label: 'Assign Project',
  action: ''
});

menu['edit:assign-context'] = new gui.MenuItem({
  label: 'Assign Context',
  action: ''
});

menu['edit:assign-priority'] = new gui.MenuItem({
  label: 'Assign Priority',
  action: ''
});

menu['edit:new-sep-5'] = new gui.MenuItem({ type: 'separator' });

menu['edit:move-up'] = new gui.MenuItem({
  label: 'Move Up                                                             ⇧⌘↑',
  action: ''
});

menu['edit:move-down'] = new gui.MenuItem({
  label: 'Move Down                                                  ⇧⌘↓',
  action: ''
});

menu.edit.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('edit:') > -1) {
    menu.edit.submenu.append(item);
  }
});

GuiMenu.insert(menu.edit, 2);

