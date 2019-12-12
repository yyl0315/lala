<template>
  <div class="dl">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group style="margin-top:100px">
      <van-field
        v-model="from.mobile"
        required
        clearable
        label="手机号"
        label-align="center"
        left-icon="manager"
        placeholder="请输入手机号"
        :error-message="this.error.mobile"
      />

      <van-field
        v-model="from.password"
        type="password"
        label="密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入密码"
        required
        :error-message="this.error.password"
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
      from: {
        mobile: "",
        password: ""
      },
      error: {
        mobile: "",
        password: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    login() {
      let mobilere = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (!mobilere.test(this.from.mobile)) {
        this.error.mobile = "手机号输入不正确";
        return false;
      }

      let passwordre = /^[0-9a-zA-Z_]{6,18}$/;
      if (!passwordre.test(this.from.password)) {
        this.error.password = "密码格式不正确：必须6--18位";
        return false;
      }
      let data = new URLSearchParams()
      data.append('mobile',this.from.mobile)
      data.append('password',this.from.password)
      //   data = JSON.parse(data)
      this.$http.post("/login", data).then(res => {
        // console.log(res);
        if(res.data.ok ===1){
          localStorage.setItem('token',res.data.data.token)
          this.$router.push('/')
        }else{
          this.$toast(res.data.error)
        }
      });
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