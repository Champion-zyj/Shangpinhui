import  request  from '@/utils/resquest.js'

// 获取商品详情
export function reqGetdetailInfo(skuId){
    return request({
        url:`/item/${skuId}`,
        method:"GET",
    })
}
// 将商品添加到购物车
export function reqAddOrUpdateShopCart({skuid,skuNum}){
    return request({
        url:`/cart/addToCart/${skuid}/${skuNum}`,
        method:"POST",
    })
}