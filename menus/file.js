menu.file = new gui.MenuItem({ label: 'File' });

menu['file:new'] = new gui.MenuItem({
  label: 'New Item                                                                                       ⌘N',
  action: ''
});

menu['file:new-bottom'] = new gui.MenuItem({
  label: 'New Item at Bottom                                       ⇧⌘N',
  action: ''
});

menu['file:new-below'] = new gui.MenuItem({
  label: 'New Item Below                                                              ⌘↵',
  action: ''
});

menu['file:new-above'] = new gui.MenuItem({
  label: 'New Item Above                                                     ⇧⌘↵',
  action: ''
});

menu['file:new-sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['file:focus-up'] = new gui.MenuItem({
  label: 'Move Focus Up                                                                    ↑',
  action: ''
});

menu['file:focus-down'] = new gui.MenuItem({
  label: 'Move Focus Down                                                         ↓',
  action: ''
});

menu['file:focus-first'] = new gui.MenuItem({
  label: 'Focus First Item                                                              ⌘↑',
  action: ''
});

menu['file:focus-last'] = new gui.MenuItem({
  label: 'Focus Last Item                                                               ⌘↓',
  action: ''
});

menu['file:focus-jump-up'] = new gui.MenuItem({
  label: 'Jump Focus Up                                                              ⌃U',
  action: ''
});

menu['file:focus-jump-down'] = new gui.MenuItem({
  label: 'Jump Focus Down                                                   ⌃D',
  action: ''
});

menu['file:sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['file:jump'] = new gui.MenuItem({
  label: 'Jump to Line                                                                           ⌘G',
  action: ''
});

menu['file:sep-3'] = new gui.MenuItem({ type: 'separator' });

menu['file:move-complete-bottom'] = new gui.MenuItem({
  label: 'Move Completed to Bottom                  ⌘`',
  action: ''
});

menu['file:move-priority-top'] = new gui.MenuItem({
  label: 'Move Prioritized to Top                         ⇧⌘`',
  action: ''
});

menu['file:archive'] = new gui.MenuItem({
  label: 'Archive All Completed                             ⌥⌘`',
  action: ''
});

menu['file:sep-4'] = new gui.MenuItem({ type: 'separator' });

menu['file:reveal-in-finder'] = new gui.MenuItem({
  label: 'Reveal in Finder                                                              ⌘R',
  action: ''
});

menu['file:sep-5'] = new gui.MenuItem({ type: 'separator' });

menu['file:switch-directory'] = new gui.MenuItem({
  label: 'Switch Directory                                                             ⌘O',
  action: ''
});

menu.file.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('file:') > -1) {
    menu.file.submenu.append(item);
  }
});

GuiMenu.insert(menu.file, 1);
