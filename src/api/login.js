import requests from "@/utils/resquest";

//登录
export function reqGetLogin(data){
    return requests({
        url:"/user/passport/login",
        method:"POST",
        data
    })
}
//退出登录
export function reqLoginOut(){
    return requests({
        url:"/user/passport/logout",
        method:"GET",
    })
}
//获取用户信息
export function reqUserInfo(){
    return requests({
        url:"/user/passport/auth/getUserInfo",
        method:"GET",
    })
}
//获取用户地址
export function reqUserAddressInfo(){
    return requests({
        url:"/user/userAddress/auth/findUserAddressList",
        method:"GET",
    })
}