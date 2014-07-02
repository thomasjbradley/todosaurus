# Todosaurus

A keyboard driven GUI app for the [Todo.txt](http://todotxt.com/) format.

![](todosaurus-screenshot.png)

---

### [⬇ Download (for Mac OS X)](https://github.com/thomasjbradley/todosaurus/releases/download/v1.0.1/Todosaurus-v1.0.1.zip)

---

## Why?

I’ve struggled to find a todo app that worked for me. Many are too complicated. Many are too closed. Many aren’t keyboard driven enough. Many don’t match my design sensibilities.

So, I recently really went digging to find something that I would enjoy using. The closest I found was the Todo.txt format used in the command line. But for me the command line doesn’t provide the right context in my brain for handling my todo list. I tried a couple of the Todo.txt GUI apps listed on the website, but their key bindings weren’t intuitive to me.

So, I made my own.

---

## Keyboard shortcuts

*`mod` is `command` on Mac and `control` on Windows.*

### Movement

- `j`, `down` — Move the focus down
- `k`, `up` — Move the focus up
- `g g`, `mod+up` — Move focus to first item
- `G`, `mod+down` — Move focus to last item
- `ctrl+d`, `pagedown` — Move focus down 5 items
- `ctrl+u`, `pageup` — Move focus up 5 items
- `mod+j` — Jump to a specific line

### Editing

- `n`, `mod+n` — New todo at the top
- `shift+n`, `mod+shift+n` — New todo at the bottom
- `o`, `mod+enter` — New todo after focused item
- `O`, `mod+shift+enter` — New todo before focused item
- `x`, `space` — Mark/unmark todo as being completed
- `1`, `2`, … `5` — Add priority to todo
- `0` — Remove priority
- `e`, `enter`, `return` — Update an item, selecting all the text
- `i`, `shift+i` — Edit focused item, cursor at start
- `a`, `shift+a` — Edit focused item, cursor at end
- `shift+c` — Edit focused item, delete all current content
- `d d`, `mod+backspace`, `del`, `mod+x` — Delete todo, move to buffer, copy to clipboard
- `shift+y`, `mod+c` — Copy todo item to buffer and clipboard
- `p`, `mod+v` — Paste top buffer item below focused item
- `shift+p`, `mod+shift+v` — Paste top buffer item above focused item
- `y p`, `mod+shift+d` — Duplicate line, add afterwards
- `d d k shift+p`, `mod+shift+up` — Move item up
- `d d p`, `mod+shift+up` — Move item down

### Manipulating the view

- `/`, `mod+f` — Search todo items
- `command+l`, `ctrl+l` — Clear search terms
- `mod+p` — Filter by project
- `mod+t` — Filter by context
- `mod+1`, `mod+2`, … `mod+9` — Display single project
- `alt+1`, `alt+2`, … `alt+9` — Display single context
- `shift+1`, `shift+2`, … `shift+5` — Display single priority
- `mod+0`, `alt+0`, `shift+0` — Clear tag filter
- `command+shift+l`, `ctrl+shift+l` — Clear all filters

### Manipulating the file

- `mod+r` — Reload the file
- `mod+shift+s` — Sort the contents of the file
- `mod+s` — Archive all the completed items into `done.txt`
- `mod+shift+r` — Reveal the directory in finder
- `mod+o` — Switch to another diretory

---

## Development

Follow development on Trello: <https://trello.com/b/l1cs0nyA>.

### Technology

Built using web technologies and [node-webkit](https://github.com/rogerwang/node-webkit/).
Also works perfectly in the browser, storing the todos in LocalStorage.

---

## Licenses & copyright

**© 2014 Thomas J Bradley. Licensed under the [GPL](LICENSE).**

Uses the [Todo.txt](http://todotxt.com/) format, © 2006-2014 Gina Trapani, licensed under the [GPL](http://www.gnu.org/copyleft/gpl.html).

[“Dinosaur”](http://thenounproject.com/term/dinosaur/13786/), © 2013 Jennifer Cozzette, licensed under the [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/us/).

Prioritization system inspired by Michael Descy’s [Plain Text Productivity](http://plaintext-productivity.net/1-03-how-i-organize-my-todo-txt-file.html).
