<template>
<div class="list">
  <div>{{title}}</div>
  <ul v-if="!!datas" :class="className">
    <li v-for="(item,index) in datas" :key="index" @click="turnTo(item.item)">
      {{item.item}}
    </li>
  </ul>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {
  name: 'ProList',
  data: function() {	
    return {
      className:'pjlist',
      datas:null,
      title:''
    }
  },
  methods: {
    ...mapActions([
      'SavePjId',
      'SaveBdId',
      'SaveFlId',
      'SaveSpId',
      'SaveSyId',
      'SaveDvId',
      'SetNavList',
    ]),
    turnTo(itemId){
      if(this.$route.path=="/"){
        //跳转到项目详细信息页
        this.SavePjId(itemId);
        this.$router.push({path:'/foo/pj'})
        this.SetNavList({
          name:">"+this.PjId,
          path:'/foo/pj'
        })
      }else if(this.$route.path=='/foo/pj/prolist'){
        //跳转到建筑体详细信息页
        this.SaveBdId(itemId);
        this.$router.push({path:'/foo/bd'})
        this.SetNavList({
          name:">"+this.BdId,
          path:'/foo/bd'
        })
      }else if(this.$route.path.includes('prolist/fl')){
        //跳转到楼层相信信息
        this.SaveFlId(itemId);
        this.$router.push({path:'/foo/fl'})
        this.SetNavList({
          name:">"+this.FlId,
          path:'/foo/fl'
        })
      }else if(this.$route.path.includes('prolist/sp')){
        this.SaveSpId(itemId);
        this.$router.push({path:'/foo/sp'})
        this.SetNavList({
          name:">"+this.SpId,
          path:'/foo/sp'
        })
      }else if(this.$route.path.includes('prolist/sy')){
        this.SaveSyId(itemId);
        this.$router.push({path:'/foo/sy'})
        this.SetNavList({
          name:">"+this.SyId,
          path:'/foo/sy'
        })
      }else if(this.$route.path.includes('prolist/dv')){
        //跳转到设备相信信息
        this.SaveDvId(itemId);
        this.$router.push({path:'/foo/dv'})
        this.SetNavList({
          name:">"+this.DvId,
          path:'/foo/dv'
        })
      }else if(this.$route.path.includes('sy/prolist')){
        //跳转到系统下的设备列表的详细信息
        console.log(12132434)
        // this.SaveDvId(itemId);
        this.$router.push({path:'/foo/sysdv'})
        this.SetNavList({
          name:">"+this.$route.params.childs,
          path:'/foo/sysdv'
        })
      }
      
    }
  },
  computed:{
    ...mapGetters([
      'PjId',
      'BdId',
      'FlId',
      'SpId',
      'SyId',
    ])
  },
  beforeRouteEnter(to,from,next){
    
  console.log('列表组件的进入触发的beforenter函数')

    if(to.path=='/'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/project')
      .then(res=>{
        next(vm=>{
          vm.className='pjlist';
          vm.title='项目列表';
          vm.datas=res.data;
        })
      })
    }else if(to.path=="/foo/pj/prolist"){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/building')
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="建筑体";
          vm.datas=res.data
        })
      })
    }else if(to.path=='/foo/bd/prolist/fl'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/floor')
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="楼层";
          vm.datas=res.data
        })
      })
   }else if(to.path=='/foo/bd/prolist/sp'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/space')
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="空间";
          vm.datas=res.data
        })
      })
   }else if(to.path=='/foo/bd/prolist/sy'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system')
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="系统";
          vm.datas=res.data
        })
      })
   }else if(to.path=='/foo/bd/prolist/dv'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/device')
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="设备";
          vm.datas=res.data
        })
      })
   }else if(to.path.includes('sy/prolist')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system-device-list-'+to.params.childs)
      .then(res=>{
        next(vm=>{
          vm.className='otherlist';
          vm.title="设备";
          vm.datas=res.data
        })
      })
   }
  },
  beforeRouteUpdate(to,from,next){

    console.log('列表组件的路由更新')

    if(to.path=='/foo/bd/prolist/fl'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/floor')
      .then(res=>{
          this.className='otherlist';
          this.title="楼层";
          this.datas=res.data
          next();
      })
   }else if(to.path=='/foo/bd/prolist/sp'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/space')
      .then(res=>{
        this.className='otherlist';
        this.title="空间";
        this.datas=res.data
        next();
      })
   }else if(to.path=='/foo/bd/prolist/sy'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system')
      .then(res=>{
        this.className='otherlist';
        this.title="系统";
        this.datas=res.data
        next();
      })
   }else if(to.path=='/foo/bd/prolist/dv'){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/device')
      .then(res=>{
        this.className='otherlist';
        this.title="设备";
        this.datas=res.data
        next();
      })
   }else if(to.path.includes('sy/prolist')){
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system-device-list-'+to.params.childs)
      .then(res=>{
        this.datas=res.data
        next()
      })
   }
  }
}
</script>
<style scoped lang="less">
.list{
  width:100%;
}
.pjlist{
  width:100%;
  li{
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-bottom:1px solid #000;
  }
  li:first-of-type{
    border-top:1px solid #000;
  }
}
.otherlist{
  border-left:1px solid #000;
  li{
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-bottom:1px solid #000;
  }
  li:first-of-type{
    border-top:1px solid #000;
  }
}
</style>