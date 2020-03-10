const HttpGet = require('./httpUtils');
// const APKGet = require('./httpApkUrl');
const cheerio = require('cheerio');
var sleep = require('system-sleep');
const {
  sum,
  getClassId,
  getIntorContent
} = require('./utils');
const {
  saveIgnore,
  checkIgnore
} = require('./saveInore');
const saveApks = require('./saveData');

let Scropy = () => {
  return new Promise((resolve, reject) => {
    let gurl = getRootUrl('game'),
      surl = getRootUrl('soft');
    // 采集软件
    for (let i = surl.n; i >= 1; i--) {
      let lsurl = surl.u + i + '.html';
      console.log(lsurl);
      sleep(sum(1000, 3100));
      HttpGet(lsurl)
        .then(async (data) => {
          // 构造内容页URL 并爬取内容
          let content = await getContentUrl(data);
          resolve(content);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    for (let i = gurl.n; i >= 1; i--) {
      let lsurl = gurl.u + i + '.html';
      console.log(lsurl);
      sleep(sum(1000, 3100));
      HttpGet(lsurl)
        .then(async (data) => {
          // 构造内容页URL 并爬取内容
          let content = await getContentUrl(data);
          resolve(content);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  });
};

let getRootUrl = (tp) => {
  var url = {
    u: '',
    n: 0
  };
  switch (tp) {
    case 'game':
      url.u = 'https://m.anruan.com/yxxz/list_4_1_1_';
      url.n = 100;
      break;
    case 'soft':
      url.u = 'https://m.anruan.com/rjxz/list_5_1_1_';
      url.n = 100;
      break;
    default:
      url.u = 'https://m.anruan.com/rjxz/list_5_1_1_';
      url.n = 100;
      break;
  };
  return url;
};

let getContentUrl = (data) => {
  return new Promise((resolve, reject) => {
    // 分析内容页url
    var $ = cheerio.load(data);
    let $list = $('div.list-cent').children('ul.lisstyl1').children('li');
    // let len = $list.length;
    const rooturl = 'https://m.anruan.com';
    $list.each(async (i, e) => {
      const u = $(e).children('a.img').attr('href');
      const url = rooturl + u;
      // console.log(url);
      // 抓取内容页
      var contenData = await getConten(url);
      resolve(contenData);
    });
  });
};

let getConten = (url) => {
  return new Promise((resolve, reject) => {
    // sleep(sum(1000, 3100));
    // HttpGet(url)
    // .then(async (data) => {
    //     var contenData = await createContentData(data);
    //     resolve(contenData);
    // }).catch((error) => {
    //     console.log(error);
    // });
    console.log(url);
    checkIgnore(url).then((has) => {
      // console.log(has);
      if (has === false) {
        sleep(sum(1000, 3100));
        HttpGet(url)
          .then(async (data) => {
            var contenData = await createContentData(data);
            // 入库
            saveApks(contenData).then(async (title) => {
              await saveIgnore(url); //过滤url入库
              resolve({
                saveid: title
              });
            })
            // console.log(contenData);
          }).catch((error) => {
            console.log(error);
          });
      }
    });
  });
};

let createContentData = async(data) => {
  // const rooturl = 'https://m.anruan.com';
  var $ = cheerio.load(data);
  let $info = $('div.downl_wrap').find('div.info');
  const cover = $info.children('span.tx').children('img').attr('src');
  const title = $info.children('h1.bt').text();
  const updatetime = $info.children('div.txt').text();
  const intro = $info.children('div.txt2').text();
  let download = $info.children('div.btn').children('a').attr('href');

  let $info1 = $('div.bq_wrap');
  const size = $info1.children('ul').children('li').first().children('span').text();
  const classname = $info1.children('ul').children('li').eq(1).children('a').text();
  const version = $info1.children('ul').children('li').eq(2).children('span').text();
  const language = $info1.children('ul').children('li').last().children('span').text();
  // console.log(classname);
  const classid = await getClassId(classname);

  let $tags = $info1.children('div.bq_item').children('a');
  let tags = [];
  $tags.each((i, e) => {
    const tag = $(e).text();
    tags.push(tag);
  });

  // 内容页先入库，得到id构造图片数据
  let infoimg = [];
  const $infoimgs = $('div.img_item').children('ul').children('li');
  $infoimgs.each((i, e) => {
    const img = $(e).children('img').attr('src').replace(/[\n]/g, "");
    infoimg.push(img);
  });

  let text = $('div.txtwrap').children('div.txtcont').html();
  let intromore = await getIntorContent(text);

  // sleep(sum(500, 1200));
  // download = await APKGet(download);

  let json = {
    'title': title,
    'apk_count': 0,
    'class_id': classid
  };
  let more = {
    'intro': intro,
    'apk_size': size,
    'apk_version': version,
    'apk_language': language,
    'cover': cover,
    'download': download,
    'infoimg': infoimg,
    'intromore': intromore
  };
  // console.log(json);
  json['more'] = JSON.stringify(more);
  return({
    json: json,
    tags: tags
  });
};

module.exports = Scropy;