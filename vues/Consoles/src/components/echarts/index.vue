<template>
  <div class="common_chart_set" :ref="id"></div>
</template>

<script>
/*
 * 参数必传
 * id - 节点元素的id，用来获取元素
 * initData - 初始chart配置
 * renderData - 在拿到渲染数据后更新chart展示
*/
import echarts from 'echarts';
export default {
  props: ['id', 'renderData', 'initData'],
  data () {
    return {
      myChart: null,
    };
  },
  watch: {
    renderData (val) {
      if (!!val) {
        this.$nextTick(() => {
          this.drawChart(val);
        })
      }
    }
  },
  methods: {
    drawChart (val) {
      const DOM = this.$refs[this.id];
      //初始化配置
      if (!!val && !!this.myChart) {
        return this.myChart.setOption(Object.assign(this.initData, val));
      }
      if (!!DOM && !this.myChart) {//初始化节点
        this.myChart = this.echarts.init(DOM);
        this.myChart.setOption(this.initData);
        //初始配置
      }
    }
  },
  mounted () {
    this.drawChart();
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
.common_chart_set {
  @include wh(100%,100%);
}
</style>
