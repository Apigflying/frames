'use strict';

var abc = function abc(time) {
  var nx = 123;
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('abcd');
    }, time + nx);
  });
};
abc(2000).then(function (res) {
  alert(res);
});
