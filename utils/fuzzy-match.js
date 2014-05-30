var FuzzyMatch = {
  test: function (text, search) {
    // Found: http://www.quora.com/Algorithms/How-is-the-fuzzy-search-algorithm-in-Sublime-Text-designed
    // Alternative: http://stackoverflow.com/questions/16907825/how-to-implement-sublime-text-like-fuzzy-search
    var r, re, specials = ['^', '$', '.', '|', '[', ']', '(', ')', '{', '}', ':', '*', '+', '?', '\\', '-'];

    r = _.map(search.split(''), function (item) {
      if (_.indexOf(specials, item) > -1) {
        return '\\' + item;
      } else {
        return item;
      }
    });

    re = new RegExp(r.join('.*?'), 'i');

    return re.test(text);
  }
};
