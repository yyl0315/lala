<template>
  <div class="home">
    <div class="swipeimg">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in swiplist" :key="index">
          <a href="javascript:;">
            <img :src="item.img" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="class" :column-num="4">
      <van-grid>
        <van-grid-item v-for="item in classlist" :key="item.id" :text="item.classname" />
      </van-grid>
    </div>
    <div class="shop">
      <van-list v-model="loading" @load="onLoad">
        <ul>
          <li v-for="item in shoplist" :key="item.id" :title="item.shopname">
            <div class="shopdiv" slot="title">
              <img :src="item.img" />
              <p>{{item.shopname}}</p>
              <span style="color:red">￥{{item.price}}</span>
              <van-button type="danger" @click="joincart(item.id)" size="mini">加入购物车</van-button>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiplist: [],
      classlist: [],
      shoplist: [],
      loading: true
    };
  },
  created() {
    this.getswip();
    this.getcalss();
    this.getshop();
  },
  methods: {
    // 首页轮播
    getswip() {
      this.$http.get("/swipe").then(res => {
        // console.log(res.data.data);
        if (res.data.ok === 1) {
          this.swiplist = res.data.data;
        }
      });
    },
    // 首页分类
    getcalss() {
      this.$http.get("/class").then(res => {
        // console.log(res.data.data);
        if (res.data.ok === 1) {
          this.classlist = res.data.data;
        }
      });
    },
    // 首页商品
    getshop() {
      this.$http.get("/shop").then(res => {
        console.log(res.data.data);
        if (res.data.ok === 1) {
          this.shoplist = res.data.data;
        }
      });
    },
    //加入购物车
    joincart(id) {
      console.log(id);
      let ids = localStorage.getItem("ids");
      if (ids === null) {
        ids = [id];
      } else {
        ids = JSON.parse(ids);
        ids.push(id);
        ids = Array.from(new Set(ids));
      }
      localStorage.setItem("ids", JSON.stringify(ids));
      let strun = localStorage.getItem("strun");
      if (strun === null) {
        strun = [];
        strun[id] = {
          num: 1
        };
      } else {
        strun = JSON.parse(strun);
        if (strun[id] === null || strun[id] === undefined) {
          strun[id] = {
            num: 1
          };
        }else{
          strun[id].num++
        }
      }
      localStorage.setItem("strun", JSON.stringify(strun));
    },
    onLoad() {
      this.getshop();
      // this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  margin-bottom: 30px;
  .swipeimg {
    .van-swipe {
      width: 100%;
      height: 200px;
    }
    .van-swipe__track {
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 200px;
      }
    }
  }
  .shop {
    width: 100%;
    ul > li {
      display: inline-block;
    }
    .shopdiv {
      margin: 20px 0px 0px 30px;
      p {
        display: block;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
        width: 150px; /*需要配合宽度来使用*/
      }
    }
  }
}
</style>
