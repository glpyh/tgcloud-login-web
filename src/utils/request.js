import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 1000 * 60 * 5 // request timeout 5分钟
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (window.location.href.indexOf("redirectUrl") > -1) {
      let redirectURL = window.location.href.substring(
        window.location.href.indexOf("redirectUrl") + "redirectUrl".length + 1
      );
      if (redirectURL) store.dispatch("update_redirect_uri", redirectURL);
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  res => {
    if (res.data.code === 200) {
      if (res.data) {
        return res.data;
      }
    }
    if (
      res.data.code === 10011039 ||
      res.data.code === 10011040 ||
      res.data.code === 10011041
    ) {
      console.info("登录超时", res.data);
      return Promise.reject(res);
    } else {
      Message({
        message: res.data.message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(res);
    }
  },
  error => {
    let message = error.message;
    if (error.response.status && error.response.status === 404) {
      message = "请求资源离家出走了,等一会就回来";
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      message = error.response.data.message;
    }
    console.log("err" + error); // for debug
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
