# Todosaurus

A keyboard driven GUI app for the [Todo.txt](http://todotxt.org/) format.

**[➤ todosaurus.app](https://todosaurus.app)**

![](todosaurus-screenshot.png)

---

## Why?

I’ve struggled to find a todo app that worked for me. Many are too complicated. Many are too closed. Many aren’t keyboard driven enough. Many don’t match my design sensibilities.

So, I recently really went digging to find something that I would enjoy using. The closest I found was the Todo.txt format used in the command line. But for me the command line doesn’t provide the right context in my brain for handling my todo list. I tried a couple of the Todo.txt GUI apps listed on the website, but their key bindings weren’t intuitive to me.

So, I made my own.

---

## Keyboard access only

**The app is completely keyboard driven—with key movements and shortcuts based on VIM.**

Press `?` in the app to get a full keyboard command list.

---

## Progressive web app

The app is designed as a Progressive Web App that you can add to your desktop using a browser. Or just use it in the browser with LocalStorage.

It was previously an NW.js application but the maintenance was too much of a hurdle, with constant operating system changes and dependencies. This is a simpler version, but hopefully better maintained.

Currently only Chromium-based browsers support the [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API), specifically `showDirectoryPicker()` — but hopefully it will be supported in newer browsers soon.

---

## Licenses & copyright

**© 2024 Thomas J Bradley. Licensed under the [GPL](LICENSE).**

Uses the [Todo.txt](http://todotxt.org/) format, © 2006-2020 Gina Trapani, licensed under the [GPL](http://www.gnu.org/copyleft/gpl.html).

[“Dinosaur”](http://thenounproject.com/term/dinosaur/13786/), © 2013 Jennifer Cozzette, licensed under the [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/us/).

Prioritization system inspired by Michael Descy’s [Plain Text Productivity](http://plaintext-productivity.net/1-03-how-i-organize-my-todo-txt-file.html).
