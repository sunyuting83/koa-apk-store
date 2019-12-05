var level = require('level');
var ttl = require('level-ttl');
var path = require('path');
// db 是用户leveldb表
var db = level(path.join(__dirname, '../HotKeyDB'), {
    valueEncoding: "json"
});

let put = (k, v) => {
    return new Promise(function (resolve, reject) {
        db.put(k, v, function (err) {
            // if (err) resolve (false)
            resolve(true)
        });
    });
};

let puttl = (k, v, time) => {
    return new Promise(function (resolve, reject) {
        db.put(k, v, {
                    ttl: time
                },function (err) {
            // if (err) resolve (false)
            resolve(true)
        });
    });
}

let get = (k) => {
    return new Promise(function (resolve, reject) {
        db.get(k, function (err, value) {
            // if (err) console.log(err);
            resolve(value)
        });
    });
};

//删除
let del = (key) => {
    return new Promise(function (resolve, reject) {
        if (key) {
            db.del(key, (error) => {
                resolve(true)
            })
        } else {
            resolve('no key');
        }
    });
};

let find = (putoption) => {
    return new Promise(function (resolve, reject) {
        var option = {
            keys: true,
            values: true,
            revers: false,
            limit: 10
        };
        if (!putoption)
            return resolve('nothing', null);
        else {
            if (putoption.prefix) {
                option.start = putoption.prefix;
                option.end = putoption.prefix.substring(0, putoption.prefix.length - 1) +
                    String.fromCharCode(putoption.prefix[putoption.prefix.length - 1].charCodeAt() + 1);
            }

            if (putoption.limit)
                option.limit = putoption.limit;
            let datals = new Array();
            db.createReadStream(option).on('data', function (data) {
                // console.log(data);
                datals.push(data);
                
            }).on('error', function (err) {}).on('close', function () {}).on('end', function () {
                resolve(datals);
            });
        }
    });
};

module.exports = {
    put,
    get,
    del,
    find,
    puttl
};