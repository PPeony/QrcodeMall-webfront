# QRCodeMall用户侧前端
vue+axios+vue-router+element-ui
这里只有前端代码，后端代码点[这里](https://github.com/PPeony/QRCodeMall)

# How to run
1. 修改链接ip，src/api/config.js和其他todo位置
2. 单机运行：```npm install```,```npm run server```,打包```npm run build```
3. 集群运行，参考[后端代码Readme](https://github.com/PPeony/QRCodeMall)

 ## 用户部分
 * 用户登录
 * 用户注册
* 个人信息显示
#### 安全管理
*  修改密码
*  修改邮箱
* 修改手机号
* 地址管理
*  添加地址
*  显示自己的地址
#### 订单管理
* 二维码部分
* 查看自己对应商品类别的二维码还剩多少
* 查看已经添加邮寄的二维码
* 添加二维码

##  商城部分
* **秒杀**
*  显示商品类别
*  加购物车
 *  添加商品进购物车
*   删除购物车中的商品
*  购买商品（这里关于微信小程序购买商品的接口还没做好）
*  购买单个商品
*   购物车购买
*  在未支付的订单中支付

## 管理员部分

*  管理员登录/登出
*  销售情况统计
*  各类表增删改查等 


