const {getClassify} = require('../utils/manage/manage_classify');
const getClassList = require('../utils/api/classify');
var fn_classify = async (ctx, next) => {
    ctx.response.body = await getClassify();
    await next();
};

var fn_classlist = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    let id = ctx.request.query.id;
    ctx.response.body = await getClassList(id, page);
    await next();
};

module.exports = {
    'GET /api/classify': fn_classify,
    'GET /api/classlist': fn_classlist
};