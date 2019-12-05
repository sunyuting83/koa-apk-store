class RedisStore extends Store {
    constructor() {
        super();
        this.redis = newRedis();
    }
}

module.exports = RedisStore;
