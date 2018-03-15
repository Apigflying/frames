import { bb } from './tools.js'
const PI = Math.PI;

function createVue() {
  console.log('abcd')
  return new Vue({
    el: '#ceshi',
    data: {
      abc: '测试'
    },
    methods: {
      abcd() {
        console.log(bb())
      }
    }
  })
}
const vm = createVue();