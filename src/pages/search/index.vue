<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <Bread :form="searchParams" :brandCode="brandCode" :selectParameter="searchParams.props" @clearCategoryName="clearCategoryName" @removekeyWord="removekeyWord" @removeBrandCode="removeBrandCode" @removeParameter="removeParameterFn"></Bread>
        <!--selector-->
        <SearchSelector @brandCode="brandCodeFn" @clcikGetattrInfo="clcikGetattrInfo" />
        <!--details-->
        <div class="details clearfix">
          <SuiNavbar @changeNav="changeNavFn"></SuiNavbar>
          <GoodList :list="goodList"></GoodList>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @getPageNo="getPagenoFn"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from './bread'
import SearchSelector from './SearchSelector/SearchSelector'
import SuiNavbar from './sui-navbar'
import GoodList from './goodList'
import { mapGetters, mapState } from 'vuex'
import  throttle from 'lodash/throttle';
export default {
  name: 'Search',
  components: {
    Bread,
    SearchSelector,
    SuiNavbar,
    GoodList,
  },
  data(){
    return{
      brandCode:{}, // 品牌关键词
      searchParams:{
        // 一级分类的id
        category1Id:'',
        // 一级分类的id
        category2Id:'',
        // 一级分类的id
        category3Id:'',
        // 分类的名字
        categoryname:'',
        //搜索的关键字
        keyword:'',
        // 平台售卖选择的参数
        props:[],
        // 品牌
        trademark:'',
        // 排序: 初始值 1:综合 2:价格 asc:升序 desc:降序
        order:'1:desc',
        pageNo:1,
        pageSize:10
      }
    }
  },
  watch:{
    $route:{
      immediate:true,
        handler() {
        const { params, query } = this.$route
        Object.assign(this.searchParams, params, query)
        this.getData()
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        }
    }
  },
  beforeMount(){
    const { params, query } = this.$route
    Object.assign(this.searchParams, params, query)
  },
   mounted(){
  },
  computed:{
    ...mapGetters('search',['goodList']),
    ...mapState('search',['searchList'])
  },
  methods:{
    getData(){
      this.$store.dispatch('search/getSearchList',this.searchParams)
    },
    clearCategoryName(){
      this.searchParams.categoryname = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
      }
    },
    removekeyWord(){
      this.searchParams.keyword = ''
      this.$router.push({ name: "search", query: this.$route.query });
      this.getData()
      this.$bus.$emit('clear')
    },
    brandCodeFn(val){
     this.brandCode = val
     this.searchParams.trademark = `${val.tmId}:${val.tmName}`
     this.getData()
    },
    removeBrandCode(){
      this.brandCode = {}
      this.searchParams.trademark = ''
      this.getData()
    },
    // 获取平台属性 例如手机参数
    clcikGetattrInfo(attrInfo, data){
      let props = `${attrInfo.attrId }:${data}:${attrInfo.attrName}`
      if(this.searchParams.props.indexOf(props) == -1){
          this.searchParams.props.push(props)
      }
      this.getData()
    },
    removeParameterFn(index){
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    changeNavFn:throttle(function(flag){
       let originFlag = this.searchParams.order.split(":")[0]  
       let originSort = this.searchParams.order.split(":")[1]
       if(flag === originFlag ){
          this.searchParams.order = `${flag}:${originSort == 'desc'? 'asc' : 'desc'}`
       }else{
        this.searchParams.order = `${flag}:desc`
       }
       this.getData()
      },1000),
    getPagenoFn(page){
      if(this.searchParams.pageNo == page)return
      this.searchParams.pageNo = page
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .details {
      margin-bottom: 5px;
    }
  }
}
</style>