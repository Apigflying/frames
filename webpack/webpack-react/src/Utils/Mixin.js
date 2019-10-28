
// 给类 混合 方法.将共用的原型方法抽离
export default (methods) => {
  return (target) => {
    Object.assign(target.prototype, methods);
  };
};