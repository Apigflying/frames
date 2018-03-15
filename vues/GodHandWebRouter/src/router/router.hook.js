//导航钩子函数和重定向函数

export function auth(to) {
  //登录验证重定向
  const { hash, params, query } = to
  // if (query.to === 'foo') {
  //   return { path: '/foo', query: null }
  // }
  // if (hash === '#baz') {
  //   return { name: 'baz', hash: '' }
  // }
  // if (params.id) {
  //   return '/with-params/:id'
  // } else {
  //   return '/bar'
  // }
}
export function beforeFooEnter(to, from, next) {
  next()
}
export function beforeParticalMesEnter(to, from, next) {
  next()
}
export function beforeBuildingEnter(to, from, next) {
  next()
}