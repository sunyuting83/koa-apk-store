var rooturl = 'http://127.0.0.1:3000/manage/';
// 创建axios默认请求
axios.defaults.baseURL = rooturl;
// 配置超时时间
axios.defaults.timeout = 100000;
// 配置请求拦截
axios.interceptors.request.use(config => {
    // config.setHeaders([
    //   // 在这里设置请求头与携带token信息
    // ]);
    return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // console.log(response);
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
// 配置请求地址
let getUrl = (u) => {
    var ul = '';
    var url = {
        'changepwd': `${rooturl}changepwd`,
        'deladmin': `${rooturl}deladmin`,
        'adduser': `${rooturl}adduser`,
        'getuser': `${rooturl}getuser`
    };
    switch (u) {
        case 'changepwd':
            ul = url.changepwd;
            break;
        case 'deladmin':
            ul = url.deladmin;
            break;
        case 'adduser':
            ul = url.adduser;
            break;
        case 'getuser':
            ul = url.getuser;
            break;
        default:
            ul = url.changepwd;
            break;
    };
    return ul;
};

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = (url, params, loading) => {
    let u = getUrl(url);
    return new Promise((resolve, reject) => {
        axios
            .get(u, {
                params: params
            })
            .then(res => {
                if (res.status === 200) resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = (url, data) => {
    let u = getUrl(url);
    return new Promise((resolve, reject) => {
        // qs.stringify(data)
        axios
            .post(u, data)
            .then(res => {
                // console.log(res);
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};