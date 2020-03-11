const {
  get,
  put
} = require('../levledb');
const {
  makeMD5
} = require('../utils');

let checkLogin = async(json) => {
  /**
   * 返回代码：
   * @1 登录成功
   * @2 密码错误
   * @3 用户不存在
   */
  // 检测token 是否存在
  /*
  let checkToken = await get(json.token);
  if (checkToken) {
      // 存在直接返回登录状态
      let checkUser = await get(`user:${checkToken.username}`);
      delete checkUser['password'];
      resolve({
          'code': 1,
          'message': '登录成功',
          'user': checkUser
      })
  }else {
      
  }
  */

  // token不存在就检测用户是否存在
  let checkUser = await get(json.username);
  if (checkUser) {
    // 用户存在 判断密码是否正确
    let password = makeMD5(json.password);
    // console.log(password, checkUser.password);
    if (checkUser.password === password) {
      // 更新登录次数和登录ip 获取当前时间
      let
        timestamp = (new Date()).getTime(),
        upipt = {
          'username': checkUser.username,
          'password': password,
          'state': true,
          'lastip': json.ip,
          'lasttime': timestamp,
          'login_size': checkUser.login_size + 1,
          'created_time': checkUser.created_time
        };
      await put(json.username, upipt);
      delete checkUser['password'];
      // 没有选择记录登录状态，直接返回登录信息
      return({
        'code': 1,
        'message': '登录成功',
        'user': checkUser
      })
      // 如果记住用户登录信息是y 就制造并记录token
      // if (json.remember === 'y') {
      //     /** 
      //      * @token = 前置'token:' + 用户名 + 密码 + 当前时间戳
      //      * @outtime 过期时间 默认1小时 
      //      * @return 登录成功状态， 用户名， token
      //      */
      //     let
      //         k = `${checkUser.username}${checkUser.password}${timestamp}`,
      //         outtime = 1000 * 60 * 20;
      //     k = makeMD5(k); //制造md5 token
      //     k = `token:${k}`; // 加token: 前置
      //     let setToken = await puttl(k, checkUser.username, outtime);
      //     // 删除密码信息
      //     delete checkUser['password'];
      //     if (setToken) {
      //         resolve({
      //             'code': 4,
      //             'message': '登录成功',
      //             'user': checkUser,
      //             'token': k
      //         })
      //     } else {
      //         // 入库操作失败
      //         resolve({
      //             'code': 5,
      //             'message': '数据库错误'
      //         })
      //     }
      // } else {

      // }
    } else {
      return({
        'code': 2,
        'message': '密码错误'
      })
    }
  } else {
    // 用户不存在返回信息
    return({
      'code': 3,
      'message': '用户不存在'
    })
  }
};

module.exports = checkLogin;