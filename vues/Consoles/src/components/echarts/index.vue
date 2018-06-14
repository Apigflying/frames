<template>
<div class="charts_wrap">
  <div class="common_chart_set" :ref="id"></div>
  <slot name="tips"></slot>
</div>
</template>

<script>
/*
 * 参数必传
 * id - 节点元素的id，用来获取元素
 * renderData - 初始没有数据的情况下，展示坐标轴，拿到数据后，更新ehart展示
*/
import echarts from 'echarts';
export default {
  props: ['id', 'renderData'],
  data () {
    return {
      myChart: null,
    };
  },
  watch: {
    renderData: {
      deep: true,
      immediate:true,// 立即执行
      handler (val) {
        if (!!val) {
          this.$nextTick(() => {
            this.drawChart(val);
          })
        }
      }
    }
  },
  methods: {
    drawChart (val) {
      const DOM = this.$refs[this.id];
      //初始化配置
      if (!!val && !!this.myChart) {
        return this.myChart.setOption(val);
      }
      if (!!DOM && !this.myChart) {//初始化节点
        this.myChart = echarts.init(DOM);
        this.myChart.setOption(this.renderData);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
.common_chart_set {
  @include wh(100%, 100%);
}
</style>
