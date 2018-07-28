<template>
  <div class="canvas-wrap">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Arrow from 'components/canvas/Arrow';
const W = window.innerWidth;
const H = window.innerHeight;
const arrow = new Arrow({
  x:100,
  y:100,
  vx:0.2
});
let firstTime,lastTime;
export default {
  name: 'canvas-class',
  data: function () {
    return {
      canvas:null,
      ctx:null
    }
  },
  mounted () {
    this._initCanvas();
  },
  methods: {
    animate(){
      firstTime = +new Date();
      this.ctx.clearRect(0,0,W,H);
      // 让小球运动
      arrow.rotation+=-arrow.vx;
      arrow.render(this.ctx);
      lastTime = +new Date();

      // console.log(+new Date() - firstTime);
      // firstTime = +new Date();


      requestAnimationFrame(this.animate);
    },
    _initCanvas(){// 初始化元素
      this.canvas = this.$refs.canvas;
      this.canvas.width = W;
      this.canvas.height = H;
      this.ctx = this.canvas.getContext('2d');
      this.animate();
    },

  }
}
</script>

<style scoped lang="scss">
@import "../../style/base";
.canvas-wrap{
  @include wh;
}
</style>
