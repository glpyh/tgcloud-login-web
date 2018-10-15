import Cookies from 'js-cookie'
import config from './config'

class tgCookie {
    constructor() {
        this.pcPrefix = config.key_prefix;
        this.secretKey = config.secret_key;
        this.domain = config.domain;
        this.expireTime = 7200;
    }

    set(cookie) {
        let { key, value, expires, path, success } = cookie;
        PcCookie.checkKey(key);
        key = this.pcPrefix + key;
        Cookies.set(key, value, { expires: expires || this.expireTime, path: path || '/', domain: this.domain });
        success && success();
    }

    get(key) {
        PcCookie.checkKey(key);
        return Cookies.get(this.pcPrefix + key);
    }

    remove(cookie) {
        let { key, path, success } = cookie;
        PcCookie.checkKey(key);
        Cookies.remove(this.pcPrefix + key, { path: path || '/', domain: this.domain });
        success && success();
    }

    geteAll() {
        return Cookies.get();
    }

    static checkKey(key) {
        if (!key) {
            throw new Error('给定的参数key无效');
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
        }
    }
}

export default new tgCookie();