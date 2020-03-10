const bookshelf = require('./base')();

var Classify = bookshelf.Model.extend({
  tableName: 'classify',
  apks: function () {
    return this.hasMany(require('./apks'), 'class_id');
  },
  classify: function () {
    return this.hasMany(Classify, 'top_id');
  }
});

module.exports = Classify;