<template>
  <div class="element-ui">
    <div class="component-wrap select">
      <el-button class="component-title" @click="getSelects">下拉组件:</el-button>

      <cSelect class="c-select" :options="selectOptions" @change="changeSelect" />
    </div>
    <div class="component-wrap checkboxgroup">
      <el-button class="component-title" @click="getCheckeds">多选组件:</el-button>

      <cChecks class="c-checks" v-model="checkOptions" />
    </div>
    <div class="component-wrap table">
      <el-button class="component-title" type="primary">表格组件:</el-button>
      <cTable class="c-table" :options="tableOptions" @tablePageChange="testTablePageChange" @tableSizeChange="tableSizeChange">
        <h5 class="common-h5" slot="custom">
          这里是自定义内容
        </h5>
      </cTable>
    </div>
    <div class="component-wrap dialog">
      <div class="component-title">
        弹窗组件:
      </div>
      <cDialog v-model="isDialogShow">
        <div slot="open">
          <el-button type="primary" @click="showDialog">打开弹窗</el-button>
        </div>
        <div>
          这里是组件内要展示的东西
        </div>
        <div slot="footer">
          <el-button type="primary" @click="closeDialog">关闭弹窗</el-button>
        </div>
      </cDialog>
    </div>

    <div>
      <button @click="testComputed">点击测试</button>
      {{fillName}} - {{a}} - {{b}}
    </div>
  </div>
</template>

<script>
  import cSelect from 'components/select'
  import cChecks from 'components/checkbox'
  import cTable from 'components/table'
  import cDialog from 'components/dialog'
  import {
    getTotal
  } from 'api/test'
  export default {
    name: 'ElementUI',
    components: {
      cSelect,
      cChecks,
      cTable,
      cDialog
    },
    data: function() {
      return {
        isDialogShow: false, // 控制弹窗展示
        checkOptions: [ // 选项集
          {
            label: '1',
            value: '选项一',
            isCheck: true
          }, {
            label: '2',
            value: '选项二',
            isCheck: false
          }, {
            label: '3',
            value: '选项三',
            isCheck: false
          }, {
            label: '4',
            value: '选项四',
            isCheck: false
          }
        ],
        selectOptions: {
          placeholder: '请选择你的',
          // 最终选择的项(默认选项是下方数组项)
          select: null,
          // 可选项
          selectOptions: [{
            label: '选项一',
            value: '1'
          }, {
            label: '选项二',
            value: '2'
          }, {
            label: '选项三',
            value: '3'
          }]
        },
        tableOptions: {
          tablePagination: { // 显示分页组件
            type: 'test', // 分页组件类别，依据类别判断当前操作的是哪个分页
            pagination: null // 分页的配置内容
          },
          tableFormat: {
            date: {
              value: '时间',
              isFixed: true,
              width: '100px', // width固定像素
              // minWidth:'40%' //
            },
            name: {
              value: '姓名',
              width: '100px',
              // minWidth: '40%'
            },
            address: {
              value: '地址',
              width: '300px',
              // minWidth:'40%'
            },
            a: {
              value: 'a的标题'
            },
            b: {
              value: 'b的标题'
            }
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            a: 'aaaaaaaaa',
            b: 'bbbbbbbbb'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            a: 'aaaaaaaaa',
            b: 'bbbbbbbbb'
          }]
        },
        a:'a',
        b:'b'
      }
    },
    computed:{
      fillName:{
        get(){
          return this.a + this.b
        },
        set(val){
          this.a = val.slice(0,4);
          // this.b = val.slice(4)
        }
      }
    },
    mounted() {
      // this.getPagations();
    },
    methods: {
      testComputed(){
        this.fillName = 'abcdefghijklmn';
      },
      getSelects(){

      },
      getCheckeds() { // 测试checkbox组件
        this.checkOptions.forEach(item => {
          console.log(`label:${item.label};是否点击:${item.isCheck}`);
        })
      },
      showDialog() {
        this.isDialogShow = true
      },
      closeDialog() {
        this.isDialogShow = false
      },
      getPagations() {
        getTotal().then(res => {
          let {
            data
          } = res;
          this.tableOptions.tablePagination.pagination = data;
        })
      },
      tableSizeChange({
        size
      }) {
        console.log(size);
      },
      // 有分页的table，在分页更改当前页面时触发的事件
      testTablePageChange({
        type,
        current
      }) {
        console.log(type, current);
      },
      changeSelect(select) {
        this.selectOptions.select = select;
        console.log(this.selectOptions.select);
      },
      changeChecks(checked) {
        this.checkBoxOptions.checked = checked;
        console.log(this.checkBoxOptions.checked);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/base";
  .component-wrap {
    @include fj(flex-start);
    margin-top: 10px; // 通用的组件头部
    .component-title {
      margin: 0 20px;
    } // 自定义下拉菜单的样式
    .c-select {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 10px 2px red;
    } // 自定义表格的样式
    .c-table {
      border: 1px solid greenyellow;
      .common-h5 {
        margin-top: 20px;
      }
    }
  }
</style>
