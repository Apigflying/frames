<template>
  <div class="container">
    <button @click="testdownload" v-show="show">点击下载</button>
    <cHeader :title="title"/>
    <cNav/>
    <router-view/>
    <cFooter/>
  </div>
</template>

<script>
import cHeader from 'views/common/header'
import cFooter from 'views/common/footer'
import cNav from 'views/common/nav'
import { downloadfile } from 'api/test'
export default {
  name: 'home',
  components: {
    cHeader,
    cFooter,
    cNav
  },
  watch: {
    $route (to) {
      switch (to.name) {
        case 'element-ui':
          this.title = 'element-ui组件库'
          break;
        case 'pathb':
          this.title = 'pathb测试专用'
          break;
      }
    }
  },
  data: function () {
    return {
      title: 'element-ui组件库',
      show: true
    }
  },
  mounted () { },
  methods: {
    testdownload () {
      let that = this;
      that.show = false;
      console.log('点击了，隐藏按钮');
      downloadfile().then(res => {
        console.log(res.data);
        let url = window.URL.createObjectURL(
          new Blob([res.data],
            {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
            }
          )
        )
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'abcd.xlsx')
        document.body.appendChild(link)
        link.onclick = function () {
          that.show = true;
          console.log('下载了，显示按钮');
        }
        link.click()
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); //释放掉blob对象
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/base";
</style>
