const {
  get,
  put,
  del,
  find
} = require('../levledb');
const {
  makeMD5
} = require('../utils');

let AdminList = async() => {
  /**
   * 返回代码：
   * @1 登录成功
   * @2 密码错误
   * @3 用户不存在
   */
  const parms = {
    prefix: 'user:'
  };
  const adminlist = await find(parms);
  return deletePassword(adminlist)
};

let changePassword = async(k, p) => {
  p = makeMD5(p);
  let u = await get(k);
  u['password'] = p;
  let d = await put(k, u);
  return(d)
};

let addUser = async(k, p) => {
  p = makeMD5(p);
  let timestamp = (new Date()).getTime(),
    data = {
      username: k,
      password: p,
      state: true,
      lastip: '127.0.0.1',
      lasttime: timestamp,
      login_size: 0,
      created_time: timestamp
    },
    key = `user:${k}`,
    check = await get(key),
    d = false;
  if (!check) d = await put(key, data);
  return(d);
};

let getUser = async(k) => {
  key = `user:${k}`;
  let user = await get(key);
  return(user);
};

let delUser = async(k) => {
  key = `user:${k}`;
  let delu = await del(key);
  return(delu);
};

let deletePassword = (ls) => {
  for (const i in ls) {
    if (ls.hasOwnProperty(i)) {
      let d = ls[i];
      delete d['value']['password'];
      d['value']['lasttime'] = formatime(d.value.lasttime);
      d['value']['created_time'] = formatime(d.value.created_time);
    }
  };
  return ls;
};

let formatime = (date) => {
  var now = new Date(date);
  // 也可以获取当前的毫秒级时间戳
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

module.exports = {
  AdminList,
  changePassword,
  addUser,
  getUser,
  delUser
};