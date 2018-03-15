<template>
<div class="foo">
  <div class="CrumbsNav">
    <nav-crumbs></nav-crumbs>
    <input type="button" value="测试" @click="abc">
  </div>
  <div class="Content">
    <div class="left">
      <ul v-if="LeftRender">
        <router-link tag="li" v-for="(item,index) in LeftRender" :to="{path:item.path}" :key="index">
          {{item.name}}
        </router-link>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>
import NavCrumbs from './NavCrumbs'
import axios from 'axios'
export default {
  name: 'Foo',
  data: function() {	
    return {
      LeftRender:null
    }
  },
  components:{
    'nav-crumbs':NavCrumbs
  },
  methods: {
    abc(){
      console.log(this.LeftRender)
    }
  },
  beforeRouteEnter(to,from,next){
    if(to.path=='/foo/pj'){
      next(vm=>{
        vm.LeftRender=[{
          name:'项目信息',
          path:'/foo/pj'
        },{
          name:'建筑体',
          path:'/foo/pj/prolist'
        },{
          name:'系统关系',
          path:'/foo/pj/syrp'
        },{
          name:'设备关系',
          path:'/foo/pj/dvrp'
        }]
      })
    }else if(to.path=='/foo/bd'){
      next(vm=>{
        vm.LeftRender=[{
          name:'建筑信息',
          path:'/foo/bd'
        },
        {
          name:'楼层',
          path:'/foo/bd/prolist/fl'
        },
        {
          name:'空间',
          path:'/foo/bd/prolist/sp'
        },
        {
          name:'系统',
          path:'/foo/bd/prolist/sy'
        },
        {
          name:'设备',
          path:'/foo/bd/prolist/dv'
        }]
      })
    }else if(to.path.includes('/foo/sysdv')){
      next(vm=>{
        vm.LeftList=[{
          name:'设备详细信息',
          path:'/foo/sysdv'
        }]
      })
    }
    
  },
  beforeRouteUpdate(to,from,next){
    if(to.path.includes('/foo/pj')){
        this.LeftRender=[{
          name:'项目信息',
          path:'/foo/pj'
        },{
          name:'建筑体',
          path:'/foo/pj/prolist'
        },{
          name:'系统关系',
          path:'/foo/pj/syrp'
        },{
          name:'设备关系',
          path:'/foo/pj/dvrp'
        }]
    }else if(to.path.includes('/foo/bd')){
        this.LeftRender=[{
          name:'建筑信息',
          path:'/foo/bd'
        },
        {
          name:'楼层',
          path:'/foo/bd/prolist/fl'
        },
        {
          name:'空间',
          path:'/foo/bd/prolist/sp'
        },
        {
          name:'系统',
          path:'/foo/bd/prolist/sy'
        },
        {
          name:'设备',
          path:'/foo/bd/prolist/dv'
        }]
    }else if(to.path.includes('/foo/fl')){
      this.LeftRender=[{
        name:'楼层详细信息',
        path:''
      }]
    }else if(to.path.includes('/foo/sp')){
      this.LeftRender=[{
        name:'空间详细信息',
        path:''
      }]
    }else if(to.path=='/foo/sy'){
      this.LeftRender=[{
        name:'系统详细信息',
        path:'/foo/sy'
      }]
      axios.post('http://easy-mock.com/mock/59361b1591470c0ac102318f/Godhandle/system-device-list')
      .then(res=>{
        let leftlist=res.data.map(res=>{
          return{
            name:res.name+'/'+res.number,
            path:'/foo/sy/prolist/'+res.type,
            type:res.type
          }
        })
        this.LeftRender=this.LeftRender.concat(leftlist)
      })
    }else if(to.path.includes('/foo/dv')){
      this.LeftRender=[{
        name:'设备详细信息',
        path:''
      }]
    }else if(to.path.includes('/foo/sysdv')){
      this.LeftRender=[{
        name:'设备详细信息',
        path:''
      }]
    }
    next()
  }
}
</script>
<style scoped lang="less">
.foo{
  height:100%;
}
.CrumbsNav{
  height: 50px;
  line-height:50px;
  text-align: center;
  background: #ccc;
}
.Content{
  height:100%;
  border-top:1px solid #000;
}
.left{
  float: left;
  height:100%;
  width:200px;
  text-align: center;
  border-right:1px solid #000;
  li{
    height:100px;
    line-height: 100px;
    border-bottom:1px solid #000;
  }
}
.right{
  float: left;
  width:calc(~"100% - 200px");
}
</style>