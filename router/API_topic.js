const getList = require('../utils/api/getlist');

var fn_getopic = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    let id = ctx.request.query.id;
    ctx.response.body = await getList('topic', id, page);
    await next();
};

module.exports = {
    'GET /api/topic': fn_getopic
};