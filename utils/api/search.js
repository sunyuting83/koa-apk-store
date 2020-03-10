const Apks = require('../../models/apks');
const {
  getCover,
  makeArrJson,
  getCid
} = require('./utils');
const {
  addHotKey
} = require('../manage/hotkey');

let getSearchFirst = (key) => {
  return Apks.query((qb) => {
      qb.where('title', 'LIKE', '%' + key + '%');
      qb.groupBy('id');
    })
    .orderBy('-created_at')
    .fetchPage({
      limit: 1,
      columns: ['id', 'title', 'more', 'apk_count']
    })
    .then((data) => {
      if (data && data.toJSON().length > 0) {
        return(makeJson(data.toJSON()));
      } else {
        return({});
      }
    })
    .catch((err) => {
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getSearchKey = (key) => {
  return Apks.query((qb) => {
      qb.where('title', 'LIKE', '%' + key + '%');
      qb.groupBy('id');
    })
    .orderBy('-created_at')
    .fetchPage({
      limit: 8,
      offset: 1,
      columns: ['id', 'title']
    })
    .then((data) => {
      if (data) {
        return(data.toJSON());
      } else {
        return([]);
      }
    })
    .catch((err) => {
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getSearch = (key, p) => {
  return Apks.query((qb) => {
      qb.where('title', 'LIKE', '%' + key + '%');
      qb.groupBy('id');
    })
    .orderBy('-created_at')
    .fetchPage({
      pageSize: 15,
      page: p,
      columns: ['id', 'title', 'class_id', 'apk_count', 'more']
    })
    .then((data) => {
      if (data) {
        let json = data.toJSON();
        if (p == 1) {
          let cid = getCid(json[0].class_id);
          // console.log(cid);
          addHotKey(key, cid);
        };
        return(makeArrJson(json));
      } else {
        return([]);
      }
    })
    .catch((err) => {
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};



let makeJson = (apk) => {
  apk[0].more = JSON.parse(apk[0].more);
  apk[0].more.cover = getCover(apk[0].more.cover);
  apk[0].cover = apk[0].more.cover;
  apk[0].size = apk[0].more.apk_size;
  delete apk[0].more;
  return apk[0];
};



module.exports = {
  getSearchKey,
  getSearchFirst,
  getSearch
};