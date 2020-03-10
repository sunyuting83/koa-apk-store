const {
  HotKeyList,
  delHotKey
} = require('../utils/manage/hotkey');
const fn_hotkey = async (ctx, next) => {
  const user = ctx.session.current_user,
        hotkey = await HotKeyList();
  // console.log(hotkey);
  if (user) {
    await ctx.render('manage/base', {
      user: user,
      keylist: hotkey,
      title: '热搜词管理',
      link: '/manage/hotkey',
      template: './hotkey.html'
    });
  } else {
    await ctx.response.redirect('/manage/login')
  }
  await next();
};


const fn_addHotkey = async (ctx, next) => {
  const username = ctx.request.body.username,
        password = ctx.request.body.password,
        data = await addUser(username, password);
  ctx.response.body = data;
  await next();
};


const fn_delHotkey = async (ctx, next) => {
  const key = ctx.request.body.key,
        cid = ctx.request.body.cid,
        data = await delHotKey(key, cid);
  ctx.response.body = data;
  await next();
};

module.exports = {
  'GET /manage/hotkey': fn_hotkey,
  'POST /manage/addhotkey': fn_addHotkey,
  'POST /manage/delhotkey': fn_delHotkey
};