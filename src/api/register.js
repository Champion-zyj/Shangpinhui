import requests from "@/utils/resquest";

// 注册用户
export function reqRegisterUser(data){
    return requests({
        url:"/user/passport/register",
        method:"POST",
        data
    })
}
// 注册获取验证码
export function reqRegisterCode(phone){
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:"GET",
    })
}