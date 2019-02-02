<template>
    <d2-container :filename="filename">
        <div slot="header">
            <el-button size="mini" type="primary"  @click="ajax">
                <d2-icon name="paper-plane"/> 请求 mock 数据1
            </el-button>

            <el-button size="mini" type="primary"  @click="ajax2">
                <d2-icon name="paper-plane"/> 请求 mock 数据2
            </el-button>

            <el-button size="mini" type="primary"  @click="ajax3">
                <d2-icon name="paper-plane"/> 请求 mock 数据3
            </el-button>

            <el-button size="mini" type="primary"  @click="ajax4">
                请求 mock 数据4
            </el-button>
            <el-select v-model="value" placeholder="请选择">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>

            <el-button size="mini" type="primary"  @click="ajax5">
                请求 mock 数据5
            </el-button>

        </div>
        <el-table  v-bind="table" style="width: 100%">
            <el-table-column  v-for="(item, index) in table.columns" :key="index" :prop="item.prop" :label="item.label"/>
        </el-table>
    </d2-container>
</template>

<script>
    import * as mockService from '@api/demo.plugins.mock.ajax'
    export default {
        name: 'page1',
        data () {
            return {
                filename: __filename,
                options:'', value: '',
                table: { columns: [],data: [],size: 'mini',stripe: true,border: true }
            }
        },
        methods: {
            ajax () {
                mockService.PluginMocksAjax()
                    .then(res => {
                        console.log(res.haha,111111111111)
                        console.log(res.haha.gogo[0],222222)
                        this.table.columns = Object.keys(res.haha.gogo[0]).map(e => ({label: e,prop: e }))
                        this.table.data = res.haha.gogo
                    })
                    .catch(() => {
                        // 错误情况
                    })
            },
            ajax2 () {
                mockService.testGoat()
                    .then(res => {
                        this.table.columns = Object.keys(res.list[0]).map(e => ({label: e,prop: e }))
                        this.table.data = res.list
                    })
                    .catch(() => {
                        // 错误情况
                    })
            },
            ajax3 () {
                mockService.test1()
                    .then(res => {
                        console.log(res,'test1..........................')
                    })
                    .catch(() => {
                        // 错误情况
                    })
            },
            ajax4 () {
                mockService.test2().then(res => {
                    this.options = res.options.select;
                    this.value = res.options.value;
                }) .catch(() => {})
            },
            ajax5 () {
                mockService.test3().then(res => {
                    console.log(res)
                }) .catch(() => {})
            },
        }
    }
</script>
