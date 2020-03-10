var fn_index = async (ctx, next) => {
  await ctx.render('index');
  await next();
};

module.exports = {
  'GET /': fn_index,
  'GET /item/:id': fn_index,
  'GET /search': fn_index,
  'GET /classify': fn_index,
  'GET /list/:id': fn_index,
  'GET /soft': fn_index,
  'GET /game': fn_index
};