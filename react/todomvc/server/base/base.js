
export default class Base {
  sleep(data,time = 2000){
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(data)
      }, time);
    })
  }
}