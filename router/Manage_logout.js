const fn_logout = async (ctx, next) => {
  ctx.session.current_user = undefined;
  await ctx.response.redirect('/manage/login');
};

module.exports = {
  'GET /manage/logout': fn_logout
};