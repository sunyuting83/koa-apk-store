const Apks = require('../models/apks');

var saveApks = (data) => {
  const jsons = data.json,
        tags = data.tags;
  return Apks.forge(jsons).save()
    .then(async (apk) => {
      for (const tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          const t = tags[tag];
          var tsave = await apk.addTags(t);
        }
      };
      return apk;
    })
    .then((apk) => {
      return(apk.title);
    })
    .catch((error) => {
      console.log(error)
    });
};

module.exports = saveApks;