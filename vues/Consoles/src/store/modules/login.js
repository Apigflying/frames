import { loginByUsername,getUserInfo } from "api/index";
import { setToken,getToken } from "utils/auth";
import Cookies from 'js-cookie';

const login = {
  state: {
    token: getToken()||"",// 用户的身份标识，token
    beforeUrl: '', // 之前所在的页面
    userAuthList:null, // 权限列表
    userMessage:null
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data.token;
      setToken(data.token);
    },
    SET_BEFORE_RUL: (state, beforeUrl) => {
      state.beforeUrl = beforeUrl
      Cookies.set('beforeUrl',beforeUrl)
    },
    LOGO_OUT:(state)=>{
      state.beforeUrl = '/';
      Cookies.set('beforeUrl','/');// 退出登录后，下次登录直接跳转到首页
      setToken('');
      state.userAuthList = null;
      state.userMessage = null;
    },
    SET_USER_INFO:(state,data)=>{// 获取用户信息
      state.userMessage = data
    }
  },
  actions: {
    async getUserInfoByToken({commit},state){
      try {
        let {data} = await getUserInfo(state.token);
        commit('SET_USER_INFO',data)
        return data;
      }catch(e){
        return {
          message:e
        }
      }
    },
    async LoginByUsername({ commit }, userInfo) {
      try {
        // 用户名+密码登录
        let {data} = await loginByUsername(userInfo);
        if(!!data.token){
          commit("SET_TOKEN", data);
          return data;
        }else{
          return {
            message:'用户名错误'
          }
        }
      } catch (error) {
        return {
          message:error,
        }
      }
    }
  }
};

export default login;
