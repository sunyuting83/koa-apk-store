const checkLogin = require('../utils/manage/login');
var fn_login = async (ctx, next) => {
    let logined = ctx.session.current_user;
    if (logined) {
        await ctx.response.redirect('/manage');
    } else {
        let
            username = ctx.request.body.user_name,
            password = ctx.request.body.user_password,
            code = ctx.request.body.verify_code,
            verify_code = ctx.session.captcha,
            ip = ctx.ip,
            message = {},
            json = {};

        if (code) {
            code = code.toUpperCase(); // 验证码转大写
        } else {
            message = {
                code: 'err',
                message: '请输入验证码'
            }
        };
        // 检测严重码是否正确
        if (code === verify_code) {
            json = {
                'username': `user:${username}`,
                'password': password,
                'ip': ip
            };
            let login = await checkLogin(json);
            if (login.code == 1) {
                message = {
                    code: 'err',
                    message: login.message
                };
                // 设置用户全局变量
                ctx.session.current_user = login.user;
                await ctx.response.redirect('/manage');
            } else {
                message = {
                    code: 'err',
                    message: login.message
                };
                await ctx.render('manage/login', {
                    'message': message
                });
            };
        } else {
            message = {
                code: 'err',
                message: '验证码错误'
            }
            await ctx.render('manage/login', {
                'message': message
            });
        };
    };
    // console.log(username, password, code, verify_code, remember_me, ip);
    await next();
    
};

module.exports = {
    'GET /manage/login': fn_login,
    'POST /manage/login': fn_login,
};