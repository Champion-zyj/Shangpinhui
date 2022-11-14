import { reqUserAddressInfo } from "@/api/login"
import { reqOrderInfo } from "@/api/trade"

const state = {
    address:[],
    orderInfo:{}
}
const getters = {}
const mutations = {
    GETUSERADDRESS(state, address){
        state.address = address
    },
    GETORDERINFO(state, OrderInfo){
        state.orderInfo = OrderInfo
    }
}
const actions = {
    async getUserAdderss({commit}){
        const res = await reqUserAddressInfo()
        if(res.code === 200){
            commit('GETUSERADDRESS',res.data)
        }else{
            return Promise.reject(res.message)
        }
    },
    async getOrderInfo({commit}){
        const res = await reqOrderInfo()
        if(res.code === 200){
            commit('GETORDERINFO',res.data)
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}