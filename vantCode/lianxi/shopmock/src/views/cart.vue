<template>
  <div class="cart">
    <van-nav-bar
      title="标题"
      left-text="返回"
      :right-text="falg===true?'编辑':'完成'"
      left-arrow
      @click-left="$router.back()"
      @click-right="falg=!falg"
    />
    <div class="shopcart">
      <div class="cart_shop" v-for="item in goods" :key="item.id">
        <van-row gutter="20">
          <van-col span="3">
            <van-checkbox v-model="item.isdefault"></van-checkbox>
          </van-col>
          <van-col span="20">
            <div class="shopname">
              <van-card :price="item.price.toFixed(2)" :title="item.goods_name" :thumb="item.image">
                <van-stepper slot="num" v-model="strun[item.id].num" />
                <van-tag slot="footer" plain>小计：￥{{(item.price*strun[item.id].num).toFixed(2)}}</van-tag>
              </van-card>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="submit">
        <van-submit-bar
          v-if="falg"
          :price="toprice"
          :button-text="'提交订单('+getsum+')'"
          @submit="onSubmit"
        >
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar v-else :button-text="'删除('+getsum+')'" @submit="ondel">
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      falg: true,
      goods: [],
      id: JSON.parse(localStorage.getItem("ids")),
      strun: JSON.parse(localStorage.getItem("strun"))
    };
  },
  created() {
    console.log(this.id, this.strun);
    this.getshop();
  },
  computed: {
    // 选中商品的总价格
    toprice: function() {
      let sum = 0;
      this.goods.forEach(v => {
        if (v.isdefault === true) {
          sum += this.strun[v.id].num * v.price;
        }
      });
      return sum * 100;
    },
    getsum: function() {
      let ids = [];
      // let sun = ''
      this.goods.forEach(v => {
        if (v.isdefault === true) {
          ids.push(v.id);
          // sun+=this.strun[v.id].num
        }
      });
      let count = ids.length;
      return count;
      // return sun
    },
    // 全选反选
    checked: {
      get: function() {
        for (let i = 0; i < this.goods.length; i++) {
          if (this.goods[i] === null) continue;
          if (this.goods[i].isdefault === false) {
            return false;
          }
          return true;
        }
      },
      set: function(newValue) {
        this.goods.forEach(v => {
          if (v !== null) {
            v.isdefault = newValue;
          }
        });
      }
    }
  },
  methods: {
    getshop() {
      this.$http.get("/shop?id=" + this.id.join(",")).then(res => {
        // console.log(res.data.data);
        if (res.data.ok === 1) {
          res.data.data.forEach(v => {
            if (v.isdefault === 0) {
              v.isdefault = false;
            } else {
              v.isdefault = true;
            }
          });
          this.goods = res.data.data;
        }
        // console.log(this.goods);
      });
    },
    ondel() {
      // console.log(this.id) ;
      console.log(this.goods) ;
      for (let i = this.goods.length - 1;  i>=0; i--) {
        let v = this.goods[i];
        console.log(v) ;
        if (v.isdefault === true) {
          this.goods.splice(i, 1)
          // this.id.splice(i, 1)
          // this.strun.splice(i, 1)
          // i--
        }
      } ;

      localStorage.setItem('ids',JSON.stringify(this.id))
      localStorage.setItem('strun',JSON.stringify(this.strun))
    },
    onSubmit() {}
  }
};
</script>
<style lang="less" scoped>
.cart {
  .shopcart {
    .cart_shop {
      border: 1px solid #fdf0f0;
      margin-top: 10px;
      .van-checkbox {
        position: relative;
        top: 40px;
        left: 15px;
      }
    }
    .submit {
      .van-checkbox {
        position: absolute;
        left: 15px;
      }
      .van-submit-bar {
        margin-bottom: 50px;
      }
    }
  }
}
</style>