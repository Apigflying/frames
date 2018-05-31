
export default class Base {
  constructor() { }
  sleep (data, timeout = 2000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, timeout);
    })
  }
};
