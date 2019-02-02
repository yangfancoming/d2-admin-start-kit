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
