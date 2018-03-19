import tools from 'utils/tools'
const getters = {
  token: state => state.common.token,
  // jobId: state => {
  //   let jobId = state.repair.jobId
  //   if (!jobId) {
  //     jobId = tools.getStorage('jobId')

  //   }
  //   return jobId
  // },
}

export default getters