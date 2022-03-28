<template>
  <el-container>
    <el-header>
      <el-row class="wenzi">
        <h1>

                 <span style="font-size: 40px">
               今日特惠
            </span>
        </h1>
      </el-row>

    </el-header>
    <el-main>
<!--      <div style="padding-top: 60px;height: 400px">-->

<!--        <div class="container">-->
<!--          <el-button type="primary" circle plain class="button-message">-->
<!--            <i class="el-icon-cloudy" style=""></i>-->
<!--          </el-button>-->
<!--          <h3 style="text-align: center">-->
<!--            云主机更安全-->
<!--          </h3>-->
<!--          <span style="text-align: center;margin: 0 auto;line-height: 20px;">-->
<!--                        独立云主机分布式数据存储，7*24小时高速稳<br>&nbsp;&nbsp;&nbsp;定运行，保障数据运行流畅与数据安全.-->
<!--                    </span>-->
<!--        </div>-->
<!--        <div class="container">-->
<!--          <el-button type="primary" circle plain class="button-message" style="margin-left: 120px"><i-->
<!--              icon="el-icon-edit"></i>-->
<!--            <i class="el-icon-coin" style=""></i>-->
<!--          </el-button>-->
<!--          <h3 style="text-align: center">-->
<!--            无限数据存储-->

<!--          </h3>-->
<!--          <span style="text-align: center;margin: 0 auto;line-height: 20px;">-->
<!--                       活码管理，多种数据生成方式，多级二维码数据关<br>联，无限二维码生成量。-->
<!--                    </span>-->
<!--        </div>-->
<!--        <div class="container">-->
<!--          <el-button type="primary" circle plain class="button-message" style="margin-left: 120px"><i-->
<!--              icon="el-icon-edit"></i>-->
<!--            <i class="el-icon-upload" style=""></i>-->
<!--          </el-button>-->
<!--          <h3 style="text-align: center">-->
<!--            永久免费升级-->
<!--          </h3>-->
<!--          <span style="text-align: center;margin: 0 auto;line-height: 20px;">-->
<!--                       免安装、易操作，提供优质免费售后服务，服务期限<br>内提供永久免费更新升级服务。-->
<!--                    </span>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="el-main-message">-->
<!--        <div class="introduce">-->
<!--          <h4 style="font-size: 21px">一物一码&nbsp;品质溯源</h4>-->
<!--          <div style="">-->
<!--            每一件产品都具有独一无二的可追溯二维码，即每一个产品都具有唯一的识别代码，保障品质产品的生产、加工、流通、销售全程可追溯。-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="introduce" style="text-align: left;float: right;margin-right: 0">-->
<!--          <h4 style="font-size: 21px">来可查 去可追</h4>-->
<!--          <div style="">-->
<!--            实现企业产品追溯信息可查询，产品来源可追溯、去向可查证、责任可追究、问题产品可召回的全生命周期追溯体系建设-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="introduce">-->
<!--          <h4 style="font-size: 21px">产品防伪 经销防窜</h4>-->
<!--          <div style="">-->
<!--            一物一码，保障了产品都具有独立唯一的"身份证"，防止产品的假冒伪劣现象，可实现产品区域管理，防止经销商窜货现象的发生。-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="introduce" style="text-align: left;float: right;margin-right: 0">-->
<!--          <h4 style="font-size: 21px">物联网 促营销</h4>-->
<!--          <div style="">-->
<!--            企业大数据数字化管理，实现产品走进物联网+时代，不仅提升了产品的品牌形象与知名度，也提高了消费者对企业产品的可信度。-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <el-divider>

      </el-divider>

      <div>
        <h2 style="text-align: center;font-family: 黑体;font-size: 25px">特价商品 </h2>
      </div>

      <el-row type="flex" justify="center" >
        <el-col :span="6" v-for="goods in goodsList" :key="goods">
          <el-card>
            <h2>

              {{goods.goodsName}}
            </h2>
            <el-divider>{{goods.goodsIntroduction}}</el-divider>

            <div style="margin-top: 10px">
              <h3>原价¥{{goods.goodsPrice}} 现价¥{{goods.promotionValue}}</h3>
              <h3>限量 {{goods.promotionCount}} 份</h3>
              <h3>开始时间{{goods.promotionStartTime}}</h3>
              <h3>持续时间{{goods.promotionDuration}}</h3>
              <el-button type="danger"
                         @click="addOneOrderForm(goods.promotionId,goods.promotionStartTime,goods.promotionDuration,goods.promotionCount)"
                         plain
                         style="border-radius: 0 !important;">
                立即购买
              </el-button>

            </div>
          </el-card>
        </el-col>

      </el-row>

    </el-main>

  </el-container>
