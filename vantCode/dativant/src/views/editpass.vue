<template>
  <div class="dl">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group style="margin-top:100px">
      <van-field
        v-model="pass"
        required
        clearable
        label="原密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入原密码"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="password"
        type="password"
        label="新密码"
        label-align="center"
        left-icon="lock"
        placeholder="请输入新密码"
        required
      />
      <van-field
        v-model="firmpassword"
        type="password"
        label="新密码确保"
        label-align="center"
        left-icon="lock"
        placeholder="请再次输入新密码"
        required
      />
    </van-cell-group>
    <van-button class="register_btn" type="danger" @click="editpass">提交</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pass: "",
      password: "",
      firmpassword: ""
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    editpass() {
      if (
        this.pass === "" &&
        this.password === "" &&
        this.firmpassword === ""
      ) {
        return alert("密码不能为空");
      } else {
        let pass = sessionStorage.getItem("pass");
        if (this.pass !== pass||this.pass ==='') {
          return alert("原密码输入错误");
        } else {
          if (this.password !== this.firmpassword) {
            return alert("密码和确认密码不一致");
          } else {
            sessionStorage.setItem("pass", this.password);
            sessionStorage.removeItem('token');
            this.$notify({ type: "success", message: "修改密码成功，请登录" });
            this.$router.push("/login");
          }
        }
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