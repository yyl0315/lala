<template>
  <div class="cart">
    <van-nav-bar
      style="background:red;"
      :right-text="fase===true?'编辑':'完成'"
      title="购物车"
      @click-right="onClickRight"
    />
    <div v-for="item in goods" :key="item.id" class="cart_less">
      <van-row gutter="0">
        <van-col span="3">
          <van-checkbox v-model="structure[item.id].isCheck"/>
        </van-col>
        <van-col span="20">
          <van-card :price="(item.price).toFixed(2)" :title="item.goods_name" :thumb="item.image">
            <van-stepper slot="num" v-model="structure[item.id].nums"></van-stepper>
            <div slot="footer">
              <van-tag plain>小计：￥{{(structure[item.id].nums*item.price).toFixed(2)}}</van-tag>
            </div>
          </van-card>
        </van-col>
      </van-row>
    </div>
    <van-submit-bar v-if="!fase" button-text="删除" @submit="ondel">
      <van-checkbox v-model="check">全选</van-checkbox>
    </van-submit-bar>
    <van-submit-bar v-else :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="check">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: JSON.parse(localStorage.getItem("id")) || [],
      structure: JSON.parse(localStorage.getItem("structure")) || [],
      goods: [],
      fase: true
    };
  },
  created() {
    if (this.id.length > 0) {
      this.$http.get("/goods?id=" + this.id.join(",")).then(res => {
        this.goods = res.data.data;
        // console.log(res);
      });
    }
  },
  computed: {
    totalPrice: function() {
      let Sum = 0;
      this.goods.forEach(element => {
        if (this.structure[element.id].isCheck) {
          Sum += this.structure[element.id].nums * element.price;
        }
      });
      return Sum * 100;
    },
    check: {
      get: function() {
        for (let i = 1; i < this.structure.length; i++) {
          if (this.structure[i] === null) continue;
          if (this.structure[i].isCheck === false) {
            return false;
          }
        }
        return true;
      },
      set: function(newValue) {
        this.structure.forEach(v => {
          if (v !== null) {
            v.isCheck = newValue;
          }
        });
      }
    }
  },
  watch: {
    goodslist: {
      deep: true, // 深度监听
      handler: function() {
        // 把 cart 写回浏览器
        localStorage.setItem("goods", JSON.stringify(this.goods));
      }
    }
  },
  methods: {
    onSubmit() {
      this.$toast("点击结算");
    },
    remove(id) {
      console.log(id);
      if (this.structure[id].isCheck === true) {
      }
    },
    onClickRight() {
      this.fase = !this.fase;
    },
    ondel(){
      
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  .van-card__price {
    color: #f44;
  }
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
  }
  .van-submit-bar {
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 100;
    width: 100%;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .van-card__title{
    display: block;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow: ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 100px;/*需要配合宽度来使用*/
  }
  .caty {
    padding-bottom: 130px;
  }
  .cart_less {
    margin-top:10px; 
    .van-checkbox {
      position: relative;
      top: 45px;
      left: 10px;
    }
  }
}
</style>