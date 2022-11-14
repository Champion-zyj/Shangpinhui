import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

import home from "./home";
import search from './search'
import shopCart from "./shopCart";
import register from "./register";
import login from "./login";
import trade from './trade'
export default new Vuex.Store({
    modules:{
        home,
        search,
        shopCart,
        register,
        login,
        trade
    }
})