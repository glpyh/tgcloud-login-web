import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import mixin from "./mixins";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import nprogress from "nprogress";
import "nprogress/nprogress.css";

import VueLazyload from "vue-lazyload";

import request from "./utils/request";

import i18n from "./lang"; // Internationalization

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

Vue.use(Element, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

Vue.prototype.$nprogress = nprogress;
Vue.prototype.$http = request;

router.beforeEach((to, from, next) => {
  store.dispatch("get_access_token", res => {
    if (res) {
      window.location.href = store.getters.getRedirectUri;
    } else {
      nprogress.start();
      next();
    }
  });
});
router.afterEach(() => {
  nprogress.done();
});

Vue.config.productionTip = false;

Vue.mixin(mixin);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "./assets/images/loading-svg/loading-bars.svg",
  loading: "./assets/images/loading-svg/loading-spinning-bubbles.svg",
  attempt: 2
});

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
