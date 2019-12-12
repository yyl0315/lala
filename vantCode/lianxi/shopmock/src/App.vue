<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <van-tabbar v-model="active" :route='true'>
        <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
        <van-tabbar-item icon="logistics" to='/cart'>购物车</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:''
    }
  }
}
</script>
<style lang="less">
</style>
