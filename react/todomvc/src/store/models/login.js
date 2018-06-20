
import { getData } from 'api/getDatas';
const LOADING = 'LOADING';
const LOADEND = 'LOADEND';


const init = {
  loading: false,
  isLogin: false
}

// 一个状态的文件，只对外暴露一个reducer。其他提交action的函数，需要单独引用使用
export function loginReducer (state = init, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLogin: true, msg: '', ...action.payload }
    case LOADEND:
      return { ...state, isLogin: false, msg: '', ...action.payload }
    default:
      return { ...state, isLogin: false, msg: '', ...action.payload }
  }
}

export function userLogin ({ name = '', password = '', check = false } = {}) {
  console.log('====================================');
  console.log(name);
  console.log('====================================');
  return async (dispatch)=>{
    let {data,status} =await getData({
      name,password,check
    });
    if(status === 200){
      dispatch({type: LOADEND, payload: data})
    }
  }
}