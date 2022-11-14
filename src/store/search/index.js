import { reqGetsearch } from "@/api/search";
const state= {
    searchList:{}, //搜索返回的数据
}
const getters = {
    goodList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
        console.log(state.searchList);
    }
}
const actions = {
    async getSearchList({commit}, data ={}){
        let result = await reqGetsearch(data)
       if(result.code === 200){
        commit('GETSEARCHLIST',result.data)
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