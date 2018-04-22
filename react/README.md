# React

标签（空格分隔）： react

[TOC]

---
## 1.react基础
### 1.Component 、 Props 与 State
#### Componet可以是返回节点的函数
```javascript
function Welcome(props){
    return <h1>{props.name}</h1>
}
const ele = <Welcome name="Sara"/>
ReactDOM.render(ele,document.getElementById('root'))
```
- 1.将ele通过render挂载到根节点
- 2.将组件标签的行内属性，定义为key、value的形式
    - props -> {name:'Sara'}
- 3.在Welcome中读取props，返回真正的节点
- 4.更新DOM，显示为标签内的内容

**自定义标签，也就是组件，本身是一个返回节点的函数，它的行内属性，会被解析成key-value的形式，在函数内部使用这些参数，然后动态渲染节点**

|html行内属性|react写在行内的属性|所属元素|
|:--:|:--:|:--:|
|class|className|所有元素|
|for|htmlFor|label元素|
|accept-charset|acceptCharset|form元素|


>提取组件
提取组件的原则：I/O
通过props传值给组件，组件负责接收到参数后，返回对应节点（视图）


#### Props只读
**props是子组件标签，在父组件内定义时，行内的属性组成的对象**
`<Child childCommit={this.parentEvent.bind(this)} a={123} flag={true} className="child">`
>单项数据流，子组件接收到父组件的props数据时，不能直接修改父组件的状态（数据源）
```javascript
//----------------父组件----------------
constructor(props){
    this.state = {
        state1:''
    }
    //this.handelClick = this.handelClick.bind(this)
}
handelClick(){
    //要么在constructor中制定这个函数的this，
    //要么在下方的行内通过bind指定
    //如果不用bind手动更改此函数内的this指向，那么此函数内的this指向的是child节点对象
    //this就是节点对象
    /*
    节点对象内包含所有在节点上定义的属性：
        {
            state1:'',
            customHandle函数
        }
    此节点对象也是props，会被传递给子组件
    子组件的constructor的参数也是这个props
    */
}
render(){
    return (
        <div>
            {val}
            <Child {...this.state} customHandel={this.handelClick.bind(this)}/>
        </div>
    )
}
//----------------子组件----------------
handlerChild(){
    /*
        this.props -> 在父组件节点行内定义的属性
        {
            state1:'',
            customHandle函数
        }
    */
}
render(){
    return (
    <div>
        {this.props.state1}//当父组件的数据改变时，这个数据也会改变
    </div>
    )
}
```
**注：**当父组件状态改变时，子组件对数据进行中间处理，可以用componetWillReceiveProps,对父组件的数据源进行过滤和筛选
##### 为子组件添加props的默认值即验证 Child.defaultProps
```javascript
//props是子组件拉取父组件的状态的媒介
//--------------------------child--------------------------
class Child extends Component {
    render(){
        return (
        <div>
            {this.props.name}
        </div>
        )
    }
}
//为props设置默认值
Child.defaultProps={
    name:'abcd'
}
Child.propTypes ={
    name:PropTypes.string//指定参数类型必须是string
}
```
|PropTypes 属性|验证|
|:--:|:--:|
|string|字符串|
|bool|布尔值|
|array|数组|
|func|函数|
|number|数字|
|object|对象|
|node|数字、字符串、元素、数组|
|element|React节点(组件节点)|
**PropTypes只需要在开发环境内使用**
##### props.children作用域插槽
>当子组件是wrap组件，如dialog,其只是一个样式容器，其内容可以由父组件自己定制,可以在子组件使用的标签对内，添加父组件自定义的内容。子组件通过props.children接收父组件的元素节点们
```javascript
//-----------------父组件-----------------
import Dialog from 'component/Dialog/index'
<Dialog>
    <h4>这个是标题</h4>
    <main>这里是内容</main>
</Dialog>
//-----------------Dialog组件-----------------
<div>
    {this.props.children}
</div>
```

#### State状态
通常一个组件的状态被定义在constructor中，用来指定自身的状态

### 2.生命周期钩子函数
>1.挂载阶段
```javascript
//1
constructor(){
    //  构造函数，在创建组件的时候调用一次    
}
//2
componentWillMount(){
    // 在组将即将被挂载的时候调用一次
}
//3
render(){
    // 渲染组件
}
//4
componentDidMount(){
    // 在组件挂载完成的时候调用一次，在这里可以使用refs
}
```

>2.更新阶段
```javascript
//1
componentWillReceiveProps(nextProps){
    // 父组件更新props，会触发此函数
}
//2 父组件更新，是否重新渲染
shouldComponentUpdate(nextProps,nextState){
    //是否需要重新渲染
    return true||false;//默认返回false
}
//3 
componentWillUpdate(nextProps,nextState){
    //即将更新
}
//4
render(){
    //渲染
}
//5
componentDidUpdate(prevProps,prevState){
    //更新
}
```
>3.卸载阶段
```javascript
componentWillUnmount(){
// 注销组件时候执行。通常用于清除定时器
}
```

