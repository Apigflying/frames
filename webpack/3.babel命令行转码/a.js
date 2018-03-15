const abc = (time) => {
  let nx = 123;
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('abcd')
    }, time + nx);
  })
}
abc(2000).then(res => {
  alert(res)
})

//将a.js文件转码成b.js文件转换规则在.babelrc文件中