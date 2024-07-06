const Orderer = function () {
  "use strict";

  let methods = {};
  const subscriptions = [];
  let ordered;

  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  const inform = () => {
    subscriptions.forEach((callback) => {
      callback(ordered);
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

  const length = () => {
    return ordered.length;
  };

  const getOrderedItems = (todos) => {
    let orderGroups = { start: [], middle: [], end: [] };
    _.each(todos, (item) => {
      if (item.hasPriority()) {
        orderGroups.start.push(item);
        return;
      }
      if (item.isMarked()) {
        orderGroups.end.push(item);
        return;
      }
      if (!item.isMarked() && !item.hasPriority()) {
        orderGroups.middle.push(item);
      }
    });
    orderGroups.start = orderGroups.start.sort((a, b) => {
      a = a.getFullText();
      b = b.getFullText();
      return a < b ? -1 : a > b ? 1 : 0;
    });
    orderGroups.middle = orderGroups.middle.sort((a, b) => {
      a = a.getCreatedDate();
      b = b.getCreatedDate();
      return a < b ? -1 : a > b ? 1 : 0;
    });
    orderGroups.end = orderGroups.end.sort((a, b) => {
      a = a.getCompletedDate();
      b = b.getCompletedDate();
      return a > b ? -1 : a < b ? 1 : 0;
    });
    return [].concat(orderGroups.start, orderGroups.middle, orderGroups.end);
  };

  const order = (todos, isOrdered) => {
    if (isOrdered === undefined || isOrdered === false) {
      ordered = todos;
    } else {
      ordered = getOrderedItems(todos, isOrdered);
    }
  };

  const getIndex = (id) => {
    var items = _.map(ordered, (item) => {
      return item.id();
    });
    return items.indexOf(id);
  };

  methods = {
    subscribe: chainer(subscribe),
    length: length,
    getOrderedItems: getOrderedItems,
    order: informer(order),
    getIndex: getIndex,
  };
  return methods;
};
