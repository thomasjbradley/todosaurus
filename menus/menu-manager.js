var MenuManager = function () {
  "use strict";

  var methods = {};

  var triggerIfMenuExists = function (func) {
    return function () {
      if (window.isNode) {
        func.apply(this, arguments);
      }
    };
  };
/*
  var triggerSort = function (dir) {
    if (dir === 'manually') {
      menu['view:sort-manually'].checked = true;
      menu['view:sort-priority'].checked = false;
      menu['edit:move-down'].enabled = true;
      menu['edit:move-up'].enabled = true;
    } else {
     menu['view:sort-priority'].checked = true;
      menu['view:sort-manually'].checked = false;
      menu['edit:move-down'].enabled = false;
      menu['edit:move-up'].enabled = false;
    }
  };
*/
  var checkShowPriority = function (pri) {
    menu['view:show-priority:' + pri].checked = true;
  };

  var clearShowPriorityChecks = function () {
    menu['view:show-priority:a'].checked = false;
    menu['view:show-priority:b'].checked = false;
    menu['view:show-priority:c'].checked = false;
    menu['view:show-priority:d'].checked = false;
    menu['view:show-priority:e'].checked = false;
  };

  var bindEvents = function (events) {
    _.each(events, function (item, key) {
      menu[key].click = function () {
        Mousetrap.trigger(item);
      };
    });
  };

  methods = {
    // triggerSort: triggerIfMenuExists(triggerSort),
    checkShowPriority: triggerIfMenuExists(checkShowPriority),
    clearShowPriorityChecks: triggerIfMenuExists(clearShowPriorityChecks),
    bindEvents: triggerIfMenuExists(bindEvents)
  };

  return methods;
};
