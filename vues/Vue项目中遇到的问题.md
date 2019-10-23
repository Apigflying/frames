

标签（空格分隔）： Vue

---


## 1.element-ui
### checkboxgroup的问题
> checkboxgroup接收的是一个数组（数组包对象）
```js
<el-checkbox-group v-model="checkList">
    <button @click="testss">ceshi </button>
    <el-checkbox v-for="item,index in checkList" :key="index" :label="item">{{item.value}}</el-checkbox>
</el-checkbox-group>

checkList: [{
  label: 1,
  value: 'b'
}, {
  label: 2,
  value: 'e'
}, {
  label: 3,
  value: 'y'
}]
```
此时的三个都被选中，取消选中一个，就会从原数组中删除一项
原因是，取消选中后，操作的是原数组
>解决办法：添加参照数组
```js
<el-checkbox-group v-model="checkList">
    <button @click="testss">ceshi </button>
    <el-checkbox v-for="item,index in checkListOptions" :key="index" :label="item">{{item.value}}</el-checkbox>
</el-checkbox-group>

checkListOptions: [{
  label: 1,
  value: 'b'
}, {
  label: 2,
  value: 'e'
}, {
  label: 3,
  value: 'y'
}],
checkList:[]
```
>这样就会在checkList中添加和删除label项了





