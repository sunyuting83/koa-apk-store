const {
  getClassify,
  changeClass
} = require('../utils/manage/manage_classify');
const fn_classify = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    const clist = await getClassify();
    // console.log(dlist);
    await ctx.render('manage/base', {
      user: user,
      link: '/manage/classify',
      title: '分类管理',
      template: './classify.html',
      list: clist
    });
    await next();
  } else {
    await ctx.response.redirect('/manage/login');
    await next();
  }
};

const fn_change = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    let id = ctx.request.body.id,
      type = ctx.request.body.types || 'sort',
      data = ctx.request.body.data,
      json = {
        id: id
      };
    if (type == 'sort') {
      json['sort'] = data
    } else {
      json['classname'] = data
    };
    ctx.response.body = await changeClass(json);
    await next();
  } else {
    await ctx.response.redirect('/manage/login');
    await next();
  }
}

module.exports = {
  'GET /manage/classify': fn_classify,
  'POST /manage/classify_edit': fn_change
};