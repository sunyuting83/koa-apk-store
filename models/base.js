/**
 * init bookshelf connection
 * @ type {[type]}
 */
let Bookshelf = null,
    dbConfig = require('./pg_conf');
module.exports = function () {

    if (Bookshelf) {
        return Bookshelf;
    }

    var knex = require('knex')(dbConfig);

    Bookshelf = require('bookshelf')(knex);

    Bookshelf.plugin(['registry', 'pagination']);

    return Bookshelf;
};