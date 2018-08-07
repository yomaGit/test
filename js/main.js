
require(["vue","vueRouter","zepto"],function(Vue,VueRouter){//异步引入vue和zepto后执行function
    Vue.use(VueRouter);

    var disa=new Vue({
        el:"#disa",
        data:{
            isb:true
        }
    })
    setTimeout(function(){
        disa.isb=false;
    },2000)

    var test_on=new Vue({
        el:"#test_on",
        data:{},
        methods:{
            change:function(e){
                var dom=$(e.currentTarget)
                dom.html(dom.html().split(" ").reverse().join(" "))
            }
        }
    })

    var test_w=new Vue({
        el:"#test_com",
        data:{
            t:"",
            mes:"123",
            ans:"这里是答案"
        },
        watch:{
            mes:function(){
                this.ans="Waiting for you to stop typing..."
                this.getAns()
            }
        },
        methods:{
            getAns:function(){
                clearTimeout(this.t)
                var that=this
                this.t=setTimeout(function(){
                    that.ans="ok"
                },500)
            }
        }
    })

    var t_cla=new Vue({
        el:"#t_class",
        data:{
            act:true,
            act1:false
        }
    })

    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
    })

    var app7 = new Vue({
        el: '#app-7',
        data: {
            groceryList: [
                { id: 0, text: '蔬菜' },
                { id: 1, text: '奶酪' },
                { id: 2, text: '随便其他什么人吃的东西' }
            ]
        }
    })

    Vue.component("tem_c",{
        template:"<div class='d'>123</div>"
    })

    var test_t=new Vue({
        el:"#test_tem"
    })

    var test_style=new Vue({
        el:"#test_style",
        data:{
            styles:{
                color:"red",
                "font-size":"12px"
            }
        }
    })

    var test_if=new Vue({
        el:"#test_if"
    })

    var test_show=new Vue({
        el:"#test_show",
        data:{
            ok:false
        }
    })

    var test_for=new Vue({
        el:"#test_for",
        data:{
            items:[
                { msg:"foo"},
                { msg:"do"},
                { msg:"egg"}
            ]
        }
    })

    var test_k=new Vue({
        el:"#test_k",
        data:{
            items:{
                k:"keys",
                m:"moon",
                a:"arc"
            }
        }
    })

    Vue.component("child",{
        props:["mes"],
        template:"<span>{{mes}}</span>"
    })

    var test_tem=new Vue({
        el:"#test_temp"
    })

    var test_d=new Vue({
        el:"#test_d",
        data:{
            d:[1,2,3,4,5,6,7,8,9,0]
        },
        methods:{
            change:function(){
                var that=this;
                var ld=that.d;
                ld.push(11);
                ld.push(12);
                ld.push(13);
                ld.push(14);
                ld.push(15);
                that.d=ld;
            },
            menu:function(){
                this.scroll = document.body.scrollTop;
                //console.log(this.scroll);
            }
        },
        mounted:function() {
            window.addEventListener('scroll', this.menu)
        }
    })

    require(["vue_test"],function(){
        console.log("vue_test ok");
    })

    const Foo = {
        template: "<div>foo</div>"
    }
    const Bar = {
        template: "<div>bar</div>"
    }

    const User={
        template:
        '<div class="user"> ' +
            '<div>User {{ $route.params.id }}</div> ' +
            '<a href="#/user/234/profile">go to profile </a>'+
            '<a href="#/user/345/posts">go to posts</a>'+
            '<router-view></router-view> ' +
        '</div> '
    }
    const UserProfile={
        template:"<div>UserProfile</div>"
    }
    const UserPosts={
        template:"<div>UserPosts</div>"
    }

    const router = new VueRouter({
        routes: [
            {
                path: "/foo",
                name:"foo",
                component: Foo
            },
            {
                path: "/bar",
                name:"bar",
                component: Bar
            },
            {
                path: '/user/:id',
                name:"user",
                component: User,
                children: [
                    {
                        // 当 /user/:id/profile 匹配成功，
                        // UserProfile 会被渲染在 User 的 <router-view> 中
                        path: 'profile',
                        name:'profile',
                        component: UserProfile
                    },
                    {
                        // 当 /user/:id/posts 匹配成功
                        // UserPosts 会被渲染在 User 的 <router-view> 中
                        path: 'posts',
                        name:'posts',
                        component: UserPosts
                    }
                ]
            }
        ]
    })
    router.beforeEach(function(to, from, next){
        //console.log(to);
        //console.log(from);
        next(true);
    })
    const test_user=new Vue({
        router:router,
    }).$mount("#test_router")



})

require(["fastclick"],function(){
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body)
    }, false)
})