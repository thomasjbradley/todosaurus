const Actions = function (
  generics,
  am,
  fm,
  im,
  storage,
  todos,
  orderer,
  grouper,
  filterer,
  buffer,
) {
  "use strict";

  const isEditableState = () => {
    const totalItems = filterer.length();
    if (totalItems <= 0) {
      am.trigger("app:clear");
      return false;
    }
    return true;
  };

  const id = () => {
    return filterer.getByIndex(fm.get()).id();
  };

  const getNewText = () => {
    return generics.new;
  };

  const prepareNewTodo = (index) => {
    let todo;
    let getId = id();
    if (index !== undefined) {
      getId = filterer.getByIndex(index).id();
    }
    todo = todos.createNewItem(todos.get(getId).getFullText() + " " + generics.new);
    if (im.get("filters").group === false || im.get("filters").group[0] !== "!") {
      todo.removePriority();
    }
    todo.resetCreated();
    todo.unmark();
    return todo;
  };

  const isFieldEmpty = (id) => {
    const text = todos.get(id).text().replace(getNewText(), "").trim();
    return _.isEmpty(text);
  };

  const getPosition = () => {
    const elem = im.get("list").getItemElement(fm.get());
    return {
      left: elem.offsetLeft,
      top: elem.offsetTop,
    };
  };

  const getNumberFromKeyCombo = (combo) => {
    let num = 0;
    if (combo !== undefined) {
      num = parseInt(combo.replace(/[^\d]*/gi, ""), 10);
    }
    if (isNaN(num)) {
      num = 0;
    } else {
      num--;
    }
    return num;
  };

  const matchesFilters = (newText) => {
    const filter = im.get("filters").filter;
    const group = im.get("filters").group;
    let matchesFilter = false;
    let matchesGroup = false;
    if (filter !== false) {
      if (filterer.matchesFilter(newText, filter)) {
        matchesFilter = true;
      } else {
        matchesFilter = false;
      }
    } else {
      matchesFilter = true;
    }
    if (group !== false) {
      if (grouper.matchesGroup(newText, group)) {
        matchesGroup = true;
      } else {
        matchesGroup = false;
      }
    } else {
      matchesGroup = true;
    }
    if (matchesFilter && matchesGroup) {
      return true;
    }
    return false;
  };

  am.action("item:focus:next", () => {
    fm.next();
  });

  am.action("item:focus:prev", () => {
    fm.prev();
  });

  am.action("item:focus:next:jump", () => {
    fm.set(fm.get() + 5);
  });

  am.action("item:focus:prev:jump", () => {
    fm.set(fm.get() - 5);
  });

  am.action("item:focus:first", () => {
    fm.set(0);
  });

  am.action("item:focus:last", () => {
    fm.set(filterer.length() - 1);
  });

  am.action(
    "item:toggle",
    () => {
      todos.get(id()).toggle();
    },
    isEditableState,
  );

  am.action(
    "item:delete",
    () => {
      todos.remove(id());
    },
    isEditableState,
  );

  am.action(
    "item:cut",
    () => {
      const text = todos.get(id()).getFullText();
      navigator.clipboard.writeText(text);
      buffer.push(text);
      todos.remove(id());
    },
    isEditableState,
  );

  am.action(
    "item:copy",
    () => {
      const text = todos.get(id()).getFullText();
      navigator.clipboard.writeText(text);
      buffer.push(text);
    },
    isEditableState,
  );

  am.action(
    "item:paste:before",
    () => {
      if (buffer.length() === 0) return;
      todos.addBeforeItem(buffer.pull(), id());
    },
    isEditableState,
  );

  am.action(
    "item:paste:after",
    () => {
      if (buffer.length() === 0) return;
      todos.addAfterItem(buffer.pull(), id());
      fm.next();
    },
    isEditableState,
  );

  am.action(
    "item:duplicate",
    () => {
      am.trigger("item:copy");
      am.trigger("item:paste:after");
    },
    isEditableState,
  );

  am.action(
    "item:move:up",
    () => {
      const startFocus = fm.get();
      am.trigger("item:cut");
      if (startFocus <= fm.getMax()) {
        am.trigger("item:focus:prev");
      }
      am.trigger("item:paste:before");
    },
    isEditableState,
  );

  am.action(
    "item:move:down",
    () => {
      am.trigger("item:cut");
      am.trigger("item:paste:after");
    },
    isEditableState,
  );

  am.action(
    "item:edit",
    (e, combo, input) => {
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      if (input === undefined) {
        input = "edit";
      }
      im.get(input).value(todos.get(id()).text()).show(getPosition()).focus().select();
    },
    isEditableState,
  );

  am.action(
    "item:edit:start",
    (e, combo, input) => {
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      if (input === undefined) {
        input = "edit";
      }
      im.get(input)
        .value(todos.get(id()).text())
        .show(getPosition())
        .focus()
        .setCaretPosition(0);
    },
    isEditableState,
  );

  am.action(
    "item:edit:end",
    (e, combo, input) => {
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      if (input === undefined) {
        input = "edit";
      }
      im.get(input)
        .value(todos.get(id()).text())
        .show(getPosition())
        .focus()
        .setCaretPosition(1000);
    },
    isEditableState,
  );

  am.action(
    "item:edit:clear",
    (e, combo, input, defaultText) => {
      let text = "";
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      if (input === undefined) {
        input = "edit";
      }
      if (defaultText !== undefined) {
        text = defaultText;
      }
      im.get(input).setRawValue(text).show(getPosition()).focus().setCaretPosition(0);
    },
    isEditableState,
  );

  am.action(
    "item:edit:after",
    (e) => {
      const prevFocus = fm.get();
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      fm.next();
      if (fm.get() !== prevFocus) {
        am.trigger("item:edit");
      }
    },
    isEditableState,
  );

  am.action(
    "item:edit:before",
    (e) => {
      const prevFocus = fm.get();
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      fm.prev();
      if (fm.get() !== prevFocus) {
        am.trigger("item:edit");
      }
    },
    isEditableState,
  );

  am.action(
    "item:new:edit",
    () => {
      const group = im.get("filters").group;
      if (group !== false) {
        if (group[0] !== "!") {
          am.trigger(
            "item:edit:clear",
            false,
            false,
            "new",
            " " + grouper.getGroup(group[0])[group[1]],
          );
        } else {
          am.trigger("item:edit:clear", false, false, "new");
        }
      } else {
        am.trigger("item:edit:clear", false, false, "new");
      }
    },
    isEditableState,
  );

  am.action(
    "item:new:at-top",
    (e) => {
      let todo;
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      todo = prepareNewTodo(0);
      todos.prepend(todo);
      fm.set(0);
      am.trigger("item:new:edit");
    },
    isEditableState,
  );

  am.action(
    "item:new:at-bottom",
    (e) => {
      let todo;
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      todo = prepareNewTodo(fm.getMax());
      todos.append(todo);
      fm.set(fm.getMax());
      am.trigger("item:new:edit");
    },
    isEditableState,
  );

  am.action(
    "item:new:after",
    (e) => {
      let todo;
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      todo = prepareNewTodo();
      buffer.push(todo.getFullText());
      am.trigger("item:paste:after");
      am.trigger("item:new:edit");
    },
    isEditableState,
  );

  am.action(
    "item:new:before",
    (e) => {
      let todo;
      if (e !== undefined && Object.hasOwn(e, "bubbles")) {
        e.preventDefault();
      }
      todo = prepareNewTodo();
      buffer.push(todo.getFullText());
      am.trigger("item:paste:before");
      am.trigger("item:new:edit");
    },
    isEditableState,
  );

  am.action("item:new:when-empty", (e) => {
    if (e !== undefined && Object.hasOwn(e, "bubbles")) {
      e.preventDefault();
    }
    todos.prepend(generics.new);
    fm.set(0);
    am.trigger("item:new:edit");
  });

  am.action(
    "item:update",
    (text) => {
      const theId = id();
      let newFullText = text;
      let todo = todos.get(theId);
      if (todo.hasPriority()) {
        newFullText = "(" + todo.getPriority() + ") " + text;
      }
      if (!matchesFilters(newFullText)) {
        im.get("filters").group = false;
        am.trigger("app:search:clear", false);
        fm.set(filterer.getIndex(theId));
        todos.get(theId).text(text);
        return false;
      }
      todos.get(theId).text(text);
      return true;
    },
    isEditableState,
  );

  am.action(
    "item:priority-toggle",
    (e, combo) => {
      const index = getNumberFromKeyCombo(combo);
      todos.get(id()).togglePriority(index);
    },
    isEditableState,
  );

  am.action(
    "item:priority-remove",
    (e, combo) => {
      todos.get(id()).removePriority();
    },
    isEditableState,
  );

  am.action("app:search:focus", (e) => {
    if (e !== undefined && Object.hasOwn(e, "bubbles")) {
      e.preventDefault();
    }
    im.get("search").focus().select();
  });

  am.action("app:search:blur", () => {
    im.get("search").blur();
  });

  am.action("app:search:clear", (triggerReload) => {
    const reload = triggerReload || true;
    let item;
    let fullIndex = fm.get();
    if (!_.isEmpty(im.get("search").value())) {
      item = filterer.getByIndex(fm.get());
      if (item) {
        fullIndex = grouper.getIndex(item.id());
      }
    }
    im.get("search").value("");
    im.get("filters").filter = false;
    if (reload) {
      am.trigger("app:list:render");
    }
    fm.set(fullIndex);
  });

  am.action("app:search:trigger", () => {
    im.get("filters").filter = im.get("search").value();
    am.trigger("app:list:render");
  });

  am.action("app:jump:show", (e) => {
    if (e !== undefined && Object.hasOwn(e, "bubbles")) {
      e.preventDefault();
    }
    im.get("jump").show().value("").focus();
  });

  am.action("app:jump:hide", () => {
    im.get("jump").hide();
  });

  am.action("app:jump:trigger", () => {
    let line = parseInt(im.get("jump").value().replace(/[^\d]/g, ""), 10);
    if (!isFinite(line) || isNaN(line)) {
      line = 0;
    }
    fm.set(line - 1);
  });

  am.action("app:edit:hide", () => {
    im.get("edit").hide();
  });

  am.action("app:new:hide", () => {
    im.get("new").hide();
  });

  am.action("app:list:focus", () => {
    im.get("list").focus();
  });

  am.action("app:list:blur", () => {
    im.get("list").blur();
  });

  am.action("app:list:render", () => {
    orderer.order(todos.getAll(), im.get("filters").order);
  });

  am.action("app:context:not-focused", (contextKeys) => {
    im.switchContext("not-focused");
  });

  am.action("app:context:no-directory", (contextKeys) => {
    im.switchContext("no-directory");
  });

  am.action("app:context:default", () => {
    let didSwitch;
    if (todos.length() === 0) {
      didSwitch = im.switchContext("empty");
      if (didSwitch) {
        am.trigger("app:clear");
        document.getElementById("empty-no-todos").style.display = "block";
        document.getElementById("empty-no-results").style.display = "none";
      }
    } else {
      didSwitch = im.switchContext("default");
      if (didSwitch) {
        document.getElementById("empty-no-todos").style.display = "none";
        document.getElementById("empty-no-results").style.display = "block";
        im.get("search").enable();
      }
    }
  });

  am.action("app:context:input", (contextKeys) => {
    im.switchContext("input").bindKeyEvents(contextKeys);
  });

  am.action("app:clear", () => {
    let possibleInput = document.querySelector("input:focus");
    im.get("filters").group = false;
    am.trigger("app:search:clear");
    if (possibleInput) {
      possibleInput.blur();
    }
  });

  am.action("tags:create", () => {
    am.trigger("tags:create:projects");
    am.trigger("tags:create:contexts");
    am.trigger("tags:create:priority");
  });

  am.action("tags:create:projects", () => {
    const tags = todos.getAllTags("+");
    grouper.setGroup("+", tags);
    im.get("tags-projects").render(tags);
    im.get("input-auto-complete").resetData("+", tags);
  });

  am.action("tags:create:contexts", () => {
    const tags = todos.getAllTags("@");
    grouper.setGroup("@", tags);
    im.get("tags-contexts").render(tags);
    im.get("input-auto-complete").resetData("@", tags);
  });

  am.action("tags:create:priority", () => {
    const tags = generics.priorities;
    grouper.setGroup("!", tags);
    im.get("tags-priority").render(tags);
  });

  am.action("tags:show", (tag, combo) => {
    let id;
    if (_.isArray(combo)) {
      id = combo[1];
    } else {
      id = getNumberFromKeyCombo(combo);
    }
    if (id > grouper.getGroup(tag).length - 1) {
      am.trigger("tags:clear");
    } else {
      im.get("filters").group = [tag, id];
      am.trigger("app:list:render");
      am.trigger("tags:highlight-active", tag, id);
    }
  });

  am.action("tags:show:projects", (e, combo) => {
    am.trigger("tags:clear-active");
    am.trigger("tags:show", "+", combo);
  });

  am.action("tags:show:contexts", (e, combo) => {
    am.trigger("tags:clear-active");
    am.trigger("tags:show", "@", combo);
  });

  am.action("tags:show:priority", (e, combo) => {
    am.trigger("tags:clear-active");
    am.trigger("tags:show", "!", combo);
  });

  am.action("tags:clear", () => {
    const item = filterer.getByIndex(fm.get());
    let fullIndex = fm.get();
    if (item) {
      fullIndex = orderer.getIndex(item.id());
    }
    im.get("filters").group = false;
    am.trigger("tags:clear-active");
    am.trigger("app:list:render");
    fm.set(fullIndex);
  });

  am.action("tags:highlight-active", (tag, index) => {
    if (tag === "+") {
      im.get("tags-projects").activate(index);
    }
    if (tag === "@") {
      im.get("tags-contexts").activate(index);
    }
    if (tag === "!") {
      im.get("tags-priority").activate(index);
    }
  });

  am.action("tags:clear-active", () => {
    im.get("tags-projects").deactivateAll();
    im.get("tags-contexts").deactivateAll();
    im.get("tags-priority").deactivateAll();
  });

  am.action("tags:search:projects", (e) => {
    if (e !== undefined && Object.hasOwn(e, "bubbles")) {
      e.preventDefault();
    }
    im.get("tags-search").group("+").show().value("").focus();
  });

  am.action("tags:search:contexts", (e) => {
    if (e !== undefined && Object.hasOwn(e, "bubbles")) {
      e.preventDefault();
    }
    im.get("tags-search").group("@").show().value("").focus();
  });

  am.action("tags:search:hide", () => {
    im.get("tags-search").hide();
  });

  am.action("tags:search:trigger", () => {
    const tag = grouper.findTagStartingWith(
      im.get("tags-search").value(),
      im.get("tags-search").group(),
    );
    if (!tag) {
      am.trigger("tags:clear-active");
    } else {
      if (tag[0] === "+") {
        am.trigger("tags:show:projects", false, tag);
      } else {
        am.trigger("tags:show:contexts", false, tag);
      }
    }
  });

  am.action("storage:folder:switch", () => {
    im.get("storage-chooser").show();
    am.trigger("app:context:no-directory");
  });

  am.action("storage:folder:choose", async (storageType, dir = false) => {
    if (storageType === "local-storage") {
      storage.set(new LocalStorageHelper());
      storage.setFolder("todosaurus:browser:localstorage");
    }
    if (storageType === "file-storage") {
      const fs = new FileSystemHelper(dir);
      await fs.setup(dir);
      storage.set(fs);
      storage.setFolder(dir.name);
    }
    am.trigger("storage:read-or-new");
  });

  am.action("storage:file:new", () => {
    var startupData = [
      "Welcome to Todosaurus! +Todosaurus",
      "An app for the Todo.txt format. @todotxt",
      "Press “n” to create a new todo item.",
      "Or press “?” for more keyboard shortcuts.",
      "Or press “alt+?” for the about screen.",
    ];
    im.get("storage-chooser").hide();
    todos.populate(startupData);
    am.trigger("app:context:default");
  });

  am.action("storage:read", async () => {
    await storage.read((err, data) => {
      if (err) {
        im.get("storage-chooser").show();
        am.trigger("app:context:no-directory");
        return;
      }
      im.get("storage-chooser").hide();
      todos.populate(data);
      am.trigger("app:context:default");
    });
  });

  am.action("storage:read-if-changed", async () => {
    let file = await storage.getMTime();
    let local = new Date(localStorage.getItem("mtime"));
    if (file > local) {
      await am.trigger("storage:read");
    }
  });

  am.action("storage:read-or-new", async () => {
    im.get("storage-chooser").hide();
    await storage.read((err, data) => {
      if (err) {
        am.trigger("storage:file:new");
      } else {
        todos.populate(data);
        am.trigger("app:context:default");
      }
    });
  });

  am.action("storage:save", async () => {
    await storage.save(todos.getAllFullText());
    localStorage.setItem("mtime", new Date());
  });

  am.action("storage:sort-file", () => {
    todos.populate(orderer.getOrderedItems(todos.getAll()));
  });

  am.action("storage:archive", async () => {
    const keep = [];
    const done = [];
    const all = _.cloneDeep(todos.getAll());
    _.each(all, (item) => {
      if (item.isMarked()) {
        done.push(item.getFullText());
      } else {
        keep.push(item);
      }
    });
    todos.populate(keep);
    await storage.saveArchive(done.sort());
  });

  am.action("help:window", () => {
    const width = 500;
    const height = 650;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;
    window.open(
      "/help.html",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},popup=1`,
    );
  });

  am.action("about:window", () => {
    const width = 658;
    const height = 358;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;
    window.open(
      "/about.html",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},popup=1`,
    );
  });
};
