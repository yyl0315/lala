<template>
  <div class="dl">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group style="margin-top:100px">
      <van-field
        v-model="form.mobile"
        required
        clearable
        label="用户名"
        label-align="center"
        left-icon="manager"
        placeholder="请输入手机号"
        :error-message="this.error.mobile"
      />
      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入密码"
        required
        :error-message="this.error.password"
      />
      <van-field
        v-model="form.firmpassword"
        type="password"
        label="确认密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入密码"
        required
        :error-message="this.error.firmpassword"
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
      form: {
        mobile: "",
        password: "",
        firmpassword: ""
      },
      error: {
        mobile: "",
        password: "",
        firmpassword: ""
      }
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
      let mobilere = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (!mobilere.test(this.form.mobile)) {
        this.error.mobile = "手机号输入不正确";
        return false;
      }

      let passwordre = /^[0-9a-zA-Z_]{6,18}$/;
      if (!passwordre.test(this.form.password)) {
        this.error.password = "密码格式不正确：必须6--18位";
        return false;
      }
      if (this.form.password !== this.form.firmpassword) {
        this.error.firmpassword = "两次密码输入不正确";
        return false;
      }
      let formData = new URLSearchParams();
      formData.append("mobile", this.form.mobile);
      formData.append("password", this.form.password);
      this.$http.post("/register", formData).then(res => {
        console.log(res)
        if (res.data.ok === 1) {
          this.$toast("注册成功");
          this.$router.push("/login");
        } else {
          this.$toast("注册失败");
        }
      });
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