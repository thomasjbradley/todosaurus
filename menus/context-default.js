menuContexts.default = {
  enabled: [
    'file:new',
    'file:new-bottom',
    'file:new-below',
    'file:new-above',
    'file:focus-up',
    'file:focus-down',
    'file:focus-first',
    'file:focus-last',
    'file:focus-jump-up',
    'file:focus-jump-down',
    'file:jump',
    'file:reload',
    'file:sort-file',
    'file:archive',
    'file:reveal-in-finder',
    'file:switch-directory',
    'edit:undo',
    'edit:redo',
    'edit:cut',
    'edit:copy',
    'edit:paste',
    'edit:paste-before',
    'edit:delete',
    'edit:duplicate',
    'edit:update',
    'edit:insert-start',
    'edit:insert-end',
    'edit:update-clear',
    'edit:toggle-complete',
    'edit:toggle-priority',
    'edit:remove-priority',
    'view:find',
    'view:find-project',
    'view:find-context',
    'view:show-priority',
    'view:sort-manually',
    'view:sort-priority',
    'view:clear-search',
    'view:clear-group',
    'view:clear-all'
  ],

  disabled: [
    'edit:select-all'
  ],

  test: {
    'edit:move-up': function () {
      return !filters.order;
    },
    'edit:move-down': function () {
      return !filters.order;
    }
  }
};
