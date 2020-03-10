// var schedule = require('node-schedule');
const getList = require('./createList');
const Scropy = require('./scropy');

let scropy = async () => {
  
    // 爬取第一页，制造总页数
    // getList(listtype).then(async (list) => {
    //     // 爬取列表页，获取内容页url
    //     const contentUrl = await Scropy(list, listtype);
    //     resolve(contentUrl);
    // });

    // 日常采集直接从列表前3页开始
  await Scropy();
};
scropy();
// scropy().then((data) => {
//     console.log('采集完成');
//     process.exit();
// }).catch((err) => {
//     console.log(err.message);
//     // process.exit();
// });

// 加入定时任务 每天4点30开始采集
// let scheduleCronstyle = () => {
//   console.log('start');
//   schedule.scheduleJob('30 10 4 * * *', function () {
//     scropy().then((data) => {
//       console.log('采集完成');
//       process.exit();
//     }).catch((err) => {
//       console.log(err.message);
//       // process.exit();
//     });
//   });
// };

// module.exports = scheduleCronstyle;

// console.log(arguments);
// scheduleCronstyle();