const bookshelf = require('./base')();

var Intro = bookshelf.Model.extend({
  tableName: 'apk_intro',
  apks: function () {
    return this.belongsTo(require('./apks'));
  }
});

module.exports = Intro;