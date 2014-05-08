var fs = require('fs');

var directiveTemplate = fs.readFileSync(__dirname + '/accountControls.html', { encoding: 'utf-8' });


/**
 * The account controls component
 */
module.exports = function() {
  return {
    template: directiveTemplate
  };
};