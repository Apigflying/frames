import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios,axios)


const service=axios.create({
	baseURL: 'http://localhost/api', // api的base_url
    timeout: 30000, // 请求超时时间
    withCredentials: true //是否跨站点访问控制请求
})

// request拦截器
//service.interceptors.response.use(
//	function(response){
//		//获取到数据之后，进行拦截
//		//正常获取之后，要做的事情
//
//		//............//
//		return response
//	},
//	function(error){
//		//获取数据失败的时候，走这里
//		console.log(error) // for debug
//	}
//)

export default service
