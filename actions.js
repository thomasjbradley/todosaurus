var Actions = function (generics, am, fm, im, storage, todos, orderer, grouper, filterer, buffer) {
  "use strict";

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

  var matchesFilters = function (id) {
    return (
      filterer.matchesFilter(todos.get(id).text(), im.get('filters').filter)
      && grouper.matchesGroup(todos.get(id).text(), im.get('filters').group)
    );
  };

  var clearShowPriorityMenuChecks = function () {
    menu['view:show-priority:a'].checked = false;
    menu['view:show-priority:b'].checked = false;
    menu['view:show-priority:c'].checked = false;
    menu['view:show-priority:d'].checked = false;
    menu['view:show-priority:e'].checked = false;
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

  am.action('item:delete', function () {
    todos.remove(id());
  });

  am.action('item:cut', function () {
    var text = todos.get(id()).getFullText();

    if (window.isNode) {
      clipboard.set(text, 'text');
    }

    buffer.push(text);
    todos.remove(id());
  });

  am.action('item:copy', function () {
    var text = todos.get(id()).getFullText();

    if (window.isNode) {
      clipboard.set(text, 'text');
    }

    buffer.push(text);
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

    am.trigger('item:cut');

    if (startFocus <= fm.getMax()) {
      am.trigger('item:focus:prev');
    }

    am.trigger('item:paste:before');
  });

  am.action('item:move:down', function () {
    am.trigger('item:cut');
    am.trigger('item:paste:after');
  });

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
  });

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
  });

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
  });

  am.action('item:edit:clear', function (e, combo, input) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
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

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    fm.next();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  });

  am.action('item:edit:before', function (e) {
    var prevFocus = fm.get();

    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    fm.prev();

    if (fm.get() !== prevFocus) {
      am.trigger('item:edit');
    }
  });

  am.action('item:new:at-top', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todos.prepend(getNewText());
    fm.set(0);
    am.trigger('item:edit:clear', false, false, 'new');
  });

  am.action('item:new:at-bottom', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    todos.append(getNewText());
    fm.set(fm.getMax());
    am.trigger('item:edit:clear', false, false, 'new');
  });

  am.action('item:new:after', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    buffer.push(getNewText());
    am.trigger('item:paste:after');
    am.trigger('item:edit:clear', false, false, 'new');
  });

  am.action('item:new:before', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    buffer.push(getNewText());
    am.trigger('item:paste:before');
    am.trigger('item:edit:clear', false, false, 'new');
  });

  am.action('item:update', function (text) {
    var theId = id();

    if (theId && !matchesFilters(theId)) {
      im.get('filters').group = false; // tags:clear without double render
      am.trigger('app:search:clear');
      fm.set(filterer.getIndex(theId));
    }

    todos.get(theId).text(text);
  });

  am.action('item:delete-if-empty', function () {
    if (isFieldEmpty(id())) {
      todos.remove(id());
    }
  });

  am.action('item:priority-toggle', function (e, combo) {
    var index = getNumberFromKeyCombo(combo);
    todos.get(id()).togglePriority(index);
  });

  am.action('item:priority-remove', function (e, combo) {
    todos.get(id()).removePriority();
  });

  am.action('app:search:focus', function (e) {
    if (!_.isUndefined(e) && _.has(e, 'bubbles')) {
      e.preventDefault();
    }

    im.get('search').focus().select();
  });

  am.action('app:search:blur', function () {
    im.get('search').blur();
  });

  am.action('app:search:clear', function () {
    var
      item = filterer.getByIndex(fm.get()),
      fullIndex = 0
    ;

    if (item) {
      fullIndex = todos.getIndex(item.id());
    }

    am.trigger('app:search:blur');
    im.get('search').value('');
    im.get('filters').filter = false;
    am.trigger('app:list:render');
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

  am.action('app:context:default', function () {
    im.switchContext('default');
  });

  am.action('app:context:input', function (contextKeys) {
    im.switchContext('input').bindKeyEvents(contextKeys);
  });

  am.action('app:clear', function () {
    im.get('filters').group = false; // tags:clear without double render
    am.trigger('app:search:clear');
  });

  am.action('app:set-title', function () {
    document.title = storage.getFolder().replace(/\/Users\/[^\/]+/, '~') + ' — Todosaurus';
  });

  am.action('tags:create', function () {
    am.trigger('tags:create:projects');
    am.trigger('tags:create:contexts');
    am.trigger('tags:create:priority');
  });

  am.action('tags:create:projects', function () {
    var tags = todos.getAllTags('+');
    grouper.setGroup('+', tags);
    im.get('tags-projects').render(tags);
  });

  am.action('tags:create:contexts', function () {
    var tags = todos.getAllTags('@');
    grouper.setGroup('@', tags);
    im.get('tags-contexts').render(tags);
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

    if (window.isNode) {
      clearShowPriorityMenuChecks();
      menu['view:show-priority:' + pri[getNumberFromKeyCombo(combo)]].checked = true;
    }
  });

  am.action('tags:clear', function () {
    im.get('filters').group = false;
    am.trigger('tags:clear-active');
    am.trigger('app:list:render');

    if (window.isNode) {
      clearShowPriorityMenuChecks();
    }
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
    var tag;

    tag = grouper.findTagStartingWith(im.get('tags-search').value(), im.get('tags-search').group());

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
    im.reset();
    im.get('file-chooser').hide();
    im.get('folder-chooser').show();
  });

  am.action('storage:folder:change', function () {
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
      'Press “n” to create a new todo item.'
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
          return;
        }

        im.get('folder-chooser').show();
        return;
      }

      im.get('folder-chooser').hide();
      im.get('file-chooser').hide();

      am.trigger('app:set-title');
      todos.populate(data);
      am.trigger('app:context:default');
    });
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

  am.action('storage:reveal-finder', function () {
    var exec = require('child_process').exec;

    exec('open ' + storage.getFolder(), function (error, stdout, stderr) { });
  });

};
