(function () {
  "use strict";

  const generics = {
    new: "%%NEW%%",
    priorities: ["A: Now", "B: Today", "C: Tomorrow", "D: This Week", "E: Next Week"],
  };
  const fm = new FocusManager();
  const am = new ActionManager();
  const im = new InterfaceManager(fm, am);
  const storage = new StorageManager();
  const todos = new Todos();
  const orderer = new Orderer();
  const grouper = new Grouper(generics);
  const filterer = new Filterer(generics);
  const buffer = new Buffer();
  const main = document.getElementsByClassName("main")[0];

  new Actions(generics, am, fm, im, storage, todos, orderer, grouper, filterer, buffer);

  if (FileSystemHelper !== undefined && window.isNode) {
    storage.set(new FileSystemHelper());
  } else {
    storage.set(new LocalStorageHelper());
    storage.setFolder("LocalStorage");
    document.getElementById("other-folder-options").style.display = "none";
  }

  im.setContext("not-focused", bindings.notfocused, menuContexts.notfocused);
  im.setContext("no-directory", bindings.nodirectory, menuContexts.nodirectory);
  im.setContext("missing-file", bindings.missingfile, menuContexts.missingfile);
  im.setContext("empty", bindings.empty, menuContexts.empty);

  im.setContext(
    "default",
    bindings.default,
    menuContexts.default,
    function (isCurrent) {
      if (isCurrent) {
        am.trigger("app:list:focus");
      } else {
        am.trigger("app:list:blur");
      }
    },
  );

  im.setContext("input", bindings.input, menuContexts.input);

  im.add("filters", filters);
  im.add("list", new ListControl("list", am));
  im.add("search", new SearchControl("search", am));
  im.add("progress", new ProgressControl("progress", am));
  im.add("jump", new JumpControl("jump", am));
  im.add("edit", new EditControl("edit", am));
  im.add("new", new NewControl("new", am));
  im.add("folder-chooser", new FolderChooserControl("folder-chooser", am));
  im.add("file-chooser", new FileChooserControl("file-chooser", am));
  im.add("tags-projects", new TagsControl("tags-projects", am));
  im.add(
    "tags-contexts",
    new TagsControl("tags-contexts", am, { pillClass: "pill-alt" }),
  );
  im.add(
    "tags-priority",
    new TagsControl("tags-priority", am, { pillClass: "tag-priority" }),
  );
  im.add("tags-search", new TagsSearchControl("tags-search", am));

  im.add("input-auto-complete", new InputAutoComplete(jQuery, im));

  document.addEventListener("click", im.handleMouseEvents, false);

  const renderFocus = (index) => {
    const items = im.get("list").getAllItemElements();
    const current = im.get("list").getAllItemElementsWith('[data-focused="true"]');
    if (current && current.length > 0) {
      current[0].setAttribute("data-focused", "false");
    }
    if (items && items.length > 0) {
      items[index].setAttribute("data-focused", "true");
    }
  };

  const getPosition = () => {
    const elem = im.get("list").getItemElement(fm.get());
    return {
      left: elem.offsetLeft,
      top: elem.offsetTop,
      height: elem.offsetHeight,
    };
  };

  const scrollList = (index) => {
    var pos = getPosition();
    let newTop;
    if (pos.top + pos.height > main.offsetHeight + main.scrollTop) {
      newTop = pos.top + pos.height - main.offsetHeight;
      main.scrollTop = newTop;
    }
    if (pos.top < main.scrollTop) {
      newTop = pos.top;
      main.scrollTop = newTop;
    }
  };

  const getNumberCompleteItems = (items) => {
    let sum = 0;
    _.forEach(items, (item) => {
      if (item.isMarked()) {
        sum++;
      }
    });
    return sum;
  };

  todos.subscribe((items) => {
    am.trigger("app:context:default");
    orderer.order(items, im.get("filters").order);
    am.trigger("storage:save");
    localStorage.setItem("mtime", new Date());
  });

  orderer.subscribe((items) => {
    const group = im.get("filters").group;
    grouper.group(items, im.get("filters").group);
    am.trigger("tags:highlight-active", group[0], group[1]);
  });

  grouper.subscribe((items) => {
    if (
      _.isEmpty(items) &&
      _.isArray(im.get("filters").group) &&
      im.get("filters").group[0] !== "!"
    ) {
      im.get("filters").group = false;
      am.trigger("tags:clear-active");
      am.trigger("tags:clear");
    } else {
      filterer.filter(items, im.get("filters").filter);
    }
  });

  filterer.subscribe((items) => {
    im.get("list").render(items);
    fm.setMax(items.length - 1);
    im.get("progress").set(getNumberCompleteItems(items), items.length);
    renderFocus(fm.get());
    am.trigger("tags:create");
  });

  fm.subscribe(function (index) {
    if (im.get("list").length()) {
      renderFocus(index);
      scrollList(index);
    }
  });

  im.switchContext("no-directory");
  am.trigger("storage:read");
})();
