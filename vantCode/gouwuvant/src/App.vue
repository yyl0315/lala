<template>
  <div id="app">
    <van-tabbar v-model="active" :route="true">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/Shopcart" :info="gwc">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/me">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
      gwc:this.jrgwc
    };
  },
  created(){
    console.log(this.jrgwc)
  },
  computed: {
    ...mapState(["jrgwc"])
  },
  methods: {}
};
</script>
<style lang="less">
#app {
  padding-bottom: "100px";
}
</style>
