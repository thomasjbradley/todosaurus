menu.file = new gui.MenuItem({ label: 'File' });

menu['file:new'] = new gui.MenuItem({
  label: 'New Item                                                                                       ⌘N'
});

menu['file:new-bottom'] = new gui.MenuItem({
  label: 'New Item at Bottom                                       ⇧⌘N'
});

menu['file:new-below'] = new gui.MenuItem({
  label: 'New Item Below                                                              ⌘↵'
});

menu['file:new-above'] = new gui.MenuItem({
  label: 'New Item Above                                                     ⇧⌘↵'
});

menu['file:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['file:focus-up'] = new gui.MenuItem({
  label: 'Move Focus Up                                                                    ↑'
});

menu['file:focus-down'] = new gui.MenuItem({
  label: 'Move Focus Down                                                         ↓'
});

menu['file:focus-first'] = new gui.MenuItem({
  label: 'Focus First Item                                                              ⌘↑'
});

menu['file:focus-last'] = new gui.MenuItem({
  label: 'Focus Last Item                                                               ⌘↓'
});

menu['file:focus-jump-up'] = new gui.MenuItem({
  label: 'Jump Focus Up                                                              ⌃U'
});

menu['file:focus-jump-down'] = new gui.MenuItem({
  label: 'Jump Focus Down                                                   ⌃D'
});

menu['file:sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['file:jump'] = new gui.MenuItem({
  label: 'Jump to Line                                                                           ⌘G'
});

menu['file:sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['file:reload'] = new gui.MenuItem({
  label: 'Reload File                                 ⌘R',
  enabled: false
});

menu['file:sort-file'] = new gui.MenuItem({
  label: 'Sort File Contents                                ⌥⌘\\',
  enabled: false
});

menu['file:archive'] = new gui.MenuItem({
  label: 'Archive All Completed                                 ⌘\\',
  enabled: false
});

menu['file:sep-4'] = new gui.MenuItem({ type: 'separator' });

menu['file:reveal-in-finder'] = new gui.MenuItem({
  label: 'Reveal in Finder                                                      ⇧⌘R'
});

menu['file:sep-5'] = new gui.MenuItem({ type: 'separator' });

menu['file:switch-directory'] = new gui.MenuItem({
  label: 'Switch Directory                                                             ⌘O'
});

menu.file.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('file:') > -1) {
    menu.file.submenu.append(item);
  }
});

GuiMenu.insert(menu.file, 1);
