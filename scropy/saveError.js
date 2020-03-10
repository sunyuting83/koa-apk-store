const ErrorUrl = require('../models/errorurl');

var saveErrorUrl = (url) => {
  return ErrorUrl.forge({
        'error_url': url
      }).save()
      .then((er) => {
        return(er.id);
      })
      .catch((error) => {
        console.log(error)
      });
};

module.exports = saveErrorUrl;