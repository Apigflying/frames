<template>
  <div class="report-range">
    <el-date-picker
      v-model="month[0]"
      placeholder="开始月"
      format="yyyy-MM-dd"
      type="month"
      :picker-options="startTimeOption"
      @change="startTimeChange">
    </el-date-picker>
    <span class="date-range-seperator-cutoff">至</span>
    <el-date-picker
      v-model="month[1]"
      type="month"
      format="yyyy-MM-dd"
      :picker-options="endTimeOption"
      placeholder="结束月"
      @change="endTimeChange">
    </el-date-picker>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    value: {
      type: Array,
      default () {
        return [moment()
            .startOf('month')
            .valueOf(),moment()
            .add(0, 'month')
            .startOf('month')
            .valueOf()];
      }
    }
  },
  data () {
    // 限制起始月份的边界为 2015-1-1
    let startBoundaryTime = moment('2015-01-01 00:00:00').valueOf();
    // 当前月的第一天 0点
    let currentMonthFirstDay = moment().startOf('month').add(1,'M').valueOf();
    return {
      startTimeOption:{
        disabledDate:(time)=>{
          return (this.month[1] <= moment(time).valueOf())||(currentMonthFirstDay <= moment(time).valueOf()) || (startBoundaryTime >= moment(time).valueOf());
        }
      },
      endTimeOption:{
        disabledDate :(time)=>{
          return (moment(this.month[0]).add(1,'M').valueOf() > moment(time).valueOf()) || (currentMonthFirstDay < moment(time).valueOf()) ;
        }
      }
    };
  },
  computed: {
    month: {
      get () {
        return this.value;
      },
      set (value) {
        return value;
      }
    }
  },
  methods: {
    startTimeChange (value){
      this.$set(this.month,0,moment(value).valueOf())
    },
    endTimeChange (value){
      this.$set(this.month,1,moment(value).valueOf())
    },
    emitChange (){
      this.$emit('input',this.month);
    }
  }
};
</script>
