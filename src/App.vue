<template>
  <div id="app">
    <div class="auth-contanier">
      <Header></Header>
      <div class="main">
        <div class="main-big w">
          <router-view></router-view>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Header from "@/views/layout/header/index.vue";
import Footer from "@/views/layout/footer/index.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./assets/styles/index.scss";
.w {
  width: 100%;
  margin: 0 auto;
}
.auth-contanier {
  background-color: #f8f8f8;
  position: relative;
  min-height: 670px;
  height: 100%;
}
.main {
  height: 100%;
  padding: 116px 0;
}
.main-big {
  width: 1000px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