</template>

<script>

// import {selectGoods} from "../../api/admin";
// import {selectGoodsType} from "../../api/goodsType";
// import {insertToShoppingCart} from "../../api/goods"
import {selectAllPromotionGoods} from "../../api/goods"
import {checkLogin} from "../../api/checkRules"
export default {
  name: "GoodsPromotion",
  created() {

    this.fetchData();

  },
  data() {
    return {
      goodsList: [],
      rowNum: 0,
      goodsType: {},
      index: 0,
      goodsLength: 0
    }
  },
  methods: {

    fetchData(){
      // this.goodsTypeName = this.$route.query.goodsTypeName;
      // selectGoods({
      //   goodsTypeName: this.$route.query.goodsTypeName
      // }).then(res => {
      //   this.goodsList = res.data.data.list;
      // });
      // selectGoodsType({
      //   goodsTypeName: this.goodsTypeName
      // }).then(res => {
      //   this.goodsType = res.data.data;
      // });
      selectAllPromotionGoods().then(res => {
        this.goodsList = res.data.data
        console.log(this.goodsList)
      })
    },
    checkPromotionTime(startTime,duration){
      var start = new Date(startTime)
      if (new Date().getTime() < start.getTime()
          || new Date().getTime() > start.getTime()+duration*60*1000){
        return false;
      }
      return true;
    },
    addOneOrderForm(promotionId,promotionStartTime,promotionDuration,promotionCount){
      console.log(promotionId,promotionStartTime,promotionDuration,promotionCount)
      let flag = this.checkPromotionTime(promotionStartTime,promotionDuration)
      if (!flag) {
        this.$message.error('现在不在促销时间段内');
        return;
      }
      let isLogin = checkLogin()
      console.log(isLogin)
      if (!isLogin) {
        this.$alert('请先登录', '请先登录', {
          confirmButtonText: '确定'
        });
        this.$router.push({path:'/public'})
        return;
      }
      // console.log('addOneOrderForm',promotionId)
      this.$router.push({path:'addPromotionGoods',query:{promotionId:promotionId,promotionCount:promotionCount}})
    }


  }
}
</script>

<style scoped>


.wenzi {
  padding-left: 150px;
  padding-top: 150px;
}

* {
  font-family: 微软雅黑, serif;
}

.el-main {
  padding: 0;
  line-height: 20px;
}

div.container {
  float: left;
  margin-left: 145px;
}

.button-message {
  width: 120px;
  height: 120px;
  font-size: 45px;
  margin-left: 100px;

}

.el-main-message {
  width: 100%;
  height: 400px !important;
  background: url("./../../assets/QQ截图20200805230507.png");
}

.el-header {
  background: url("./../../assets/vegetable.png");
  width: 100%;
  height: 620px !important;
  color: white;

}

.introduce {
  color: white;
  text-align: right;
  font-family: 微软雅黑, serif;
  float: left;
  width: 400px;
  height: 143px;
  margin-right: 350px;
}

.goods-shop {
  min-height: 284px;
  width: calc(100% - 360px);
  margin: 0 auto;
  border: 1px solid #d7d8d9;
}

ul li {

  list-style: none;

}
</style>

