const getList = require('../utils/api/getlist');

var fn_getag = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    let id = ctx.request.query.id;
    ctx.response.body = await getList(id, page);
    await next();
};

module.exports = {
    'GET /api/tag': fn_getag
};