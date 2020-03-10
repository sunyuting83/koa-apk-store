const {
  getSearchFirst,
  getSearchKey,
  getSearch
} = require('../utils/api/search');
const fn_searchKey = async (ctx, next) => {
  const key = ctx.request.query.key;
  const first = await getSearchFirst(key),
    list = await getSearchKey(key),
    json = {
      'first': first,
      'list': list
    };
  ctx.response.body = json;
  await next();
};
const fn_search = async (ctx, next) => {
  let page = ctx.request.query.page;
  if (!page || page == 0) page = 1;
  const key = ctx.request.query.key;
  ctx.response.body = await getSearch(key, page);
  await next();
};

module.exports = {
  'GET /api/searchkey': fn_searchKey,
  'GET /api/search': fn_search
};