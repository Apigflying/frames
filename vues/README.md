# Vue

标签（空格分隔）： Vue

[TOC]

---

## 1.vue的全局API
### 1- Vue.extend({})
	用于扩展vue构造器的方法，
	其实就是
	Vue.component()的第二个参数，也就是单文件组件的实例
	每一个单文件组件，就是一个组件构造器，它有自己的模板，有自己的data，方法和钩子等
	所以：一个单文件组件，就是一个组件构造器
### 2- Vue.set(object,key,value)
用于给全局Vue，就是根组件的构造器，设置属性的
这里有示例：
	
### 3- Vue.component
	用于添加全局组件的，在vuecli中单文件组件来做
### 4- Vue.use()
	用来加载插件的如：vuex,vue-router,vue-axios,Element-UI等
### 5- Vue.prototype
    在全局的this上挂在属性，通常用$来区分
    在Vue实例上挂在属性
```javascript
    //入口处
    import moment from 'moment'
    moment.locale('zh-cn');
    Vue.prototype.$moment = moment
    //其他组件内
    this.$moment() //全局可用
```
## 2.内置组件：
### 1-component标签，绑定is属性，用来决定要渲染的组件
![templet标签的scope属性（插入子组件到父组件的自定义标签内）][1]
<component>是vue的保留元素。动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换：
```javascript
<template>
    <div>
        /* 点击按钮切换展示的组件 */
        <input type="button" @click="changeComponent" />
        <component :is="currentView"></component>
    </div>
</template>
//import a form './a.js';
//import b form './b.js'
import pie form './pie.js'
import timeselect form './timeselect.js'
components: {
	pie,timeselect
},
data:{
    flag:false,
    currentView:'pie'//默认展示的组件名字
},
methods:{
    changeComponent(){
        this.flag=!this.flag;
        this.currentView=this.flag?'timeselect':'pie'
    }
}

//Do not use built-in or reserved HTML elements as component id: a
//Do not use built-in or reserved HTML elements as component id: b
/*
    不要使用内置的名字，作为component组件
*/
```
**当加载开销不大的时候，可以使用局部注册的方式，按需加载（直接import引用组件是全局注册）**
```javascript
//只需要将
import pie form './pie.js'
import timeselect form './timeselect.js'
components: {
	pie,timeselect
},
//改为：
components: {
    'pie': () => import('./pie.vue'),
    'timeselect': () => import('./timeselect.vue'),
}
这样就完成了局部注册
```


### 2-keep-alive标签，决定加载后的内容是否进行缓存
如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：
如：用户填写表单后提交，但是提交失败，keep-alive会保存用户填写过的所有信息
![keep-alive保存component标签（带有is属性）的信息][2]

### 3-is属性自定义渲染组件
```javascript
<template>
    <div>
        /*父组件范围*/
        <p :is="WhichToRender"></p>
    </div>
</template>
import renderA from './renderA'
import renderB from './renderB'
data:{
    WhichToRender:'renderA'
}
```
> - [x] 当有事件触发，修改WhichToRender的值得时候，将它改为renderB，那么这个p标签，就会转而渲染renderB组件的内容
上面的写法也相当于：
```javascript
<renderA v-if="showWhich"></renderA>
	v-esle-if="showWhich"
<renderB v-else></renderB>
```
**注：自定义标签和自定义属性的名字都是不区分大小写的，就是说，会将原本大写的名字，改为中线分割**

### ** 4-自定义标签的v-model
>父组件
```js
<custom-input v-model="content"/>

data(){return {
    content:'abc'
}}
```
>子组件
```js
<input type="text" @input="_change" :value="value"/>

// 使用v-model的父组件会传递value给子组件。value就是父组件content的内容
props:['value'],
methods: {
    _change(e){
      this.$emit('input',e.target.value);//触发子组件的input事件，同时传递value给父组件
    }
},
//----------------------------------------------------
watch: {
    value(val){
      //可监听value的变化
      console.log(val);
    }
},
```
#### ** 5-自定义v-model的属性和事件
> 在默认情况下，v-model绑定的属性，会在子组件内被分解为：
`props:['value'],
this.$emit('change',val)`
来实现双向绑定

