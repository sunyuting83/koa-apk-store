const {
  getKeyList
} = require('../utils/manage/hotkey');
const fn_getKey = async (ctx, next) => {
  ctx.response.body = await getKeyList();
  await next();
};

module.exports = {
  'GET /api/getkey': fn_getKey
};