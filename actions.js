var Actions = function (generics, am, fm, im, storage, todos, orderer, grouper, filterer, buffer) {
  "use strict";

  var isEditableState = function () {
    var totalItems = filterer.length();

    if (totalItems <= 0) {
      am.trigger('app:clear');
      return false;
    }

    return true;
  };

  var id = function () {
    return filterer.getByIndex(fm.get()).id();
  };

  var getNewText = function () {
    return generics.new;
  };

  var prepareNewTodo = function (index) {
    var todo, getId = id();

    if (!_.isUndefined(index)) {
      getId = filterer.getByIndex(index).id();
    }

    todo = todos.createNewItem(todos.get(getId).getFullText() + ' ' + generics.new);

    if (im.get('filters').group === false || im.get('filters').group[0] !== '!') {
      todo.removePriority();
    }

    todo.resetCreated();
    todo.unmark();

    return todo;
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

  var matchesFilters = function (newText) {
    var
      filter = im.get('filters').filter,
      group = im.get('filters').group,
      matchesFilter = false,
      matchesGroup = false
    ;

    if (filter !== false) {
      if (filterer.matchesFilter(newText, filter)) {
        matchesFilter = true;
      } else {
        matchesFilter = false;
      }
    } else {
      matchesFilter = true;
    }

    if (group !== false) {
      if (grouper.matchesGroup(newText, group)) {
        matchesGroup = true;
      } else {
        matchesGroup = false;
      }
    } else {
      matchesGroup = true;
    }

    if (matchesFilter && matchesGroup) {
      return true;
    }

    return false;
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
  }, isEditableState);

  am.action('item:delete', function () {
    todos.remove(id());
  }, isEditableState);

  am.action('item:cut', function () {
    var text = todos.get(id()).getFullText();

    if (window.isNode) {
      clipboard.set(text, 'text');
    }

    buffer.push(text);
    todos.remove(id());
  }, isEditableState);

  am.action('item:copy', function () {
    var text = todos.get(id()).getFullText();

    if (window.isNode) {
      clipboard.set(text, 'text');
    }

    buffer.push(text);
  }, isEditableState);

  am.action('item:paste:before', function () {
    if (buffer.length() === 0) return;

    todos.addBeforeItem(buffer.pull(), id());
  }, isEditableState);

  am.action('item:paste:after', function () {
    if (buffer.length() === 0) return;

    todos.addAfterItem(buffer.pull(), id());
    fm.next();
  }, isEditableState);

  am.action('item:duplicate', function () {
    am.trigger('item:copy');
    am.trigger('item:paste:after');
  }, isEditableState);

  am.action('item:move:up', function () {
    // if (im.get('filters').order === false) {
      var startFocus = fm.get();

      am.trigger('item:cut');

      if (startFocus <= fm.getMax()) {
        am.trigger('item:focus:prev');
      }

      am.trigger('item:paste:before');
    // }
  }, isEditableState);

  am.action('item:move:down', function () {
    // if (im.get('filters').order === false) {
      am.trigger('item:cut');
      am.trigger('item:paste:after');
    // }
  }, isEditableState);

  am.action('item:edit', function (e, combo, input) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
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
  }, isEditableState);

  am.action('item:edit:start', function (e, combo, input) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
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
  }, isEditableState);

  am.action('item:edit:end', function (e, combo, input) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
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
  }, isEditableState);

  am.action('item:edit:clear', function (e, combo, input, defaultText) {
    var text = '';

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    if (_.isUndefined(input)) {
      input = 'edit';
    }

    if (!_.isUndefined(defaultText)) {
      text = defaultText;
    }

    im.get(input)
      .setRawValue(text)
      .show(getPosition())
      .focus()
      .setCaretPosition(0)
    ;
  }, isEditableState);

  am.action('item:edit:after', function (e) {
    var prevFocus = fm.get();

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    fm.next();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  }, isEditableState);

  am.action('item:edit:before', function (e) {
    var prevFocus = fm.get();

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    fm.prev();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  }, isEditableState);

  am.action('item:new:edit', function () {
    var group = im.get('filters').group;

    if (group !== false) {
      if (group[0] !== '!') {
        am.trigger('item:edit:clear', false, false, 'new', ' ' + grouper.getGroup(group[0])[group[1]]);
      } else {
        am.trigger('item:edit:clear', false, false, 'new');
      }
    } else {
      am.trigger('item:edit:clear', false, false, 'new');
    }
  }, isEditableState);

  am.action('item:new:at-top', function (e) {
    var todo;

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todo = prepareNewTodo(0);
    todos.prepend(todo);
    fm.set(0);
    am.trigger('item:new:edit');
  }, isEditableState);

  am.action('item:new:at-bottom', function (e) {
    var todo;

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todo = prepareNewTodo(fm.getMax());
    todos.append(todo);
    fm.set(fm.getMax());
    am.trigger('item:new:edit');
  }, isEditableState);

  am.action('item:new:after', function (e) {
    var todo;

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todo = prepareNewTodo();
    buffer.push(todo.getFullText());
    am.trigger('item:paste:after');
    am.trigger('item:new:edit');
  }, isEditableState);

  am.action('item:new:before', function (e) {
    var todo;

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todo = prepareNewTodo();
    buffer.push(todo.getFullText());
    am.trigger('item:paste:before');
    am.trigger('item:new:edit');
  }, isEditableState);

  am.action('item:new:when-empty', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todos.prepend(generics.new);
    fm.set(0);
    am.trigger('item:new:edit');
  });

  am.action('item:update', function (text) {
    var
      theId = id(),
      newFullText = text,
      todo = todos.get(theId)
    ;

    if (todo.hasPriority()) {
      newFullText = '(' + todo.getPriority() + ') ' + text;
    }

    if (!matchesFilters(newFullText)) {
      im.get('filters').group = false;
      am.trigger('app:search:clear', false);
      fm.set(filterer.getIndex(theId));
      todos.get(theId).text(text);

      return false;
    }

    todos.get(theId).text(text);

    return true;
  }, isEditableState);

  am.action('item:priority-toggle', function (e, combo) {
    var index = getNumberFromKeyCombo(combo);

    todos.get(id()).togglePriority(index);
  }, isEditableState);

  am.action('item:priority-remove', function (e, combo) {
    todos.get(id()).removePriority();
  }, isEditableState);

  am.action('app:search:focus', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    im.get('search').focus().select();
  });

  am.action('app:search:blur', function () {
    im.get('search').blur();
  });

  am.action('app:search:clear', function (triggerReload) {
    var
      item,
      reload = triggerReload || true,
      fullIndex = fm.get()
    ;

    if (!_.isEmpty(im.get('search').value())) {
      item = filterer.getByIndex(fm.get());

      if (item) {
        fullIndex = grouper.getIndex(item.id());
      }
    }

    im.get('search').value('');
    im.get('filters').filter = false;

    if (reload) {
      am.trigger('app:list:render');
    }

    fm.set(fullIndex);
  });

  am.action('app:search:trigger', function () {
    im.get('filters').filter = im.get('search').value();
    am.trigger('app:list:render');
  });

  am.action('app:jump:show', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    im.get('jump')
      .show()
      .value('')
      .focus()
    ;
  });

  am.action('app:jump:hide', function () {
    im.get('jump').hide();
  });

  am.action('app:jump:trigger', function () {
    var line = parseInt(im.get('jump').value().replace(/[^\d]/g, ''), 10);

    if (!_.isNumber(line) || _.isNaN(line)) {
      line = 0;
    }

    fm.set(line - 1);
  });

  am.action('app:edit:hide', function () {
    im.get('edit').hide();
  });

  am.action('app:new:hide', function () {
    im.get('new').hide();
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

  am.action('app:context:no-directory', function (contextKeys) {
    im.switchContext('no-directory');
  });

  am.action('app:context:missing-file', function (contextKeys) {
    im.switchContext('missing-file');
  });

  am.action('app:context:default', function () {
    var didSwitch;

    if (todos.length() === 0) {
      didSwitch = im.switchContext('empty');

      if (didSwitch) {
        am.trigger('app:clear');
        document.getElementById('empty-no-todos').style.display = 'block';
        document.getElementById('empty-no-results').style.display = 'none';
      }
    } else {
      didSwitch = im.switchContext('default');

      if (didSwitch) {
        document.getElementById('empty-no-todos').style.display = 'none';
        document.getElementById('empty-no-results').style.display = 'block';
        im.get('search').enable();
      }
    }
  });

  am.action('app:context:input', function (contextKeys) {
    im.switchContext('input').bindKeyEvents(contextKeys);
  });

  am.action('app:clear', function () {
    var possibleInput = document.querySelector('input:focus');

    im.get('filters').group = false;
    am.trigger('app:search:clear');
    im.get('menu').clearShowPriorityChecks();

    if (possibleInput) {
      possibleInput.blur();
    }
  });

  am.action('app:set-title', function () {
    document.title = storage.getFolder().replace(/\/Users\/[^\/]+/, '~') + ' — Todosaurus';
  });

/*
  am.action('app:sort:manually', function () {
    im.get('filters').order = false;
    am.trigger('app:list:render');
    im.get('menu').triggerSort('manually');
    localStorage.setItem('sort-order', 'false');
  });

  am.action('app:sort:priority', function () {
    im.get('filters').order = true;
    am.trigger('app:list:render');
    im.get('menu').triggerSort('priority');
    localStorage.setItem('sort-order', 'true');
  });
*/

  am.action('tags:create', function () {
    am.trigger('tags:create:projects');
    am.trigger('tags:create:contexts');
    am.trigger('tags:create:priority');
  });

  am.action('tags:create:projects', function () {
    var tags = todos.getAllTags('+');

    grouper.setGroup('+', tags);
    im.get('tags-projects').render(tags);
    im.get('input-auto-complete').resetData('+', tags);
  });

  am.action('tags:create:contexts', function () {
    var tags = todos.getAllTags('@');

    grouper.setGroup('@', tags);
    im.get('tags-contexts').render(tags);
    im.get('input-auto-complete').resetData('@', tags);
  });

  am.action('tags:create:priority', function () {
    var tags = generics.priorities;

    grouper.setGroup('!', tags);
    im.get('tags-priority').render(tags);
  });

  am.action('tags:show', function (tag, combo) {
    var id;

    if (_.isArray(combo)) {
      id = combo[1];
    } else {
      id = getNumberFromKeyCombo(combo);
    }

    if (id > grouper.getGroup(tag).length - 1) {
      am.trigger('tags:clear');
    } else {
      im.get('filters').group = [tag, id];
      am.trigger('app:list:render');
      am.trigger('tags:highlight-active', tag, id);
    }
  });

  am.action('tags:show:projects', function (e, combo) {
    am.trigger('tags:clear-active');
    am.trigger('tags:show', '+', combo);
  });

  am.action('tags:show:contexts', function (e, combo) {
    am.trigger('tags:clear-active');
    am.trigger('tags:show', '@', combo);
  });

  am.action('tags:show:priority', function (e, combo) {
    var pri = ['a', 'b', 'c', 'd', 'e'];

    am.trigger('tags:clear-active');
    am.trigger('tags:show', '!', combo);

    im.get('menu').clearShowPriorityChecks();
    im.get('menu').checkShowPriority(pri[getNumberFromKeyCombo(combo)]);
  });

  am.action('tags:clear', function () {
    var
      item = filterer.getByIndex(fm.get()),
      fullIndex = fm.get()
    ;

    if (item) {
      fullIndex = orderer.getIndex(item.id());
    }

    im.get('filters').group = false;
    im.get('menu').clearShowPriorityChecks();
    am.trigger('tags:clear-active');
    am.trigger('app:list:render');
    fm.set(fullIndex);
  });

  am.action('tags:highlight-active', function (tag, index) {
    if (tag === '+') {
      im.get('tags-projects').activate(index);
    }

    if (tag === '@') {
      im.get('tags-contexts').activate(index);
    }

    if (tag === '!') {
      im.get('tags-priority').activate(index);
    }
  });

  am.action('tags:clear-active', function () {
    im.get('tags-projects').deactivateAll();
    im.get('tags-contexts').deactivateAll();
    im.get('tags-priority').deactivateAll();
  });

  am.action('tags:search:projects', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    im.get('tags-search')
      .group('+')
      .show()
      .value('')
      .focus()
    ;
  });

  am.action('tags:search:contexts', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    im.get('tags-search')
      .group('@')
      .show()
      .value('')
      .focus()
    ;
  });

  am.action('tags:search:hide', function () {
    im.get('tags-search').hide();
  });

  am.action('tags:search:trigger', function () {
    var tag = grouper.findTagStartingWith(im.get('tags-search').value(), im.get('tags-search').group());

    if (!tag) {
      am.trigger('tags:clear-active');
    } else {
      if (tag[0] === '+') {
        am.trigger('tags:show:projects', false, tag);
      } else {
        am.trigger('tags:show:contexts', false, tag);
      }
    }
  });

  am.action('storage:folder:switch', function () {
    im.get('file-chooser').hide();
    im.get('folder-chooser').show();
    am.trigger('app:context:no-directory');
  });

  am.action('storage:folder:change', function () {
    im.dialogueOpen = true;
    im.get('folder-chooser').showInvisible();
    im.get('folder-chooser').input.click();
  });

  am.action('storage:folder:choose', function () {
    var folder = im.get('folder-chooser').getFiles()[0];

    storage.setFolder(folder.path);
    am.trigger('storage:read-or-new');
  });

  am.action('storage:file:new', function () {
    var startupData = [
      'Welcome to Todosaurus! +Todosaurus',
      'A app for the Todo.txt format. @todotxt',
      'Press “n” to create a new todo item.',
      'Or press “?” for more keyboard shortcuts.'
    ];

    im.get('folder-chooser').hide();
    im.get('file-chooser').hide();
    am.trigger('app:set-title');
    todos.populate(startupData);
    am.trigger('app:context:default');
  });

  am.action('storage:read', function () {
    storage.read(function (err, data) {
      if (err) {
        if (err.message === storage.errors.NOT_FOUND) {
          im.get('folder-chooser').hide();
          im.get('file-chooser').show(storage.getFolder());
          am.trigger('app:context:missing-file');
          return;
        }

        im.get('folder-chooser').show();
        am.trigger('app:context:no-directory');
        return;
      }

      im.get('folder-chooser').hide();
      im.get('file-chooser').hide();

      am.trigger('app:set-title');
      todos.populate(data);
      am.trigger('app:context:default');
    });
  });

  am.action('storage:read-if-changed', function () {
    var stats, file, local;

    if (window.isNode) {
      try {
        stats = require('fs').statSync(storage.getPath());
        file = stats.mtime;
      } catch (e) {
        file = new Date();
      }

      local = new Date(localStorage.getItem('mtime'));

      if (file > local) {
        am.trigger('storage:read');
      }
    }
  });

  am.action('storage:read-or-new', function () {
    im.get('folder-chooser').hide();
    im.get('file-chooser').hide();

    storage.read(function (err, data) {
      if (err) {
        am.trigger('storage:file:new');
      } else {
        am.trigger('app:set-title');
        todos.populate(data);
        am.trigger('app:context:default');
      }
    });
  });

  am.action('storage:save', function () {
    storage.save(todos.getAllFullText());
  });

  am.action('storage:sort-file', function () {
    todos.populate(orderer.getOrderedItems(todos.getAll()));
  });

  am.action('storage:archive', function () {
    var keep = [], done = [], all = _.cloneDeep(todos.getAll());

    _.each(all, function (item) {
      if (item.isMarked()) {
        done.push(item.getFullText());
      } else {
        keep.push(item);
      }
    });

    todos.populate(keep);
    storage.saveArchive(done.sort());
  });

  am.action('storage:reveal-finder', function () {
    gui.Shell.showItemInFolder(storage.getFolder());
  });

  am.action('help:shortcuts', function () {
    var help = gui.Window.open('./help.html', {
      width: 500,
      height: 700,
      toolbar: false,
      focus: true
    });

    // help.moveTo(window.screen.availWidth - help.width, 0);
  });

};
