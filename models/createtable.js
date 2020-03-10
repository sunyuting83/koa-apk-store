const dbConfig = require('./pg_conf');
var knex = require('knex')(dbConfig);
Bookshelf = require('bookshelf')(knex);

// Create a table
Bookshelf.knex.schema.createTable('classify', function (table) {
    table.increments('id').unsigned().primary();
    table.string('classname', 30);
    table.integer('top_id').unsigned().references('classify.id');
    table.integer('sort').defaultTo(0);
    table.index('id', ['ix_classify_id']);
    table.comment('分类表');
  })
  // ...and another
  .createTable('apkcontent', function (table) {
    table.increments('id').unsigned().primary();
    table.string('title', 60);
    table.text('more');
    table.integer('apk_count').defaultTo(0);
    table.integer('class_id').unsigned().references('classify.id');
    table.timestamps();
    table.index('id', ['ix_apkcontent_id']);
    table.index('title', ['ix_apkcontent_title']);
    table.comment('APK表');
  })
  // ...and another
  .createTable('tags', function (table) {
    table.increments('id').unsigned().primary();
    table.string('tag', 60);
    table.integer('tag_count').defaultTo(0);
    table.index('id', ['ix_tags_id']);
    table.comment('TAG表');
  })
  // ...and another
  .createTable('apkcontent_tags', function (table) {
    table.increments('id');
    table.integer('apkcontent_id').unsigned().references('apkcontent.id');
    table.integer('tag_id').unsigned().references('tags.id');
    table.comment('apk-TAG联表');
  })
  // ...and another
  .createTable('topic', function (table) {
    table.increments('id').unsigned().primary();
    table.string('title', 100);
    table.integer('classify');
    table.integer('sort');
    table.string('more');
    table.index('id', ['ix_topic_id']);
    table.comment('专题表');
  })
  // ...and another
  .createTable('apkcontent_topic', function (table) {
    table.increments('id');
    table.integer('apkcontent_id').unsigned().references('apkcontent.id');
    table.integer('topic_id').unsigned().references('topic.id');
    table.comment('apk-专题联表');
  })
  // ...and another
  .createTable('apk_users', function (table) {
    table.increments('id').unsigned().primary();
    table.string('nickname', 60);
    table.string('phonenumber', 20);
    table.string('password', 50);
    table.string('cover');
    table.boolean('status');
    table.timestamps();
    table.index('phonenumber', ['ix_apk_users_phonenumber']);
    table.comment('用户表');
  })
  // ...and another
  .createTable('comment', function (table) {
    table.increments('id').unique();
    table.integer('score');
    table.string('content');
    table.integer('apk_id').unsigned().references('apkcontent.id');
    table.integer('user_id').unsigned().references('apk_users.id');
    table.timestamps();
    table.comment('评论表');
  })
  .then(function () {
    console.log('table created');
    process.exit();
  })
  // Finally, add a .catch handler for the promise chain
  .catch(function (e) {
    console.error(e);
    process.exit();
  });