import DEFAULT_COLORS from 'components/echarts/colors';
export default {
  visualMap: {
    dimension: 1,
    left: 'right',
    top: 'top',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true,
    itemWidth: 18,
    itemHeight: 160,
    textStyle: {
      color: '#3259B8',
      height: 56,
      fontSize: 11,
      lineHeight: 60,
    },
    inRange: {
      color: ['#3EACE5', '#F02FC2']
    },
    padding: [40, 0],
    orient: 'vertical',
  },
  grid: {
    left: '3%',
    right: '6%',
    bottom: '4%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    formatter: function (params) {
      return '产品数量： ' +
        params.value[0] + '<br/> ' + '产品价格: ' + params.value[1];


    },
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'dashed',
        width: 1
      }
    }
  },

  xAxis: [{
    type: 'value',
    name: '数量',
    scale: true,
    axisLabel: {
      formatter: '{value}'
    },
    nameTextStyle: {
      color: '#3259B8',
      fontSize: 14,
    },
    axisTick: {
      show: true,
    },
    axisLine: {
      lineStyle: {
        color: '#3259B8',
      },
      symbol: ['none', 'arrow']
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    name: '价格',
    scale: true,
    axisLabel: {
      formatter: '{value}'
    },
    nameTextStyle: {
      color: '#3259B8',
      fontSize: 14
    },
    axisTick: {
      show: true,
    },
    axisLine: {
      lineStyle: {
        color: '#3259B8',
      },
      symbol: ['none', 'arrow']
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    }
  }],
  series: [],
  color:DEFAULT_COLORS
};
