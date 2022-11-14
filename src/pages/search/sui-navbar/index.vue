<template>
       <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeNav('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="{'icon-up2':isAsc,'icon-down2':isDesc}"></span></a></li>
                <li :class="{active:isTwo}" @click="changeNav('2')">
                  <a>价格 <span v-show="isTwo" class="iconfont" :class="{'icon-up2':isAsc,'icon-down2':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
</template>

<script>
export default {
  name:'Name',
  data() {
    return {
      
    }
  },
  computed:{
      isOne(){
        return this.$parent.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.$parent.searchParams.order.indexOf('2') != -1
      },
      isAsc() {
      return this.$parent.searchParams.order.indexOf("asc") != -1;
    },
      isDesc() {
      return this.$parent.searchParams.order.indexOf("desc") != -1;
    },
    },
  methods:{
    changeNav(flag){
      this.$emit('changeNav', flag)
    }
  }
}
</script>

<style lang='less' scoped>
     .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

</style>