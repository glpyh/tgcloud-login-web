const config = {
    host: 'http://tgscloud.net',
    key_prefix: 'TGCLOUD_',
    secret_key: '^#rwd6Ffz$X5alRN',
    domain: '.tgcloud.net',
    secret: {
        key_str: '^#rwd6Ffz$X5alRN',
        iv_str: '^#rwd6Ffz$X5alRN'
    }
}

if (process.env.NODE_ENV === 'production') {
    config.domain = '.tgcloud.net';
} else {
    config.domain = '.tgcloud.net';
    config.lockr_prefix += 'DEV_';
}

export default config; 