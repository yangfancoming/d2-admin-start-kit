import request from '@/plugin/axios'


export function PluginMocksAjax () {
    return request({
        url: '/demo/plugins/mock/ajax',
        method: 'get'
    })
}
export function testGoat () {
    return request({
        url: '/demo/plugins/mock/test',
        method: 'get'
    })
}

export function test1 () {
    return request({
        url: '/api/mock/test1',
        method: 'get'
    })
}
export function test2 () {
    return request({
        url: '/mock/test2',
        method: 'get'
    })
}
export function test3 () {
    return request({
        url: '/mock/test3',
        method: 'get'
    })
}