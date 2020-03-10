const bookshelf = require('./base')();

var IntroImage = bookshelf.Model.extend({
  tableName: 'intro_image',
  apks: function () {
    return this.belongsTo(require('./apks'));
  }
});

module.exports = IntroImage;