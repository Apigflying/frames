//登录权限验证
export default {
	login(customInpu,customPswd,cb){
		//cb是在调用时候传入的高阶回调函数
		cb=arguments[arguments - 1]
		if(localStorage.token){
			//cb接受一个参数
			//function(Boolean){...}
			this.verifyresult(true,cb)
			return
		}
		pretendRequest(customInpu ,customPswd ,res=>{
			if(res.authenticated) {
				localStorage.token=res.token
				if(cb) cb(true)
				this.onChange(true)
			}
		} )
	},
	verifyresult(flag,cb){
		if(typeof cb=='function') cb(flag)
		this.onChange(flag)
	},
	
}
