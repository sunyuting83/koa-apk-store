const {
    getTopic,
    getRank,
    getTopImg
} = require('./utils');
const {
    put,
    get
} = require('../apkcache');

let getIndex = async () => {
    let cache = await get('index');
    if (cache === undefined) {
        let json = {
            'swiper': [],
            'must': [],
            'topic': [],
            'rank': []
        };
        json.swiper = await getTopic(3);
        json.must = await getTopic(4);
        json.topic = await getTopic(0, 0);
        json.rank = await getRank(5);
        put('index',json);
        return json;
    }else {
        return cache
    }
};

let getSoft = async () => {
    let cache = await get('soft');
    if (cache === undefined) {
        let json = {
            'ad': [],
            'choice': [],
            'topic': [],
            'rank': []
        };
        json.ad = await getTopImg(8);
        json.choice = await getTopic(9);
        json.topic = await getTopic(1, 0);
        json.rank = await getRank(6);
        put('soft', json);
        return json;
    }else{
        return cache
    }
};

let getGame = async () => {
    let cache = await get('game');
    if (cache === undefined) {
        let json = {
            'ad': [],
            'choice': [],
            'topic': [],
            'rank': []
        };
        json.ad = await getTopImg(10);
        json.choice = await getTopic(11);
        json.topic = await getTopic(2, 0);
        json.rank = await getRank(7);
        put('game',json);
        return json;
    }else{
        return cache;
    }
};


module.exports = {
    getIndex,
    getSoft,
    getGame
};