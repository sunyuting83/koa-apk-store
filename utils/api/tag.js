const Tags = require('../../models/tags');
const {
    makeOffset,
    makeArrJson
} = require('./utils');

let getClassList = (id, page) => {
    let offset = makeOffset(page);
    return new Promise((resolve, reject) => {
        Tags.forge({
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

module.exports = getClassList;