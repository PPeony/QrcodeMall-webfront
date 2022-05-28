<template>
    <div>
        <div>
            <el-table :data="goods" style="width: 100%">
                <el-table-column prop="goodsName" label="商品名"/>
                <el-table-column prop="goodsTypeName" label="商品类别"/>
                <el-table-column prop="goodsPrice" label="商品价格"/>
                <el-table-column prop="goodsPrice" label="总计"/>
            </el-table>
        </div>
        <div style="float: right;margin-top: 30px">
            <span>实付款：¥{{goods[0].goodsPrice}}</span>
            &nbsp;
            &nbsp;
            <el-button type="danger" style="border-radius: 0 !important;" @click="addOrderForm">提交订单</el-button>
        </div>
    </div>

</template>

<script>

    import {selectGoods} from '../../api/admin'
    import {generateOrderForm,oneOrderForm} from '../../api/oderForm'

    export default {
        name: "AddOneOrderForm",
        created() {
            let goodsId = this.$route.query.goodsId;
            selectGoods({
                goodsId: goodsId
            }).then(res => {
                this.goods = res.data.data.list;
            });
        },
        methods: {
            addOrderForm(){
                generateOrderForm(JSON.stringify(this.goods)).then(res => {
                  console.log(res.data)
                  let orderFormId = res.data.data;
                  const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  let timer;
                  let loadingFlag = false
                  // console.log(JSON.stringify(orderForm));
                  let i = 0;
                  timer = setInterval(()=>{
                    console.log('orderFormId ',orderFormId)
                    oneOrderForm({orderFormId:orderFormId})
                    .then((res) => {
                      console.log('get success',res)
                      let data = res.data.data;
                      let code = res.data.code
                      // let msg = res.data.msg
                      console.log(i+'     wait    ' + data)
                      if (code === 202) {
                        console.log('202-i',i)
                        // this.$message.error(msg)
                        console.log('订单正在创建')
                      } else if (code === 200) {
                        // location.href='https://www.baidu.com'

                        let orderForm = data
                        let orderFormId = orderForm.orderFormId;
                        let orderFormNumber = orderForm.orderFormNumber;
                        let orderFormPrice = orderForm.orderFormPrice;
                        //todo
                        location.href =
                            `http://云主机ip:32557/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;

                        loadingFlag = true
                      } else {
                        console.log('others-i',i)
                        // this.$message.error(msg);
                      }
                      if(i >= 10 && !loadingFlag){
                        clearTimeout(timer)
                        loading.close()
                        this.$alert('查询订单信息失败，请到个人中心查找订单并付款，或者重新下单', '错误',{
                          confirmButtonText:'确定'
                        })
                      }
                      i++;
                    })

                  },1000)


                  /*=====
                  console.log("check back onOrderForm=>",checkRes)
                  let code = checkRes.data.code
                  let i = 0;
                  console.log('before while')
                  while (i < 100) {
                    if (code === 202) {
                      console.log('202-i',i)
                      this.$message.error(checkRes.data.msg)
                      console.log('after msg error')
                      checkRes = oneOrderForm({orderFormId:orderFormTd});
                      code = checkRes.data.code
                      console.log('订单正在创建')
                    } else if (code === 200) {
                      console.log('200-i',i)
                      let orderForm = checkRes.data.data
                      let orderFormId = orderForm.orderFormId;
                      let orderFormNumber = orderForm.orderFormNumber;
                      let orderFormPrice = orderForm.orderFormPrice;
                      location.href =
                          `http://localhost:8090/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;
                      break;
                    } else {
                      console.log('others-i',i)
                      this.$message.error(checkRes.data.msg);
                      break;
                    }
                    i++;
                    console.log('sleep')
                  }

                   */

                });
            },


        },

        data() {
            return {
                goods:{},
            }
        }
    }
</script>

<style scoped>

</style>
