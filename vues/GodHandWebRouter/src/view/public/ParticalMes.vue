<template>
<div class="ParticalMes">
  <h3>{{title}}</h3>
  <ul v-if="datas">
    <li v-for="(item,index) in datas" :key="index">{{item.item}}</li>
  </ul>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {
  name: 'ParticalMes',
  data: function() {	
    return {
      title:'',
      datas:null
    }
  },
  methods: {
  },
  computed:{
    ...mapGetters([
      'PjId',
      'BdId'
    ])
  },
  beforeRouteEnter(to,from,next){
    console.log(from.path)
    if(to.path.includes('/foo/pj')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/projectparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path.includes('/foo/bd')){
      // console.log("建筑体列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/buildingparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path.includes('/foo/fl')){
      // console.log("楼层列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/floorparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path.includes('/foo/sp')){
      // console.log("空间列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/spaceparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path=='/foo/sy'){
      // console.log("系统列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/systemparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path.includes('/foo/dv')){
      // console.log("设备列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/deviceparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path.includes('/sy/prolist')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system-device-list-'+to.params).then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }else if(to.path=='/foo/sysdv'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/deviceparticalmessage').then(res=>{
        next(vm=>{
          vm.datas=res.data;
        });
      })
    }
  },
  beforeRouteUpdate(to,from,next){
    console.log(5678)
    if(to.path.includes('/foo/pj')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/projectparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/foo/bd')){
      // console.log("建筑体列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/buildingparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/foo/fl')){
      // console.log("楼层列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/floorparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/foo/sp')){
      // console.log("空间列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/spaceparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path=='/foo/sy'){
      // console.log("系统列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/systemparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/foo/dv')){
      // console.log("设备列表项详细信息")
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/deviceparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/sy/prolist')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/deviceparticalmessage').then(res=>{
        this.datas=res.data;
      })
    }
    next();
  }
}
</script>

<style scoped lang="less">
.ParticalMes{
  ul{
    border-left:1px solid green;
  }
  li{
    border-bottom:1px solid green;
    height:40px;
    line-height:40px;
    text-align: center;
  }
}
</style>