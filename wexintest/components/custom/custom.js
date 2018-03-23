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
      console.log('erzi', this.data)
      this.triggerEvent('parentEvent', this.data);
    }
  }
})