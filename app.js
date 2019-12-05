const
Koa = require('koa'),
bodyParser = require('koa-bodyparser'),
// 导入controller middleware:
router = require('./router'),
logger = require('./utils/logger'),
cors = require('koa2-cors'),
static = require('koa-static'), //koa 静态文件中间件
session = require('koa-session'),
scheduleCronstyle = require('./scropy/app'),
errThrow = require('./utils/error');
const app = new Koa();

app.use(cors());

scheduleCronstyle();

// 配置模版引擎中间件
const views = require('koa-views'); // koa
// 如果这样配置不修改html后缀g改成ejs
// app.use(views('template', {
//     extension: 'ejs'
// }));
// 如果这样配置不修改html后缀
app.use(views('template',{map:{html:'ejs'}}));

// 開啓gzip壓縮
const Compress = require('koa-compress');
app.use(Compress({
    threshold: 2048 // 要压缩的最小响应字节
}));

// 设置session
app.keys = ['XbFrb9PfkWP63nghK7zZKwYBolhX'];
let CONFIG = {
    key: 'manage:sess', //cookie key (default is koa:sess)
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认true
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, //(boolean) renew session when session is nearly expired,
};

// 设置session
app.use(session(CONFIG, app));

//设置静态资源的路径 
app.use(static(__dirname + '/static'));

// 设置跨域
// 日志
app.use(logger);

// add router middleware:
app.use(bodyParser());
// 使用middleware:
app.use(router());
// Error
app.use(errThrow);

app.listen(3000);
console.log('app started at port 3000...');