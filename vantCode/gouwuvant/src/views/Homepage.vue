<template>
  <div class="commodity">
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <a :href="item.link">
          <img class="swipeimg" :src="item.image" />
        </a>
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item v-for="(item,index) in classification" :key="index" :text="item.title" />
    </van-grid>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul>
        <li v-for="(item,index) in imageList" :key="index">
          <!-- <van-cell default v-for="(item,index) in imageList" :key="index"> -->
          <img class="goodsimg" :src="item.image" />
          <p>{{item.goods_name}}</p>
          <van-button size="small" type="warning" @click="jrgwc(item.id)">加入购物车</van-button>
          <p class="yuan">￥{{item.price}}</p>
          <!-- </van-cell> -->
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      images: [],
      classification: [],
      imageList: [],
      loading: false,
      finished: false,
      infor: "0",
      page: 1,
      per_page: 10
    };
  },
  created() {
    this.$http.get("/main_ad_images").then(res => {
      // console.log(res);
      if (res.data.ok === 1) {
        this.images = res.data.data;
        // console.log(this.images);
      }
    });
    this.$http.get("/index_categories").then(res => {
      // console.log(res)
      if (res.data.ok === 1) {
        this.classification = res.data.data;
        // console.log(this.classification);
      }
    });
  },
  methods: {
    ...mapMutations(["setjrgwc"]),
    jrgwc(id) {
        let data = [];
        data.push(id)
        this.setjrgwc(data);
      // 保存id
      // 先把id数组从浏览器中拿出来
      let ids = localStorage.getItem("id");
      // 如果id为空
      if (ids === null) {
        // 把id放入数组中
        ids = [id];
      } else {
        // 将数组转换为对象
        ids = JSON.parse(ids);
        //  将id放进ids中
        ids.push(id);
        //  es6新语法 set 数组去重
        ids = Array.from(new Set(ids));
      }
      // 将得到的新数组对象转换为字符串并存放在浏览器中
      localStorage.setItem("id", JSON.stringify(ids));
      // 保存结构
      // 先把structure数组从浏览器中拿出来
      let structure = localStorage.getItem("structure");
      // 如果id为空
      if (structure === null) {
        // 把structure放入数组中
        structure = [];
        structure[id] = {
          isCheck: false, //默认勾选
          nums: 1 //默认1
        };
      } else {
        // 将数组转换为对象
        structure = JSON.parse(structure);
        // 判断是否为空
        if (structure[id] === undefined || structure[id] === null) {
          // 如果为空
          structure[id] = {
            Checklist: false, //默认勾选
            num: 1 //默认1
          };
        } else {
          // 如果不为空num+1
          structure[id].nums++;
        }
      }
      // 将得到的新数组对象转换为字符串并存放在浏览器中
      localStorage.setItem("structure", JSON.stringify(structure));
    },
    onLoad() {
      // 异步更新数据
      // this.getdata();
      this.$http
        .get(`/index_goods?page=${this.page}&per_page=${this.per_page}`)
        .then(res => {
          this.imageList.push(...res.data.data);
        });
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.imageList.length >= 40) {
        this.finished = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.commodity {
  .swipeimg {
    width: 375px;
    height: 200px;
  }
  p {
    text-align: center;
    width: 130px;
  }
  ul > li {
    display: inline-block;
    margin-top: 30px;
    margin-left: 30px;
  }
  .yuan {
    color: red;
  }
  .van-button {
    margin-left: 30px;
  }
  .goodsimg {
    width: 130px;
    height: 130px;
  }
}
</style>
