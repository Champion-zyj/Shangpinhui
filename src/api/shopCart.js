import requests from "@/utils/resquest";

// 获取购物车列表详情
export function reqCarList(){
    return requests({
        url:"/cart/cartList",
        method:"GET"
    })
}
// 删除购物车
export function reqDelCartByid(skuid){
    return requests({
        url:`/cart/deleteCart/${skuid}`,
        method:"DELETE"
    })
}

//切换商品选中状态
export function reqModifyisCheck({skuid,isChecked}){
    return requests({
        url:`/cart/checkCart/${skuid}/${isChecked}`,
        method:"GET"
    })
}