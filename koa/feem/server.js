let Koa = require('koa');
let Router = require('koa-router');

let cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

let columns = [
    {
        key: 'checked',
        type: 'selection',
        typeSet: {
            checked: false,
        },
    },
    {
        title: '序号',
        key: 'serialNumber',
    },
    {
        title: '序号1',
        key: 'serialNumber1',
        hidden: true,
    },
    {
        title: '会计月',
        key: 'accountantMonth',
        type: 'select',
        typeSet: {
            placeholder: '（全部）',
            value: '',
            data: [
                {
                    value: '0',
                    label: '1'
                },
                {
                    value: '1',
                    label: '2'
                },
                {
                    value: '2',
                    label: '3'
                },
            ],
        }
    },
    {
        title: '库存数量',
        key: 'stockQuantity',
        type: 'input',
        typeSet: {
            placeholder: '输入框',
            dataValue: '',
        },
        dataType: 'checkbox',
    },
    {
        title: '月初库存',
        key: 'beginingMonth',
        type: 'select',
        typeSet: {
            placeholder: '多选',
            value: '',
            multiple: true,
            data: [
                {
                    value: '0',
                    label: '555'
                },
                {
                    value: '1',
                    label: '666'
                },
                {
                    value: '2',
                    label: '777'
                },
            ],
        },
        dataType: 'input',
    },
    {
        title: '销售品种数',
        key: 'sellClassQuantity',
        type: 'select',
        typeSet: {
            placeholder: '远程数据源',
            value: '',
            dataMethod: 'GET',
            dataUrl: 'test/select',
            data: [],
        },
        dataType: 'itemSelect',
        dataTypeSet: {
            data: [
                {
                    value: '0',
                    label: '选择值0'
                },
                {
                    value: '1',
                    label: '选择值1'
                },
                {
                    value: '2',
                    label: '选择值2'
                },
            ],
        }
    },
    {
        title: '有销售且有库存品种数',
        key: 'sellAndStockClassQuantity',
        type: 'cascader',
        typeSet: {
            placeholder: '级联选择',
            value: [],
            trigger: 'hover',
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
        },
        dataType: 'itemSelectCheckbox',
        dataTypeSet: {
            data: [
                {
                    value: '0',
                    label: '选择值0'
                },
                {
                    value: '1',
                    label: '选择值1'
                },
                {
                    value: '2',
                    label: '选择值2'
                },
                {
                    value: '3',
                    label: '选择值3'
                },
            ],
        },
    },
    {
        title: '有库存品种数',
        key: 'stockClassQuantity',
        type: 'cascader',
        typeSet: {
            placeholder: '级联选择server',
            value: [],
            dataMethod: 'GET',
            dataUrl: 'test/cascader',
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: [],
                    loading: false
                },
                {
                    value: 'hangzhou',
                    label: '杭州',
                    children: [],
                    loading: false
                }
            ],
        },
    },
    {
        title: '销售额',
        key: 'salesVolume',
        type: 'time',
        typeSet: {
            type: 'date',
            placeholder: '时间选择',
            value: '2018-11-11'
        },
    },
    {
        title: '耗损金额',
        key: 'lossAmount',
        type: 'time',
        typeSet: {
            type: 'daterange',
            placeholder: '时间选择',
            value: ''
        },
    },
    {
        title: '配送金额',
        key: 'deliveryAmount',
        type: 'time',
        typeSet: {
            type: 'datetime',
            placeholder: '时间选择',
            value: '2018-11-11'
        },
    },
    {
        title: '配送退回金额',
        key: 'deliveryBackAmount',
        type: 'time',
        typeSet: {
            type: 'datetimerange',
            placeholder: '时间选择',
            value: ''
        },
    },
    {
        title: '商品满足率',
        key: 'productFillRate',
        type: 'select',
        typeSet: {
            placeholder: '（全部）',
            value: '',
            data: [
                {
                    value: '0',
                    label: '10%'
                },
                {
                    value: '1',
                    label: '20%'
                },
                {
                    value: '2',
                    label: '30%'
                },
            ],
        }
    },
]
let dataJson = {
    checked: false,
    serialNumber: 1,
    accountantMonth: '3',
    stockQuantity: false,
    beginingMonth: '222',
    sellClassQuantity: '0',
    sellAndStockClassQuantity: '0',
    stockClassQuantity: '2',
    salesVolume: '5000.0',
    lossAmount: '1000.0',
    deliveryAmount: '100.0',
    deliveryBackAmount: '50.0',
    productFillRate: '10%',
}

let datalist = [];
for (let i = 0; i < 55; i++) {
    datalist.push({
        ...dataJson,
        serialNumber: i + 1
    });
}

