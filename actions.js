var Actions = function (am, fm, im, filterer, todos, buffer) {
  "use strict";

  var id = function () {
    return filterer.getByIndex(fm.get()).id();
  };

  am.action('item:focus:next', function () {
    fm.next();
  });

  am.action('item:focus:prev', function () {
    fm.prev();
  });

  am.action('item:focus:next:jump', function () {
    fm.set(fm.get() + 5);
  });

  am.action('item:focus:prev:jump', function () {
    fm.set(fm.get() - 5);
  });

  am.action('item:focus:first', function () {
    fm.set(0);
  });

  am.action('item:focus:last', function () {
    fm.set(filterer.length() - 1);
  });

  am.action('item:toggle', function () {
    todos.get(id()).toggle();
  });

  am.action('item:remove', function () {
    buffer.push(todos.get(id()).text());
    todos.remove(id());
  });

  am.action('item:copy', function () {
    buffer.push(todos.get(id()).text());
  });

  am.action('item:paste:before', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.pull(), todos.getIndex(id()));
  });

  am.action('item:paste:after', function () {
    if (buffer.length() === 0) return;

    todos.addAt(buffer.pull(), todos.getIndex(id()) + 1);
    fm.next();
  });

  am.action('item:duplicate', function () {
    am.trigger('item:copy');
    am.trigger('item:paste:after');
  });

  am.action('item:move:up', function () {
    var startFocus = fm.get();

    am.trigger('item:remove');

    if (startFocus <= fm.getMax()) {
      am.trigger('item:focus:prev');
    }

    am.trigger('item:paste:before');
  });

  am.action('item:move:down', function () {
    am.trigger('item:remove');
    am.trigger('item:paste:after');
  });

  am.action('item:edit', function (e, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show()
      .focus()
      .select()
    ;
  });

  am.action('item:edit:start', function (e, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show()
      .setCaretPosition(0)
    ;
  });

  am.action('item:edit:end', function (e, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show()
      .setCaretPosition(1000)
    ;
  });

  am.action('item:edit:clear', function (e, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value('')
      .show()
      .focus()
    ;
  });

  am.action('item:edit:after', function (e) {
    var prevFocus = fm.get();

    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    fm.next();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  });

  am.action('item:edit:before', function (e) {
    var prevFocus = fm.get();

    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    fm.prev();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  });

  am.action('item:new:at-top', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    todos.prepend('');
    fm.set(0);
    am.trigger('item:edit', false, 'new');
  });

  am.action('item:new:at-bottom', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    todos.append('');
    fm.set(fm.getMax());
    am.trigger('item:edit', false, 'new');
  });

  am.action('item:new:after', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    buffer.push('');
    am.trigger('item:paste:after');
    am.trigger('item:edit', false, 'new');
  });

  am.action('item:new:before', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    buffer.push('');
    am.trigger('item:paste:before');
    am.trigger('item:edit', false, 'new');
  });

  am.action('item:update', function (text) {
    todos.get(id()).text(text);
  });

  am.action('item:remove-if-empty', function () {
    if (_.isEmpty(todos.get(id()).text())) {
      todos.remove(id());
    }
  });

  am.action('app:search:focus', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    im.get('search').focus();
    im.get('search').select();
  });

  am.action('app:search:blur', function () {
    im.get('search').blur();
  });

  am.action('app:search:clear', function () {
    am.trigger('app:search:blur');
    im.get('search').value('');
    filterer.filter(todos.getAll());
  });

  am.action('app:search:trigger', function () {
    filterer.filter(todos.getAll(), im.get('search').value());
  });

  am.action('app:edit:hide', function () {
    im.get('edit').value('');
    im.get('edit').hide();
    am.trigger('item:remove-if-empty');
  });

  am.action('app:new:hide', function () {
    im.get('new').value('');
    im.get('new').hide();
    am.trigger('item:remove-if-empty');
  });

  am.action('app:context:default', function () {
    im.reset().bindDefaultKeyActions();
  });

  am.action('app:context:switch', function (contextKeys) {
    im.reset().bindKeyEvents(contextKeys);
  });

};
