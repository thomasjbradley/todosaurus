var Actions = function (am, fm, todos, buffer) {
  "use strict";

  am.action('focus:next', function () {
    fm.next();
  });

  am.action('focus:prev', function () {
    fm.prev();
  });

  am.action('focus:next:jump', function () {
    fm.set(fm.get() + 5);
  });

  am.action('focus:prev:jump', function () {
    fm.set(fm.get() - 5);
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
    buffer.prepend(todos.get(fm.get()));
    todos.remove(fm.get());
  });

  am.action('item:copy', function () {
    buffer.prepend(todos.get(fm.get()));
  });

  am.action('item:paste:below', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.get(0), fm.get() + 1);
    buffer.remove(0);
    fm.set(fm.get() + 1);
  });

  am.action('item:paste:above', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.get(0), fm.get());
    buffer.remove(0);
  });

  am.action('item:duplicate', function () {
    buffer.prepend(todos.get(fm.get()));
    todos.addAt(buffer.get(0), fm.get() + 1);
    buffer.remove(0);
    fm.set(fm.get() + 1);
  });

  am.action('item:move:up', function () {
    buffer.prepend(todos.get(fm.get()));
    todos.remove(fm.get());
    todos.addAt(buffer.get(0), fm.get() - 1);
    buffer.remove(0);
    fm.set(fm.get() - 1);
  });

  am.action('item:move:down', function () {
    buffer.prepend(todos.get(fm.get()));
    todos.remove(fm.get());
    todos.addAt(buffer.get(0), fm.get() + 1);
    buffer.remove(0);
    fm.set(fm.get() + 1);
  });

};
