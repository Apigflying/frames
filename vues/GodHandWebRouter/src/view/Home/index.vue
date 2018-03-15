<template>
<div class="abc">
  <nav>
    <router-view name="nav"></router-view>
  </nav>
  <section>
    <router-view name="prolist"></router-view> 
  </section>
</div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {}
  },
}
</script>

<style scoped>
.abc{

}
</style>