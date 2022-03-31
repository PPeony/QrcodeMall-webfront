<template>

    <el-container>
        <el-tabs style="width: 100%" @tab-click="handleClick">
            <el-tab-pane label="未付款" id="unpay">
                <split-table :headData="headData" :bodyData="orderForms"
                             :operFlag="true" :tableEditFlag="false" :checkFlag="false">
                    <template slot="operate" slot-scope="props">
                        <el-button type="text"
                                   @click="buyGoods(props.rowData.orderFormId,props.rowData.orderFormPrice,props.rowData.orderFormNumber)">
                            支付
                        </el-button>
                    </template>
                </split-table>

                <el-pagination
                        layout="prev, pager, next"
                        :total="total1"
                        :page-size="9"
                        @current-change="currentChange1"
                        :current-page="currentPage"
                        style="float: left">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="已付款" id="payed">
                <split-table :headData="headData" :bodyData="orderForms1" :checkFlag="false"
                             :operFlag="false" :tableEditFlag="false">
                </split-table>
                <el-pagination
                        layout="prev, pager, next"
                        :total="total2"
                        :page-size="9"
                        @current-change="currentChange2"
                        :current-page="currentPage2"
                        style="float: left">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </el-container>

</template>

<script>

    import {selectAllOrderForms} from './../../api/oderForm'
    import SplitTable from 'vue-split-table';

    export default {
        name: "PersonOrderForm",
        components: {SplitTable},
        data() {
            return {
                headData: ["订单id","订单号", "订单发起时间", "商品名称", "商品单价", "二维码数量", "商品类别", "订单总价"],
                orderForms: [],
                orderForms1: [],
                total1: 0,
                total2: 0,
                currentPage:1,
                currentPage2:1
            }
        },
        created() {
            this.fetchData();
        },
        methods: {

            handleClick(tab,event){
              console.log(tab,event)
              if (event.target.innerHTML === '已付款') {
                console.log("handleclick payed")
                this.currentChange2(1)
              }
            },
            buyGoods(orderFormId, orderFormPrice, orderFormNumber) {

                location.href =
                    `http://localhost:8090/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;
            },
            currentChange1(pageNum) {
                this.currentPage=pageNum
                selectAllOrderForms({
                    pageNum: pageNum,
                    orderFormStatus:0
                }).then(res => {
/*
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }
                    }
                    */
                  this.orderForms = []
                  this.total1 = res.data.data.total
                  for (let i = 0; i < res.data.data.list.length; i++) {
                    let item = res.data.data.list[i];
                    let orderForm = item.orderForm;
                    let details = item.details;
                    let goodsNames = [];
                    let goodsPrices = [];
                    let goodsQrcodeQuantitys = [];
                    let goodsTypeNames = [];
                    for (let j = 0; j < details.length; j++) {
                      goodsNames.push(details[j].goodsName);
                      goodsPrices.push(details[j].goodsPrice);
                      goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                      goodsTypeNames.push(details[j].goodsTypeName);
                    }
                    this.orderForms.push(
                        {
                          orderFormId: orderForm.orderFormId,
                          orderFormNumber: orderForm.orderFormNumber,
                          gmtCreated: orderForm.gmtCreated,
                          goodsNames: goodsNames,
                          goodsPrices: goodsPrices,
                          goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                          goodsTypeNames: goodsTypeNames,
                          orderFormPrice: orderForm.orderFormPrice,
                        }
                    );
                  }
                });
            },


            currentChange2(pageNum) {

                this.currentPage2 = pageNum
                selectAllOrderForms({
                    pageNum: pageNum,
                    orderFormStatus:1
                }).then(res => {
                    this.orderForms1 = []
                  this.total2 = res.data.data.total
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];

                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms1.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );

                    }
                });
            },


            fetchData() {
                selectAllOrderForms({orderFormStatus:0}).then(res => {
                    /*
                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        } else {
                            this.total2++;
                            goodsNames = [];
                            goodsPrices = [];
                            goodsQrcodeQuantitys = [];
                            goodsTypeNames = [];
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms1.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }


                    }

                     */
                  this.total1 = res.data.data.total
                  for (let i = 0; i < res.data.data.list.length; i++) {
                    let item = res.data.data.list[i];
                    let orderForm = item.orderForm;
                    let details = item.details;
                    let goodsNames = [];
                    let goodsPrices = [];
                    let goodsQrcodeQuantitys = [];
                    let goodsTypeNames = [];
                    for (let j = 0; j < details.length; j++) {
                      goodsNames.push(details[j].goodsName);
                      goodsPrices.push(details[j].goodsPrice);
                      goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                      goodsTypeNames.push(details[j].goodsTypeName);
                    }
                    this.orderForms.push(
                        {
                          orderFormId: orderForm.orderFormId,
                          orderFormNumber: orderForm.orderFormNumber,
                          gmtCreated: orderForm.gmtCreated,
                          goodsNames: goodsNames,
                          goodsPrices: goodsPrices,
                          goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                          goodsTypeNames: goodsTypeNames,
                          orderFormPrice: orderForm.orderFormPrice,
                        }
                    );
                  }
                });
            },
        }
    }
</script>

<style scoped>

</style>
r