/**
 * 验证key
 *
 *  required 必填，格式默认为string
 *  length_min_10 string长度限制，最小值
 *  length_max_10 string长度限制，最大值
 *  email 邮箱
 *  phoneNumber 手机号
 *  IDnumber 身份证号
 *  chinese 汉字
 * */
let formHeader = [
    {
        title: '输入框非空',
        key: 'inputTest',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                }
            ],
        },
    },
    {
        title: '输入框隐藏',
        key: 'inputHidden',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
        },
        hidden: true,
    },
    {
        title: '输入框不可操作',
        key: 'inputDisabled',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
        },
        disabled: true,
    },
    {
        title: '输入email',
        key: 'inputRequired',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'email',
                    msg:'email格式不符合规范',
                }
            ],
        },
    },
    {
        title: '输入长度限制最小10位',
        key: 'inputRequiredLengthmin',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'length_min_10',
                    msg:'输入长度不能少于10位',
                }
            ],
        },
    },
    {
        title: '输入长度限制最大10位',
        key: 'inputRequiredLengthmax',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'length_max_10',
                    msg:'输入长度不能多于10位',
                    trigger:'change'
                }
            ],
        },
    },
    {
        title: '输入手机号',
        key: 'inputRequiredPhoneNumber',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'phoneNumber',
                    msg:'输入手机号格式不正确',
                }
            ],
        },
    },
    {
        title: '输入身份证号',
        key: 'inputRequiredIDNumber',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'IDNumber',
                    msg:'输入身份证号不符合要求',
                }
            ],
        },
    },
    {
        title: '输入汉字',
        key: 'inputRequiredChinese',
        type: 'input',
        typeSet: {
            value:'',
            placeholder: '提示文字',
            validate:[
                {
                    type:'required',
                    msg:'输入不能为空',
                },
                {
                    type:'chinese',
                    msg:'请输入汉字',
                }
            ],
        },
    },
    {
        title: '下拉框',
        key: 'selectTest',
        type: 'select',
        typeSet: {
            value:'',
            placeholder: '（全部）',
            data: [
                {
                    value: '0',
                    label: '选择值0'
                },
                {
                    value: '1',
                    label: '选择值1'
                },
                {
                    value: '2',
                    label: '选择值2'
                },
            ],
        }
    },
    {
        title: '下拉框多选',
        key: 'selectTestMultiple',
        type: 'select',
        typeSet: {
            value:'',
            placeholder: '（全部）',
            multiple: true,
            data: [
                {
                    value: '0',
                    label: '选择值0'
                },
                {
                    value: '1',
                    label: '选择值1'
                },
                {
                    value: '2',
                    label: '选择值2'
                },
            ],
        }
    },
    {
        title: '下拉框server',
        key: 'selectServer',
        type: 'select',
        typeSet: {
            value:'',
            placeholder: '（全部）',
            dataMethod:'GET',
            dataUrl: '',
            data: [],
        }
    },
    {
        title: '级联选择',
        key: 'cascader',
        type: 'cascader',
        typeSet: {
            value:[],
            placeholder: '级联选择',
            trigger: 'hover',
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                },
                {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    },
    {
        title: '级联选择server',
        key: 'cascaderServer',
        type: 'cascader',
        typeSet: {
            value:[],
            placeholder: '级联选择server',
            dataMethod:'GET',
            dataUrl:'',
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: [],
                    loading: false
                },
                {
                    value: 'hangzhou',
                    label: '杭州',
                    children: [],
                    loading: false
                }
            ],
        },
    },
    {
        title: '时间某天',
        key: 'date',
        type: 'time',
        typeSet: {
            value:'',
            type: 'date',
            placeholder: '时间选择',
        },
    },
    {
        title: '时间段',
        key: 'daterange',
        type: 'time',
        typeSet: {
            value:'',
            type: 'daterange',
            placeholder: '时间选择',
        },
    },
    {
        title: '时间某天(时分秒)',
        key: 'datetime',
        type: 'time',
        typeSet: {
            value:'',
            type: 'datetime',
            placeholder: '时间选择',
        },
    },
    {
        title: '时间段(时分秒)',
        key: 'datetimerange',
        type: 'time',
        typeSet: {
            value:'',
            type: 'datetimerange',
            placeholder: '时间选择',
        },
    },
    {
        title: '单选',
        key: 'radio',
        type: 'radio',
        typeSet: {
            value:'apple',
            dataList: [
                {
                    value: '0',
                    label: 'apple'
                },
                {
                    value: '1',
                    label: 'window'
                },
                {
                    value: '2',
                    label: 'mac'
                },
            ],
        }
    },
    {
        title: '多选',
        key: 'checkbox',
        type: 'checkbox',
        typeSet: {
            value:['apple','window'],
            dataList: [
                {
                    value: '0',
                    label: 'apple'
                },
                {
                    value: '1',
                    label: 'window'
                },
                {
                    value: '2',
                    label: 'mac'
                },
            ],
        }
    },
    {
        title: '数字输入框',
        key: 'inputNumber',
        type: 'inputNumber',
        typeSet: {
            value:0,
            min: 0,
            max: 10,
        }
    },
    {
        title: '数字输入框百分比',
        key: 'percentage',
        type: 'percentage',
        typeSet: {
            value:0,
            min: 0,
            max: 100,
        }
    },
    {
        title: '密码框',
        key: 'password',
        type: 'password',
        typeSet: {
            value:'',
            placeholder: '提示文字,密码',
        }
    },
    {
        title: '多行文本',
        key: 'textarea',
        type: 'textarea',
        typeSet: {
            value:'',
            placeholder: '提示文字',
        }
    },
    {
        title: '网络地址',
        key: 'httpAddress',
        type: 'httpAddress',
        typeSet: {
            value:'',
            prepend: 'http',
            append: 'cn',
            placeholder: '网络地址',
        }
    },
]

