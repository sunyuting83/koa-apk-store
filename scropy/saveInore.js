const {
    iget,
    iput
} = require('../utils/ignoreDB');
const {makeMD5} = require('./utils');

var saveIgnore = async (url) => {
    let md = makeMD5(url, 12);
    return new Promise((resolve, reject) => {
        iput(md,url).then((ig) => {
            resolve(ig)
        }).catch((err) => {
            resolve(false)
        });
    });
};

var checkIgnore = async (url) => {
    let md = makeMD5(url, 12);
    return new Promise((resolve, reject) => {
        iget(md).then((ig) => {
            if(ig) {
                resolve(true)
            }else {
                resolve(false)
            }
        });
    });
};

module.exports = {
    saveIgnore,
    checkIgnore
};