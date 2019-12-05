const Apks = require('../../models/apks');
const {
    getCover
} = require('./utils');
const {
    dateFtt
} = require('../utils');

let getClassList = (id, p) => {
    return new Promise((resolve, reject) => {
        Apks.where({
                'class_id': id
            })
            .orderBy('-created_at')
            .fetchPage({
                pageSize: 15,
                page: p,
                columns: ['id', 'title', 'apk_count', 'more']
            })
            .then((data) => {
                if (data) {
                    resolve(makeArrJson(data.toJSON()));
                } else {
                    resolve([]);
                }
            })
            .catch((err) => {
                console.log(err)
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
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



module.exports = getClassList;