const Todo = function (fullText) {
  "use strict";

  let methods = {};
  const subscriptions = [];
  const id = _.uniqueId();
  const priorities = ["A", "B", "C", "D", "E"];
  let text = fullText;
  let data = {
    created: new Date().toISOString().substring(0, 10),
    completed: false,
    priority: false,
  };

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(methods);
    });
  };

  const chainer = (func) => {
    return function () {
      func.apply(this, arguments);
      return methods;
    };
  };

  const informer = (func) => {
    return function () {
      func.apply(this, arguments);
      inform();
      return methods;
    };
  };

  const parseFullText = () => {
    let tmpText = fullText
      .trim()
      .replace(/[\s\n\r\t]/g, " ")
      .replace(/\s+/g, " ");
    let isComplete = false;
    if (tmpText.substr(0, 2) === "x ") {
      isComplete = true;
      tmpText = tmpText.slice(1).trim();
    }
    if (tmpText.match(/^\([A-Z]\)\s+/i)) {
      addPriority(tmpText.substr(0, 3).replace(/[^[A-Z]/gi, ""));
      tmpText = tmpText.slice(3).trim();
    }
    if (tmpText.match(/^\d{4}-\d{2}-\d{2}\s+\d{4}-\d{2}-\d{2}/)) {
      if (isComplete) {
        mark(tmpText.substr(0, 10));
      }
      tmpText = tmpText.slice(10).trim();
    } else {
      if (isComplete) {
        mark();
      }
      tmpText = tmpText.trim();
    }
    if (tmpText.match(/^\d{4}-\d{2}-\d{2}/)) {
      data.created = tmpText.slice(0, 10);
      tmpText = tmpText.slice(11).trim();
    }
    setText(tmpText);
  };

  const getFullText = () => {
    var finalText = data.created + " " + text;
    if (hasPriority()) {
      finalText = "(" + getPriority() + ") " + finalText;
    }
    if (isMarked()) {
      finalText = "x " + data.completed + " " + finalText;
    }
    return finalText;
  };

  const getId = () => {
    return id;
  };

  const resetCreated = () => {
    data.created = new Date().toISOString().substring(0, 10);
  };

  const getCreatedDate = () => {
    return data.created;
  };

  const setText = (t) => {
    text = t.trim();
  };

  const manageText = (t) => {
    if (t === undefined) {
      return text;
    } else {
      setText(t);
      inform();
      return methods;
    }
  };

  const mark = (date) => {
    if (date !== undefined) {
      data.completed = date;
    } else {
      data.completed = new Date().toISOString().substring(0, 10);
    }
    data.priority = false;
  };

  const unmark = () => {
    data.marked = false;
    data.completed = false;
  };

  const isMarked = () => {
    return !!data.completed;
  };

  const getCompletedDate = () => {
    return data.completed;
  };

  const toggle = () => {
    if (isMarked()) {
      unmark();
    } else {
      mark();
    }
  };

  const findPriority = (pri) => {
    if (isFinite(pri)) {
      pri = pri.toUpperCase();
      if (pri > priorities.length - 1) {
        return _.last(priorities);
      } else {
        return priorities[pri];
      }
    }
    return pri;
  };

  const hasPriority = () => {
    return data.priority !== false;
  };

  const removePriority = () => {
    data.priority = false;
  };

  const getPriority = () => {
    return data.priority;
  };

  const addPriority = (pri) => {
    if (isMarked()) {
      unmark();
    }
    data.priority = findPriority(pri);
  };

  const togglePriority = (pri) => {
    var priority;
    if (!hasPriority()) {
      addPriority(pri);
      return;
    }
    priority = findPriority(pri);
    if (priority === data.priority) {
      removePriority();
    } else {
      data.priority = priority;
    }
  };

  methods = {
    subscribe: chainer(subscribe),
    id: getId,
    resetCreated: chainer(resetCreated),
    getCreatedDate: getCreatedDate,
    getFullText: getFullText,
    text: manageText,
    mark: informer(mark),
    unmark: informer(unmark),
    isMarked: isMarked,
    getCompletedDate: getCompletedDate,
    toggle: informer(toggle),
    hasPriority: hasPriority,
    getPriority: getPriority,
    removePriority: informer(removePriority),
    addPriority: informer(addPriority),
    togglePriority: informer(togglePriority),
  };
  parseFullText();
  return methods;
};