----------
> 可以通过更改model来更改
```js
model: {
    prop: 'checked',
    event: 'change'
 }
```
> 来更改上面的value和change
```js
// 父组件
<custom-parent v-model="parent-bind-v-model"/>
// 子组件
 {
    model:{
        prop:'parent-bind-v-model',
        event:'response-parent-data-change'
    },
    props:['parent-bind-v-model'],
    methods:{
        _change(val){
            this.$emit('response-parent-data-change',val)
        }
    }
 }
 ```
**注意你仍然需要在组件的 props 选项里声明 parent-bind-v-model 这个 prop。**




----------------------------------------------------
## 3.v-model和input缠绵悱恻
### 1-checkbox多选框
```javascript
当有多个勾选框的时候
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames"><label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames"><label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames"><label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>

    data: {
        checkedNames: []
    }
在多个checkbox同时绑定一个数组的时候，那么是将value添加到checkedName这个数组中或者删除数组项
此时就是将value值传入数组checkedNames内，取消勾选就是删除这项
```
### 2-text输入框
>文本输入框有独有的表单事件修饰
   
 
 |修饰符|作用|
 |:--:|:--:|:--:|
 |.number|将输入框内输入的数字(默认都是字符串)转换为数字类型|
 |.lazy|类似于从oninput事件变为了onchange(失去焦点并且值改变的时候触发)事件,即不是实时触发|
 |.trim|将用户输入的内容进行去除前后空格|


--------------------------------------------------------
## 4.vue指令
### 1-v-for
```javascript
遍历对象
<ul v-if="obj">
    <li v-for="(value,key,index) in obj">//第一个是value值
    	/*
    	    value - key - index
    	    24℃ - 温度 - 0
            36pm - 湿度 - 1
    	*/
    </li>
</ul>
data:{
    obj:null
}
methods:{
    getObj(){
        getObject().then(result=>{
            this.obj=result
            //result:{
                "温度":24℃,
                "湿度":"36pm"
            }
        })
    }
}
```
#### 1-1 直接改变数组的第几项或者改变数组的长度，无法实现双向绑定。需要用$set 或者改用splice
> 在遍历数组的时候，使用以下方法会让页面重新渲染
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
因为以上方法都会改变原数组
**注：改变数组的长度和直接给数组的第几项赋值，也不会重新渲染**
```javascript
	renderArr[2]=10;//不会重新渲染
	renderArr.length=4;//也不会重新渲染
	/*
	    可以使用vue全局的set方法
	    由于是全局的，所以要引用Vue组件
	    import Vue from 'vue'
	*/
	Vue.set(
    	第一个参数为要修改的数组[this.renderArr],
    	第二个参数为数组的索引[index],
    	第三个参数是要替换的内容[这个内容会替换数组中的第index项]
	)
		
		方法等同于：
		arr.splice(index,1,{要替换的内容})；
```
### 2-自定义指令
>- [ ] 在vue2.0里面，代码复用的主要形式和抽象是组件
- [x] 但是在有些情况下,需要对纯DOM元素进行底层的操作，这时候，就需要用到自定义指令
```javascript
<input v-focus>

directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}

```
**自定义指令的钩子函数**
|函数|描述|
|:--:|:--:|
|bind|只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作|
|inserted|被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)|
|update|所在组件的 VNode 更新时调用|
|componentUpdated|所在组件的 VNode 及其孩子的 VNode 全部更新时调用|
|unbind|只调用一次，指令与元素解绑时调用|

以上每个钩子函数都有参数
|参数名字|参数描述|
|:--:|:--:|
|el|指令所绑定的元素，可以用来直接操作 DOM|
|binding|↓|
```javascript
<input type="button" value="改变" @click="topie" v-directive="sendtochild" />
data:{
    sendtochild:1234
}
directives:{
	directive:{
		bind(el,binding){
			/*
			    el:input元素
			*/
			/*
			    binding.value -> 1234
			*/
			尽量不要在这里改变外面vue实例上挂在的属性，尽量编写原生的东西（如样式，指令是固化的）
		}
	}
},
```
### 3.ref获取元素
**注：在created中，元素正在被创建，此时无法通过$refs获取元素**
>使用：
```javascript
<template>
    <section ref="question_wrap"></section>
</template>
mounted(){
    const question_wrap=this.$refs.question_wrap;
    
}
```

