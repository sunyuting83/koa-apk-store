const {
    get,
    put
} = require('./utils/levledb');
const {
    makeMD5
} = require('./utils/utils');

let password = makeMD5('kanghong'),
timestamp = (new Date()).getTime(),
key = 'user:sleepsun';

let u = {
    username: 'sleepsun',
    password: password,
    state: true,
    lastip: '127.0 .0 .1',
    lasttime: timestamp,
    login_size: 0,
    created_time: timestamp
}

// put(key, u);
get(key).then((d) => {
    console.log(d)
}).catch((err) => {
    
});