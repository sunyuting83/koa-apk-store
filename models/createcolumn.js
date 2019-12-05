const dbConfig = require('./pg_conf');
var knex = require('knex')(dbConfig);
Bookshelf = require('bookshelf')(knex);
// 添加字段
Bookshelf.knex.schema.table('topic', (table) => {
        table.integer('sort').defaultTo(0);
        table.string('more');
        // table.dropColumn('click_count'); //删除字段
    })
    .then((result) => {
        process.exit();
    }).catch((err) => {
        process.exit();
    });