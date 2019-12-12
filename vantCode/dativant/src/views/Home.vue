<template>
  <div>
    <van-nav-bar title="选择题目分类" />
    <van-grid>
      <van-grid-item
        @click="htmltk(item)"
        v-for="item in categories"
        :key="item.id"
        :text="item.cat_name"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.$http.get("/categories").then(res => {
      console.log(res);
      this.categories = res.data.data;
    });
  },
  methods: {
    htmltk(item) {
      // console.log(item.id);
      // console.log(item.cat_name)
      let id = item.id
      let name = item.cat_name
      
      let token = sessionStorage.getItem("token");
      if (token === null) {
        this.$router.push("/login");
      }else{
        this.$router.push({path:`/htmlitem/${id}/item`,params:{id:id,},query:{name:name}})
      }
    }
  }
};
</script>