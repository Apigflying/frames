import tools from "utils/tools";
import { loginByUsername } from "api/index";
import { setToken } from "utils/auth";
const common = {
  state: {
    token: ""
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async LoginByUsername({ commit }, userInfo) {
      try {
        // 使用用户名请求登录数据
        let {data} = await loginByUsername(userInfo);
        console.log(data);
        if(!!data.token){
          commit("SET_TOKEN", data.token);
          setToken(data.token);
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

export default common;
