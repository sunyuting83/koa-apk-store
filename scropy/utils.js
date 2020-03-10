var crypto = require('crypto'); //MD5
var Entities = require('html-entities').XmlEntities; //编码工具
entities = new Entities();
// const HttpGet = require('./httpUtils');

let makeMD5 = (str, nb) => {
  var md5 = crypto.createHash("md5").update(str, 'utf-8').digest('hex');
  md5 = md5.substring(0, nb);
  return md5;
};

let sum = (m, n) => { //取随机数函数
  var num = Math.floor(Math.random() * (m - n) + n);
  return (num)
};
let getIntorContent = (str) => {
  return new Promise((resolve, reject) => {
    var stred = entities.decode(str);
    stred = stred.replace(/[\r\n\t]/g, "");
    stred = str.replace(/<[/]?p>/g, '|||||').replace(/<[/]?h3>/g, '|||||');
    stred = stred.split('|||||');
    var st = [];
    for (const i in stred) {
      if (stred.hasOwnProperty(i)) {
        let t = stred[i];
        t = t.replace(/[\r\n\t]/g, "");
        t = t.replace(/<\/?.+?>/g, '');
        t = t.replace(/(^\s+)|(\s+$)/g, "");
        if (t !== '') {
          st.push(entities.decode(t));
        }
      }
    };
    resolve(st);
  });
};
let getClassId = (classname) => { //判断分类ID函数
  // console.log(classname);
  return new Promise((resolve, reject) => {
    var classid = 8;
    switch (classname) {
      case '角色扮演':
        classid = 20;
        break;
      case '休闲益智':
        classid = 21;
        break;
      case '棋牌游戏':
        classid = 22;
        break;
      case '动作格斗':
        classid = 23;
        break;
      case '冒险解谜':
        classid = 24;
        break;
      case '飞行射击':
        classid = 25;
        break;
      case '策略塔防':
        classid = 26;
        break;
      case '赛车竞速':
        classid = 27;
        break;
      case '体育竞技':
        classid = 28;
        break;
      case '卡牌游戏':
        classid = 29;
        break;
      case '模拟经营':
        classid = 30;
        break;
      case '养成游戏':
        classid = 31;
        break;
      case '音乐舞蹈':
        classid = 32;
        break;
      case '儿童教育':
        classid = 33;
        break;
      case '其他游戏':
        classid = 34;
        break;
      case '系统工具':
        classid = 3;
        break;
      case '影音媒体':
        classid = 4;
        break;
      case '桌面美化':
        classid = 5;
        break;
      case '聊天交友':
        classid = 6;
        break;
      case '生活实用':
        classid = 7;
        break;
      case '拍照摄影':
        classid = 8;
        break;
      case '电子阅读':
        classid = 9;
        break;
      case '网络浏览':
        classid = 10;
        break;
      case '学习工具':
        classid = 11;
        break;
      case '通信增强':
        classid = 12;
        break;
      case '交通出行':
        classid = 13;
        break;
      case '商务办公':
        classid = 14;
        break;
      case '安全杀毒':
        classid = 15;
        break;
      case '图形图像':
        classid = 16;
        break;
      case '理财购物':
        classid = 17;
        break;
      case '健康医疗':
        classid = 18;
        break;
      case '游戏工具':
        classid = 19;
        break;
      default:
        classid = 34;
        break;
    };
    resolve(classid);
  });
};

module.exports = {
  makeMD5,
  sum,
  getClassId,
  getIntorContent
};