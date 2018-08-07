// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = {
    props:['id'],
    template: '<div>' +
                '<div>foo {{ id }}</div>' +
                '<router-view></router-view>' +
            '</div>',
    watch:{
        '$route'(to,from){
            console.log("router change");
        }
    }
}

const User = {
    template:'<div>i am user</div>'
}

const Pro={
    template:'<div>i am pro</div>'
}

const Bar = { template: '<div>bar {{ $route.params.id }}</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '/foo/:id',
        components: {
            default:Foo,
            a:User,
            b:Pro
        } ,
        props:{
            default:true,
            a:false,
            b:false
        },
        children:[
            {
                path:"user",
                component:User
            },
            {
                path:"pro",
                component:Pro
            }
        ]
    },
    {
        path: '/bar/:id',
        component: Bar
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    // mode:'history',//- 使用时要考虑路径相关层级
    routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app')

// 现在，应用已经启动了！