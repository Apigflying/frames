var x = (function*(n) {
  console.log(n)
  let ab = yield n + 3;
  console.log(ab)
  let abc = yield ab + 2;
  console.log(abc)
  return abc + ab + n;
})(12)

x.next();
x.next(2);
x.next(15);