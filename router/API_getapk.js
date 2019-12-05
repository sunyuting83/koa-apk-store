const {
    getApk,
    getDownload
} = require('../utils/api/getapk');
var fn_apk = async (ctx, next) => {
    let id = ctx.request.query.id;
    ctx.response.body = await getApk(id);
    await next();
};

var fn_download = async (ctx, next) => {
    let id = ctx.request.query.id;
    ctx.response.body = await getDownload(id);
    await next();
};

module.exports = {
    'GET /api/getapk': fn_apk,
    'GET /api/download': fn_download,
};