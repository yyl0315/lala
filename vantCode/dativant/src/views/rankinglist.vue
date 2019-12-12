<template>
  <div>
    <van-tabs @change="getitem" animated>
      <van-tab title="全部" name="0">
        <table class="tab">
          <thead>
            <tr>
              <td style="width:20%">排名</td>
              <td style="width:30%">姓名</td>
              <td style="width:40%">积分</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1,index) in catedata" :key="item1.id">
              <td>{{index+1}}</td>
              <td>{{item1.title}}</td>
              <td>{{item1.integer}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
      <van-tab v-for="item in cate" :key="item.id" :title="item.cat_name" :name="item.id">
        <table class="tab">
          <thead>
            <tr>
              <td style="width:20%">排名</td>
              <td style="width:30%">姓名</td>
              <td style="width:40%">积分</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1,index) in catedata" :key="item1.id">
              <td>{{index+1}}</td>
              <td>{{item1.title}}</td>
              <td>{{item1.integer}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cate: [],
      catedata: []
    };
  },
  created() {
    let token = sessionStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    } else {
      this.$http.get("/categories").then(res => {
        // console.log(res.data.data.data)
        this.cate = res.data.data;
        // this.catedata = res.data.data.data
        // console.log(this.cate);
      });
    }
  },
  methods: {
    getitem(id) {
      this.$http.get(`/categories/${id}`).then(res => {
        if (res.data.ok === 1) {
          this.catedata = res.data.data;
          console.log(res);
          this.catedata.sort((a, b) => {
            return b.integer - a.integer;
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  height: 100%;
  text-align: center;
  thead {
    background: #eee;
  }
}
</style>