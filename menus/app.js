menu.app = GuiMenu.items[0].submenu;

menu['app:about'] = new gui.MenuItem({
  label: 'About Todosaurus',
  click: function (hash) {
    wm.open('about', hash);
  }
});

menu.app.insert(menu['app:about'], 0);
menu.app.removeAt(1);

menu['app:switch-directory'] = new gui.MenuItem({
  label: 'Switch Directory…',
  key: 'o',
  modifiers: 'cmd'
});

menu.app.insert(menu['app:switch-directory'], 2);

menu.app.insert(new gui.MenuItem({ type: 'separator' }), 3);

/**
 * Had to remove and recreate the quit menu.
 * There was a weird bug where is the main window was hidden,
 *   calling quit wouldn't actually quit the application.
 */
menu.app.removeAt(8);
menu['app:quit'] = new gui.MenuItem({
  label: 'Quit Todosaurus',
  key: 'q',
  modifiers: 'cmd',
  click: function () {
    gui.App.quit();
  }
});
menu.app.append(menu['app:quit']);
