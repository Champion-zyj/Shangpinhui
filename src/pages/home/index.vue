<template>
    <div>
        <typeNav></typeNav>
        <listContainer></listContainer>
        <recomMend></recomMend>
        <Rank></Rank>
        <like></like>
        <floor v-for=" item in floorList" :key="item.id" :list="item"></floor>
        <brand></brand>
    </div>
</template>

<script>
import listContainer from '@/pages/home/listContainer'
import recomMend from '@/pages/home/recommend'
import Rank from '@/pages/home/rank'
import like from '@/pages/home/like'
import floor from '@/pages/home/floor'
import brand from '@/pages/home/brand'
import { mapState } from 'vuex'
export default {
  components:{ listContainer, recomMend, Rank, like, floor, brand},
  name:'home',
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState('home',['floorList'])
  },
  mounted(){
      // 获取商品列表
      this.$store.dispatch('home/categoryList')
      this.$store.dispatch('home/getFloorList')
  }
}
</script>

<style lang='less' scoped>

</style>