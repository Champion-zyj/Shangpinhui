import axios from "axios";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import store from '@/store'
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

requests.interceptors.request.use((config) => {
    if (store.state.home.uuid_token) {
        config.headers.userTempId = store.state.home.uuid_token
    }
    if (store.state.login.token) {
        config.headers.token = store.state.login.token
    }
    nprogress.start()
    return config
})

requests.interceptors.response.use((response) => {
    const { data } = response
    nprogress.done()
    return data
},
    (error) => {
        this.$message.error(error)
        return new Promise()
    }
)

export default requests