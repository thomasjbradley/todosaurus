var Actions = function (generics, am, fm, im, storage, todos, orderer, grouper, filterer, buffer) {
  "use strict";

  // Used a reference for when creating a new item
  // Will be used to compare new item to see if it matches the filter
  var tmpId;

  var id = function () {
    return filterer.getByIndex(fm.get()).id();
  };

  var getNewText = function () {
    return generics.new;
  };

  var isFieldEmpty = function (id) {
    var text = todos.get(id).text().replace(getNewText(), '').trim();

    return _.isEmpty(text);
  };

  var getPosition = function () {
    var elem  = im.get('list').getItemElement(fm.get());

    return {
      left: elem.offsetLeft,
      top: elem.offsetTop
    };
  }

  var getNumberFromKeyCombo = function (combo) {
    var num = 0;

    if (!_.isUndefined(combo)) {
      num = parseInt(combo.replace(/[^\d]*/ig, ''), 10);
    }

    if (_.isNaN(num)) {
      num = 0;
    } else {
      num--;
    }

    return num;
  }

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

    todos.addBeforeItem(buffer.pull(), id());
  });

  am.action('item:paste:after', function () {
    if (buffer.length() === 0) return;

    todos.addAfterItem(buffer.pull(), id());
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

  am.action('item:edit', function (e, combo, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show(getPosition())
      .focus()
      .select()
    ;
  });

  am.action('item:edit:start', function (e, combo, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show(getPosition())
      .focus()
      .setCaretPosition(0)
    ;
  });

  am.action('item:edit:end', function (e, combo, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value(todos.get(id()).text())
      .show(getPosition())
      .focus()
      .setCaretPosition(1000)
    ;
  });

  am.action('item:edit:clear', function (e, combo, input) {
    if (!_.isUndefined(e) && !_.isEmpty(e)) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    im.get(input)
      .value('')
      .show(getPosition())
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

    todos.prepend(getNewText());
    fm.set(0);
    am.trigger('item:edit:clear', false, 'new');
  });

  am.action('item:new:at-bottom', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    todos.append(getNewText());
    fm.set(fm.getMax());
    am.trigger('item:edit:clear', false, 'new');
  });

  am.action('item:new:after', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    buffer.push(getNewText());
    am.trigger('item:paste:after');
    am.trigger('item:edit:clear', false, 'new');
  });

  am.action('item:new:before', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    buffer.push(getNewText());
    am.trigger('item:paste:before');
    am.trigger('item:edit:clear', false, 'new');
  });

  am.action('item:update', function (text) {
    tmpId = id();
    todos.get(id()).text(text);
  });

  am.action('item:remove-if-empty', function () {
    if (isFieldEmpty(id())) {
      todos.remove(id());
    }
  });

  am.action('app:search:focus', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    im.get('search').focus().select();
  });

  am.action('app:search:projects', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    im.get('search')
      .focus()
      .value('+')
      .setCaretPosition(1000)
    ;
    am.trigger('app:search:trigger');
  });

  am.action('app:search:contexts', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    im.get('search')
      .focus()
      .value('@')
      .setCaretPosition(1000)
    ;
    am.trigger('app:search:trigger');
  });

  am.action('app:search:blur', function () {
    im.get('search').blur();
  });

  am.action('app:search:clear', function () {
    var fullIndex = todos.getIndex(filterer.getByIndex(fm.get()).id());

    am.trigger('app:search:blur');
    im.get('search').value('');
    im.get('filters').filter = null;
    am.trigger('app:list:render');
    fm.set(fullIndex);
  });

  am.action('app:search:trigger', function () {
    im.get('filters').filter = im.get('search').value();
    am.trigger('app:list:render');
  });

  am.action('app:jump:show', function (e) {
    if (!_.isUndefined(e)) {
      e.preventDefault();
    }

    im.get('jump')
      .show()
      .value('')
      .focus()
    ;
  });

  am.action('app:jump:hide', function () {
    im.get('jump').value('').hide();
  });

  am.action('app:jump:trigger', function () {
    var line = parseInt(im.get('jump').value().replace(/[^\d]/g, ''), 10);

    if (!_.isNumber(line) || _.isNaN(line)) {
      line = 0;
    }

    fm.set(line - 1);
  });

  am.action('app:edit:hide', function () {
    im.get('edit').value('').hide();
  });

  am.action('app:new:hide', function () {
    im.get('new').value('').hide();
    am.trigger('item:remove-if-empty');

    if (tmpId && !filterer.matchesFilter(todos.get(tmpId).text())) {
      am.trigger('app:search:clear');
      fm.set(filterer.getIndex(tmpId));
    }

    tmpId = null;
  });

  am.action('app:list:focus', function () {
    im.get('list').focus();
  });

  am.action('app:list:blur', function () {
    im.get('list').blur();
  });

  am.action('app:list:render', function () {
    orderer.order(todos.getAll(), im.get('filters').order);
  });

  am.action('app:context:default', function () {
    im.reset().bindDefaultKeyActions();
  });

  am.action('app:context:switch', function (contextKeys) {
    im.reset().bindKeyEvents(contextKeys);
  });

  am.action('app:tags:create', function () {
    am.trigger('app:tags:create:projects');
    am.trigger('app:tags:create:contexts');
  });

  am.action('app:tags:create:projects', function () {
    var tags = todos.getAllTags('+');
    grouper.setGroup('+', tags);
    im.get('tags-projects').render(tags);
  });

  am.action('app:tags:create:contexts', function () {
    var tags = todos.getAllTags('@');
    grouper.setGroup('@', tags);
    im.get('tags-contexts').render(tags);
  });

  am.action('app:tags:show', function (tag, combo) {
    var id = getNumberFromKeyCombo(combo);

    if (id > grouper.getGroup(tag).length - 1) {
      am.trigger('app:tags:clear');
    } else {
      im.get('filters').group = [tag, id];
      am.trigger('app:list:render');
      am.trigger('app:tags:highlight-active', tag, getNumberFromKeyCombo(combo));
    }
  });

  am.action('app:tags:show:projects', function (e, combo) {
    am.trigger('app:tags:clear-active');
    am.trigger('app:tags:show', '+', combo);
  });

  am.action('app:tags:show:contexts', function (e, combo) {
    am.trigger('app:tags:clear-active');
    am.trigger('app:tags:show', '@', combo);
  });

  am.action('app:tags:clear', function () {
    im.get('filters').group = null;
    am.trigger('app:list:render');
    am.trigger('app:tags:clear-active');
  });

  am.action('app:tags:highlight-active', function (tag, index) {
    if (tag === '+') {
      im.get('tags-projects').activate(index);
    }

    if (tag === '@') {
      im.get('tags-contexts').activate(index);
    }
  });

  am.action('app:tags:clear-active', function () {
    im.get('tags-projects').deactivateAll();
    im.get('tags-contexts').deactivateAll();
  });

  am.action('storage:folder:switch', function () {
    im.reset();
    im.get('file-chooser').hide();
    im.get('folder-chooser').show();
  });

  am.action('storage:folder:choose', function () {
    var folder = im.get('folder-chooser').getFiles()[0];

    storage.setFolder(folder.path);
    am.trigger('storage:read-or-new');
  });

  am.action('storage:file:new', function () {
    var startupData = [
      'Welcome to Todoifer! +Todoifer',
      'A graphical application the Todo.txt format. @todo.txt',
      'Press “n” to create a new todo item.'
    ];

    im.get('folder-chooser').hide();
    im.get('file-chooser').hide();
    todos.populate(startupData);
    im.bindDefaultKeyActions(keys);
  });

  am.action('storage:read', function () {
    storage.read(function (err, data) {
      if (err) {
        if (err.message === storage.errors.NOT_FOUND) {
          im.get('folder-chooser').hide();
          im.get('file-chooser').show(storage.getFolder());
          return;
        }

        im.get('folder-chooser').show();
        return;
      }

      im.get('folder-chooser').hide();
      im.get('file-chooser').hide();

      todos.populate(data);
      im.bindDefaultKeyActions(keys);
    });
  });

  am.action('storage:read-or-new', function () {
    im.get('folder-chooser').hide();
    im.get('file-chooser').hide();

    storage.read(function (err, data) {
      if (err) {
        am.trigger('storage:file:new');
      } else {
        todos.populate(data);
        im.bindDefaultKeyActions(keys);
      }
    });
  });

  am.action('storage:save', function () {
    storage.save(todos.getString());
  });

};
