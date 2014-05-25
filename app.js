(function () {
  "use strict";

  var
    fm = new FocusManager(),
    am = new ActionManager(),
    todos = new Todos(),
    buffer = new Todos(),
    actions = new Actions(am, fm, todos, buffer),
    out = document.getElementById('out'),
    focus = document.getElementById('focus'),
    li = document.getElementsByTagName('li')
  ;

  var render = function (index) {
    _.each(li, function (elem, index) {
      elem.className = '';
    });

    li[index].className = 'focus'
  };

  _.each(keys, function (elem, index, list) {
    Mousetrap.bind(elem, function () {
      am.trigger(index);
    });
  });

  todos.subscribe(function (items) {
    out.innerHTML = '<li>' + items.join('</li><li>') + '</li>';
    fm.setMax(items.length - 1);
    render(fm.get());
  });

  fm.subscribe(function (index) {
    focus.value = index;
    render(index);
  });

  todos.populate(['Watch TV', 'Cook', 'Walk', 'Read', 'Code', 'Listen to Music', 'Eat', 'Sleep']);

  buffer.subscribe(function (items) {
    console.log(items);
  });

}());
