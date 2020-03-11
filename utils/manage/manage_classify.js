const Classify = require('../../models/classify');

let getClassify = () => {
  return Classify.where({
      'top_id': null
    })
    .orderBy('-sort')
    .fetchAll({
      withRelated: ['classify']
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

let changeClass = (json) => {
  return Classify.where({
      id: json.id
    })
    .fetch()
    .then(async (d) => {
      // console.log(json.sort);
      if (json.sort) {
        if (d.attributes.sort == json.sort) {
          return(json.sort)
        } else {
          let data = await postClass(json);
          return(data.sort)
        }
      } else {
        if (d.attributes.classname == json.classname) {
          return(json.classname)
        } else {
          let data = await postClass(json);
          return(data.classname)
        }
      }
    }).catch((err) => {
      return(false)
    });
};

let postClass = (json) => {
  return Classify.forge(json).save()
    .then((t) => {
      return(t.toJSON());
    })
    .catch((error) => {
      return(json)
    });
};


module.exports = {
  getClassify,
  changeClass
};