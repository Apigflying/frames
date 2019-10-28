const fn = (val) =>{
  return new Promise((resolve)=>{
    setTimeout(() => {
        resolve(val);
    }, 2000);
  })
}

function annotation(target) {
  target.annotated = true
}

@annotation
class User {
  name = 'abcd';
  async test(){
    const value = await fn(this.name);
    console.log(value);
  }
}

const user = new User();
user.test();