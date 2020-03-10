const {
  getApk,
  getDownload
} = require('../utils/api/getapk');
const fn_apk = async (ctx, next) => {
  const id = ctx.request.query.id;
  ctx.response.body = await getApk(id);
  await next();
};

const fn_download = async (ctx, next) => {
  const id = ctx.request.query.id;
  ctx.response.body = await getDownload(id);
  await next();
};

module.exports = {
  'GET /api/getapk': fn_apk,
  'GET /api/download': fn_download,
};