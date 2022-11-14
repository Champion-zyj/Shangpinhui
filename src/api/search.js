import  request  from '@/utils/resquest.js'

export function reqGetsearch(data){
    return request({
        url:"/list",
        method:"POST",
        data
    })
}