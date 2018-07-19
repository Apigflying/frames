<template>
  <div class="px-date-shortcut">
    <div
      v-for="(item,index) in list" :key="index"
      class="el-date-shortcut__item"
      @click="active = index;"
    >
      <a
        href="javascript:;"
        v-bind:class="{'el-date-shortcut__a':true,'active':index === active}"
      >{{item}}</a>

    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      list: {
        type: Array,
        'default': function () {
          return ['今天','7天','15天','30天'];
        }
      },
      // 父组件在使用v-model的时候，需要在子组件中显示声明value
      value:{
        default:0
      }
    },
    computed:{
      active:{
        get (){
          return this.value;
        },
        set (val){
          this.$emit('input',val);
          return val;
        }
      }
    }
  };
</script>

<style lang="scss">
  .px-date-shortcut {
    .el-date-shortcut__item {
      display: inline-block;
      padding: 0 15px;
      margin-right: 33px;
      cursor: pointer;
    }

    .el-date-shortcut__a {
      text-decoration: none;
      font-size: 12px;
      color: #016cdf;
      letter-spacing: -0.29px;
    }

    .el-date-shortcut__a.active {
      color: #333333;
    }
  }

</style>
