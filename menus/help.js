menu.help = new gui.MenuItem({ label: 'Help' });

menu['help:shortcuts'] = new gui.MenuItem({
  label: 'Keyboard Shortcuts'
});

menu['help:sep-1'] = new gui.MenuItem({ type: 'separator' });

menu['help:website'] = new gui.MenuItem({
  label: 'Todosaurus Website',
  click: function () {
    gui.Shell.openExternal('https://github.com/thomasjbradley/todosaurus');
  }
});

menu['help:source-code'] = new gui.MenuItem({
  label: 'Todosaurus Source Code',
  click: function () {
    gui.Shell.openExternal('https://github.com/thomasjbradley/todosaurus');
  }
});

menu['help:sep-2'] = new gui.MenuItem({ type: 'separator' });

menu['help:feedback'] = new gui.MenuItem({
  label: 'Send Feedback…',
  click: function () {
    gui.Shell.openExternal('mailto:hey@thomasjbradley.ca?subject=Todosaurus%20Feedback');
  }
});

menu.help.submenu = new gui.Menu();

_.each(menu, function (item, key) {
  if (key.indexOf('help:') > -1) {
    menu.help.submenu.append(item);
  }
});

GuiMenu.insert(menu.help, 5);
