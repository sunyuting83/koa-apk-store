const Topic = require('../../models/topic');
const Tags = require('../../models/tags');
const {
    makeOffset,
    makeArrJson
} = require('./utils');

let getList = (type, id, page) => {
    let Data = makeType(type);
    let offset = makeOffset(page);
    return new Promise((resolve, reject) => {
        Data.forge({
                'id': id
            })
            .fetch({
                withRelated: ['apks', {
                    'apks': (qb) => {
                        qb.offset(offset);
                        qb.columns(['apkcontent.id', 'title', 'apk_count', 'more'])
                        qb.limit(9)
                            .orderBy('apkcontent.id', 'DESC');
                    }
                }],
                columns: ['id']
            })
            .then((data) => {
                if (data) {
                    // console.log(data);
                    let d = data.toJSON();
                    d = makeArrJson(d.apks);
                    resolve(d);
                    // resolve(makeArrJson(data.toJSON()));
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

let makeType = (type) => {
    let Data;
    switch (type) {
        case 'tag':
            Data = Tags;
            break;
        case 'topic':
            Data = Topic;
            break;
        default:
            Data = Tags;
            break;
    };
    return Data;
};

module.exports = getList;