var Actions = function (am, fm, todos) {
  "use strict";

  am.action('focus:next', function () {
    fm.next();
  });

  am.action('focus:prev', function () {
    fm.prev();
  });

  am.action('focus:first', function () {
    fm.set(0);
  });

  am.action('focus:last', function () {
    fm.set(todos.getAll().length - 1);
  });

  am.action('item:toggle', function () {
    todos.toggle(fm.get());
  });

  am.action('item:remove', function () {
    todos.remove(fm.get());
  });
};
