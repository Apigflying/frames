<template>
<div>
  <div class="wrap">
    <div class="introduce">测试axios下载文件</div>
    <el-button @click="testdownload">点击下载</el-button>
  </div>
  <div class="wrap">
    <div class="introduce">测试vue鼠标左键和右键</div>
    <div @click.left="left" @click.right.prevent.stop="right">
      鼠标左键和右键点击这段文字
    </div>
  </div>
</div>
</template>

<script>
import { downloadfile } from 'api/test'

export default {
  name: 'test',
  data: function() {
    return {

    }
  },
  mounted() {
  },
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
    },
    left(){
      alert(1);
    },
    right(){
      alert(2);
    },
  }
}
</script>

<style scoped lang="scss">
@import '~style/base';
.wrap{
  border:1px solid rgba(219, 66, 66, 0.5);
  padding:40px;
  margin-bottom:20px;
}
</style>
