const Apks = require('../../models/apks');
const {
    getCover
} = require('./utils');
const {
    dateFtt
} = require('../utils');
const APKGet = require('./httpApkUrl');
const {put,get} = require('../apkcache');

let getApk = (id) => {
    return new Promise(async(resolve, reject) => {
        let cache = await get(id);
        if(cache === undefined) {
            Apks.forge({
                    'id': id
                })
                .fetch({
                    withRelated: ['tags', 'comment']
                })
                .then(async (apk) => {
                    let d = makeJson(apk.toJSON());
                    d['hotlist'] = await getLikeApk(d.class_id, 'apk_count');
                    d['newlist'] = await getLikeApk(d.class_id, '-created_at');
                    resolve(d);
                    put(id,d);
                }).catch((err) => {
                    reject({
                        'status': 5,
                        'message': '数据库发生错误'
                    });
                });
        }else {
            resolve(cache)
        }
    });
};

let getDownload = (id) => {
    return new Promise((resolve, reject) => {
        Apks.forge({
                'id': id
            })
            .fetch({
                columns: ['more', 'apk_count']
            })
            .then(async (apk) => {
                let d = mkJson(apk.toJSON());
                apk.save({
                    apk_count: parseInt(d.apk_count + 1)
                });
                let check = checkUrl(d.download); //判断是否是真实地址
                if (check == false) { //如果不是真实地址
                    d.download = await APKGet(d.download); //获取真实地址
                    // 更新下载地址为真实地址
                    d.more.download = d.download;
                    apk.save({
                        more: JSON.stringify(d.more)
                    });
                }
                resolve(d.download);
            }).catch((err) => {
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    });
};

let getLikeApk = (cid, sort) => {
    return new Promise((resolve, reject) => {
        Apks.where({
                'class_id': cid
            })
            .orderBy(sort)
            .fetchPage({
                limit: 8,
                columns: ['id', 'title', 'more']
            })
            .then((apk) => {
                let d = makeArrJson(apk.toJSON());
                resolve(d);
            }).catch((err) => {
                console.log(err)
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    });
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

let makeJson = (apk) => {
    apk.more = JSON.parse(apk.more);
    apk.more.cover = getCover(apk.more.cover);
    apk.created_at = dateFtt("yyyy-MM-dd", apk.created_at);
    apk.updated_at = dateFtt("yyyy-MM-dd", apk.updated_at);
    let infoimg = [];
    for (const i in apk.more.infoimg) {
        if (apk.more.infoimg.hasOwnProperty(i)) {
            let info = apk.more.infoimg[i];
            info = getCover(info);
            infoimg.push(info);
        }
    };
    apk.more.infoimg = infoimg;
    delete apk.more.download;
    return apk;
};

let mkJson = (apk) => {
    apk.more = JSON.parse(apk.more);
    apk.download = apk.more.download;
    return apk
}

let checkUrl = (url) => {
    var pos = url.lastIndexOf("/");
    if (pos == -1) {
        pos = url.lastIndexOf("\\")
    }
    var filename = url.substr(pos + 1);
    if (filename.indexOf('.apk') !== -1) {
        return true
    }else {
        return false
    }
}


module.exports = {
    getApk,
    getDownload
};