-------------------------------------------------
## 5.事件处理函数
### 1.事件对象$event

>依据原生js的思想，事件处理函数的第一参数通常为事件对象：ev，在vue中，需要手动传入$event
```javascript
<div @touchstart.prevent="tstart($event,current)"></div>

data:{
    current:null
},
methods:{
    tstart(ev){
        const dpos={
            x:ev.touches[0].pageX,
            y:ev.touches[0].pageY
        }
    }
}
```
**注：在这里的ev是被vue包装过的，并不是原生的事件对象**
### 2.事件修饰符
>在methods对象里面，只需要执行某些行为，而不去改变事件的原有属性，所以这个东西是添加在行间好一些
事件修饰符分为两种：
#### 1.事件修饰符
>.stop   阻止单击事件冒泡 
.prevent 取消事件的默认行为
.capture 添加事件侦听器时使用事件捕获模式
.self    只当事件在该元素本身（而不是子元素）触发时触发回调 
.once   点击事件只触发一次
```javascript
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

stop:组织事件冒泡
prevent：阻止事件的默认行为
once：事件只触发一次，触发后清除该事件
```
#### 2.按键修饰符
.enter
.tab
.delete (捕获 “删除” 和 “退格” 键)
.esc
.space
.up
.down
.left
.right
这些是常用的按键修饰符，只有表单控件和window，可以接受这些事件也就是键盘事件
可以再行间写上.13也就是对应的keyCode，也能够触发键盘事件

--------------------------------------------------------
## 6.Computed计算属性
>通常用计算属性的地方都用到data内的数据，依据data内的数据，进行计算返回，例如表单验证，数组重排序等等，可以对接收到的数据进行缓存和重定义
在可复用的模板组件中，可以通过计算属性，返回不同的data值，来进行区分和比较
```javascript
computed:{//对象
    fn:{//计算函数（这里也是对象）
        get(){
            //这里要有返回值
            return 利用数据计算，返回一个值
        }，
        set(value){
            this.message=value
            //更改数据
        }
    }
}
与methods对象储存函数一样。
使用computed计算出来的变量会挂在到实例下，如果在data中有这个变量名，会报错：
data:{
    a:1
},
computed:{
    a(){
        return 123
    }
}
报错信息：
The computed property "a" is already defined in data.
```
### ** 1-Computed利用setter的反制
> 解决嵌套中v-model的冲突问题
```js
<template>
    <el-checkbox-group class="checkbox-group" v-model="cChecks">
        <el-checkbox v-for="(item,index) in value" :key="index" :label="item.label" :disabled="item.disabled">
          {{item.value}}
        </el-checkbox>
    </el-checkbox-group>
</template>
<script>
export default {
    props:{
        value:{
            type:Array
        }
    },
    computed:{
        checks:{
            get(){
            
                return this.value.filter(item=>item.isChecked).map(item=>item.label);
            },
            set(val){
                /* 当更改checks的值时，可以用val取到当前改变的值
                但是如果只改变checks，是无法起作用的，甚至有时候会报错，这时要利用依赖项（this.value）,在这里反制this.value，从而让checks来改变 */
                let checkList = this.value;
                let checkedCount = checks.length;
                if (this.checkAll) {
                  this.isCheckAll = checkedCount === checkList.length;
                  this.isIndeterminate = checkedCount > 0 && checkedCount < checkList.length;
                }
                // 重点是在于改变checkList
                this.$emit('input', checkList.map(item => {
                  return Object.assign(item, {
                    isCheck: checks.includes(item.label)
                  })
                }))
            }
        }
    }
}
</script>
```


## 7.filter和filters过滤器
过滤器的作用是用于初始化，过滤文本
```javascript
//template
{{ message | capitalize }}

//js
filters:{
   capitalize:function(value){
    if(!value){
        return '--'
    }
    else{
        return vlaue.substr(0,2)
    }
   }
}
```
>初始化返回的数据
上面的代码，会将message仿佛到capitalize中进行计算，返回计算中return的值
相当于computed，只是不用再定义一个返回值字段，且可共用，相当于共用或可复用的computed
>>过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。

