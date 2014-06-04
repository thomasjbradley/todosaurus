(function () {
  "use strict";

  var
    generics = {
      new: '%%NEW%%',
      priorities: [
        'A: Now',
        'B: Today',
        'C: Tomorrow',
        'D: This Week',
        'E: Next Week'
      ]
    },
    fm = new FocusManager(),
    am = new ActionManager(),
    im = new InterfaceManager(fm, am),
    storage = new StorageManager(),
    todos = new Todos(),
    orderer = new Orderer(),
    grouper = new Grouper(generics),
    filterer = new Filterer(generics),
    buffer = new Buffer(),
    actions = new Actions(generics, am, fm, im, storage, todos, orderer, grouper, filterer, buffer),
    main = document.getElementsByClassName('main')[0]
  ;

  if (!_.isUndefined(FileSystemHelper) && window.isNode) {
    storage.set(new FileSystemHelper());
  } else {
    storage.set(new LocalStorageHelper());
    storage.setFolder('LocalStorage');
    document.getElementById('other-folder-options').style.display = 'none';
  }

  im.setContext('no-directory', bindings.nodirectory, menuContexts.nodirectory);
  im.setContext('missing-file', bindings.missingfile, menuContexts.missingfile);
  im.setContext('empty', bindings.empty, menuContexts.empty);

  im.setContext('default', bindings.default, menuContexts.default, function (isCurrent) {
    if (isCurrent) {
      am.trigger('app:list:focus');
    } else {
      am.trigger('app:list:blur');
    }
  });

  im.setContext('input', bindings.input, menuContexts.input);

  im.add('menu', new MenuManager());
  im.get('menu').bindEvents(bindings.menu);

  im.add('filters', filters);
  im.add('list', new ListControl('list', am));
  im.add('search', new SearchControl('search', am));
  im.add('progress', new ProgressControl('progress', am));
  im.add('jump', new JumpControl('jump', am));
  im.add('edit', new EditControl('edit', am));
  im.add('new', new NewControl('new', am));
  im.add('folder-chooser', new FolderChooserControl('folder-chooser', am));
  im.add('file-chooser', new FileChooserControl('file-chooser', am));
  im.add('tags-projects', new TagsControl('tags-projects', am));
  im.add('tags-contexts', new TagsControl('tags-contexts', am, {pillClass: 'pill--alt'}));
  im.add('tags-priority', new TagsControl('tags-priority', am, {pillClass: 'tag--priority'}));
  im.add('tags-search', new TagsSearchControl('tags-search', am));

  im.add('input-auto-complete', new InputAutoComplete(jQuery, im));

  document.addEventListener('click', im.handleMouseEvents, false);

  var renderFocus = function (index) {
    var
      items = im.get('list').getAllItemElements(),
      current = im.get('list').getAllItemElementsWith('[data-focused="true"]')
    ;

    if (current && current.length > 0) {
      current[0].setAttribute('data-focused', 'false');
    }

    if (items && items.length > 0) {
      items[index].setAttribute('data-focused', 'true');
    }
  };

  var getPosition = function () {
    var elem  = im.get('list').getItemElement(fm.get());

    return {
      left: elem.offsetLeft,
      top: elem.offsetTop,
      height: elem.offsetHeight
    };
  }

  var scrollList = function (index) {
    var
      pos = getPosition(),
      newTop
    ;

    if (pos.top + pos.height > main.offsetHeight + main.scrollTop) {
      newTop = (pos.top + pos.height) - main.offsetHeight;
      main.scrollTop = newTop;
    }

    if (pos.top < main.scrollTop) {
      newTop = pos.top;
      main.scrollTop = newTop;
    }
  };

  var getNumberCompleteItems = function (items) {
    var sum = 0;

    _.forEach(items, function(item) {
      if (item.isMarked()) {
        sum++;
      }
    });

    return sum;
  };

  todos.subscribe(function (items) {
    am.trigger('app:context:default');
    orderer.order(items, im.get('filters').order);
    am.trigger('storage:save');
    localStorage.setItem('mtime', new Date());
  });

  orderer.subscribe(function (items) {
    var group = im.get('filters').group;

    grouper.group(items, im.get('filters').group);
    am.trigger('tags:highlight-active', group[0], group[1]);
  });

  grouper.subscribe(function (items) {
    if (_.isEmpty(items) && _.isArray(im.get('filters').group) && im.get('filters').group[0] !== '!') {
      im.get('filters').group = false;
      am.trigger('tags:clear-active');
      am.trigger('tags:clear');
    } else {
      filterer.filter(items, im.get('filters').filter);
    }
  });

  filterer.subscribe(function (items) {
    im.get('list').render(items);
    fm.setMax(items.length - 1);
    im.get('progress').set(getNumberCompleteItems(items), items.length);
    renderFocus(fm.get());
    am.trigger('tags:create');
  });

  fm.subscribe(function (index) {
    if (im.get('list').length()) {
      renderFocus(index);
      scrollList(index);
    }
  });

  if (window.isNode) {
    gui.Window.get().on('focus', function () {
      document.body.classList.add('window--has-focus');
      am.trigger('storage:read-if-changed');
    });

    gui.Window.get().on('blur', function () {
      document.body.classList.remove('window--has-focus');
    });
  }

  im.switchContext('no-directory');
  am.trigger('storage:read');

/*
  filters.order = localStorage.getItem('sort-order');

  if (filters.order === 'true') {
    filters.order = true;
    im.get('menu').triggerSort('priority');
  } else {
    filters.order = false;
    im.get('menu').triggerSort('manually');
  }
*/

/*
  buffer.subscribe(function (buffer) {
    console.log(buffer.length(), buffer);
  });
*/
}());
