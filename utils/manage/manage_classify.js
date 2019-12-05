const Classify = require('../../models/classify');

let getClassify = () => {
    return new Promise((resolve, reject) => {
        Classify.where({
                'top_id': null
            })
            .orderBy('-sort')
            .fetchAll({
                withRelated: ['classify']
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

let changeClass = (json) => {
    return new Promise((resolve, reject) => {
        Classify.where({id: json.id})
            .fetch()
            .then(async (d) => {
                // console.log(json.sort);
                if (json.sort) {
                    if (d.attributes.sort == json.sort) {
                        resolve(json.sort)
                    }else {
                        let data = await postClass(json);
                        resolve(data.sort)
                    }
                }else {
                    if (d.attributes.classname == json.classname) {
                        resolve(json.classname)
                    } else {
                        let data = await postClass(json);
                        resolve(data.classname)
                    }
                }
            }).catch((err) => {
                resolve(false)
            });
    })
};

let postClass = (json) => {
    return new Promise((resolve, reject) => {
        Classify.forge(json).save()
            .then((t) => {
                resolve(t.toJSON());
            })
            .catch((error) => {
                resolve(json)
            });
    })
};


module.exports = {
    getClassify,
    changeClass
};