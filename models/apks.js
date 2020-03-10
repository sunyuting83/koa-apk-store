const bookshelf = require('./base')();

var Apks = bookshelf.Model.extend({
  tableName: 'apkcontent',
  hasTimestamps: true,
  classify: function () {
    return this.belongsTo(require('./classify'));
  },
  tags: function () {
    return this.belongsToMany(require('./tags'));
  },
  topic: function () {
    return this.belongsToMany(require('./topic'));
  },
  comment: function () {
    return this.hasMany(require('./comment'), 'apk_id');
  },
});

// 添加TAGS
Apks.prototype.addTags = function (tag) {
  /* 
  先查询是否已有TAGS。使用where语句。传入@tag参数
  @has是查询结果
  如果有结果，直接追加书籍的TAGSid入多对多关联表. @has.id
  如果没有结果， 添加新TAGS入库， 并追加TAGSid至关联表 @tag.id
  */
  const Tags = require('./tags');
  return Tags.where({
      'tag': tag
    })
    .fetch()
    .bind(this)
    .then(function (has) {
      if (has) {
        this.tags().attach(has.id); //追加到关联表
        return has;
      } else {
        return Tags.forge({
            'tag': tag
          }).save()
          .bind(this)
          .then(function (t) {
            // console.log(this.id, tag.id);
            this.tags().attach(t.id); //追加到关联表
            return t;
          });
      }
    })
    .catch(function (e) {
      console.log(e);
    });
};

// 添加专题
Apks.prototype.addTopic = function (topic) {
  /* 
  先查询是否已有TAGS。使用where语句。传入@tag参数
  @has是查询结果
  如果有结果，直接追加书籍的TAGSid入多对多关联表. @has.id
  如果没有结果， 添加新TAGS入库， 并追加TAGSid至关联表 @tag.id
  */
  const Topic = require('./topic');
  return Topic.where({
      'topic': topic
    })
    .fetch()
    .bind(this)
    .then(function (has) {
      if (has) {
        this.topic().attach(has.id); //追加到关联表
        return has;
      } else {
        return Topic.forge({
            'topic': topic
          }).save()
          .bind(this)
          .then(function (t) {
            // console.log(this.id, tag.id);
            this.topic().attach(t.id); //追加到关联表
            return t;
          });
      }
    })
    .catch(function (e) {
      console.log(e);
    });
};

module.exports = Apks;