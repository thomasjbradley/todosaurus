const FuzzyMatch = {
  escapeIfSpecial: (item) => {
    var specials = [
      "^",
      "$",
      ".",
      "|",
      "[",
      "]",
      "(",
      ")",
      "{",
      "}",
      ":",
      "*",
      "+",
      "?",
      "\\",
      "-",
    ];
    if (_.indexOf(specials, item) > -1) {
      return "\\" + item;
    } else {
      return item;
    }
  },

  getRegExpString: (search) => {
    // Found: http://www.quora.com/Algorithms/How-is-the-fuzzy-search-algorithm-in-Sublime-Text-designed
    // Alternative: http://stackoverflow.com/questions/16907825/how-to-implement-sublime-text-like-fuzzy-search
    const r = _.map(search.split(""), (item) => {
      return FuzzyMatch.escapeIfSpecial(item);
    });
    return r;
  },

  contains: (text, search) => {
    const r = FuzzyMatch.getRegExpString(search);
    const re = new RegExp(r.join(".*?"), "i");
    return re.test(text);
  },

  startsWith: (text, search, prepend) => {
    const pre = prepend || "";
    const r = FuzzyMatch.getRegExpString(search);
    const re = new RegExp("^" + FuzzyMatch.escapeIfSpecial(pre) + r.join(".*?"), "i");
    return re.test(text);
  },
};
