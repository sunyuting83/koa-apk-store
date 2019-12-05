const {
    getIndex,
    getSoft,
    getGame
} = require('../utils/api/index');
var fn_index = async (ctx, next) => {
    ctx.response.body = await getIndex();
    await next();
};

var fn_soft = async (ctx, next) => {
    ctx.response.body = await getSoft();
    await next();
};

var fn_game = async (ctx, next) => {
    ctx.response.body = await getGame();
    await next();
};

var fn_ad = async (ctx, next) => {
    let width = ctx.request.query.width;
    let xxx = '';
    if ( width > 720) {
        xxx = `ad1080.jpg`
    } else if (width > 480) {
        xxx = `ad720.jpg`
    }else if (width > 320){
         xxx = `ad480.jpg`}else if (width <= 320){ xxx = `ad320.jpg`};
    let adimg = 'http://192.168.1.105:3000/img/' + xxx;
    ctx.response.body = {
        url: adimg
    };
    await next();
};

module.exports = {
    'GET /api/index': fn_index,
    'GET /api/soft': fn_soft,
    'GET /api/game': fn_game,
    'GET /api/ad': fn_ad
};