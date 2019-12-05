// const getmo = require('../utils/models');
var fn_index = async (ctx, next) => {
    let user = ctx.session.current_user;
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