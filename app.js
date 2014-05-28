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
    li = document.getElementsByTagName('li')
  ;

  storage.set(new LocalStorageHelper());

  im.bindDefaultKeyActions(keys);
  im.add('list', new ListControl('list', am));
  im.add('search', new SearchControl('search', am));
  im.add('jump', new JumpControl('jump', am));
  im.add('edit', new EditControl('edit', am));
  im.add('new', new NewControl('new', am));
  document.addEventListener('click', im.handleMouseEvents, false);

  var render = function (index) {
    _.each(li, function (elem, index) {
      elem.setAttribute('data-focused', 'false');
    });

    if (li && li.length > 0) {
      li[index].setAttribute('data-focused', 'true');
    }
  };

  todos.subscribe(function (items) {
    filterer.filter(items, im.get('search').value());
    storage.save(todoskey, todos.getString());
  });

  filterer.subscribe(function (items) {
    im.get('list').render(items);
    fm.setMax(items.length - 1);
    render(fm.get());
  });

  fm.subscribe(function (index) {
    render(index);
  });

  // todos.populate(['Watch TV', 'x Cook +life', 'Walk', 'Read', 'Code +todo', 'x Listen to Music', 'Eat +life', 'Sleep']);
  todos.populate(storage.read(todoskey));

  // buffer.subscribe(function (buffer) {
  //   console.log(buffer.length(), buffer);
  // });
}());