router
    // 获取表头信息
    .get('/test/h3/get_columns', async ctx => {

        let backJson = {
            bizSuccess: true,
            data: columns,
        }
        ctx.body = backJson;

    })

    // 获取数据体
    .get('/test/h3/get_data', async ctx => {

        let params = afun.getparams(ctx.request.url)
        let pageSize = params.pageSize;
        let pageIndex = params.pageIndex;

        let backlist = datalist.slice(parseInt(pageIndex - 1) * parseInt(pageSize), parseInt(pageIndex) * parseInt(pageSize));

        let backJson = {
            bizSuccess: true,
            total: 45,
            pageIndex: pageIndex,
            pageSize: pageSize,
            dataList: backlist,
        }
        ctx.body = backJson;

    })

    // 获取表单表头信息
    .get('/test/h3/get_formdata', async ctx => {

        let backJson = {
            bizSuccess: true,
            data:formHeader,
        }
        ctx.body = backJson;

    })

    // TODO 创建
    .get('/test/h3/get_create', async ctx => {

        let backJson = {
            bizSuccess: true,
        }
        ctx.body = backJson;

    })

    // TODO 更新
    .get('/test/h3/get_update', async ctx => {

        let backJson = {
            bizSuccess: true,
        }
        ctx.body = backJson;

    })

    // 删除
    .get('/test/h3/get_delete', async ctx => {

        let params = afun.getparams(ctx.request.url)
        let serialNumber = params._serialNumber;

        let narr = [];
        if (serialNumber.includes('[')) narr = JSON.parse(serialNumber); else narr.push(serialNumber)

        for (let i = 0; i < datalist.length; i++) {
            for (let j = 0; j < narr.length; j++) {
                if (datalist[i].serialNumber == narr[j]) {
                    datalist.splice(i, 1);
                }
            }
        }

        let backJson = {
            bizSuccess: true,
        }
        ctx.body = backJson;

    })

    // 获取数据体可操作配置信息
    .get('/test/h3/get_config', async ctx => {

        let backJson = {
            bizSuccess: true,
            data: {
                creat: {
                    parameterType: "array",
                    parameterMethod: "GET",
                    parameters: {},
                    url: "http://192.168.10.65:3000/test/h3/get_create"
                },
                update: {
                    parameterType: "array",
                    parameterMethod: "GET",
                    parameters: {},
                    url: "http://192.168.10.65:3000/test/h3/get_update"
                },
                getHeader_createOrUpdate: {
                    parameterType: "array",
                    parameterMethod: "GET",
                    parameters: {},
                    url: "http://192.168.10.65:3000/test/h3/get_formdata"
                },
                retrieve: {
                    parameterType: "array",
                    parameterMethod: "GET",
                    parameters: {
                        accountantMonth: '_accountantMonth',
                        stockQuantity: '_stockQuantity',
                    },
                    url: "http://192.168.10.65:3000/test/h3/get_data"
                },
                delete: {
                    parameterType: "array",
                    parameterMethod: "GET",
                    parameters: {
                        _serialNumber: 'serialNumber',
                    },
                    url: "http://192.168.10.65:3000/test/h3/get_delete"
                },
            }
        }
        ctx.body = backJson;

    })

//- 解决跨域问题
app.use(cors())

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000);

const afun = {
    getparams(url) {//- 获取参数
        if (url.indexOf("?") > -1) {
            let par = url.split("?")[1];
            let arr = par.split("&");
            let json = {};
            arr.forEach(function (val, index) {
                let vs = val.split("=");
                json[vs[0]] = vs[1];
            })
            return json;
        } else {
            return url;
        }
    },
}