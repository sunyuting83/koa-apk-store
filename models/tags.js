const bookshelf = require('./base')();

var Tags = bookshelf.Model.extend({
  tableName: 'tags',
  apks: function () {
    return this.belongsToMany(require('./apks'));
  }
});

module.exports = Tags;