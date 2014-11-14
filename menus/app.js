menu.app = GuiMenu.items[0].submenu;

menu['app:about'] = new gui.MenuItem({
  label: 'About Todosaurus',
  click: function () {
    var about = gui.Window.open('./about.html', {
      width: 658,
      height: 358,
      toolbar: false,
      focus: true,
      resizable: false,
      show: false
    });
  }
});

menu.app.insert(menu['app:about'], 0);
GuiMenu.items[0].submenu.removeAt(1);

menu['app:switch-directory'] = new gui.MenuItem({
  label: 'Switch Directory',
  key: 'o',
  modifiers: 'cmd'
});

menu.app.insert(menu['app:switch-directory'], 2);

GuiMenu.items[0].submenu.insert(new gui.MenuItem({ type: 'separator' }), 3);
