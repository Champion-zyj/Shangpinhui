import { reqCarList } from "@/api/shopCart"

const state = {
    cartList:[], //购物车的详情
}
const getters = {
    cartList(state){
        return state.cartList[0] || {} 
    }
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
   async getCartList({commit}){
    const res = await reqCarList()
    commit('GETCARTLIST',res.data)
}
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}