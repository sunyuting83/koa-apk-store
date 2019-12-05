const {
    getSearchFirst,
    getSearchKey,
    getSearch
} = require('../utils/api/search');
var fn_searchKey = async (ctx, next) => {
    let key = ctx.request.query.key;
    let first = await getSearchFirst(key),
        list = await getSearchKey(key),
        json = {
            'first': first,
            'list': list
        };
    ctx.response.body = json;
    await next();
};
var fn_search = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    let key = ctx.request.query.key;
    ctx.response.body = await getSearch(key, page);
    await next();
};

module.exports = {
    'GET /api/searchkey': fn_searchKey,
    'GET /api/search': fn_search
};