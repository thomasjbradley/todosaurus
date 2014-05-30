(function () {
  "use strict";

  var
    generics = {
      new: '%%NEW%%'
    },
    filters = {
      order: false,
      group: false,
      filter: false
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
    main = document.getElementsByClassName('main')[0];
  ;

  if (!_.isUndefined(FileSystemHelper) && window.isNode) {
    storage.set(new FileSystemHelper());
  } else {
    storage.set(new LocalStorageHelper());
    storage.setFolder('LocalStorage');
  }

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
    orderer.order(items, im.get('filters').order);
    am.trigger('storage:save');
  });

  orderer.subscribe(function (items) {
    var group = im.get('filters').group;

    grouper.group(items, im.get('filters').group);
    am.trigger('app:tags:highlight-active', group[0], group[1]);
  });

  grouper.subscribe(function (items) {
    if (_.isEmpty(items)) {
      am.trigger('app:tags:clear');
      am.trigger('app:tags:clear-active');
    } else {
      filterer.filter(items, im.get('filters').filter);
    }
  });

  filterer.subscribe(function (items) {
    im.get('list').render(items);
    fm.setMax(items.length - 1);
    im.get('progress').set(getNumberCompleteItems(items), items.length);
    renderFocus(fm.get());
    am.trigger('app:tags:create');
  });

  fm.subscribe(function (index) {
    renderFocus(index);
    scrollList(index);
  });

  am.trigger('storage:read');

  // buffer.subscribe(function (buffer) {
  //   console.log(buffer.length(), buffer);
  // });
}());
