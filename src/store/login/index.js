import { reqGetLogin, reqUserInfo } from "@/api/login"

const state = {
    token: localStorage.getItem('userToken'),
    userInfo:{}
}
const getters = {}
const mutations = {
    GETTOKEN(state,token){
        state.token = token
    },
    REMOVETOKEN(state){
        state.token = localStorage.removeItem('userToken')
    },
    GETUSERINFO(state,data){
        state.userInfo = data
    }
}
const actions = {
    async getLoginData({commit},data){
      const res = await reqGetLogin(data)
      if(res.code === 200){
        commit('GETTOKEN',res.data.token)
        localStorage.setItem('userToken',res.data.token)
      }else{
        return Promise.reject()
      }
    },
    async getUserInfo({commit}){
      const res = await reqUserInfo()
      if(res.code === 200){
        commit('GETUSERINFO',res.data)
      }else{
        return Promise.reject(res.message)
      }
    }
}
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}