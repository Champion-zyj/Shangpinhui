import axios from "axios";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/mock",
    //超时的设置
    timeout: 5000
});

requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})

requests.interceptors.response.use((response) => {
        const { data } = response
        if( data.code === 200){
            nprogress.done()
            return data
        }else{
            this.$message.error(data.message)
            return new Error(data.message)
        }
},
    (error) => {
        return Promise.reject(error)
    }
)

export default requests