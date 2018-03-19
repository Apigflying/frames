import config from './index'
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      /*
      	320对应的是iphone5的分辨率
      	在原型图上量取200px的宽度，200/20 -> 10rem就是写入样式的尺寸
      	通常和sass预处理一起使用，用sass提取20px作为变量
      */
      const HTMLFONTSIZE = config.rem * (clientWidth / config.clientWidth);
      if (HTMLFONTSIZE < 12) {
        console.error('html的font-size小于12px，会按照最小12px进行处理，此时的rem已经不准确')
      }
      docEl.style.fontSize = HTMLFONTSIZE + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);