const Topic = require('../../models/topic');
const Apks = require('../../models/apks');

let getList = (cid, p) => {
    return new Promise((resolve, reject) => {
        Topic.where({
                'classify': cid
            })
            .orderBy('sort')
            .fetchPage({
                pageSize: 30,
                page: p,
                withRelated: ['apks' ,{
                    'apks': (qb) => {
                        qb.columns('title');
                    }
                }]
            })
            .then((data) => {
                resolve(data.toJSON());
            })
            .catch((err) => {
                console.log(err);
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
};


let getCount = (cid) => {
    return new Promise((resolve, reject) => {
        Topic.where({
                'classify': cid
            })
            .count()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
};

let getClassify = () => {
    let classify = [
        {
            classname: '首页专题',
            id: 0
        },
        {
            classname: '首页排行',
            id:5
        },
        {
            classname: '首页轮显',
            id:3
        },
        {
            classname: '首页必装',
            id:4
        },
        {
            classname: '软件专题',
            id:1
        },
        {
            classname: '软件轮显',
            id:8
        },
        {
            classname: '软件精选',
            id:9
        },
        {
            classname: '软件排行',
            id:6
        },
        {
            classname: '游戏专题',
            id:2
        },
        {
            classname: '游戏轮显',
            id:10
        },
        {
            classname: '游戏精选',
            id:11
        },
        {
            classname: '游戏排行',
            id:7
        }
    ];
    return classify
};

let posTopic = (json) => {
    return new Promise((resolve, reject) => {
        Topic.forge(json).save()
            .then((t) => {
                resolve(true)
            })
            .catch((error) => {
                console.log(error);
                resolve(false)
            });
    })
};

let searchAPK = (key, p) => {
    return new Promise((resolve, reject) => {
        Apks.query((qb) => {
                qb.where('title', 'LIKE', '%' + key + '%');
                qb.groupBy('id');
            })
            .orderBy('-created_at')
            .fetchPage({
                pageSize: 30,
                page: p,
                columns: ['id', 'title']
            })
            .then((data) => {
                if (data) {
                    resolve(data.toJSON());
                }
            })
            .catch((err) => {
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
};

let addAPK = (tid, aid) => {
    return new Promise((resolve, reject) => {
        Topic.where({
                'id': tid
            })
            .fetch()
            .then((data) => {
                if (data) {
                    data.apks().attach(aid);
                    resolve({
                        'status': 0,
                        'message': '已添加'
                    });
                }
            })
            .catch((err) => {
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
};

let delAPK = (tid, aid) => {
    return new Promise((resolve, reject) => {
        Topic.where({
                'id': tid
            })
            .fetch()
            .then((data) => {
                if (data) {
                    data.apks().detach(aid);
                    resolve({
                        'status': 0,
                        'message': '已添加'
                    });
                }
            })
            .catch((err) => {
                reject({
                    'status': 5,
                    'message': '数据库发生错误'
                });
            });
    })
};



module.exports = {
    getList,
    getCount,
    getClassify,
    posTopic,
    searchAPK,
    delAPK,
    addAPK
};