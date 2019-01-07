<template>
  <ul v-if="list&&list.length">
    <li v-for="(item,index) in list" :key="item.val+index">
      <div>{{item.val}}</div>
      <Comments :list="item.children"/>
    </li>
  </ul>
</template>

<script>
export default {
  name:'Comments',
  props:['list'],
}
</script>
