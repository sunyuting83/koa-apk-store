var Promise = require('bluebird');
const bookshelf = require('./base')();
const Classify = require('./classify');
var Classifyd = bookshelf.Collection.extend({
  model: Classify
});

var accounts = Classifyd.forge([{
    classname: '软件'
  },
  {
    classname: '游戏'
  }
]);


Promise.all(accounts.invokeMap('save')).then(function () {
  console.log('created');
  process.exit();
}).catch(function (e) {
  console.error(e);
  process.exit();
});