const HttpGet = require('./httpUtils');
const cheerio = require('cheerio');

let getList = (type) => {
  return new Promise((resolve, reject) => {
    var firstUrl = 'https://m.anruan.com/slist_new_index_1.html';
    if (type === 'game') {
      firstUrl = 'https://m.anruan.com/glist_new_index_1.html';
    } else {
      firstUrl = 'https://m.anruan.com/slist_new_index_1.html';
    };
    // console.log(firstUrl);
    HttpGet(firstUrl)
      .then(async (listdata) => {
        let listTotal = await createList(listdata);
        resolve(listTotal);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

let createList = (data) => {
  return new Promise((resolve, reject) => {
    var $ = cheerio.load(data);
    let $page = $('.page').children('a');
    let lasturl = '';
    $page.each((i, e) => {
      const name = $(e).text();
      if (name === '尾页') {
        lasturl = $(e).attr('href');
      }
    });
    // 获取总页数
    lasturl = lasturl.split('.')[0];
    lasturl = lasturl.split('_');
    lastlen = lasturl.length;
    resolve(lasturl[lastlen - 1]);
  });
};

module.exports = getList;