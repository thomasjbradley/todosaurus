const EditControl = function (elem, actionManager) {
  "use strict";

  let that = InputControl(elem, actionManager);

  const isCommittable = () => {
    return that.value();
  };

  const commit = () => {
    that.getActionManager().trigger("app:edit:hide");
    return that.getActionManager().trigger("item:update", that.value());
  };

  const discard = () => {
    return that.getActionManager().trigger("app:edit:hide");
  };

  const commitOrDiscard = (isCommittable) => {
    if (isCommittable) {
      return commit();
    } else {
      return discard();
    }
  };

  that.bindEvents([
    {
      event: "blur",
      callback: (e) => {
        e.preventDefault();
        commitOrDiscard(isCommittable());
      },
    },
  ]);

  that.bindKeyEvents([
    {
      keys: ["enter", "mod+enter"],
      callback: (e) => {
        e.preventDefault();
        if (isCommittable()) {
          commit();
        }
      },
    },
    {
      keys: ["esc"],
      callback: (e) => {
        console.log("ESC!");
        e.preventDefault();
        discard();
      },
    },
    {
      keys: ["tab"],
      callback: (e) => {
        let goNext;
        e.preventDefault();
        goNext = commitOrDiscard(isCommittable());
        if (goNext) {
          that.getActionManager().trigger("item:edit:after");
        }
      },
    },
    {
      keys: ["shift+tab"],
      callback: (e) => {
        let goNext;
        e.preventDefault();
        goNext = commitOrDiscard(isCommittable());
        if (goNext) {
          that.getActionManager().trigger("item:edit:before");
        }
      },
    },
    {
      keys: ["mod+del", "mod+backspace"],
      callback: (e) => {
        e.preventDefault();
        discard();
        that.getActionManager().trigger("item:delete");
      },
    },
  ]);

  that = _.extend(that, {
    discard: that.chainer(discard),
  });

  return that;
};