##### componetWillReceiveProps与子组件的state配合，过滤父组件的数据变更响应事件
>子组件监听父组件的状态变化，是否响应，可以由子组件自己决定
```javascript
//------------------------parent--------------------------
this.state = {
    parentState:'父组件初始状态'
}
this.fn=this.fn.bind(this);
//模拟异步请求
getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('更改后的状态')
        },2000)
    })
}
//事件触发，更改父组件原始状态
async fn(){
    let text = await this.getData();
    this.setState({
        parentState:text
    })
}

<Child value={this.state.parentState}/>
<button onClick={this.fn}>更改自身的数据</button>
//-------------------------child--------------------------
constructor(props){
    super(props);//不先写super会报错
    this.state = {
        value:props.parentState//保存父组件传递过来的状态
    }
}
//当props改变的时候，触发的事件，需要手动调用setState来更新子组件的状态
componentWillReceiveProps(newVal){
    if(newVal.flag===true){
        this.setState(Object.assign(this.state,newVal))
    }
}
```
**注：**上面的写法，只会传递部分数据到子组件，如果想要传递全部的状态，那么需要用扩展运算符，将父组件的状态全部传递到子组件中
```javascript
//-----------------------父组件-----------------------
import Child from './Child'
this.state = {
    stateA:'1',
    stateB:[]
}
<Child {...this.state}/>

//-----------------------子组件-----------------------
constructor(props){
    super(props);
    this.state = {
        ...props,//扩展运算符，拿到父组件的所有状态。但是想同步父组件的数据，需要用下面的方法
        childState:''//子组件的状态
    }
}
componentWillReceiveProps(props){
    /*
        当父组件的state状态被改变
        1.此子组件更改父组件的状态
        2.父组件自己改变自己的状态
        3.其他子组件改变父组件的状态
        4...redux(猜测)
        以上情况都会触发此钩子函数
    */
    this.setState(Object.assign(this.state,props));
}
```

### 3.setState修改状态，更改展示
#### 1.params - obj
修改数据的状态
```javascript
this.state = {
    value:'老数据'
}

let newVal = '新数据'
this.setState({
    value:newVa
})
```
#### 2.params - function
```javascript
this.state={
    value:'老数据',
    other:'其他数据'
}
let newVal = '新数据'
this.setState((oldVal,val)=>{
    /*
    oldVal，更改之前的整个state
        {
            value:'老数据',
            other:'其他数据'
        }
    */
    return {
        value:val
    }
})
```
>toggle切换状态
```javascript
constructor(props){
    super(props);
    this.state = {
        isToggleOn:true
    }
    this.handleClick = this.handleClick.bind(this);
}
handleClick(){
    this.setState(oldState => ({
        //toggle 初始flag，利用初始flag
        isToggleOn : !oldState.isToggleOn
    }))
}

render(){
    return (
        <div>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn}
            </button>
        </div>
    )
}
```

### 3.自定义事件，子组件更改父组件状态
```javascript
//------------------------父组件------------------------
this.state = {
    rootState:''
}
parentEvent(val){
    //父组件内的事件，改变自身的初始状态
    this.setState({
        rootState:val
    })
}
<Child {...this.state} childCommit={this.parentEvent.bind(this)} />
//------------------------子组件------------------------
constructor(props){
    super(props);
    
}
commitCustomEvent(){
    let val= '...'
    this.props.childCommit(val)
}
render(){
    return (
        <div>
            {this.props.rootState}
            <button onClick={this.commitCustomEvent.bind(this)}>点击</button>
        </div>
    )
}
```
### 4.列表事件函数传参
```javascript
this.state = {
    list:['a',1,2,3]
}
handleClick(e,item,index){
    //e-> 事件函数
    //item-> 列表项
    //index -> 索引值
}
render(){
    return (
        <ul>
            // 用到事件对象时这么写
            {this.state.list.map((item,index)=>(<li onClick={e=>this.handleClick(e,item,index)} key={index}))}
            //不用事件函数可以这么写
            {this.handleClick.bind(this,item,index)}
        </ul>
    )
}
```
**注：如果列表项可能被重新排列，React不建议使用索引index作为keys，因为这会导致性能问题**

### 5.表单受控组件

>input表单元素，value值与state绑定的时候，需要制定onChange事件。否则会报错，无法绑定元素value的变更

绑定表单的状态，和初始值相同，会自动渲染
```javascript
this.state={
    value:'abcd'
}

handleChange(e){
    this.setState({
        value:e.target.value
    })
}
render(){
    return (
        <select value={this.stat.value} onChange={this.handleChange.bind(this)}>
        <option value="efg">efg</option>
        <option value="abcd">abcd</option>
    </select>
    )
}
```
> 上面的下拉菜单，会有默认值，abcd

### 6.ref、DOM、ReactDOM与钩子函数
>获取元素节点
```javascript
componentDidMount(){
    //相当于mounted，节点只能在此时获取
this.textInput.focus();
}
componentWillMount(){
// 这个相当于created，无法获取到节点
console.log(this.textInput);
}
<input ref={(ele)=>{this.textInput = ele}}/>
```
或者：
```javascript
handleClick(){
    this.refs.textInput.value=123;
}
render(){
    return (
        <div>
            <input ref="textInput"/>
            <input type="button" onClick={this.handleClick.bind(this)}/>
        </div>
    )
}
```
