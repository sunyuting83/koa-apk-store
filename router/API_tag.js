const getClassList = require('../utils/api/tag');

const fn_getag = async (ctx, next) => {
  let page = ctx.request.query.page;
  if (!page || page == 0) page = 1;
  const id = ctx.request.query.id;
  ctx.response.body = await getClassList(id, page);
  await next();
};

module.exports = {
  'GET /api/tag': fn_getag
};