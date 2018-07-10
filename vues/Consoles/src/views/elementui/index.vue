<template>
  <div class="element-ui">
    <div class="component-wrap select">
      <el-button class="component-title" @click="getSelects">下拉组件:</el-button>

      <cSelect v-model="select" :select-options="selectOptions" class="c-select" placeholder="请选择123"/>
    </div>
    <div class="component-wrap checkboxgroup">
      <el-button class="component-title" @click="getCheckeds">多选组件:</el-button>

      <cChecks class="c-checks" v-model="checkOptions" />
    </div>
    <div class="component-wrap table">
      <el-button class="component-title" type="primary">表格组件:</el-button>
      <cTable class="c-table" :tabelFormater="tabelFormater" :tableData="tableData" border>
        <!-- tabel组件就是一个容器，其内部的内容都由父组件自己定义，用了一个壳子 -->
        <template slot="main-text" slot-scope="{props:{props,column}}">
          <!--
            column就是tabelFormater中的每一项
            props.row就是tabelData中的每一项
          -->
          <div>{{props.row[column.key]}}</div>
        </template>
        <template slot="child-text" slot-scope="{props:{props,column}}">
          <ul>
            <li v-for="(item,index) in props.row.children" :key="index">
              {{item[column.key]||' '}}
            </li>
          </ul>
        </template>
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
      <!-- {{fillName}} - {{a}} - {{b}} -->
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
  data: function () {
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
      select: null,
      selectOptions: [{
        label: '选项一',
        value: '1'
      }, {
        label: '选项二',
        value: '2'
      }, {
        label: '选项三',
        value: '3'
      }],
      tabelFormater: [{
        label: '名字',
        key: 'name'
      }, {
        label: '类型',
        key: 'type'
      }, {
        label: '数值',
        key: 'num'
      }, {
        label: '自定义',
        key: 'custom'
      }],
      tableData: [
        {
          name: 'a',
          type: 'string',
          num: 1,
          custom: '自定义1',
          children:[{
            name:'abc',
            type:'string123'
          }]
        }, {
          name: 'a',
          type: 'string',
          num: 1,
          custom: '自定义1'
        }, {
          name: 'a',
          type: 'string',
          num: 1,
          custom: '自定义1'
        }, {
          name: 'a',
          type: 'string',
          num: 1,
          custom: '自定义1'
        }
      ]
    }
  },
  computed: {
    fillName: {
      get () {
        return this.a + this.b
      },
      set (val) {
        this.a = val.slice(0, 4);
        // this.b = val.slice(4)
      }
    }
  },
  mounted () {
    // this.getPagations();
  },
  methods: {
    testComputed () {
      this.fillName = 'abcdefghijklmn';
    },
    getSelects () {
      console.log(this.select);
    },
    getCheckeds () { // 测试checkbox组件
      this.checkOptions.forEach(item => {
        console.log(`label:${ item.label };是否点击:${ item.isCheck }`);
      })
    },
    showDialog () {
      this.isDialogShow = true
    },
    closeDialog () {
      this.isDialogShow = false
    },
    getPagations () {
      getTotal().then(res => {
        let {
          data
        } = res;
        this.tableOptions.tablePagination.pagination = data;
      })
    },
    tableSizeChange ({
      size
    }) {
      console.log(size);
    },
    // 有分页的table，在分页更改当前页面时触发的事件
    testTablePageChange ({
      type,
      current
    }) {
      console.log(type, current);
    },
    changeSelect (select) {
      this.selectOptions.select = select;
      console.log(this.selectOptions.select);
    },
    changeChecks (checked) {
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
