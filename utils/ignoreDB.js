var level = require('level');
var path = require('path');

// lg 是ignore leveldb表
var lg = level(path.join(__dirname, '../IgnoreDB'), {
    valueEncoding: "json"
});

let iput = (k, v) => {
    return new Promise(function (resolve, reject) {
        lg.put(k, v, function (err) {
            // if (err) resolve (false)
            resolve(true)
        });
    });
};

let iget = (k) => {
    return new Promise(function (resolve, reject) {
        lg.get(k, function (err, value) {
            // if (err) console.log(err);
            resolve(value)
        });
    });
};

module.exports = {
    iput,
    iget
};