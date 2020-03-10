const bookshelf = require('./base')();

var Topic = bookshelf.Model.extend({
  tableName: 'topic',
  apks: function () {
    return this.belongsToMany(require('./apks'));
  }
});

module.exports = Topic;