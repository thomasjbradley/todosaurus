var UndoStack = function (maxItems) {
  "use strict";

  var
    methods,
    max = maxItems || 10,
    undoStack = [],
    redoStack = []
  ;

  var push = function (item) {
    undoStack.push(_.cloneDeep(item));
    redoStack = [];
  };

  var canUndo = function () {
    return !!undoStack.length;
  };

  var undo = function () {
    var item = undoStack.pop();

    redoStack.push(item);

    return item;
  };

  var canRedo = function () {
    return !!redoStack.length;
  };

  var redo = function () {
    var item = redoStack.pop();

    undoStack.push(item);

    return item;
  };

  var clear = function () {
    undoStack = [];
    redoStack = [];
  };

  methods = {
    push: push,
    canUndo: canUndo,
    undo: undo,
    canRedo: canRedo,
    redo: redo,
    clear: clear
  };

  return methods;
};
