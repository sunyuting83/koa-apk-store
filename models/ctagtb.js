const dbConfig = require('./pg_conf');
var knex = require('knex')(dbConfig);
Bookshelf = require('bookshelf')(knex);

Bookshelf.knex.schema.createTable('apkcontent_tags', function (table) {
    table.increments('id');
    table.integer('apkcontent_id').unsigned().references('apkcontent.id');
    table.integer('tag_id').unsigned().references('tags.id');
    table.comment('apk-TAG联表');
  })
  .then(function () {
    console.log('table created');
    process.exit();
  });