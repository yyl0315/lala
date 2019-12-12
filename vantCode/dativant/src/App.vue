<template>
  <div id="app">
    <van-tabbar v-model="active" :route=true>
      <van-tabbar-item icon="home-o" to='/'>答题</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" to='/rankinglist'>排行榜</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to='/me'>我</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
      let token = sessionStorage.getItem('token')
    if(token==null){
        this.$router.push('/login')
    }
  }
};
</script>