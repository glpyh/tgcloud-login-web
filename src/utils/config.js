const config = {
  host: "http://passport.tgcloud.net",
  key_prefix: "TGCLOUD_",
  secret_key: "^#rwd6Ffz$X5alRN",
  domain: ".tgcloud.net",
  secret: {
    key_str: "^#rwd6Ffz$X5alRN",
    iv_str: "^#rwd6Ffz$X5alRN"
  }
};

if (process.env.NODE_ENV === "production") {
  config.domain = ".tgcloud.net";
} else {
  config.domain = ".tgcloud.net";
  config.lockr_prefix += "DEV_";
}

const enums = {
  USER: {
    LOGIN_NAME: "LOGIN_NAME",
    MENU_LIST: "MENU_LIST",
    REMEMBER_ME: "REMEMBER_ME",
    AUTH_TOKEN: "AUTH_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    REDIRECT_URI: "REDIRECT_URI"
  }
};

export { config, enums };
