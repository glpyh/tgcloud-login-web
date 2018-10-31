import { refreshToken } from "@/api/refresh";
import tgCookie from "@/utils/cookie";
import { enums } from "@/utils/config";

const user = {
  state: {
    loginName: "",
    redirectUri: "",
    rememberMe: false,
    authToken: {
      access_token: "",
      expires_in: "",
      timestamp: ""
    },
    refreshToken: {
      refresh_token: ""
    }
  },
  getters: {
    getRememberMe: state => {
      const rememberMe = tgCookie.get(enums.USER.REMEMBER_ME);
      state.rememberMe =
        rememberMe == null || rememberMe === "false" ? false : true;
      return state.rememberMe;
    },
    getLoginName: state => {
      state.loginName = tgCookie.get(enums.USER.LOGIN_NAME);
      return state.loginName;
    },
    getRefreshToken: state => {
      if (!state.refreshToken) {
        state.refreshToken = tgCookie.get(enums.USER.REFRESH_TOKEN)
          ? JSON.parse(tgCookie.get(enums.USER.REFRESH_TOKEN))
          : {};
      }
      return state.refreshToken.refresh_token;
    },
    getAccessToken: state => {
      if (!state.authToken) {
        state.authToken = tgCookie.get(enums.USER.AUTH_TOKEN)
          ? JSON.parse(tgCookie.get(enums.USER.AUTH_TOKEN))
          : {};
      }
      return state.authToken.access_token;
    },
    getAuthToken: state => {
      if (!state.authToken || state.authToken.access_token === "") {
        state.authToken = tgCookie.get(enums.USER.AUTH_TOKEN)
          ? JSON.parse(tgCookie.get(enums.USER.AUTH_TOKEN))
          : {};
      }
      return state.authToken;
    },
    getRedirectUri: state => {
      if (!state.redirectUri) {
        state.redirectUri = tgCookie.get(enums.USER.REDIRECT_URI)
          ? decodeURI(tgCookie.get(enums.USER.REDIRECT_URI))
          : process.env.VUE_APP_Web;
      }
      return state.redirectUri;
    }
  },
  mutations: {
    updateRememberMe(state) {
      const rememberMe = tgCookie.get(enums.USER.REMEMBER_ME);
      state.rememberMe = !(rememberMe == null || rememberMe === "false"
        ? false
        : true);
      console.info("state.rememberMe", state.rememberMe);
      tgCookie.set({
        key: enums.USER.REMEMBER_ME,
        value: state.rememberMe
      });
    },
    updateUserInfo(state, loginName) {
      state.loginName = loginName;
      tgCookie.set({
        key: enums.USER.LOGIN_NAME,
        value: loginName
      });
    },
    updateAuthToken(state, authToken) {
      state.authToken = authToken;
      // https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day
      let expires = 2 / 24;
      let isRemember = !!tgCookie.get(enums.USER.REMEMBER_ME);
      if (isRemember) {
        expires = 7;
      }
      // debugger;
      delete authToken["jti"];
      delete authToken["token_type"];
      let refreshToken = {};
      Object.assign(refreshToken, authToken);
      // delete authToken['scope'];
      delete authToken["refresh_token"];
      delete refreshToken["access_token"];
      state.refreshToken = refreshToken;
      console.info("token:", authToken);
      tgCookie.set({
        key: enums.USER.AUTH_TOKEN,
        value: authToken,
        expires: expires
      });
      tgCookie.set({
        key: enums.USER.REFRESH_TOKEN,
        value: refreshToken,
        expires: expires
      });
    },
    deleteUserInfo(state) {
      tgCookie.delete({
        key: enums.USER.LOGIN_NAME
      });
      state.loginName = "";
      tgCookie.delete({
        key: enums.USER.REMEMBER_ME
      });
      state.rememberMe = false;
    },
    deleteUserMenuToken(state) {
      state.menuList = [];
      tgCookie.delete({
        key: enums.USER.MENU_LIST
      });
    },
    deleteAuthToken(state) {
      state.authToken = {};
      tgCookie.delete({
        key: enums.USER.AUTH_TOKEN
      });
    },
    updateRedirectUri(state, redirectUri) {
      state.redirectUri = redirectUri;
      tgCookie.set({
        key: enums.USER.REDIRECT_URI,
        value: redirectUri
      });
    }
  },
  actions: {
    get_access_token({ commit, state }, cb) {
      if (!state.authToken || state.authToken.access_token === "") {
        state.authToken = tgCookie.get(enums.USER.AUTH_TOKEN)
          ? JSON.parse(tgCookie.get(enums.USER.AUTH_TOKEN))
          : {};
      }
      console.info("refresh_token:", state.authToken.refresh_token);
      if (state.authToken.access_token) {
        // 判断是否需要续租
        if (
          new Date().getTime() - state.authToken.timestamp >
          100 * 60 * 1000
        ) {
          refreshToken().then(res => {
            console.info("res:", res);
            if (res.data.code === 200) {
              commit("updateAuthToken", res.data.result);
            } else {
              //commit("deleteUserInfo");
              commit("deleteAuthToken");
              commit("deleteRememberMe");
              jumpLoginPage();
            }
          });
        }
      }
      cb && cb(state.authToken.access_token);
    },
    update_remember_me({ commit }) {
      commit("updateRememberMe");
    },
    update_user_info({ commit }, loginName) {
      commit("updateUserInfo", loginName);
    },
    update_user_menu({ commit }, menuList) {
      commit("updateUserMenu", menuList);
    },
    delete_user_info({ commit }, loginName) {
      commit("deleteUserInfo", loginName);
      commit("deleteAuthToken");
      commit("deleteUserMenuToken");
      commit("deleteRememberMe");
    },
    update_auth_token({ commit }, authToken) {
      commit("updateAuthToken", authToken);
    },
    update_redirect_uri({ commit }, redirectUri) {
      commit("updateRedirectUri", redirectUri);
    }
  }
};

function jumpLoginPage() {
  window.location.href = process.env.VUE_APP_PASSPORT_URL;
}

export default user;
