<template>
    <d2-container :filename="filename">
        <template slot="header">Page 3 header</template>

        <el-button size="mini" type="primary"  @click="ajax1">
            请求 mock 数据1
        </el-button>
        <el-select v-model="value" placeholder="请选择">
            <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <br/>

        <el-button size="mini" type="primary"  @click="ajax2">
            请求 mock 数据2
        </el-button>

    </d2-container>
</template>

<script>
    import * as mockService from '@api/demo.plugins.mock.ajax'
    export default {
        name: 'page3',
        data () {
            return {
                filename: __filename,
                value: '',
                options:''
            }
        },
        methods: {
            ajax1 () {
                mockService.test2().then(res => {
                    this.options = res.options.select;
                    this.value = res.options.value;
                }) .catch(() => {})
            },
            ajax2 () {
                mockService.test3().then(res => {
                    console.log(res)
                }) .catch(() => {})
            },
        }
    }
</script>
