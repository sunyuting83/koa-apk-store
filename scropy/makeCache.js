const HttpGet = require('./httpUtils');
var sleep = require('system-sleep');
let start = () => {
  let ulist = makeID();
  // console.log(ulist);
  makeCache(ulist)

};

let makeID = () => {
  ulist = [];
  for (let i = 88135; i <= 89265; i++) {
    let url = `https://apk.kindlesend.com/api/getapk?id=${i}`;
    ulist.push(url);
  }
  return ulist;
};

let makeCache = (list) => {
  list.forEach(i => {
    sleep(200);
    HttpGet(i).then((data) => {
        console.log(`${data.id} is done`)
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

start()