<template>
  <div class="bread">
    <ul class="fl sui-breadcrumb">
      <li>
        <a href="#">全部结果</a>
      </li>
    </ul>
    <ul class="fl sui-tag">
      <!-- 分类的面包屑 -->
      <li class="with-x"  v-if="form.categoryname" >{{form.categoryname}}<i @click="removeBreadList">×</i></li>
      <!-- 关键字的面包屑 -->
      <li class="with-x"  v-if="form.keyword" >{{form.keyword}}<i @click="removekeyWord">×</i></li>
      <!-- 品牌的面包屑 -->
      <li class="with-x"  v-if="brandCode.tmName" >{{brandCode.tmName}}<i @click="removeBrandCode">×</i></li>
      <!-- 平台售卖的参数 -->
      <li class="with-x"  v-for="(item, index) in selectParameter" :key="index" >{{item.split(':')[1]}}<i @click="removeParameter(index)">×</i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Name',
  props:['form', 'brandCode','selectParameter'],
  data() {
    return {
    }
  },
  methods:{
    removeBreadList(){
      this.$emit('clearCategoryName')
    },
    removekeyWord(){
      this.$emit('removekeyWord')
    },
    removeBrandCode(){
      this.$emit('removeBrandCode')
    },
    removeParameter(index){
      this.$emit('removeParameter',index)
    }
  }
}
</script>

<style lang='less' scoped>
      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
</style>