const ErrorUrl = require('../models/errorurl');

var saveErrorUrl = async (url) => {
    return new Promise((resolve, reject) => {
        ErrorUrl.forge({
                'error_url': url
            }).save()
            .then((er) => {
                resolve(er.id);
            })
            .catch((error) => {
                console.log(error)
            });
    });
};

module.exports = saveErrorUrl;