(function (focusManager, todos) {
  "use strict";

  Mousetrap.bind(['j', 'down'], function () {
    focusManager.next();
  });

  Mousetrap.bind(['k', 'up'], function () {
    focusManager.prev();
  });

  Mousetrap.bind(['x', 'space'], function () {
    todos.toggle(focusManager.get());
  });

  Mousetrap.bind(['d d', 'mod+backspace', 'del'], function () {
    todos.remove(focusManager.get());
  });

  Mousetrap.bind(['g g', 'mod+up'], function () {
    focusManager.set(0);
  });

  Mousetrap.bind(['G', 'mod+down'], function () {
    focusManager.set(todos.getAll().length);
  });

}(focusManager, todos));
