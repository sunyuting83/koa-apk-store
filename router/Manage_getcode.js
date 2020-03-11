// var ccap = require('ccap')();
const fn_getcode = async (ctx, next) => {
  ctx.response.body = 'hello world';
  // return next().then(() => {
  //   // let ary = ccap.get();
  //   let ary = ['a','b']
  //   let txt = ary[0];
  //   let buf = ary[1];
  //   ctx.body = buf; //直接输出图片
  //   ctx.type = 'image/png';
  //   ctx.session.captcha = txt; //这里可能需要加载session模块，输出验证码，在别的模块调用参与登陆逻辑验证
  // });
};

module.exports = {
  'GET /manage/getcode': fn_getcode
};