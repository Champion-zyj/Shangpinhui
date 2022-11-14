// 路由配置信息
export default  [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:'/home',
        component:()=>import('@/pages/home'),
        meta:{ show:true }
    },
    {
        path:'/search/:keyword?',
        component:()=>import('@/pages/search'),
        meta:{ show:true },
        name:'search',

    },
    {
        path:'/login',
        component:()=>import('@/pages/login'),
        meta:{ show:false }
    },
    {
        path:'/detail/:skuid?',
        component: ()=>import('@/pages/detail'),
        name:'detail',
        meta:{ show:true },
    },
    {
        path:'/addcartsuccess',
        component:()=>import('@/pages/addcartsuccess'),
        meta:{ show:true }
    },
    {
        path:'/shopcart',
        component:()=>import('@/pages/shopcart'),        
        meta:{ show:true }
    },
    {
        path:'/register',
        component:()=>import('@/pages/register'),
        meta:{ show:false }
    },
    {
        path:'/trade',
        component:()=>import('@/pages/trade'),
        meta:{ show:true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:()=>import('@/pages/pay'),
        meta:{ show:true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
        if(from.path == '/trade'){
            next()
        }else{
            next(false)
        }
    }
    },
    {
        path:'/paysuccess',
        component:()=>import('@/pages/paysuccess'),
        meta:{ show:true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
        if(from.path == '/trade'){
            next()
        }else{
            next(false)
            }
        }
    },
    {
        path:'/center',
        component:()=>import('@/pages/center'),
        meta:{ show:true },
        children:[
            {
                path:'/center',
                redirect:"/center/myorder"
            },
            {
                path:'myorder',
                component:()=>import('@/pages/center/myOrder')
            },
            {
                path:'grouporder ',
                component:()=>import('@/pages/center/groupOrder')
            }
        ]
    },
]