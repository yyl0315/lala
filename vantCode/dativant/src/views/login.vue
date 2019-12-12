<template>
  <div class="dl">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group style="margin-top:100px">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        label-align="center"
        left-icon="manager"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button class="login_btn" type="danger" @click="login">登录</van-button>
    <van-button class="login_btn zhuce_btn" type="warning" @click="register">没有账号？点击注册</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  // created() {
  //   this.$http.get("/users/access_token").then(res => {
  //     sessionStorage.setItem("token", res.data.token);
  //   });
  // },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    login() {
      let data = sessionStorage.getItem("users");
      let pass = sessionStorage.getItem("pass");
      if (this.username === data && this.password === pass) {
        this.$http.get("/users/access_token").then(res => {
          sessionStorage.setItem("token", res.data.token);
        });
        alert("登录成功！");
        this.$router.push("/");
        location.reload();
      } else {
        if (this.username == "" && this.password == "") {
          return alert("用户名或密码不能为空");
        }
        alert("登录失败！");
        this.$router.push("/register");
      }
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
<style lang="less" scoped>
.login_btn {
  width: 70%;
  margin: 50px;
}
.zhuce_btn {
  margin-top: 10px;
}
</style>