----------
>过滤器可以串联：
```javascript
{{ message | filterA | filterB }}
```
 > -  在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。
 
- [x] 过滤器是 JavaScript 函数，因此可以接收参数：
```javascript
{{ message | filterA('arg1', arg2) }}
```
这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。


## 8.watch
### 1-普通使用
```javacript
data:{
    datas
},
watch:{
    datas(newVal,oldVal){
        ...
    }
}
```
### 2-深度监听
```javascript
watch: {
'datas' : {
    deep: true,    //深度监听
    handler:function(newVal,oldVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
    处理函数
    }
  }
}
```

### ** 3-立即执行watch
某些函数，在created中，即页面初始化的时候，就执行的函数，在watch某个属性变化的时候，也执行这个函数
```javascript
{
    currentpage:0
}
created(){
    this.getData()
}
methods:{
    getData(){
        // 依赖于this.currentpage
        let currentpage = this.currentpage;
    }
}
watch:{
    currentpage(){
        this.getData();
    }
}
```
可以简化为：
```javascript
watch:{
    currentpage:{
        handler:'getData',
        immediate:true//加上这个属性，表示在函数创建时(加载组件时)执行一次该函数
    }
}
```
-------------------------------------------------------
## 9.操作DOM样式style
### 1.绑定内嵌样式
```javascript
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
更清晰的方式是：
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```
### 2.通过className改变形态
```javascript
<div class="wrap" :class="className"></div>
data(){return{
	className:{
		classA:true,
		classB:false,
		classC:true
	}
}}
渲染的结果为：<div class="wrap classA classC"></div>
即：绑定的className的类型是对象的时候，
根据这个对象的value值为true或false来渲染这个对象的key，作为className
```
### 3.使用computed返回样式名字
>**数据驱动样式(视图)**
```javascript
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```
## 10.父子组件通信
### 1-父向子传数据 - props 和非props
#### 1.1、子组件用props接受
>在子组件内可以有props验证：[查看props验证方式][3]
```javascript
/*父组件内*/
<template>
	<custom-child :childrespect="sendtochild">
	    这个是子组件要渲染的东西
	</custom-child>
</template>
import customChild from '../customChild.vue'
data:{
    sendtochild:1234//父组件要传递给子组件的数据
}
-----------------------------------------------
/*子组件内*/
props:{
    childrespect:[String,Number]//这里不要加'' 
    /*
        如果写成：['String','Number']
        会报错："TypeError: Right-hand side of 'instanceof' is not an object"
    */
},
```
#### 1.2、非props接收属性
> 子组件可以通过非props接收父组件上定义的属性，挂载的元素是子组件的wrap节点（无法动态设置）;
```js
// 父组件
<parent :options="options" data-abc="a" placeholder="请选择123"/>
/*
    data-abc、placeholder属性会被添加到子组件外层的div上
    但是无法添加到el-select组件上，所以更改的placeholder不会生效
*/

// 子组件
<template>
     <el-select v-model="options.select" @change="change" class="selects">
     想要接收父组件传过来的placeholder，但是placeholder被渲染到了外层wrap DIV上面
  </el-select>
</template>
{
    props:['options'],// options是用props接收的
}
```
#### **1.3、`v-bind="$attrs"`子组件决定由哪个元素接收父组件传递过来的非props属性
> 为了解决上面的问题，vue提供了一个可以动态改变接收非props的方法：
`inheritAttrs: false + $attrs`
```js
/* 
    inheritAttrs: false
    可以设置这个属性，来禁用非props传递的属性
    添加之后，上面的data-abc、placeholder都不会被子组件接收
*/


// 父组件
<parent :options="options" data-abc="a" placeholder="请选择123"/>

// 子组件
<template>
     <el-select v-bind="attrs" v-model="options.select" @change="change" class="selects">
     // v-bind="attrs" 决定了将所有从父组件传过来的非props属性全部由这个元素接收
  </el-select>
</template>
{
    inheritAttrs: false,
    props:['options'],// options是用props接收的
}
```

