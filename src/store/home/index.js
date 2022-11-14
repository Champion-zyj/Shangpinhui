import { reqCategory, reqGetBannerList, reqGetFloorList } from "@/api/home"
import { getUUID } from '@/utils/uuid_token'

const state = {
    categoryList:JSON.parse(localStorage.getItem('categoryList') || '[]'),
    banner:[], // 模拟数据的轮播图
    floorList:[],//模拟floor数据
    uuid_token:getUUID(), //临时生成游客的token 
}
const getters = {}
const mutations = {
    CATEGORYLIST(state,categoryList){
        localStorage.setItem('categoryList',JSON.stringify(categoryList))
    },
    GETBANNERLIST(state, bannerList){
        state.banner = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
}
const actions = {
    async categoryList(content, val){
        const res = await reqCategory()
        if(res.code === 200){
            content.commit('CATEGORYLIST',res.data)
        }
    },
    async getBannerList(content, val){
        const res = await reqGetBannerList()
        console.log(res);
        if(res.code === 200){
            content.commit('GETBANNERLIST',res.data)
        }
    },
    async getFloorList(content, val){
        const res = await reqGetFloorList()
        console.log(res);
        if(res.code === 200){
            content.commit('GETFLOORLIST',res.data)
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