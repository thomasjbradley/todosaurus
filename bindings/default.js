bindings.default = {
  'item:focus:next'      : ['j', 'down'],
  'item:focus:prev'      : ['k', 'up'],
  'item:focus:next:jump' : ['ctrl+d', 'pagedown'],
  'item:focus:prev:jump' : ['ctrl+u', 'pageup'],
  'item:focus:first'     : ['g g', 'mod+up'],
  'item:focus:last'      : ['shift+g', 'mod+down'],

  'item:toggle'          : ['x', 'space'],

  'item:cut'             : ['d d', 'mod+backspace', 'del', 'mod+x'],
  'item:copy'            : ['shift+y', 'mod+c'],
  'item:paste:before'    : ['shift+p', 'mod+shift+v'],
  'item:paste:after'     : ['p', 'mod+v'],
  'item:duplicate'       : ['mod+shift+d'],

  'item:move:up'         : ['mod+shift+up'],
  'item:move:down'       : ['mod+shift+down'],

  'item:edit'            : ['e', 'enter'],
  'item:edit:start'      : ['i', 'shift+i'],
  'item:edit:end'        : ['a', 'shift+a'],
  'item:edit:clear'      : ['shift+c'],

  'item:new:at-top'      : ['n', 'mod+n'],
  'item:new:at-bottom'   : ['shift+n', 'mod+shift+n'],
  'item:new:after'       : ['o', 'mod+enter'],
  'item:new:before'      : ['shift+o', 'mod+shift+enter'],

  'item:priority-toggle' : ['1', '2', '3', '4', '5'],
  'item:priority-remove' : ['0'],

  'app:search:focus'     : ['/', 'mod+f'],
  'app:search:clear'     : ['command+l', 'ctrl+l'],
  'app:jump:show'        : ['mod+j'],
  'app:clear'            : ['mod+shift+l'],

  'tags:show:projects'   : ['mod+1', 'mod+2', 'mod+3', 'mod+4', 'mod+5', 'mod+6', 'mod+7', 'mod+8', 'mod+9'],
  'tags:show:contexts'   : ['alt+1', 'alt+2', 'alt+3', 'alt+4', 'alt+5', 'alt+6', 'alt+7', 'alt+8', 'alt+9'],
  'tags:show:priority'   : ['shift+1', 'shift+2', 'shift+3', 'shift+4', 'shift+5'],
  'tags:clear'           : ['mod+0', 'alt+0', 'shift+0', 'mod+alt+l'],
  'tags:search:projects' : ['mod+p'],
  'tags:search:contexts' : ['mod+t'],

  'storage:read'         : ['mod+r'],
  'storage:sort-file'    : ['mod+shift+s'],
  'storage:archive'      : ['mod+s'],
  'storage:reveal-finder': ['mod+shift+r'],
  'storage:folder:change': ['mod+o'],

  'help:shortcuts'       : ['?']
};
