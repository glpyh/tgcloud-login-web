<template>
  <div>
    {{message}}
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      message: "正在尝试激活用户，请稍候...",
      activeToken: ""
    };
  },
  created() {
    this.activeToken = this.$route.query.activeToken;
    console.info(this.activeToken);
    if (!this.activeToken) {
      this.errorMsg("激活请求链接异常,无法激活");
      this.message = "激活请求链接异常,无法激活";
      return;
    }
    this.activeUserFn(this.activeToken);
  },
  methods: {
    activeUserFn(activeToken) {
      let that = this;
      this.ajax({
        url: `/uac/auth/activeUser/${activeToken}`,
        success: res => {
          if (res.status === 200) {
            that.message = "激活用户成功, 请重新登录";
            this.successMsg(that.message, true);
          }
          that.loadPage("Login");
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
