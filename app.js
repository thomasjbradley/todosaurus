(function () {
  "use strict";

  var
    todoskey = 'todos.txt',
    fm = new FocusManager(),
    am = new ActionManager(),
    im = new InterfaceManager(fm, am),
    storage = new Storage(),
    todos = new Todos(),
    filterer = new Filterer(),
    buffer = new Buffer(),
    actions = new Actions(am, fm, im, filterer, todos, buffer),
    main = document.getElementsByClassName('main')[0];
  ;

  storage.set(new LocalStorageHelper());

  im.bindDefaultKeyActions(keys);
  im.add('list', new ListControl('list', am));
  im.add('search', new SearchControl('search', am));
  im.add('jump', new JumpControl('jump', am));
  im.add('edit', new EditControl('edit', am));
  im.add('new', new NewControl('new', am));
  document.addEventListener('click', im.handleMouseEvents, false);

  var renderFocus = function (index) {
    var items = im.get('list').getAllItemElements();

    _.each(items, function (elem, index) {
      elem.setAttribute('data-focused', 'false');
    });

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

  todos.subscribe(function (items) {
    filterer.filter(items, im.get('search').value());
    storage.save(todoskey, todos.getString());
  });

  filterer.subscribe(function (items) {
    im.get('list').render(items);
    fm.setMax(items.length - 1);
    renderFocus(fm.get());
  });

  fm.subscribe(function (index) {
    renderFocus(index);
    scrollList(index);
  });

  // todos.populate(['Watch TV', 'x Cook +life', 'Walk', 'Read', 'Code +todo', 'x Listen to Music', 'Eat +life', 'Sleep']);
  todos.populate(storage.read(todoskey));

  // buffer.subscribe(function (buffer) {
  //   console.log(buffer.length(), buffer);
  // });
}());
