import tools from 'utils/tools'
import Cookies from 'js-cookie'
const getters = {
  token: state => state.login.token,
  beforeUrl:state=> state.login.beforeUrl,
  userAuthList:state=> state.login.userAuthList,
  // jobId: state => {
  //   let jobId = state.repair.jobId
  //   if (!jobId) {
  //     jobId = tools.getStorage('jobId')

  //   }
  //   return jobId
  // },
}

export default getters
