<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked === 1" @change="UpdateChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handler('change', $event.target.value*1, item)">
            <a class="plus" @click="handler('add', 1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="delCartList(item.skuId)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkedAll" ref="inputDis">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{getMathNumber.num}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{getMathNumber.sum}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqAddOrUpdateShopCart } from '@/api/detail';
import { mapGetters } from 'vuex';
import { reqDelCartByid, reqModifyisCheck } from '@/api/shopCart';
import {throttle} from 'lodash'
  export default {
    name: 'ShopCart',
    created(){
      this.getCartData()
    },
    data(){
      return{
        disabled:false,
      }
    },
    computed:{
      ...mapGetters('shopCart',['cartList']),
      // 取出接口深层次的数据
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      // 计算购买商品的总价和总共的商品数量
      getMathNumber(){
        let num = 0
        let sum = 0
        this.cartInfoList.forEach(t=>{
            if(t.isChecked === 1){
              num += t.skuNum
              sum += t.skuNum * t.skuPrice
            }
        })
        return {num, sum}
      },
      //计算商品全部勾选底部的全选就选中
      checkedAll:{
        get(){
            if(this.cartInfoList.length > 0){
              this.$nextTick(()=>{
              this.$refs.inputDis.disabled = false
              })
              return this.cartInfoList.every(item=>item.isChecked == '1') //every方法是遍历数组中的每一项是否都满足条件，全都满足返回true
              }else{
                this.$nextTick(()=>{
                  return  this.$refs.inputDis.disabled = true
                })
              }  
        },
        set:throttle(function(val){
           this.cartInfoList.forEach(async item=>{
            await reqModifyisCheck({skuid:item.skuId,isChecked:val?1:0})
            this.getCartData()
          })
        },1000),
        }
    },
    methods:{
      getCartData(){
        this.$store.dispatch('shopCart/getCartList')
      },
      handler:throttle(async function(type, disNum, data){
          // type:为了区分点击的三个元素
          // disNum:传递给后端的变量
          // data:哪个产品的id
          switch(type){
            case 'add':
              disNum = 1;
              break;
            case 'minus': 
              /**判断产品额个数大于1，才可以传递给服务器disNum = -1
               * 如果出现产品的个数小于等于1，传递disNum = 0 (原封不动，不改变数量)
               */
              disNum = data.skuNum > 1 ? -1 : 0;
              break;
            case 'change':
              /**用户输入的数量，如果是非法的（带有汉字|出现负数），传递给后端disNum = 0 (也不改变数量)*/ 
              if(isNaN(disNum) || disNum < 1){
                disNum = 0
              }else{
              /*用户输入的数量，如果是小数点 传递给后端的disNum = 用户输入的取整之后 - 数据原先的数量*/
                disNum = parseInt(disNum) - data.skuNum
              }
          }
          await reqAddOrUpdateShopCart({skuid:data.skuId, skuNum:disNum})
          this.getCartData()
        },500),
        async delCartList(id){
          try {
              await reqDelCartByid(id)
              this.getCartData()
              this.$message({type:'success', message:'删除成功'})
          } catch (error) {
              this.$message({type:'error',message:'删除失败，请稍后重试'})
          }

        },
        async UpdateChecked(data,event){
            await reqModifyisCheck({skuid:data.skuId, isChecked:event.target.checked ? 1 : 0})
            this.getCartData()
        },
        deleteAllShopCart(){
          let PromiseArray = []
          this.cartInfoList.forEach(item=>{
            if(item.isChecked == '1'){
             let PromiseAll = reqDelCartByid(item.skuId)
             console.log(PromiseAll);
              PromiseArray.push(PromiseAll)
            }
          })
          return Promise.all(PromiseArray).then(()=>{
            if(PromiseArray.length != 0){
              this.getCartData()
            this.$message({type:'success', message:'删除成功'})
            }
          }).catch((error)=>{
              his.$message({type:'error',message:'删除失败，请稍后重试'})
          })
        },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }
          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
            .sindelet{
              cursor: pointer; 
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;

          span{
            color: red;
            }
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>