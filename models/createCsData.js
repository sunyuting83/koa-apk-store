var Promise = require('bluebird');
const bookshelf = require('./base')();
const Classify = require('./classify');
var Classifyd = bookshelf.Collection.extend({
    model: Classify
});

var accounts = Classifyd.forge([
    {
        classname: '系统',
        top_id: 1
    },
    {
        classname: '影音',
        top_id: 1
    },
    {
        classname: '美化',
        top_id: 1
    },
    {
        classname: '交友',
        top_id: 1
    },
    {
        classname: '生活',
        top_id: 1
    },
    {
        classname: '拍摄',
        top_id: 1
    },
    {
        classname: '阅读',
        top_id: 1
    },
    {
        classname: '网络',
        top_id: 1
    },
    {
        classname: '学习',
        top_id: 1
    },
    {
        classname: '通信',
        top_id: 1
    },
    {
        classname: '交通',
        top_id: 1
    },
    {
        classname: '办公',
        top_id: 1
    },
    {
        classname: '安全',
        top_id: 1
    },
    {
        classname: '图像',
        top_id: 1
    },
    {
        classname: '理财',
        top_id: 1
    },
    {
        classname: '健康',
        top_id: 1
    },
    {
        classname: '游戏',
        top_id: 1
    },
    {
        classname: '角色',
        top_id: 2
    },
    {
        classname: '益智',
        top_id: 2
    },
    {
        classname: '棋牌',
        top_id: 2
    },
    {
        classname: '动作',
        top_id: 2
    },
    {
        classname: '冒险',
        top_id: 2
    },
    {
        classname: '射击',
        top_id: 2
    },
    {
        classname: '塔防',
        top_id: 2
    },
    {
        classname: '赛车',
        top_id: 2
    },
    {
        classname: '体育',
        top_id: 2
    },
    {
        classname: '卡牌',
        top_id: 2
    },
    {
        classname: '经营',
        top_id: 2
    },
    {
        classname: '养成',
        top_id: 2
    },
    {
        classname: '音乐',
        top_id: 2
    },
    {
        classname: '儿童',
        top_id: 2
    },
    {
        classname: '其他',
        top_id: 2
    }
]);


Promise.all(accounts.invokeMap('save')).then(function () {
    console.log('created');
    process.exit();
}).catch(function (e) {
    console.error(e);
    process.exit();
});