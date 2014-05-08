var marked = require('marked');

module.exports = function () {
  return function(input, strip) {
    return marked(input).replace(/<[^>]+>/g, '');
  };
};