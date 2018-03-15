'use strict';

// 传递的数据
var drawArr = [{
    name: '强电专业',
    yearTotal: 320,
    system: []
}, {
    name: '弱电专业',
    yearTotal: 120,
    system: [{
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }]
}, {
    name: '空调专业',
    yearTotal: 536,
    system: [{
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }]
}, {
    name: '给排水专业',
    yearTotal: 210,
    system: [{
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }]
}, {
    name: '消防专业',
    yearTotal: 180,
    system: [{
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }]
}, {
    name: '安防专业',
    yearTotal: 430,
    system: [{
        yearTotal: 200
    }, {
        yearTotal: 200
    }, {
        yearTotal: 200
    }]
}, {
    name: '强电专业',
    yearTotal: 320,
    system: []
}, {
    name: '强电专业',
    yearTotal: 320,
    system: []
}, {
    name: '强电专业',
    yearTotal: 320,
    system: []
}, {
    name: '强电专业',
    yearTotal: 320,
    system: []
}];
//计算总数
var vm = null;
/*
	调用setProfession,传入数据即可
*/
function setProfession(drawArr) {
    vm = createPie(setColors(drawArr));
}

//setProfession(drawArr) //测试用

//获取当前选择的专业
function getProfession() {
    console.log(vm.current);
    return vm.current;
}
//给每个专业添加颜色值
function setColors(drawArr) {
    var colors = ['#5094F8', '#FF7FE5', '#60E9CF', '#FF8A7F', '#FDD763', '#FE7494', '#C37FFF', '#50C2F8', '#7DE960', '#827FFF', '#FF5050'];
    return drawArr.map(function (item, index) {
        item.color = colors[index];
        return item;
    });
}

