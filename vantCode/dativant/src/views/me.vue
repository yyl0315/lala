<template>
  <div>
    <div class="uploadtop">
      <van-uploader :after-read="afterRead" accept="image/*" multiple>
        <van-icon class="imgup" name="warning-o" />
        <img class="image" :src="upimg" ref="imageup" />
      </van-uploader>
      <span class="user">{{this.username}}</span>
      <span class="integer">
        <van-icon name="gem-o" />{{integer}}
      </span>
      <van-button class="butt" type="primary" @click="editpass">修改密码</van-button>
    </div>
    <div>
      <van-grid :column-num="3">
        <van-grid-item v-for="item in categories" :key="item.id">
            <ul>
              <li>
                {{item.cat_name}}
                <p>(正确率：{{integer/item.right_rate*1000}}%)</p>
              </li>
            </ul>
        </van-grid-item>
      </van-grid>
    </div>
    <van-button class="login_btn" type="danger" @click="logout">退出</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      upimg: "",
      categories: [],
      integer:0
    };
  },
  created() {
    let token = sessionStorage.getItem("token");
    this.integer = sessionStorage.getItem('integer')
    if (token == null) {
      this.$router.push("/login");
    }
    let data = sessionStorage.getItem("users");
    this.username = data;
    this.$http.get("/users/face").then(res => {
      console.log(res.data.data);
    });
    this.$http.get("/categories").then(res => {
      this.categories = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    afterRead(file) {
      console.log(file);
      this.upimg = file.content;
    },
    editpass() {
      this.$router.push("/editpass");
    },
    logout(){
      sessionStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/me.css";
.uploadtop {
  padding: 25px;
  background: #00659f;
}
.user {
  left: 160px;
  margin: 0 auto;
  position: absolute;
  color: white;
  font-size: 20px;
  top: 30px;
}
.integer {
  left: 162px;
  margin: 0 auto;
  position: absolute;
  color: white;
  font-size: 12px;
  top: 55px;
}
.butt {
  min-width: 60px;
  height: 30px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 28px;
  float: right;
  position: relative;
  top: 20px;
}
.imgup {
  top: 25px;
  left: 25px;
  color: #969799;
  position: absolute;
}
.image {
  width: 65px;
  height: 65px;
  position: absolute;
}
.van-uploader {
  width: 65px;
  height: 65px;
}
.van-uploader__input-wrapper {
  width: 65px;
  height: 65px;
}
.van-uploader__preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
}
.van-grid-item{
  flex-basis:none;
  text-align: center;
  p{
    color: red;
    font-size: 12px;
  }
}
.login_btn {
  width: 70%;
  margin: 50px;
}
</style>