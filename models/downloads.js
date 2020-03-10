const bookshelf = require('./base')();

var Download = bookshelf.Model.extend({
  tableName: 'downloads',
  apks: function () {
    return this.belongsTo(require('./apks'));
  }
});

module.exports = Download;