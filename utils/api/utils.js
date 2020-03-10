const Topic = require('../../models/topic');
let getTopic = (tid, ty) => {
  return Topic.where({
      'classify': tid
    })
    .orderBy('sort')
    .fetchAll({
      withRelated: ['apks', {
        'apks': (qb) => {
          qb.columns('title', 'more', 'apk_count');
        }
      }]
    })
    .then((data) => {
      let d = makeTopicJson(data.toJSON(), ty);
      return(d);
    })
    .catch((err) => {
      // console.log(err);
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getTopImg = (tid) => {
  return Topic.where({
      'classify': tid
    })
    .fetch({
      withRelated: ['apks', {
        'apks': (qb) => {
          qb.limit(1);
          qb.columns('apkcontent.id');
        }
      }]
    })
    .then((data) => {
      let d = makeImgJson(data.toJSON());
      return(d);
    })
    .catch((err) => {
      // console.log(err);
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getRank = (tid) => {
  return Topic.where({
      'classify': tid
    })
    .orderBy('sort')
    .fetchAll({
      columns: ['id', 'more', 'title']
    })
    .then((data) => {
      return(data.toJSON());
    })
    .catch((err) => {
      // console.log(err);
      return({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let makeTopicJson = (arr, ty) => {
  for (const x in arr) {
    if (arr.hasOwnProperty(x)) {
      let j = arr[x],
        jlen = j.apks.length;
      if (ty == 0) {
        j.apks = j.apks.slice(0, 3)
      };
      for (const i in j.apks) {
        if (j.apks.hasOwnProperty(i)) {
          let apk = j.apks[i];
          apk.id = apk._pivot_apkcontent_id;
          delete apk['_pivot_apkcontent_id'];
          delete apk['_pivot_topic_id'];
          apk.more = JSON.parse(apk.more);
          apk.more.cover = getCover(apk.more.cover);
          delete apk.more['infoimg'];
          delete apk.more['intromore'];
          delete apk.more['apk_version'];
          delete apk.more['apk_language'];
          delete apk.more['download'];
        }
      };
    }
  };
  return arr;
};

let makeImgJson = (arr) => {
  let json = {
    id: arr.apks[0].id,
    img: arr.more
  };
  return json;
};

let getCover = (url) => {
  const rturl = 'https://m.anruan.com/';
  let has = url.indexOf('http');
  if (has != -1) return url;
  return `${rturl}${url}`;
};

let makeOffset = (page) => {
  let offset = 0;
  if (page === 1 || !page) {
    offset = 0
  } else if (page === 2) {
    offset = 9
  } else {
    offset = (page - 1) * 9
  };
  return offset;
};

let makeArrJson = (arr) => {
  for (const i in arr) {
    if (arr.hasOwnProperty(i)) {
      let apkls = arr[i];
      apkls.more = JSON.parse(apkls.more);
      apkls.more.cover = getCover(apkls.more.cover);
      delete apkls.more.intromore;
      delete apkls.more.infoimg;
      delete apkls.more.apk_language;
      delete apkls.more.apk_version;
      delete apkls.more.download;
    }
  }
  return arr;
};

let getCid = (cid) => {
  cid = parseInt(cid);
  if (cid <= 19) {
    return 1
  } else if (cid >= 20) {
    return 2
  }
};

module.exports = {
  getTopic,
  getRank,
  getTopImg,
  getCover,
  makeOffset,
  makeArrJson,
  getCid
};