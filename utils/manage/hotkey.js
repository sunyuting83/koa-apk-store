const {
    get,
    put,
    del,
    pull,
    find
} = require('../hotkeyDB');
const {
    makeMD5
} = require('../utils');

let getKeyList = () => {
    return new Promise(async (resolve, reject) => {
        let json = {
            game: [],
            soft: []
        },
            gparms = {prefix:'game'},
            sparms = {prefix:'soft'};

        json.game = await HotKeyList(gparms);
        json.game = makeJson(json.game);
        json.soft = await HotKeyList(sparms);
        json.soft = makeJson(json.soft);
        resolve(json);
    });
};

let makeJson = (json) => {
    let x = [];
    for (const i in json) {
        if (json.hasOwnProperty(i)) {
            let j = json[i];
            x.push(j.value.keyname);
        }
    };
    return x;
};

let HotKeyList = (parms) => {
    return new Promise(async(resolve, reject) => {
        /**
        * 返回代码：
        * @1 登录成功
        * @2 密码错误
        * @3 用户不存在
        */
        if (parms == undefined) parms = {};
        find(parms).then((ad) => {
            resolve(ad)
        }).catch((err) => {
            console.log(err)
        });
    });
};


let addHotKey = (k, cid) => {

    let parms = '';
    if (cid == 1) {
        parms = `soft:${k}`
    }else {
        parms = `game:${k}`
    };
    let data = {
        'keyname': k,
        'classid': cid
    };
    get(parms).then((d) => {
        if (d == undefined)
            put(parms, data)
    }).catch((err) => {
        
    });
};


let delHotKey = (key, cid) => {
    let data;
    if (cid == 1) {
        data = `soft:${key}`
    }else {
        data = `game:${key}`
    };
    return new Promise(async (resolve, reject) => {
        let delu = await del(data);
        resolve(delu);
    });
};

module.exports = {
    getKeyList,
    HotKeyList,
    addHotKey,
    delHotKey
};