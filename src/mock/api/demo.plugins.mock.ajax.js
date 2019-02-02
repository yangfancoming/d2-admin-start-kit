/**
 属性名   name
 生成规则 rule   其含义 需要依赖 属性值的类型 才能确定。
 属性值   value  可以含有 @占位符,还指定了最终值的初始值和类型。
 'name|rule': value

 生成规则 有 7 种格式：
 'name|min-max': value
 'name|count': value
 'name|min-max.dmin-dmax': value
 'name|min-max.dcount': value
 'name|count.dmin-dmax': value
 'name|count.dcount': value
 'name|+step': value
 */
import Mock from 'mockjs'

// 这种方式 多了一层上级!!!  接收方 需要这样 res.mockData.goat[0] 才能拿到数据
const mockData = Mock.mock({
    'goat|3-6': [{
        'id|+1': 1,
        'name': '@CNAME',
        'creatDate': '@DATE',
        'address': '@CITY',
        'zip': '@ZIP'
    }]
})

// 这种方式 多了一层上级!!!  接收方 需要这样 res.haha.gogo[0] 才能拿到数据
const haha = Mock.mock({
    'gogo|3-6': [{
        'id|+1': 1,
        'name': '@CNAME',
        'star|1-5': '★',
        'delFlag|1': [0, 1],
        'creatDate': '@DATE',
        'address': '@CITY',
        'zip': '@ZIP'
    }]
})

const options = Mock.mock({
    'select|3-6': [{'value|+1': 1,'label': '@CNAME'}],
    'value|0-2': 0,   // 18至28以内随机整数, 0只是用来确定类型
})
// 生成省：@mock=@province()
// 21 生成市：@mock=@city()
// 22 生成县：@mock=@county()
let obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};
const user = Mock.mock({
    "user|1-3": [{   // 随机生成1到3个数组元素
        'name': '@CNAME',  // 中文名称
        'province': '@PROVINCE',  // 生成省份
        'city': '@city(true)',   // 生成市  带上省份  （西藏自治区 拉萨市）
        'city1': '@CITY',   // 生成市  不带省份   （拉萨市）
        'county': '@COUNTY',  // 生成县
        'page': '@URL',  // 生成 url
        'cword': '@cword(2,5)',  // 生成 汉字 (2-5个字)
        'csentence': '@csentence(5,15)',  // 生成 句子 (2-5个字)
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        "rank":  "@natural(1, 100)",//随机生成1-100的数字
        "mtime": "@datetime",//随机生成日期和时间
        'birthday': '@date(yyyy-MM-dd)',  // 日期
        'time': '@time(hh-mm-ss)',  // 时间
        'color': '@color',  // 16进制颜色
        'isMale|1': true,  // 布尔值
        'isFat|1-2': true,  // true的概率是1/3
        'fromObj|2': obj,  // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
    },{
        'gf': '@cname'
    }]
})
export default [
    {
        path: '/api/mock/test1',  method: 'get',
        handle () { return {  code: 0,msg: '获取数据成功',data: { mockData }}}
    },
    {
        path: '/api/demo/plugins/mock/ajax',method: 'get',
        handle () { return { code: 0,msg: '获取数据成功',data: { haha }}}
    },
    {
        path: '/api/mock/test2',method: 'get',
        handle () { return { code: 0,msg: '获取数据成功',data: { options }}}
    },
    {
        path: '/api/mock/test3',method: 'get',
        handle () { return { code: 0,msg: '获取数据成功',data: { user }}}
    },
    // 这种 方式只有一层目录  接收方 接收方式： res.list[0]
    {
        path: '/api/demo/plugins/mock/test',
        method: 'get',
        handle ({ Repeat }) {
            return {
                code: 0,
                msg: '获取数据成功',
                data: {
                    list: Repeat('1-3', {
                        'id|+1': 1,
                        'name': '@CNAME',
                        'star|1-5': '★',
                        'delFlag|1': [0, 1],
                        'creatDate': '@DATE',
                        'address': '@CITY',
                        'zip': '@ZIP'
                    })
                }
            }
        }
    }
]
