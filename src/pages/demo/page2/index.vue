<template>
    <d2-container :filename="filename">
        <template slot="header">Page 2 header</template>


        <d2-crud
                ref="d2Crud"
                :columns="columns"
                :data="data"
                :rowHandle="rowHandle"
                add-title="我的新增"
                :add-template="addTemplate"
                edit-title="我的修改"
                :edit-template="editTemplate"
                :form-options="formOptions"
                :options="options"
                selection-row  @selection-change="handleSelectionChange"
                @dialog-open="handleDialogOpen"
                @row-add="handleRowAdd"
                @row-edit="handleRowEdit"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @custom-emit-1="handleCustomEvent">
            <!--<el-button slot="header" type="primary" size="mini"  @click="test">测试</el-button>-->
            <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
            <el-button slot="header" style="margin-bottom: 5px" @click="addRowWithNewTemplate">使用自定义模板新增</el-button>
            <el-button slot="header" style="margin-bottom: 5px" @click="editRowWithNewTemplate">使用自定义模板编辑第三行</el-button>
        </d2-crud>


    </d2-container>
</template>


<script>
    // import * as userService from "@/api/user";

    export default {
        name: 'page2',
        data () {
            return {
                filename: __filename,
                columns: [
                    { title: '日期', key: 'date' },
                    { title: '姓名', key: 'name'  },
                    { title: '地址', key: 'address' }
                ],
                data: [
                    {
                        date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',
                        forbidEdit: true,showEditButton: true,showRemoveButton: true,forbidRemove: false,
                    },
                    {
                        date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',
                        forbidEdit: false,showEditButton: true,showRemoveButton: true,forbidRemove: false,
                    },
                    {
                        date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',
                        forbidEdit: false,showEditButton: false,showRemoveButton: false,forbidRemove: false,
                    },
                    {
                        date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',
                        forbidEdit: false,showEditButton: true,showRemoveButton: true,forbidRemove: true,
                    }
                ],
                options: {
                    border: true
                },
                rowHandle: {
                    columnHeader: '操作',
                    edit: {
                        icon: 'el-icon-edit',
                        text: '编辑',
                        size: 'small',
                        show (index, row) {
                            if (row.showEditButton) {
                                return true
                            }
                            return false
                        },
                        disabled (index, row) {
                            if (row.forbidEdit) {
                                return true
                            }
                            return false
                        }
                    },
                    remove: {
                        icon: 'el-icon-delete',
                        size: 'small',
                        fixed: 'right',
                        confirm: true,
                        show (index, row) {
                            if (row.showRemoveButton) {
                                return true
                            }
                            return false
                        },
                        disabled (index, row) {
                            if (row.forbidRemove) {
                                return true
                            }
                            return false
                        }
                    },
                    custom: [
                        {
                            text: '自定义按钮',
                            type: 'warning',
                            size: 'small',
                            emit: 'custom-emit-1'
                        }
                    ]
                },
                addTemplate: {
                    date: { title: '日期',value: '2016-05-05'},
                    name: { title: '姓名', value: '王小虎'},
                    address: { title: '地址', value: '上海市普陀区金沙江路 1520 弄'}
                },
                editTemplate: {
                    date: { title: '日期',value: '' },
                    name: { title: '姓名', value: ''},
                    address: { title: '地址',value: ''},
                    forbidEdit: {
                        title: '禁用按钮',
                        value: false,
                        component: {
                            show: false
                        }
                    },
                    showEditButton: {
                        title: '显示按钮',
                        value: true,
                        component: {
                            show: false
                        }
                    }
                },
                formOptions: {
                    labelWidth: '80px',
                    labelPosition: 'left',
                    saveLoading: false
                }
            }
        },
        methods: {
            handleSelectionChange (selection) {
                console.log(selection)
            },
            // test() {
            //     userService.getUser(123).then(data => {
            //         console.log(data,112);
            //     });
            // },
            handleDialogOpen ({ mode }) {
                this.$message({ message: '打开模态框，模式为：' + mode, type: 'success'})
            },
            // 普通的新增
            addRow () {
                this.$refs.d2Crud.showDialog({
                    mode: 'add'
                })
            },
            // 传入自定义模板的新增
            addRowWithNewTemplate () {
                this.$refs.d2Crud.showDialog({
                    mode: 'add',
                    template: {
                        name: { title: '姓名',value: ''},
                        value1: { title: '新属性1',value: ''} ,
                        value2: { title: '新属性2',value: ''}
                    }
                })
            },
            handleRowAdd (row, done) {
                this.formOptions.saveLoading = true
                setTimeout(() => {
                    console.log(row)
                    this.$message({ message: '保存成功',type: 'success' });
                    // done可以传入一个对象来修改提交的某个字段
                    done({
                        address: '我是通过done事件传入的数据！'
                    })
                    this.formOptions.saveLoading = false
                }, 300)
            },
            handleRowEdit ({ index, row }, done) {
                this.formOptions.saveLoading = true
                setTimeout(() => {
                    console.log(index)
                    console.log(row)
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    })

                    // done可以传入一个对象来修改提交的某个字段
                    done({
                        address: '我是通过done事件传入的数据！'
                    })
                    this.formOptions.saveLoading = false
                }, 300)
            },
            handleRowRemove ({ index, row }, done) {
                setTimeout(() => {
                    console.log(index)
                    console.log(row)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    done()
                }, 300)
            },
            editRowWithNewTemplate () {
                this.$refs.d2Crud.showDialog({
                    mode: "edit",
                    rowIndex: 2,
                    template: {
                        date: { title: '日期',value: ''},
                        name: { title: '姓名',value: ''}
                    }
                })
            },
            handleDialogCancel (done) {
                this.$message({ message: '取消保存', type: 'warning'});
                done()
            },
            handleCustomEvent ({index, row}) {
                console.log(index)
                console.log(row)
            }
        }
    }
</script>