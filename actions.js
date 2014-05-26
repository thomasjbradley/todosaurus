var Actions = function (am, fm, filterer, todos, buffer) {
  "use strict";

  var id = function () {
    return filterer.getByIndex(fm.get()).id();
  };

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
    fm.set(filterer.length() - 1);
  });

  am.action('item:toggle', function () {
    todos.get(id()).toggle();
  });

  am.action('item:remove', function () {
    buffer.prepend(todos.get(id()));
    todos.remove(id());
  });

  am.action('item:copy', function () {
    buffer.prepend(todos.get(id()));
  });

  am.action('item:paste:below', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.getByIndex(0), fm.get() + 1);
    // buffer.remove(0);
    fm.set(fm.get() + 1);
  });

  am.action('item:paste:above', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.getByIndex(0), fm.get());
    // buffer.remove(0);
  });

  am.action('item:duplicate', function () {
    am.trigger('item:copy');
    am.trigger('item:paste:below');
  });

  am.action('item:move:up', function () {
    var startFocus = fm.get();

    am.trigger('item:remove');

    if (startFocus <= fm.getMax()) {
      am.trigger('focus:prev');
    }

    am.trigger('item:paste:above');
  });

  am.action('item:move:down', function () {
    am.trigger('item:remove');
    am.trigger('item:paste:below');
  });

};