#### **1.4、`v-on="$listeners"` 解决封装组件无法接收事件，且不报错的问题
```js
// parent
<cTable class="c-table" :tabelFormater="tabelFormater" :tableData="tableData" border @row-click="rowClick">
</cTable>
/*
    如果下面的子组件不添加v-on="$listeners"，那么elm的table组件的table-events事件都无法被触发（且不报错）
*/
// child
<el-table :data="tableData" v-bind="$attrs" v-on="$listeners">
    <el-table-column v-for="(column,key) in tabelFormater" :key="key" :label="column.label" :sortable="!!column.sortable" :align="column.align || 'center'">
      <template slot-scope="props">
        <slot name="main-text" :props="{props,column}"></slot>
        <slot name="child-text" :props="{props,column}"></slot>
      </template>
    </el-table-column>
</el-table>
```


----------


### 2-子向父传数据
>在父组件内使用自定义事件
```javascript
/*父组件内*/
<template>
	<custom-child @parentevent="childgive" :childrespect="sendtochild">
	    这个是子组件要渲染的东西
	</custom-child>
</template>
methods: {
	childgive(val){
		this.sendtochild=val;
	}
}
-----------------------------------------------
/*子组件内*/
<template>
<div>
  {{childrespect}}
  /* 子组件通过触发父组件的自定义事件childgive，改变父组件内自身的数据源，此时，子组件的childrespect就会改变 */
  <input type="button" value="传递" @click="fn">
</div>
</template>
  props:{
    childrespect:[String,Number]
  },
 methods: {
    fn(){
      this.$emit('parentevent','abcde')
    }
  }

```
> - [x] 通常，子组件内触发父组件的自定义事件，是为了保证数据源。即：当一个父组件内有多个子组件的时候，甚至子组件又有子组件，那么直接改变父组件的数据源，会产生一些问题，所以子组件使用自定义事件，修改父组件的内容

----------------------------
## 11.transition过渡效果
### 1-transiton标签的行间属性
 |属性名|作用|
 |:--:|:--:|:--:|
 |name|设置过渡的类名|
 |mode|	通过mode改变过渡的方式。默认是in-out|
 
```javascript
<transition name="xxx" mode="out-in">
    <p v-show="abc"></p>
</transition>
```
### 2-过渡的两种状态：
	v-enter -> v-enter-active    v-leave -> v-leave-active
		0   ->     1 				1   -> 		0
				   ↑
			过渡到的最终效果，也是元素原本的状态


----------------------------------------------------------
### 3-过渡示例
```javascript
<style>
.xxx-enter-active,
.xxx-leave-active {
    /*
    设置过渡期的transition *时间* 、过渡的 *状态*  和过渡的 *形式*     */
	transition: all 5s ease-out;
}
.xxx-enter {
	/* v-show=false时默认展示的初始状态 */
	transform: translateY(-500px);
	opacity: 0;
}
.xxx-enter-active {
    /* v-show从false变为true的状态，即 显示状态 */
	transform: translateY(0);
	opacity: 1;
}
.xxx-leave-active {
    /*  v-show从true变为false后的状态，即 false状态 */
	transform: translateY(500px);
	opacity: 0;
}
</style>
```
>可以接收过渡的vue属性：
*  v-show
*  v-if
*  v-if...v-else
v-if和v-else过渡的标签名相同的时候，无法有过渡效果
像这种无法过渡的情况，是因为vue为了最大限度的减少重排
从而在原有标签上更改内容，以达到性能最优
为了解决这种问题，可以给每个标签添加一个key用来区分两个标签，让vue能够重排，进而重绘
```javascript
<p v-if="show" key='1'>abc</p>
<p v-else key='2'>bcd</p>
```
> - [x] 扩展：
	动态组件（用is绑定的动态组件名的过渡）: `<p :is="viewIt"></p>`
	
	
----------------------------------------------------------
## 12.自定义指令
想要自己定义一个指令：v-color在全局下使用
```javascript
directives:{
	color:function(el,binding){
		el是使用这条指令的元素，是自带的
		binding是一个对象，value对应的就是
		<p v-color="'red'"></p>(这里的v-color与这里面的color的函数名字对应的)
		中的'red'
		el.style.color=binding.value
					↓
		p.style.color='red';
	}
}
```
>如果想把v-color作为全局的指令，可以在main.js里面添加
和data:{},el:'#app',同级的
```javascript
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  directives:{
	color:function(el,binding){
        
    }
  }
})

```
>这样，自定义的指令在全局下就都能够使用了
binding对象的属性:
--	name:指令的名字，不包括v-,这里就是'color'
--	value:指令绑定的值，可以接收动态的值
			