function createPie(drawArr) {
    var canvasMes = window.innerWidth; //设备的宽度
    var initial = {
        fontSize: 11, //文字大小
        pointTextColor: '#777C95', //文字颜色
        pointR: 4, //圆点的半径
        pointTextSpace: 10, //圆点和文字之间的空隙
        pointPointSpace: 10, //每行圆点的高度间距
        pointPos: {
            x: 20, //圆点距离左边的距离
            y: canvasMes / 20 //第一个圆点距离上边距的距离,也是圆盘顶端距离上边的距离
        }
    };
    //圆盘的信息
    var piewidth = canvasMes * 2 / 5; //圆盘的宽度
    var pie = {
        w: piewidth, //pie的宽度
        h: piewidth, //pie的高度
        r: piewidth / 2, //pie的半径（半径需要是宽和高的一半）
        x: canvasMes - piewidth - 20, //pie距离左侧的距离（以圆盘左边开始计算）
        y: initial.pointPos.y //pie距离顶部的距离(以圆盘顶部开始计算)
    };
    var sj = canvasMes / 40; //控制三角的大小
    //三角的点位
    var triangle = { //三角位置
        top: { //顶点位置
            x: pie.x + pie.r,
            y: pie.y + 2 * pie.r + sj / 2
        },
        left: { //左点位置
            x: pie.x + pie.r - sj,
            y: pie.y + 2 * pie.r + sj * 2
        },
        right: { //右点位置
            x: pie.x + pie.r + sj,
            y: pie.y + 2 * pie.r + sj * 2
        }
        //计算所有数据value的总数
    };var allnums = getAllNum();
    function getAllNum() {
        if (drawArr.length == 1) {
            return drawArr[0].yearTotal;
        } else {
            return drawArr.reduce(function (a, b) {
                return typeof a === 'number' ? a + b.yearTotal : a.yearTotal + b.yearTotal;
            });
        }
    }
    //在每个里面添加一个prcent百分比
    drawArr = drawArr.map(function (item, index) {
        var lastitem = drawArr[index - 1];
        item.prcent = item.yearTotal / allnums;
        item.start = lastitem ? lastitem.end : 0;
        item.end = item.start + item.prcent * 360;
        return item;
    });
    return new Vue({
        el: '#PieSelect',
        data: {
            allnums: allnums,
            canvasMes: canvasMes,
            drawArr: drawArr, //要渲染的数据
            initial: initial, //左侧颜色圆点说明
            pie: pie, //右侧的饼状图
            triangle: triangle, //饼状图下面三角
            ctx: null, //canvas上下文
            ctxe: null,
            fpyl: null,
            pyl: null, //偏移量
            startdeg: 0,
            moved: 0,
            isDown: false,
            current: drawArr[0]
        },
        methods: {
            tstart: function tstart(ev) {
                var dpos = {
                    x: ev.touches[0].pageX - this.pyl.left,
                    y: ev.touches[0].pageY - this.pyl.top
                };
                if (this.downposincircle(dpos)) {
                    return;
                }
                this.isDown = true;
                this.startdeg = this.postodeg(dpos);
            },
            tmove: function tmove(ev) {
                var mpos = {
                    x: ev.touches[0].pageX - this.pyl.left,
                    y: ev.touches[0].pageY - this.pyl.top
                };
                if (!this.isDown) {
                    return;
                }
                if (this.drawArr.length == 1) {
                    return;
                }
                //当前移动点的位置
                var movedeg = this.postodeg(mpos);
                //当前改变的度数
                var moved = movedeg - this.startdeg;
                //绘制改变的度数
                this.circlerotate(moved);
                this.startdeg = movedeg;
            },
            circlerotate: function circlerotate(moved) {
                var _this = this;

                //movedeg的改变
                moved = moved >= 0 ? moved : (360 + moved) % 360;
                var drawArr = this.drawArr;
                drawArr.forEach(function (item, index) {
                    item.start = (item.start + moved) % 360;
                    item.end = (item.start + item.prcent * 360) % 360;
                    if (item.start < 360 && item.end > 0 && item.start > item.end) {
                        _this.current = item;
                        _this.drawtri(item);
                    }
                });
                this.drawpie();
                this.drawcenter();
            },
            tup: function tup() {
                var _this2 = this;

                var current = this.current;
                var center = (360 - current.start + current.end) / 2;
                var zd = !current.start ? -current.end / 2 : center - current.end; //终点
                var startTime = Date.now();
                var lastdegs = 0;
                var currentdeg = 0;
                var times = 400;
                var siv = setInterval(function () {
                    var t = Date.now() - startTime;
                    if (t > times) {
                        t = times;
                        clearInterval(siv);
                    }
                    lastdegs = linear(t, 0, zd, times);
                    currentdeg = lastdegs - currentdeg;
                    _this2.circlerotate(currentdeg);
                    currentdeg = lastdegs;
                }, 20);

                function linear(t, b, c, d) {
                    //匀速
                    return c * t / d + b;
                }
                this.isDown = false;

                console.log(this.current);
                var bridge = getJsBridge();
                bridge.call("getChoseSyste", this.current);
            },
            postodeg: function postodeg(p) {
                //根据位置返回当前的角度
                var changes,
                    i = {
                    x: this.pie.r,
                    y: this.pie.r
                };
                if (i.y >= p.y && p.x >= i.x) {
                    changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI;
                } else if (i.y <= p.y) {
                    changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI + 180;
                } else if (p.x < i.x) {
                    changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI + 360;
                }
                return changes;
            },
            drawexample: function drawexample() {
                var _this3 = this;

                //绘制图例
                var init = this.initial;
                var fpyl = this.fpyl;
                var drawArr = this.drawArr;
                drawArr.forEach(function (item, index) {
                    _this3.drawpoint(init.pointPos.x, init.pointPos.y + index * (init.fontSize + init.pointPointSpace), init.pointR, 0, 360, item.color, item.name + ' - ' + item.yearTotal, init.fontSize, init.pointTextColor, init.pointTextSpace);
                });
            },
            drawpoint: function drawpoint(x, y, r, start, end, color, texts, fontSize, textColor, pointTextSpace) {
                //绘制圆
                var ctx = this.ctx;
                var unit = Math.PI / 180;
                ctx.beginPath();
                ctx.arc(x, y, r, start * unit, end * unit);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.font = fontSize + 'px Arial';
                ctx.textBaseline = "middle";
                ctx.textAlign = "left";
                ctx.fillStyle = textColor;
                ctx.fillText(texts, x + pointTextSpace + 2 * r, y + 2);
            },
            drawpie: function drawpie() {
                var _this4 = this;

                //依据drawArr绘制饼状图
                var pie = this.pie; //饼状图的信息
                var ctx = this.ctxe;
                var drawArr = this.drawArr;
                ctx.clearRect(0, 0, pie.w, pie.w);
                drawArr.forEach(function (item, index) {
                    _this4.drawcircle(pie.r, pie.r, pie.r, item.start + 90, item.end + 90, item.color, !!item.system ? item.system.length : 0, item.name == _this4.current.name ? _this4.current : null);
                });
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.lineWith = "3px";
                ctx.arc(pie.r, pie.r, pie.r * 2 / 3, 0, 2 * Math.PI);
                ctx.stroke();
            },
            drawcenter: function drawcenter() {
                //绘制圆盘中间的文字和圆
                var pie = this.pie;
                var ctx = this.ctxe;
                var init = this.initial;
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.arc(pie.r, pie.r, pie.r / 3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.font = 2 * init.pointR + 'px Arial';
                ctx.textAlign = "center";
                ctx.fillStyle = '#777d95';
                ctx.fillText('\u603B\u6570:' + this.allnums, pie.r, pie.r + init.pointR);
            },
            drawtri: function drawtri() {
                var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.drawArr[0];
                //current是当前要展示的信息,绘制三角形指针
                var tri = this.triangle;
                this.drawtriangle(tri.top.x, tri.top.y, tri.left.x, tri.left.y, tri.right.x, tri.right.y, current.color, current.name + ' ' + current.yearTotal);
            },
            downposincircle: function downposincircle(pos) {
                //判断点击的点是否在pie的范围内
                var pie = this.pie;
                var distance = Math.sqrt(Math.pow(pos.x - pie.r, 2) + Math.pow(pos.y - pie.r, 2));
                return distance >= pie.r;
            },
            drawtriangle: function drawtriangle(x1, y1, x2, y2, x3, y3, color, text) {
                //绘制三角形
                var ctx = this.ctx;
                var pie = this.pie;
                ctx.clearRect(x1 - pie.r, y1, x1 + pie.r, y1 + pie.r);
                var init = this.initial;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
                ctx.fillStyle = color;
                ctx.closePath();
                ctx.fill();
                ctx.font = 2 * init.pointR + 'px Arial';
                ctx.textAlign = "center";
                ctx.fillText(text, x1, y1 + this.canvasMes / 15);
            },
            drawcircle: function drawcircle(x, y, r, start, end, color, num, current) {
                //绘制饼状图
                if (start == end) {
                    start = 0;
                    end = 360;
                }
                var pie = this.pie;
                num = num > 6 ? 6 : num;
                var addeg = end > start ? end - start : 360 - (start - end);
                var everydeg = addeg / num;
                var ctx = this.ctxe;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.fillStyle = color;
                ctx.arc(x, y, r, start * Math.PI / 180, end * Math.PI / 180);
                ctx.fill();
                if (current) {
                    for (var i = 0; i < num; i++) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.fillStyle = 'rgba(255,255,255,' + i / num + ')';
                        ctx.arc(x, y, r * 2 / 3, (start + everydeg * i) * Math.PI / 180, (start + everydeg * (i + 1)) * Math.PI / 180);
                        ctx.fill();
                    }
                }
            },
            drawall: function drawall(current) {
                //绘制初始状态
                this.drawcenter();
                this.drawpie();
                this.drawexample();
                this.drawtri(current);
            },
            scales: function scales(canvas, ctx) {
                var width = canvas.width,
                    height = canvas.height;
                console.log(width);
                if (window.devicePixelRatio) {
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio;
                    canvas.width = width * window.devicePixelRatio;
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                }
            },
            initcanvas: function initcanvas(current) {
                this.drawall(current);
                this.tup();
            }
        },
        mounted: function mounted() {
            var canvas = document.getElementById('canvas');
            var canvaspie = document.getElementById('canvaspie');
            var fpyl = {
                left: canvas.getBoundingClientRect().left,
                top: canvas.getBoundingClientRect().top
            };
            this.fpyl = fpyl;
            //canvaspie元素在页面中的偏移量
            this.pyl = {
                left: canvaspie.getBoundingClientRect().left + fpyl.left,
                top: canvaspie.getBoundingClientRect().top + fpyl.top
            };
            //获取canvas上下文
            this.ctx = canvas.getContext('2d');
            this.ctxe = canvaspie.getContext('2d');
            this.scales(canvas, this.ctx);
            this.scales(canvaspie, this.ctxe);
            this.initcanvas(this.drawArr[0]);
        }
    });
}
