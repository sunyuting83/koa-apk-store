const {
    AdminList,
    changePassword,
    addUser,
    getUser,
    delUser
} = require('../utils/manage/admin');
var fn_admin = async (ctx, next) => {
    let user = ctx.session.current_user;
    let admin = await AdminList();
    // console.log(admin);
    if (user) {
        await ctx.render('manage/base', {
            user: user,
            adminlist: admin,
            title: '管理员管理',
            link: '/manage/admin',
            template: './admin.html'
        });
    } else {
        await ctx.response.redirect('/manage/login')
    }
    await next();
};

var fn_changePwd = async (ctx, next) => {
    key = `user:${ctx.request.body.key}`,
    password = ctx.request.body.password;
    let data = await changePassword(key, password);
    ctx.response.body = data;
    await next();
};

var fn_addUser = async (ctx, next) => {
    let username = ctx.request.body.username,
        password = ctx.request.body.password,
    data = await addUser(username, password);
    ctx.response.body = data;
    await next();
};

var fn_getUser = async (ctx, next) => {
    let username = ctx.request.query.username,
        data = await getUser(username);
    ctx.response.body = data;
    await next();
};

var fn_deladmin = async (ctx, next) => {
    let key = ctx.request.body.key,
        data = await delUser(key);
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /manage/admin': fn_admin,
    'POST /manage/changepwd': fn_changePwd,
    'POST /manage/adduser': fn_addUser,
    'GET /manage/getuser': fn_getUser,
    'POST /manage/deladmin': fn_deladmin
};