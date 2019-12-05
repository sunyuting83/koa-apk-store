const bookshelf = require('./base')();

var Comment = bookshelf.Model.extend({
    tableName: 'comment',
    hasTimestamps: true,
    apks: function () {
        return this.belongsTo(require('./apks'));
    }
});

module.exports = Comment;