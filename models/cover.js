const bookshelf = require('./base')();

var Cover = bookshelf.Model.extend({
    tableName: 'cover',
    apks: function () {
        return this.belongsTo(require('./apks'));
    }
});

module.exports = Cover;