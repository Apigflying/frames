<template>
  <div id="app">
    <header>
      上帝之手项目路由测试
			<i class="icon iconfont icon-Wrench"></i>
			<input type="button" value="发送请求" @click="sendrequest">
    </header>
		<section>
				<router-view>
					<div slot="abc">
					</div>
				</router-view>
		</section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
	name:'App',
	data(){return{
	}},
	methods:{
		sendrequest(){
			
		}
	}
}
</script>
<style>
	.view{
		color:#FF0000;
	}
</style>
<style scoped>
.abc-enter-active,.abc-leave-active{
	transition:all 0.3s ease-out;
}
.abc-enter,.abc-leave-active{
	opacity: 0;
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>