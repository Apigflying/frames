<template>
  <div>
    <report-month-range v-model="months"></report-month-range>
    <date-short-cuts v-model="activeIndex" :list="shortList"/>
  </div>
</template>
<script>
import moment from 'moment';
import ReportMonthRange from 'components/date-picker';
import DateShortCuts from 'components/date-short-cut';
function monthAgo (num) {
  return moment()
    .startOf('month')
    .subtract(num - 1, 'month')
    .valueOf();
}
// 下个月第一天
const NEXT_MONTH_FIRSTDAY = moment()
  .endOf('month')
  .add(1, 'd')
  .valueOf();
// 当前月第一天
const CURRENT_MONTH_FIRSTDAY = moment()
  .startOf('month')
  .subtract('month')
  .valueOf();
export default {
  components:{
    ReportMonthRange,DateShortCuts
  },
  data(){
    return {
      // 不变的
       dateShortCut: [
        {
          text: '本月',
          values: [CURRENT_MONTH_FIRSTDAY, NEXT_MONTH_FIRSTDAY]
        },
        {
          text: '3个月',
          values: [monthAgo(3), NEXT_MONTH_FIRSTDAY]
        },
        {
          text: '6个月',
          values: [monthAgo(6), NEXT_MONTH_FIRSTDAY]
        },
        {
          text: '12个月',
          values: [monthAgo(12), NEXT_MONTH_FIRSTDAY]
        }
      ],
      // 值不断变化
      months: [CURRENT_MONTH_FIRSTDAY, NEXT_MONTH_FIRSTDAY],
    }
  },
  computed:{
    shortList(){
      return this.dateShortCut.map(item=>item.text);
    },
    activeIndex:{
      get (){
        let months = this.months;
        let index = this.dateShortCut.findIndex(item=>{
          let flag = item.values[0] === months[0]&&item.values[1]===months[1];
          return flag;
        })
        return index;
      },
      set (index){
        // 设置快捷方式的日期的时候，更改 months 中的值 。months中的值更改后，会对activeTime 造成影响
        this.$set(this.months,0,this.dateShortCut[index].values[0]);
        this.$set(this.months,1,this.dateShortCut[index].values[1]);
        return index;
      }
    }
  }
}
</script>
