<template>
<div>
  组件b
  <router-link to="/">跳转到首页</router-link>
  <div @click.left="left" @click.right.prevent.stop="right">
    鼠标左键和右键点击这段文字
  </div>
  <todoList :todos="todos">
    <template slot-scope="{todo}">
      <span v-if="todo.isComplete">✔️</span>{{todo}}
    </template>
  </todoList>
</div>
</template>

<script>
import todoList from 'components/slot-scope'
export default {
  name: 'pathA',
  components:{
    todoList
  },
  data: function() {
    return {
      test:'str',
      renderData: null,
      otherRender: '',
      renderData:null,
      todos:[{text:123,isComplete:false},{text:'abc',isComplete:true}]
    }
  },
  mounted() {
  },
  methods: {
    left(){
      alert(1);

    },
    right(){
      alert(2);

    },
    getDatas(){
      let n=0;
      return ()=>{
        console.log(n++);
      }
    },
    abc(){}
  }
}
</script>

<style scoped lang="scss">
@import '../../style/base';
.chartsTest {
  @include wh(500px, 500px);
  border: 1px solid red;
}

.abc {
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border: 1px solid #fff;
}
</style>
