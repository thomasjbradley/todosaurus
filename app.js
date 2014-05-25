(function () {
  var
    fm = new FocusManager(),
    am = new ActionManager(),
    todos = new Todos(),
    actions = new Actions(am, fm, todos),
    out = document.getElementById('out'),
    focus = document.getElementById('focus')
  ;

  _.each(keys, function (elem, index, list) {
    Mousetrap.bind(elem, function () {
      am.trigger(index);
    });
  });

  todos.subscribe(function (items) {
    out.innerHTML = '<li>' + items.join('</li><li>') + '</li>';
  });

  todos.subscribe(function (items) {
    fm.setMax(items.length - 1);
  });

  fm.subscribe(function (index) {
    focus.value = index;
  });

  todos.populate(['Watch TV', 'Cook', 'Walk', 'Read', 'Code']);
}());
