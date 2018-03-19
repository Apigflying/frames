<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
<div :ref="id" class="chart">
</div>
</template>
<script>
import echarts from 'echarts'
//当数据改变的时候，重新渲染charts
export default {
  props: ['id'],
  name: 'Bar',
  data() {
    return {
      myChart: null,
      renderData: null
    }
  },
  watch: {
    //监听数据变化
    renderData: {
      deep: true,
      handler(val, oldVal) {
        if (oldVal) {
          this.drawCharts()
        }
      }
    }
  },
  mounted() {
    if (!!this.id) {
      this.myChart = echarts.init(this.$refs[this.id])
      //加载echarts内置的loading动画
      /*
          this.myChart.showLoading('default',{
              text:'Loading...',
              color:'#0090ff',//loading的样式
              textColor:''//...
          })
      */
      var mock = []
      for (let i = 0; i <= 24; i++) {
        mock.push({
          name: 'time' + this._add0(i),
          xVal: this._add0(i) + ':00',
          yVal: this._rP([16, 38])
        })
      }
      this.renderData = mock
      this.drawCharts()
    }
  },
  methods: {
    drawCharts() {
      if (!this.renderData) {
        return
      }
      const colors = {
        bgdColor: '', //chart的背景色
        legendTextColor: '', //图例文字的颜色
        xAxisTextColor: '', //...
      }
      var linerGradiennt = new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
        offset: 0,
        color: 'green'
      }, {
        offset: 1,
        color: 'rgba(0,0,0,0)'
      }], false)
      console.log(linerGradiennt)
      // 关闭Loading
      /*
          this.myChart.hideLoading();
      */
      //option配置项，里面的data依托于renderData
      var option = {
        title: {
          text: '测试使用',
        },
        legend: {
          icon: 'rect', //设置图例的图形形状，circle为圆，rect为矩形
          itemWidth: 15, //图例标记的图形宽度[ default: 25 ] 
          itemHeight: 9, //图例标记的图形高度。[ default: 14 ] 
          itemGap: 13, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ] 
          formatter: function(name) {
            //使用formatter可以重新定制每个图例的文字
            return 'ABC' + name
          },
          data: ['测试', {
            name: '测试2',
            icon: `path://
                <svg>
                  <path d="M300,200 h-150 a150,150 0 1,0 150,-150 z"
        fill="red" stroke="blue" stroke-width="5" />
                </svg>`,
            textStyle: {
              color: 'white'
            }
          }]
        },
        grid: {
          show: false,
        },
        backgroundColor: linerGradiennt,
        xAxis: {
          boundaryGap: true,
          data: this.renderData.map(item => {
            return item.xVal
          })
        },
        yAxis: {
          boundaryGap: ['40%', '40%'],
          splitLine: {
            show: false
          }
        },
        graphic: [{
          type: 'group',
          rotation: Math.PI / 4,
          bounding: 'raw',
          right: 60,
          bottom: 60,
          z: 100,
          children: [{
              type: 'rect',
              left: 'center',
              top: 'center',
              z: 100,
              shape: {
                width: 400,
                height: 50
              },
              style: {
                fill: 'rgba(0,0,0,0.3)'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#fff',
                text: '上格云',
                font: 'bold 26px Microsoft YaHei'
              }
            }
          ]
        }],
        series: [{
          name: '测试',
          type: 'bar',
          data: this.renderData.map(item => {
            return item.yVal
          })
        }, {
          name: '测试2',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'blue'
            }
          },
          data: this.renderData.map(item => {
            return item.yVal
          })
        }]

      }
      this.myChart.setOption(option)
    },
    _rP(arr, flag) {
      //flag为真就返回整数，否则返回保留1位小数
      var max = Math.max.apply(this, arr);
      var min = Math.min.apply(this, arr);
      if (flag) {
        return parseInt(Math.random() * (max - min)) + min;
      }
      return parseInt(100 * Math.random() * (max - min)) / 100 + min;
    },
    _add0(n) {
      return n < 10 ? '0' + n : '' + n;
    }
  }
}
</script>