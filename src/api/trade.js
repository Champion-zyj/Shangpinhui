import requests from "@/utils/resquest";

/**
 * 获取订单交易页信息
 */
export function reqOrderInfo(){
    return requests({
        url:'/order/auth/trade',
        method:"GET"
    })
}
/**
 * 提交订单接口
 */
export function reqGetOrderInfo(data,traderNo){
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${traderNo}`,
        method:"POST",
        data
    })
}
/**
 * 获取订单支付信息
 */
export function reqGetOrderPayInfo(orderId){
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:"GET",
    })
}
/**
 * 查询订单支付状态
 */
export function reqPayStatus(orderId){
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:"GET",
    })
}
/**
 * 获取我的订单
 */
export function reqMyOrder(page,limit){
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:"GET",
    })
}