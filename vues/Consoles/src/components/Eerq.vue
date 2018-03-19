<template>
<div class="chart_wrap">
  <div :ref="id" class="chart" v-if="!!renderData&&renderData.length" key="charts"></div>
  <div v-else class="no_data" key="no_data">暂无数据</div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Eeq_Scatter',
  props: ['id', 'renderData'], //冷站EER-Q散点图
  data: function() {
    return {
      myChart: null,
    }
  },
  watch: {
    renderData(val) {
      if (val && val.length) {
        this.$nextTick(() => {
          if (!this.myChart) {
            this.myChart = echarts.init(this.$refs[this.id])
          }
          this.drawScatter(val)
        })
      } else {
        //清空节点定时器占用的内存资源。如果不清除，实例会依旧留存于内存中，长时间没有清空会造成页面卡顿
        if (this.myChart) {
          this.myChart = null
        }
      }
    }
  },
  methods: {
    drawScatter(renderData) {
      var tooltipBgdColor = '#3b79ff' //提示框的背景色
      var xytextColor = ' #596B80' //xy轴上文字的颜色
      var lineBlueColor = '#2F85FF' //蓝线的颜色
      var lineGrayColor = '#637691' //灰线的颜色
      function add0(n) {
        return n < 10 ? '0' + n : '' + n;
      }
      this.myChart.hideLoading()

      // this.myChart.hideLoading();
      // data = data.slice(0,1)
      this.myChart.setOption({
        //整个chart的背景色
        backgroundColor: '#161635',
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: tooltipBgdColor,
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0,0,0,0)'
            },
            snap: true
          },
          confine: true, //是否将提示框限制在图表的区域内
          textStyle: {
            fontSize: 8,
          },
          extraCssText: 'line-height:20px'
        },
        //标题的内容
        grid: { //调节内容与边界的距离
          "left": '8%',
          "right": '4%',
          "top": '12%',
          "bottom": '12%',
        },
        xAxis: {
          axisLine: { //X轴轴线的样式
            lineStyle: {
              color: '#212c40'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: { //X轴文字的样式
            textStyle: {
              color: xytextColor,
              fontSize: 8
            }
          },
          splitLine: { //X轴即在纵向上，格子线
            show: false,
          },
        },
        yAxis: [{
          type: 'value',
          name: 'EER',
          nameLocation: 'end', //Y轴名字的位置
          nameTextStyle: { //文字样式
            color: xytextColor,
            fontSize: 8,
            padding: [0, 0, 0, 15]
          },
          nameGap: 2,
          axisLine: { //Y轴轴线的样式
            show: false
          },
          axisLabel: { //Y轴线左侧文字的样式
            color: xytextColor,
            fontSize: 8
          },
          splitLine: { //Y轴即在横向上，格子线的样式
            type: 'value',
            lineStyle: {
              color: '#212c40'
            }
          },
          scale: true //是否脱离0值比例，为true不会强制包含0刻度，在双数值轴的散点图中比较有用
        }],
        animation: false,
        series: [{
          type: 'scatter',
          name: '期望',
          large: true,
          legendHoverLink: false,
          animation: false,
          data: renderData,
          symbolSize: 6,
          itemStyle: {
            normal: {
              color: 'rgba(0,144,255,0.20)',
              borderColor: '#0090ff'
            }
          }
        }]
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import '../style/base.scss';
.chart_wrap{
  @include wh(100%, 100%);
  position: relative;
  .chart {
    @include wh(100%, 100%);
    position: absolute;
    left:0;
    top:0;
  }
  .no_data{
    @include center;
  }
}

</style>