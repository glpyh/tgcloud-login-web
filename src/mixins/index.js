let mixin = {
  data() {
    return {};
  },
  methods: {
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    loadPage(routerName, param) {
      if (param) {
        this.$router.push({ name: routerName, query: param });
      } else {
        this.$router.push({ name: routerName });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.loadPage("Index");
    },
    successMsg(msg, showClose) {
      this.showMessage(msg, "success", showClose);
    },
    errorMsg(msg, showClose) {
      this.showMessage(msg, "error", showClose);
    },
    warnMsg(msg, showClose) {
      this.showMessage(msg, "warning", showClose);
    },
    showMessage(msg, type, showClose) {
      this.$message({
        showClose: showClose || false,
        message: msg,
        type: type
      });
    },
    confirmModel(message, url, param, callback) {
      this.ajaxBox({
        url: url,
        data: param || "",
        message: message,
        success: callback
      });
    },
    ajax(param) {
      let { type, url, data, success, isUnMusk } = param;
      if (!isUnMusk) {
        this.$nprogress.start();
      }
      this.$http({
        method: type || "POST",
        url: url || "",
        data: data || ""
      })
        .then(res => {
          this.$nprogress.done();
          if (success) {
            success(res);
          } else {
            this.goBack();
          }
        })
        .catch(error => {
          this.$nprogress.done();
          this.$loading = false;
          console.error(error);
        });
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate(value, type) {
      // 非空验证
      if (type === "require") {
        return !!value;
      }
      // 手机号验证
      if (type === "phone") {
        return /^1\d{10}$/.test(value);
      }
      // 邮箱格式验证
      if (type === "email") {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
      if (type === "pwd") {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
      }
    }
  }
};

export default mixin;
