import { loginByUsername } from "api/index";
import { setToken,getToken } from "utils/auth";
import Cookies from 'js-cookie';

const login = {
  state: {
    token: getToken()||"",// 用户的身份标识，token
    beforeUrl: '', // 之前所在的页面
    userAuthList:null // 权限列表
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data.token;
      setToken(data.token);
      state.userAuthList = data.roles; // 赋予用户权限
    },
    SET_BEFORE_RUL: (state, beforeUrl) => {
      state.beforeUrl = beforeUrl
      Cookies.set('beforeUrl',beforeUrl)
    },
    LOGO_OUT:(state)=>{
      state.beforeUrl = '/';
      Cookies.set('beforeUrl','/');// 退出登录后，下次登录直接跳转到首页
      setToken('');
      state.userAuthList = null
    }
  },
  actions: {
    async LoginByUsername({ commit }, userInfo) {
      try {
        // 使用用户名请求登录数据
        let {data} = await loginByUsername(userInfo);
        if(!!data.token){
          commit("SET_TOKEN", data);
          return data;
        }else{
          return {
            message:'用户名错误'
          }
        }
        /*
          let result = data.result || 'fail';
          if(result === 'unauthen'){
            return {
              message: "登录已过期，请重新登录"
            }
          }else if(result === 'unuser'){
            return {
              message: "该用户名不存在"
            }
          }else if(result === 'unpassword'){
            return {
              message: "密码错误"
            }
          }else if(result == 'fail'){
            return {
              message: "网络错误，请稍后再试"
            }
          }else{

          }
        */
      } catch (error) {
        return {
          message:error,
        }
      }
    }
  }
};

export default login;
