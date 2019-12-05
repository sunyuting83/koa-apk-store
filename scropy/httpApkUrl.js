const superagent = require('superagent');

let APKGet = async (url) => {
    return new Promise((resolve, reject) => {
        if (url !== NaN) {
            superagent.get(url)
                .set({
                    "User-Agent": "Mozilla/5.0 (Linux; Android 4.0.3; U9200 Build/HuaweiU9200)",
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                })
                .then((res) => {
                    // console.log(res.request.url);
                    resolve(res.request.url)
                })
                .catch((e) => {
                    // console.log(e)
                    // const error = await saveError(geturl, sort, id);
                    // reject(error);
                    // saveErrorUrl(url).then((err) => {
                    //     reject(err)
                    // });
                });
        }
    });
};

module.exports = APKGet;