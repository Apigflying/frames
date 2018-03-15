var block = document.getElementById('block');
			var bw = block.getBoundingClientRect().width;
			let timeArr = [];
			let vm;
			//调用这个函数生成视图，传入的数据必须是  数组
			function setTimeArr(timeArr) {
				if(Array.isArray(timeArr)) {
					timeArr = timeArr;
					vm = createNewVue(timeArr);
				} else {
					alert('传入的不是数组')
				}
			}
        
			//调用这个函数获取  时间
			function getTimes() {
				return vm.renderArr;
			}

			function createNewVue(timeArr) {
				//布局信息
				const ww = window.innerWidth;
				//画布的大小
				const canvasMes = bw;
				//画布左上角在网页中的位置
				const pyl = {
					x: (ww - canvasMes) / 2,
					y: 0
				};
				//绘制的圆的信息
				const initial = {
					x: canvasMes / 2, //圆心x轴
					y: canvasMes / 2, //圆心y轴
					r: canvasMes / 3, //圆环半径
					lineWidth: canvasMes / 8 //圆环宽度
				};
				const ratio=window.devicePixelRatio;
				return new Vue({
					el: '#TimeSelect',
					data: {
						ww,
						canvasMes,
						pyl,
						timeArr,
						initial,
						ratio,
						currentset: 0,
						adddeg: 0,
						ctx: null,
						ctxb: null,
						allowset: false,
						incircle: false,
						cancelmove: false,
						movingArr: null,
						colors: ['#397bfa', '#ff5c7c', '#fecc44'],
						renderArr: []
					},
					methods: {
						cstart(ev) {

							//如果添加了三段时间，那么就不在添加了
							const i = this.initial;
							const rArr = this.renderArr;
							const colors = this.colors.map((item, index) => {
								return {
									color: item,
									index: index
								}
							});
							const dpos = {
								x: ev.touches[0].pageX - this.pyl.x,
								y: ev.touches[0].pageY - this.pyl.y,
							}
							this.cancelmove = rArr.length == 3;
							this.allowset = this.isSelect(dpos)
							this.incircle = !this.IsInCricle(dpos)
							if(this.cancelmove) {
								console.log('renderArr的长度为3，不再增加')
								return
							} else if(this.incircle) {
								console.log('点击的不在圆环内，无法添加')
								return
							} else if(this.allowset) {
								console.log('已经添加过的时间，无法重复添加')
								return
							}
							//计算颜色，按照颜色排序
							const setColor = () => {
								if(!!rArr.length && rArr[rArr.length - 1].color != colors[rArr.length - 1].color) {
									for(let j = 0; j < rArr.length; j++) {
										if(rArr[j].color != colors[j].color) {
											return colors[j]
										}
									}
								}
								return colors[rArr.length]
							}
							let currentcolor = setColor();
							this.currentset = currentcolor.index;
							//计算起始位置startTime，startdeg，startpos
							let movedeg = this.rounddeg(this.postodeg(dpos));
							this.adddeg = movedeg;
							rArr.push({
								index: currentcolor.index,
								startTime: this.degtotime(movedeg),
								endTime: this.degtotime(movedeg),
								startdeg: movedeg, //起始角度
								enddeg: movedeg, //结束角度
								color: currentcolor.color, //圆环颜色
								startpos: this.degtopos(movedeg),
								endpos: this.degtopos(movedeg),

							})
							rArr.sort((a, b) => {
								return a.index - b.index
							})
						},
						cmove(ev) {
							if(this.allowset) {
								return
							} else if(this.incircle) {
								return
							} else if(this.cancelmove) {
								return
							}
							const i = this.initial;
							const index = this.currentset;
							const rArr = this.renderArr;
							const timeMes = rArr[index];
							const sdeg = timeMes.startdeg;
							const mpos = {
								x: ev.touches[0].pageX - this.pyl.x,
								y: ev.touches[0].pageY - this.pyl.y,
							}
							let movedeg = this.rounddeg(this.postodeg(mpos));
							let flag = movedeg >= this.adddeg;
							this.moving(movedeg, timeMes, rArr, flag)
						},
						cend() {
							let x, rArr = this.renderArr;
							rArr.forEach((item, index, rArr) => {
								if(item.startdeg == item.enddeg) {
									this.delTime(index)
								}
							})
						},
						fw(movedeg, timeMes, rArr) { //first span
							let edeg = timeMes.enddeg;
							if(rArr.length == 1) {
								if(movedeg > edeg) {
									return edeg - 7.5
								} else {
									return movedeg
								}
							}
							let arr = this.movingArr;
							arr = rArr.map(item => {
								return item.enddeg
							});
							arr = arr.sort((a, b) => {
								return a - b
							});
							for(let i = 0; i < arr.length; i++) {
								if(arr[i] == edeg && !!arr[i - 1] && movedeg <= arr[i - 1]) {
									return arr[i - 1]
								} else if(arr[i] == edeg && !!arr[i - 1] && movedeg > edeg) {
									return arr[i - 1]
								} else if(!arr[i - 1] && movedeg > edeg) {
									return edeg - 7.5
								}
							}
							return movedeg;
						},
						lw(movedeg, timeMes, rArr) { //last span
							let sdeg = timeMes.startdeg;
							if(rArr.length == 1) {
								if(movedeg < sdeg) {
									return 630
								} else {
									return movedeg
								}
							}
							//执行这个函数，返回最终要渲染的end的位置
							let arr = this.movingArr;
							arr = rArr.map(item => {
								return item.startdeg
							});
							arr = arr.sort((a, b) => {
								return a - b
							});
							for(let i = 0; i < arr.length; i++) {
								if(arr[i] == sdeg && !!arr[i + 1] && movedeg >= arr[i + 1]) {
									return arr[i + 1]
								} else if(arr[i] == sdeg && !!arr[i + 1] && movedeg < sdeg) {
									return arr[i + 1]
								} else if(!arr[i + 1] && movedeg < sdeg) {
									return 630
								}
							}
							return movedeg;
						},
						isSelect(pos) {
							let ratio=this.ratio||1;
							
							var flag = this.ctx.getImageData(pos.x*ratio, pos.y*ratio, 1, 1).data[0] == 0 && this.ctx.getImageData(pos.x*ratio, pos.y*ratio, 1, 1).data[1] == 0 && this.ctx.getImageData(pos.x*ratio, pos.y*ratio, 1, 1).data[2] == 0;
							return !flag
						},
						IsInCricle(pos) { //判断点击的位置是否在圆环内
							const initial = this.initial;
							return Math.sqrt(Math.pow(initial.x - pos.x, 2) + Math.pow(initial.y - pos.y, 2)) <=
								(initial.r + initial.lineWidth / 2) &&
								Math.sqrt(Math.pow(initial.x - pos.x, 2) + Math.pow(initial.y - pos.y, 2)) >=
								(initial.r - initial.lineWidth / 2)
						},
						postodeg(p) { //根据位置返回当前的角度
							var changes, i = this.initial;
							if(i.y >= p.y && p.x >= i.x) {
								changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI
							} else if(i.y <= p.y) {
								changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI + 180
							} else if(p.x < i.x) {
								changes = Math.atan((p.x - i.x) / (i.y - p.y)) * 180 / Math.PI + 360
							}
							return changes + 270;
						},
						rounddeg(deg) { //依据角度返回当前的度数
							var round = Math.round(deg * 10 % 75);
							return round >= 35 ? ((parseInt(deg * 10 / 75) + 1) * 75 / 10) : (parseInt(deg * 10 / 75) * 75 / 10)
						},
						tstart(index, ev, flag) { //按下移动span，改变度数和时间
							const i = this.initial;
							const spanleft = ev.touches[0].target.getBoundingClientRect().left;
							const spantop = ev.touches[0].target.getBoundingClientRect().top;
							//flag为0是在操作√
							//在按下的时候记录角度
							const dpos = {
								x: ev.touches[0].pageX,
								y: ev.touches[0].pageY,
							}
							this.renderArr[index].downposinspan = {
								//在span内点击的位置
								//需要减去wrap元素的绝对位置，left和top值
								x: dpos.x - spanleft + this.pyl.x - i.lineWidth / 2,
								y: dpos.y - spantop + this.pyl.y - i.lineWidth / 2
							}
						},
						tmove(index, ev, flag) {
							const i = this.initial;
							const rArr = this.renderArr;
							const timeMes = rArr[index];
							const downposinspan = timeMes.downposinspan;

							//flag为0是在操作√
							const mpos = {
								x: ev.touches[0].pageX - downposinspan.x,
								y: ev.touches[0].pageY - downposinspan.y,
							}
							let movedeg = this.rounddeg(this.postodeg(mpos));

							this.moving(movedeg, timeMes, rArr, flag)
						},
						moving(movedeg, timeMes, rArr, flag) { //正在移动
							if(flag) {
								movedeg = this.lw(movedeg, timeMes, rArr)
								timeMes.enddeg = movedeg
								timeMes.endpos = this.degtopos(movedeg)
								timeMes.endTime = this.degtotime(movedeg)
							} else {
								movedeg = this.fw(movedeg, timeMes, rArr)
								timeMes.startdeg = movedeg
								timeMes.startpos = this.degtopos(movedeg)
								timeMes.startTime = this.degtotime(movedeg)
							}
							this.drawcircle();
						},
						tend(index) {
							const rArr = this.renderArr;
							const timeMes = rArr[index];
							if(timeMes.enddeg == timeMes.startdeg) {
								this.delTime(index)
							}
						},
						//将度数转换为时间 475 -> 9:30
						degtotime(deg) {
							let num = (deg - 270) / 15;
							if(Number.parseInt(num) == num) {
								return num < 10 ? '0' + num + ':00' : num + ':00'
							} else {
								return num < 10 ? '0' + Number.parseInt(num) + ':30' : Number.parseInt(num) + ':30'
							}
						},
						//删除时间
						delTime(index) {
							this.renderArr.splice(index, 1);
							this.drawcircle();
						},
						//将时间转换为角度
						timetodeg() {
							var timeNum = time => time.split(':')[1].indexOf('30') != -1 ? (Number.parseInt(time) + 0.5) * 15 + 270 : (Number.parseInt(time)) * 15 + 270;
							if(this.timeArr.length) {
								this.renderArr = this.timeArr.map((time, index) => {
									let time1 = timeNum(time.startTime);
									let time2 = timeNum(time.endTime);
									time.index = index;
									time.startdeg = time1; //起始角度
									time.enddeg = time2; //结束角度
									time.color = this.colors[index]; //圆环颜色
									time.startpos = this.degtopos(time1);
									time.endpos = this.degtopos(time2);
									return time
								});
							}
						},
						//将度数转换为位置
						degtopos(deg) {
							const i = this.initial;
							return {
								x: Math.sin((deg + 90) / 180 * Math.PI) * i.r + i.x - i.lineWidth / 2,
								y: i.y - Math.cos((deg + 90) / 180 * Math.PI) * i.r - i.lineWidth / 2
							}
						},
						//canvas绘制圆弧
						drawcircle() {
							const i = this.initial;
							this.ctx.clearRect(0, 0, this.canvasMes, this.canvasMes)
							this.ctxb.clearRect(0, 0, this.canvasMes, this.canvasMes)
							if(this.renderArr.length) {
								this.renderArr.forEach((tms, index) => {
									this.ctx.beginPath();
									this.ctx.lineWidth = i.lineWidth;
									this.ctx.strokeStyle = tms.color;
									this.ctx.arc(i.x, i.y, i.r, tms.startdeg * Math.PI / 180, tms.enddeg * Math.PI / 180);
									this.ctx.stroke();
								})
							}
							this.ctxb.beginPath();
							this.ctxb.lineWidth = i.lineWidth;
							this.ctxb.strokeStyle = '#9a9dba';
							this.ctxb.arc(i.x, i.y, i.r, 0, 2 * Math.PI)
							this.ctxb.stroke();
							this.ctxb.textBaseline = 'top';
							this.ctxb.textAlign = 'center';
							this.ctxb.font = `${i.lineWidth/4}px Arial`;
							for(var j = 1; j < 25; j++) {
								this.ctxb.fillStyle = '#9a9dba';
								if(j % 6 == 0) {
									this.ctxb.beginPath();
									this.ctxb.fillStyle = '#383c4f';
								}
								this.ctxb.fillText('' + j,
									i.x + Math.sin((j * 360 / 24) * Math.PI / 180) *
									(i.r - i.lineWidth / 2 - i.lineWidth / 4),
									i.y - Math.cos((j * 360 / 24) * Math.PI / 180) *
									(i.r - i.lineWidth / 2 - i.lineWidth / 4) - i.lineWidth / 6);
							}
						},
						//设置根据renderArr的item来展示span的样式
						spanpos(data, x) {
							const i = this.initial;
							const p = x ? data.endpos : data.startpos;
							return {
								'width': `${i.lineWidth}px`,
								'height': `${i.lineWidth}px`,
								'line-height': `${i.lineWidth}px`,
								'border-color': data.color,
								'color': data.color,
								'transform': `translate(${p.x}px,${p.y}px)`
							}
						},
						scales(canvas, ctx) {
							//放大屏幕的
							let width = canvas.width,
								height = canvas.height,
								ratio=this.ratio;
							if(ratio) {
								canvas.style.width = width + "px";
								canvas.style.height = height + "px";
								canvas.height = height * ratio;
								canvas.width = width * ratio;
								ctx.scale(ratio, ratio);
							}
						},
					},
					created() {
						this.timetodeg()
					},
					mounted() {
						var canvasevent = document.getElementById('canvasevent');
						var canvasblock = document.getElementById('canvasblock');
						this.ctx = canvasevent.getContext('2d');
						this.ctxb = canvasblock.getContext('2d');
						this.scales(canvasevent, this.ctx);
						this.scales(canvasblock, this.ctxb);
						this.drawcircle();
					}
				})
			}