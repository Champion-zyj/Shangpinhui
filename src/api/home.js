import  request  from '@/utils/resquest.js'
import mockRequest from '@/utils/mockRequest.js'

export const reqCategory = () => {
    return request({ method: 'get', url: '/product/getBaseCategoryList' });
 }
 // 获取banner数据
export const reqGetBannerList = () => {
    return mockRequest({ method: 'get', url: '/banner' });
 }
 // 获取floor数据
export const reqGetFloorList = () => {
    return mockRequest({ method: 'get', url: '/floor' });
 }