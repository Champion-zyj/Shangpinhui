import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { Message } from 'element-ui';
Vue.use(Router)

// push的二次封装
let newPush = VueRouter.prototype.push
//第一个参数：告诉原来的push方法，你往哪里跳（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        newPush.call(this, location, resolve, reject)
    } else {
        newPush.call(this, location, () => { }, () => { })
    }
}
const router = new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
router.beforeEach(async(to, from, next) => {
    if (store.state.login.token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            if(store.state.login.userInfo.name){
                next()
            }else{
                try {
                   await store.dispatch('login/getUserInfo')
                    next()
                } catch (error) {
                    console.log(error,2222);
                    store.commit('login/REMOVETOKEN')
                    next('/login')
                    Message.error(error.message)
                }
            }
        }
    } else {
        if (!['/login'].includes(to.path)) {
            next('/login?redirect='+to.path)
        }else{
            next()
        }
    }
})
export default router