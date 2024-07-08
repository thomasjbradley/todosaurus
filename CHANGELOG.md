# Changelog

**2.0.6 (Jul. 8, 2024)**

- Fix a bug assigning priorities via numeric keys

**2.0.5 (Jul. 7, 2024)**

- Fix a parsing error in the todos when there is no completion date
- Add a test suite for the todo text parsing

**2.0.4 (Jul. 7, 2024)**

- Fix a double blurring event firing that was causing todos to be deleted unintentionally

**2.0.3 (Jul. 7, 2024)**

- Add a check for the File System API
- Add a little constant on-screen reminder of how to access the help key command window
- Add a manifest.json scope to get links to open outside of the PWA
- Fetch the version number from `package.json` and show it on the about screen
- Update the keyboard commands to list a few adjustments

**2.0.2 (Jul. 6, 2024)**

- Remove all the NW.js dependencies and & switch to a PWA that uses Chrome’s File System API
- Updated & modernized all the code
- Change to a browser accessible hosted app

**1.2.1 (Nov. 15, 2014)**

- Fixed title bar bottom border colour when focused and blurred. [Closes issue #15](https://github.com/thomasjbradley/todosaurus/issues/15).
- Removed extra border at the bottom of the todo list when last item is focused.
- Stopped the incorrect cursor from showing, the text highlight cursor, when text wasn't highlightable. [Closes issue #16](https://github.com/thomasjbradley/todosaurus/issues/16).
- Changed the main window shortcut because it conflicted with OS defaults.
- Made the fun about transition not fire so quickly.
- Fixed a couple issues when running in the web browser.

**1.2.0 (Nov. 14, 2014)**

- Added a fancy about screen with a in-app readable license.
- Fixed a couple focus related bugs. [Closes issue #12](https://github.com/thomasjbradley/todosaurus/issues/12).
- Added a fix for stopping the same window from opening.
- Added proper window management in the “Window” menu.
- Added the ability for the app to stay open in the main window is closed.

**1.1.0 (Nov. 13, 2014)**

- Added the “Help” menu and the keyboard shortcut reference.

**1.0.4 (Nov. 13, 2014)**

- Bug fix: Events happening multiple times—fired by proper OS X shortcuts and Mousetrap. [Closes issue #8](https://github.com/thomasjbradley/todosaurus/issues/8).
- Bug fix: Menu items still active when open dialogue visible. [Closes issue #7](https://github.com/thomasjbradley/todosaurus/issues/7).

**1.0.3 (Nov. 13, 2014)**

- Bug fix: Yosemite keyboard shortcut alignment in the menu items [Closes issue #5](https://github.com/thomasjbradley/todosaurus/issues/5).

**1.0.2 (Oct. 18, 2014)**

- Bug fix: Yosemite toolbar colour changes. [Closes issue #2](https://github.com/thomasjbradley/todosaurus/issues/2).
- Bug fix: Incorrect ordering of todo items in done.txt. [Closes issue #1](https://github.com/thomasjbradley/todosaurus/issues/1).

**1.0.1 (Jul. 2, 2014)**

- Bug fix: when archiving the new items were added at the end of the previous line; fixed with a \n.

**1.0.0 (Jun. 4, 2014)**

- Initial Release.
