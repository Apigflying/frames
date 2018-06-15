<template>
  <ul>
    <li v-for="(todo,index) in todos" :key="index">
        <!-- todo将会传递给父组件,父组件接收到的是{todo} -->
      <slot :todo="todo">
        如果父组件内使用了template（引用了slot-scope），那么这里的todo.text不会被渲染
        如果父组件内没有使用slot-scope，那么这里的todo.text会被展示
        {{todo.text}}
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  props:['todos'],

}
</script>

