const bookshelf = require('./base')();

var ErrorUrl = bookshelf.Model.extend({
  tableName: 'errorurl'
});

module.exports = ErrorUrl;