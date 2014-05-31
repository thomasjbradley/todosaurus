menu.edit = new gui.MenuItem({ label: 'Edit' });

menu['edit:undo'] = new gui.MenuItem({
  label: 'Undo                                                                                  ⌘Z'
});

menu['edit:redo'] = new gui.MenuItem({
  label: 'Redo                                                                           ⇧⌘Z'
});

menu['edit:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['edit:cut'] = new gui.MenuItem({
  label: 'Cut                                                                                         ⌘X'
});

menu['edit:copy'] = new gui.MenuItem({
  label: 'Copy                                                                                   ⌘C'
});

menu['edit:paste'] = new gui.MenuItem({
  label: 'Paste                                                                                  ⌘V'
});

menu['edit:paste-before'] = new gui.MenuItem({
  label: 'Paste Before                                               ⇧⌘V'
});

menu['edit:delete'] = new gui.MenuItem({
  label: 'Delete                                                                                ⌫'
});

menu['edit:duplicate'] = new gui.MenuItem({
  label: 'Duplicate                                                                  ⌘D'
});

menu['edit:select-all'] = new gui.MenuItem({
  label: 'Select All                                                                   ⌘A'
});

menu['edit:new-sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['edit:update'] = new gui.MenuItem({
  label: 'Update                                                            Return'
});

menu['edit:insert-start'] = new gui.MenuItem({
  label: 'Insert at Start                                                      I'
});

menu['edit:insert-end'] = new gui.MenuItem({
  label: 'Insert at End                                                         A'
});

menu['edit:completely-change'] = new gui.MenuItem({
  label: 'Completely Change                              C'
});

menu['edit:new-sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['edit:mark'] = new gui.MenuItem({
  label: 'Mark Complete               Space',
  altLabel: 'Mark Incomplete            Space'
});

menu['edit:new-sep-4'] = new gui.MenuItem({ type: 'separator' });

menu['edit:assign-project'] = new gui.MenuItem({
  label: 'Assign Project'
});

menu['edit:assign-context'] = new gui.MenuItem({
  label: 'Assign Context'
});

menu['edit:assign-priority'] = new gui.MenuItem({
  label: 'Assign Priority'
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

