<template>
  <div>
    <van-nav-bar
      :title="this.$route.query.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active" animated>
      <van-tab :title="'全部题('+length+')'"></van-tab>
      <van-tab :title="'已做题('+yizoption+')'"></van-tab>
      <van-tab :title="'未做题('+prams+')'"></van-tab>
      <van-tab :title="'做错题('+danger+')'"></van-tab>
      <van-tab :title="'做对题('+duioption+')'"></van-tab>
    </van-tabs>
    <van-button v-if="options.length == 0" class="btndt" type="primary" @click="getitem()">开始答题</van-button>
    <div v-else>
      <dl>
        <dt>题目：{{options[page].title}}</dt>
        <dd v-for="(item,index) in options[page].option" :key="index" selectid="item.id">
          <van-radio-group v-model="valid">
            <van-radio :name="index">{{abcd[index]}}.{{item}}</van-radio>
          </van-radio-group>
          <!-- <label>
                <input type="radio" :name="index" v-model="quest[page]" />
                {{item}}
          </label>-->
        </dd>
        <van-button type="primary" @click="next()">提交</van-button>&nbsp;
        <van-button type="primary" @click="daan = !daan">查看正确答案</van-button>
        <p v-if="daan">正确答案为：{{abcd[options[page].right]}}</p>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      abcd: ["A", "B", "C", "D"],
      duioption: "0", //对的题
      length:10,
      valid: 0,
      yizoption: "0", //已做的题
      danger: "0", //错的题
      prams: "10", //未做的题
      options: [], //题目
      opt: [],
      quest: [], //选择的题
      integer: 0,
      page: 0,
      selectid: "",
      daan: false
    };
  },
  created() {},
  methods: {
    init() {
      this.page = 0;
      this.quest = [];
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    next() {
      // console.log(index);
      if (this.page == this.options.length) {
        return alert("您的题以答完");
      }
      if (this.valid === "") {
        return this.$toast.fail("请选择答案");
      } else {
        this.page++;
        this.yizoption++;
        this.prams--;
        this.length-- 
        if (this.valid === this.options[this.page].right) {
          this.integer++;
          sessionStorage.setItem("integer", this.integer);
          this.$toast.success("回答正确");
          this.duioption++;
          this.valid = "";
        } else {
          this.$toast.fail("回答错误");
          this.valid = "";
          this.danger++;
        }
      }
    },
    getitem(id) {
      // console.log(id)
      let token = sessionStorage.getItem("token");
      if (token !== undefined) {
        let id = this.$route.params.id;
        this.$http.get(`/categories/${id}/question`).then(res => {
          if (res.data.ok === 1) {
            console.log(res.data);
            this.options = res.data.data;
          }
        });
        this.init();
      } else {
        this.$router.push("login");
      }
    }
  }
};
</script>
<style scoped lang="less">
.btndt {
  margin: 20px;
}
</style>
