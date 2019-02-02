<template>
    <d2-container :filename="filename">
        <template slot="header">Page 3 header</template>

        <el-button size="mini" type="primary"  @click="test">
            请求 mock 数据5
        </el-button>

    </d2-container>
</template>

<script>
    // import * as mockService from '@api/demo.plugins.mock.ajax'
    export default {
        name: 'page3',
        data () {
            return {
                filename: __filename,

            }
        },
        methods: {
            test () {
                console.log(11111111111)
            },
        }
    }
</script>