-------------------------------------------------
## 13.slot插槽
![不具名slot插槽][4]

-------------------------------------------------

![具名slot插槽2][5]

**注:在父组件内引用子组件的自定义标签中，写入html代码，这段html代码会被放入到子组件的slot标签中**

>用slot插槽可以满足子修改父数据的功能，但是与自定义事件不同，用slot时，是将子组件渲染的内容，写在父组件内，从而在父组件内改变自己的数据
```javascript
/*父组件内*/
<template>
	<customChild @parentevent="childgive" :childrespect="sendtochild">
		<div slot="btn" v-show="!btnname" @click="slotevent" style="width:110px;height:110px;background:red"></div>
	</customChild>
</template>
methods: {
	slotevent(val){
		this.btnname=1;
	}
}
-----------------------------------------------
/*子组件内*/
<template>
<div>
  <slot name="btn"></slot>
</div>
</template>
```
**Element-UI编写可复用组件的方式就是通过slot插槽的方式，让用户在父组件内自定义部分内容**
### 1-组合slot
>component组件与slot结合
```javascript
// 以下两个组件，都是在componets中的公用组件
//custom.vue
<template>
    <div>
        {{title}}
    </div>
</template>
props:['title']//父组件传过来的数据
//dialog.vue
<template>
    <el-dialog>
        <slot></slot>
        <slot name="custom"></slot>
    </el-dialog>
</template>

//父页面
import cDialog from 'components/dialog'
import cCustom from 'components/custom'

<cDialog :isDialogShow="isDialogShow">
    <div>自定义的内容</div>
    <cCustom :content="customContent" slot="custom"/>
</cDialog>
```
> 在slot插槽中放入组件，可以将自定义组件，以slot的方式放入到容器组件中
### **2-slot与template组合，从子组件向父组件传递数据
```js
// 父组件
 <todoList :todos="todos">
    <!-- 收到的todo被包裹了一层-->
    <template slot-scope="{todo}">
      <span v-if="todo.isComplete">✔</span>{{todo}}
    </template>
  </todoList>


// 子组件
  <ul>
    <li v-for="(todo,index) in todos" :key="index">
        <!-- todo将会传递给父组件,父组件接收到的是{todo} -->
      <slot :todo="todo">
        如果父组件内使用了template（引用了slot-scope），那么这里的todo.text不会被渲染
        如果父组件内没有使用slot-scope，那么这里的todo.text会被展示
        {{todo.text}}
      </slot>
    </li>
  </ul>
props:['todos']
```

-----------------------------------------------------------------
## 14.mixins混合
### 1-mixins的使用
在一个单独的js文件内，暴露一个对象
```javascript
//mixin.js
export default {
  data(){
    return {
        common:'初始状态',
    }
  },
  created(){
    //doSomething
  }
  methods(){
    getCommon(){
        return this.common
    }
  }
}


//pathA.vue
<template>
    <div>
        <button @click="toPathB">跳转到路径B</button>
    </div>
</template>
import common from 'src/mixins/mixin.js'
export default {
    mixins: [common],
    data(){},
    created(){
        console.log(this.common) // '初始状态'
        this.common = '修改初始值'
        console.log(this.getCommon())// '修改初始值'
    },
    methods(){
        toPathB(){
            this.$router.push('pathB')//跳转到pathB
        }
    }
}

//pathB.vue
/*
    在pathA中修改了common的值之后，跳转到pathB的时候，在pathB中的common值依旧是 '初始状态'
*/
import common from 'src/mixins/mixin.js'
export default {
    mixins: [common],
    data(){},
    created(){
        console.log(this.common) // '初始状态'
    },
}
/*
    公用的部分可以提取出来，可以直接引入在一个页面中，然后直接使用里面的data和methods等
    与vuex比较：
        vuex的状态是脱离组件的，在不同组件之间切换的时候是公用的，互相影响 存址
        mixins的状态在不同组件中切换的时候，是通用的，互不影响 存值
*/
```
### ** 2-mixin的钩子函数与组件的钩子函数的执行顺序
```js
// mixins.js
export default {
    created(){
        console.log(1)
    }
}

// pathA.vue
import mixins from 'mixins/mixins.js';
{
    mixins: [mixins],
    data(){},
    created(){
        console.log(2)
    }
}
```
> 输出：1 2 



