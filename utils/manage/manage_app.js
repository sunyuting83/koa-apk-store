const Apks = require('../../models/apks');
const {
  dateFtt
} = require('../utils');

let getList = (cid, p) => {
  return Apks.where({
      'class_id': cid
    })
    .orderBy('-created_at')
    .fetchPage({
      pageSize: 30,
      page: p,
      withRelated: ['classify'],
      columns: ['id', 'title', 'class_id', 'more', 'created_at']
    })
    .then((data) => {
      return data.toJSON();
    })
    .then((data) => {
      return(makeJson(data));
    })
    .catch((err) => {
      // console.log(err);
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getCount = (cid) => {
  return Apks.where({
      'class_id': cid
    })
    .count()
    .then((data) => {
      return(data);
    })
    .catch((err) => {
      // console.log(err);
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let makeJson = (data) => {
  data.forEach(ls => {
    ls.created_at = dateFtt("yyyy-MM-dd hh:mm", ls.created_at);
    ls.more = JSON.parse(ls.more);
  });
  return data;
};

module.exports = {
  getList,
  getCount
};