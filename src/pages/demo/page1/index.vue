<template>
    <d2-container :filename="filename">
        <div slot="header">
            <el-button size="mini" type="primary"  @click="ajax">
                <d2-icon name="paper-plane"/> 请求 mock 数据1
            </el-button>

            <el-button size="mini" type="primary"  @click="ajax2">
                <d2-icon name="paper-plane"/> 请求 mock 数据2
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
                table: {
                    columns: [],
                    data: [],
                    size: 'mini',
                    stripe: true,
                    border: true
                }
            }
        },
        methods: {
            ajax () {
                mockService.PluginMocksAjax()
                    .then(res => {
                        this.table.columns = Object.keys(res.list[0]).map(e => ({label: e,prop: e }))
                        this.table.data = res.list
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
            }
        }
    }
</script>
