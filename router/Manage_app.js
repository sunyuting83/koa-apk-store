const {
    getList,
    getCount
} = require('../utils/manage/manage_app');
const {getClassify} = require('../utils/manage/manage_classify');
var fn_app = async (ctx, next) => {
    let user = ctx.session.current_user;
    if (user) {
        let page = ctx.request.query.page;
        if (!page || page == 0) page = 1;
        let cid = ctx.request.query.cid;
        if (!cid) cid = 3;
        let dlist = await getList(cid, page);
        let classify = await getClassify();
        let count = await getCount(cid);
        // console.log(dlist);
        await ctx.render('manage/base', {
            user: user,
            link: '/manage/app',
            title: 'Apk管理',
            template: './app.html',
            apklist: dlist,
            classify: classify,
            count: count,
            thisp: page,
            cid: cid
        });
        await next();
    } else {
        await ctx.response.redirect('/manage/login');
        await next();
    }
};

module.exports = {
    'GET /manage/app': fn_app
};