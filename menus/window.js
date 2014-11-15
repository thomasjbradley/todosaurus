menu.win = GuiMenu.items[4].submenu;

menu.win.append(new gui.MenuItem({ type: 'separator' }));

menu['win:main'] = new gui.MenuItem({
  label: 'Main',
  type: 'checkbox',
  checked: true,
  key: '`',
  modifiers: 'cmd-shift',
  click: function () {
    wm.open('main');
  }
});

menu.win.append(menu['win:main']);
