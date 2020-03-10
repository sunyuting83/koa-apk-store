// const getmo = require('../utils/models');
const fn_index = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    await ctx.render('manage/base', {
      user: user,
      link: '/manage',
      title: 'title',
      template: 'index.html'
    });
  } else {
    await ctx.response.redirect('/manage/login')
  }
  await next();
};

module.exports = {
  'GET /manage': fn_index
};