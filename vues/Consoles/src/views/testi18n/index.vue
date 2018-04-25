<template>
<div>
  尝试切换国际化
  {{$t('route.dashboard')}}
  <el-button type="primary" @click="changeLang">主要按钮</el-button>
</div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'login',
  data: function() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    changeLang(){
      let locale = this.$i18n.locale
      locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/base';
</style>
