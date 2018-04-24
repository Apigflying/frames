import Mock from 'mockjs';

var loginByUsername= config => {
  return 'denglu'
}

Mock.mock(/\/login\/login/, 'get', loginByUsername)
