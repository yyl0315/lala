<template>
  <div class="dl">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
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
      <van-field
        v-model="firmpassword"
        type="password"
        label="确认密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button class="register_btn" type="danger" @click="register">注册</van-button>
    <van-button class="register_btn login_btn" type="warning" @click="login">已有账号？点击登录</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      firmpassword: ""
    };
  },
  created() {
    // this.$http.get("/users/register").then(res => {
    //   sessionStorage.setItem('token',res.data.token)
    // });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    register() {
      if (
        this.username === "" &&
        this.password === "" &&
        this.firmpassword === ""
      ) {
        return alert("用户名或密码不能为空");
      } else {
        if (this.password !== this.firmpassword) {
          return alert("密码和确认密码不一致");
        }
        sessionStorage.setItem("users", this.username);
        sessionStorage.setItem("pass", this.password);
        this.$notify({ type: "success", message: "注册成功，请登录" });
        this.$router.push("/login");
      }
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.register_btn {
  width: 70%;
  margin: 50px;
}
.login_btn {
  margin-top: 10px;
}
</style>