## 15.plugin全局插件
`1. 写插件`
```javascript

import Vue from 'vue'
import fetch from 'src/utils/fetch'
var _setOptions = (vm,response,success) =>{
    //处理数据的函数
    let result = resp.result ? resp.result : resp.Result;
    if(result){
        success(result)
    }
}
export default {
//插件的格式，install会被Vue.use自动执行，且函数的第一个参数必须是Vue
    install:function(Vue,options = {}){
        Vue.prototype.getJson = function(url,data,success,faild,err){
            let vm=this;//指向Vue的实例
            fetch({
                url,
                data,
                method:'post',
            }).then(response=>{
                _setOptions(vm,response,success)
            })
        }
    }
}
```
`2. 将插件暴露到全局`
```javascript
/* main.js */
import Vue from 'vue'
import HttpPlugin from './plugins/HttpPlugin'
Vue.use(HttpPlugin)
```
`3. 插件的使用`
```javascript
/* xxx.vue */
created(){
    this.getJson(
        'url/getData',
        {
            name:'a'
        },
        result=>{
            //success的回调函数
            result
        }
    )
}
```
>回调函数（将函数作为参数，传入另一个函数）
当做参数的回调函数，不会在**写这个函数的地方**被执行，而是在**把回调函数当做参数的父函数**内，手动调用函数执行而执行的

```javascript
abc(params1,params2,function(data){
    //...
    use the data
})
//父函数
function abc(params1,params2,success){
    //...
    
    if(...){
        success(data)//回调函数是在这里被执行的
    }
}
```
## 16.$createElement 在逻辑中创建动态节点
> 在某些逻辑中需要动态创建节点，且这个节点是要支持逻辑的此时需要使用`$createElement函数`

需求：表格中插入自定义节点，使用框架：elm
如图
```js
<el-table :data="tableData" show-summary sum-text="小计" :summary-method="handlerSummary" style="width: 100%">
    <el-table-column type="index" :index="indexMethod" fixed label=" " align="center"></el-table-column>
</el-table>
methods:{
    handlerSummary({column,data}){
        return ['小计',1,2,3]
    }
}
```
上面的代码只能展示小计，而无法使用自定义的插件：indicator-description（含有 ？图标，且在鼠标移上去的时候，有提示语）

----------

- [ ] 尝试使用一下方法：
```js
return [`<indicator-description></indicator-description>`,1,2,3]
```
> 但是渲染的是字符串

----------

所以此时想到用动态节点
```js
handlerSummary ({column,data}) {
  const h = this.$createElement;
  const hml = h('indicator-description', null, [
    h('p', null, '堂食营业汇总表是按天/月维度，统计连锁/门店在所选结算日或自然月的营业收入汇总情况，包含堂食、外带业务的营业数据。 '),
    h('div', {slot:'hover-btn'}, '小计')
  ]);
  return [hml,2,3];
}
```
- [x] 此时的小计已经是动态节点了（前提是indicator-description组件已被正确引用）

### **动态节点详解
```js
// 1- 使用$createElement来创建实例
 const h = this.$createElement;
// 2- 实例本身就是一个函数 (标签名 'p'，标签行内属性 {} ，子节点 [])
```
[标签行内属性][6]


  [1]: http://osjykr1v3.bkt.clouddn.com/FtYZHLpyfF7bYj9aNxcnP4uFGofC
  [2]: http://osjykr1v3.bkt.clouddn.com/FmxdcEtCelKvdI8btVC9pG9zgNJd
  [3]: https://cn.vuejs.org/v2/guide/components.html#Prop-%E9%AA%8C%E8%AF%81
  [4]: http://osjykr1v3.bkt.clouddn.com/FtvDRIABuAR0-71nzvL14s1LC6KG
  [5]: http://osjykr1v3.bkt.clouddn.com/Fqa7n5eA9yAPCLlTJJg-mTSW5u9D
  [6]: https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0