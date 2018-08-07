var app=new Vue({
    el:"#app",
    data:{
        message:"Hello Vue!"
    },
    mounted:function(){
        var that=this;
        setInterval(function(){
            that.message=new Date().toLocaleTimeString()
        },1000)
    }
})

var app2=new Vue({
    el:"#app-2",
    data:{
        message:"页面加载于"+new Date().toLocaleString()
    }
})

var app3=new Vue({
    el:"#app-3",
    data:{
        seen:true
    }
})

var app4=new Vue({
    el:"#app-4",
    data:{
        todos:[
            { text:"我是第一个内容"},
            { text:"我是第二个内容"},
            { text:"我是第三个内容"}
        ]
    }
})

var app5=new Vue({
    el:"#app-5",
    data:{
        message:"我是文字"
    },
    methods:{
        reverseMsg:function(){
            this.message=this.message.split("").reverse().join("")
        }
    }
})

var app6=new Vue({
    el:"#app-6",
    data:{
        message:""
    }
})

Vue.component("todo-item",{
    props:["todo"],
    template:"<li>{{ todo.text }}</li>"
})

var app7=new Vue({
    el:"#app-7",
    data:{
        message: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
})

var app8=new Vue({
    el:"#app-8",
    data:{
        message:"<span style='color:red;'>我是红色的</span>"
    }
})

var app9=new Vue({
    el:"#app-9",
    data:{
        message:"测试逆转消息"
    }
})

var appx=new Vue({
    el:"#app-x",
    data:{
        time:"时间是"+new Date().toLocaleString(),
        message:"我是文字，测试逆转消息"
    },
    methods:{
        reverse:function(){
            this.message=this.message.split("").reverse().join("")
        }
    }
})

var appx0=new Vue({
    el:"#app-x0",
    data:{
        question:"",
        answer:"不输入问题是没法回答问题的"
    },
    watch:{
        question:function(){
            this.answer="输入中......";
            this.getAnswer()
        }
    },
    methods:{
        getAnswer:_.debounce(function(){//500ms执行一次
            if (this.question.indexOf('?') === -1) {
                this.answer = '问题要包含一个‘？‘;-)'
                return
            }
            this.answer = '解析中...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                })
        },500)
    }
})

var appx1=new Vue({
    el:"#app-x1",
    data:{
        ist0:true,
        ist1:true
    },
    methods:{
        change:function(){
            this.ist1=false;
        }
    }
})

var appx2=new Vue({
    el:"#app-x2",
    data:{
        classObj:{
            ist0:true,
            ist1:true
        }
    },
    methods:{
        change:function(){
            this.classObj.ist1=false;
        }
    }
})

var appx3=new Vue({
    el:"#app-x3",
    data:{
        number:0
    }
})


var c = new Vue({
    el:'dd',
    data:{
        dd:a
    }
})