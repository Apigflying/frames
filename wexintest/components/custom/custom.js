const app=getApp();

Component({
  properties:{
    custom:{
      type:String,
      value:'default value'
    }
  },
  data:{
    customStatus:'属性'
  },
  created(){
    console.log('componet created')
  },
  attached: function () {
    console.log('attached')
  },
  ready: function () {
    console.log('ready')
  },
  methods:{
    onTap(){
      this.triggerEvent('CustomEvent', 'custom-child-change-val');
    }
  }
})