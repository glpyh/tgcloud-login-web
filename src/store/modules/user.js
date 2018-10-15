//import tgCookie from "@/utils/auth";

const user = {
  state: {
    loginName: "",
    redirectUri: "",
    authToken: {
      access_token: "",
      expires_in: "",
      timestamp: ""
    },
    refreshToken: {
      refresh_token: ""
    }
  },
  mutations: {},
  actions: {}
};

export default user;
