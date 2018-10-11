<template>
<div class="echarts_test">
  <charts class="charts" id="scatter1" key="scatter1" :renderData="renderScatter1"/>
  <charts class="charts" id="line1" key="line1" :renderData="renderLine1"/>
</div>
</template>

<script>
// 引入封装的echarts的组件
import Charts from 'components/echarts'
// 获取图表的数据
import { getScatterData, getLineData } from 'api/test'
// 在没有数据的时候，默认的数据展示（只能把坐标系或部分默认数据展示出来）
import renderScatter1 from './scatter1'

// 折线图
import renderLine1 from './line1'

export default {
  name: 'echarts_test',
  components: {
    Charts
  },
  data: function () {
    return {
      renderLine1,
      renderScatter1, // 需要在这指定，不能直接用import的数据
    }
  },
  mounted () {
    this.getChartsData();
  },
  methods: {
    getChartsData () {
      this.getScatterar1();
      this.getLine1();
    },
    async getLine1 () {
      let {
        data: {
          category,
          dottedBase,
          lineData,
          barData
        }
      } = await getLineData();
      this.renderLine1.xAxis.category = category;
      this.renderLine1.series[0].data = lineData;
      this.renderLine1.series[1].data = barData;
      this.renderLine1.series[2].data = lineData;
      this.renderLine1.series[3].data = lineData;
    },
    async getScatterar1 () {
      try {
        let { data } = await getScatterData();
        this.renderScatter1.series.push({
          type: 'effectScatter',
          symbolSize: 20,
          data: [
            [56, 1540]
          ]
        },{
          name: 'price-area',
          type: 'scatter',
          data,
          symbolSize: 15,
        })
      } catch (e) {
        console.err(e);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~style/base";
.echarts_test {
  .charts {
    @include wh(500px, 500px);
    border: 1px solid red;
  }
}
</style>
