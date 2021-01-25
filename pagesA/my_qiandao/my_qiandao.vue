<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/qiandao_02.jpg')" mode=""></image>
				<view class="top_box_box">
					<view class="qd_d1">
						<view class="qd_num">0</view>
						<view>我的收益</view>
					</view>
					<view class="qd_d2">
						<view>{{Today_ymd}}</view>
						<view>已连续签到<text>0</text>天</view>
					</view>
				</view>
			</view>
			<view class="calendar_wbox">
				<view class="calendar-wrapper">
					<!-- <view class="header" v-if="headerBar">
						<view class="pre" @click="changeMonth('pre')">上个月</view>
						<view>{{y+'年'+formatNum(m)+'月'}}</view>
						<view class="next" @click="changeMonth('next')">下个月</view>
					</view> -->
					<view class="week">
						<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
					</view>
					<view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
						<view :style="{ top: positionTop + 'rpx' }" class="days">
							<view class="item" v-for="(item, index) in dates" :key="index">
								<view class="day" @click="selectOne(item, $event)" :class="{
					                        choose: choose == `${item.year}-${item.month}-${item.date}`&&item.isCurM,
					                        nolm: !item.isCurM,
					                        today: isToday(item.year, item.month, item.date),
					                        isWorkDay: isWorkDay(item.year, item.month, item.date)
					                    }">
									{{ Number(item.date) }}
								</view>
								<view class="markDay" v-if="isMarkDay(item.year, item.month, item.date)&&item.isCurM"></view>
								<!-- <view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view> -->
							</view>
						</view>
					</view>
					<image :src="getimg('https://i.loli.net/2020/07/16/2MmZsucVTlRjSwK.png')" mode="scaleToFill" v-if="collapsible" @click="toggle"
					 class="weektoggle" :class="{ down: monthOpen }"></image>
				</view>
				<!-- <ren-calendar ref='RenCalendar' :markDays='markDays' :headerBar='false' @onDayClick='onDayClick'></ren-calendar>
				<view class="change">选中日期：{{curDate}}</view> -->
			</view>
			<view class="diandao_btn" @tap="qd_fuc">立即签到</view>
			<view class="dq_tip_box">
				<view class="dq_tip_tit">签到说明</view>
				<view class="dq_tip_text">
					1.签到领钱，签到一天可领现金红包一个。（可提现）   
					<br>2.连续签到7天，及到7天倍数日都有惊喜现金红包奖励。
					<br>3.如签到中途中断，则连续签到天数重新计算。
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	var that
	export default {
		components: {
			// RenCalendar
		},
		data() {
			return {
				datas: '',
				htmlReset: -1,
				curDate: '',
				
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth() + 1, // 月
				dates: [], // 当前月的日期数据
				positionTop: 0,
				monthOpen: true,
				choose: '',
				Today_date:'',
				Today_ymd:'',
				
				// 星期几为第一天(0为星期日)
				weekstart: 0,
				// 标记的日期
				markDays: [
					'2021-01-11',
					'2021-01-12',
					'2021-01-13',
					'2021-01-19',
				],
				//是否展示月份切换按钮
				headerBar:false,
				// 是否展开
				open: true,
				//是否可收缩
				collapsible:false,
				//未来日期是否不可点击
				disabledAfter: true
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'about_content']),
			// 顶部星期栏
			weekDay() {
			    return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
			},
			height() {
			    return (this.dates.length / 7) * 80 + 'rpx';
			}
		},
		created() {
		    this.dates = this.monthDay(this.y, this.m);
		    !this.open && this.toggle();
		},
		mounted() {
		    this.choose = this.getToday().date;
		    this.Today_date = this.getToday().date;
		    this.Today_ymd = this.getToday().ymd;
			that = this
			that.htmlReset = 0
			// console.log(this.$children)
			// console.log(this.$refs)
			// console.log(this.$children.RenCalendar)
			// console.log(this.$refs.RenCalendar)
			// let today = this.$children.RenCalendar.getToday().date;
			// console.log(today)
			// this.curDate = today;
			// this.markDays.push(today);
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			qd_fuc(){
				uni.showToast({
					icon:'none',
					title:'签到成功'
				})
			},
			onDayClick(data) {
				this.curDate = data.date;
			},
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			},
			getToday() {
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth();
				let d = date.getDate();
				let week = new Date().getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let today = {
					date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
					ymd: y + '年' + this.formatNum(m + 1) + '月' + this.formatNum(d)+'日',
					week: formatWeek
				};
				return today;
			},
			// 获取当前月份数据
			monthDay(y, month) {
				let dates = [];
				let m = Number(month);
				let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0;
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart;
					} else {
						return 7 - weekstart + firstDayOfMonth;
					}
				})();
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: this.formatNum(lastDayOfLastMonth - startDay + i),
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
						year: m - 1 >= 0 ? y : y - 1
					});
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: this.formatNum(j),
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: this.formatNum(m),
						year: y,
						isCurM: true //是否当前月份
					});
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: this.formatNum(k),
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
						year: m + 1 <= 11 ? y : y + 1
					});
				}
				// console.log(dates);
				return dates;
			},
			isWorkDay(y, m, d) {
				return true;
				//是否工作日
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let week = formatDY.getDay();
				if (week == 0 || week == 6) {
					return false;
				} else {
					return true;
				}
			},
			isFutureDay(y, m, d) {
				//是否未来日期
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let showTime = formatDY.getTime();
				let curTime = new Date().getTime();
				if (showTime > curTime) {
					return true;
				} else {
					return false;
				}
			},
			// 标记日期
			isMarkDay(y, m, d) {
				let flag = false;
				for (let i = 0; i < this.markDays.length; i++) {
					let dy = `${y}-${m}-${d}`;
					if (this.markDays[i] == dy) {
						flag = true;
						break;
					}
				}
				return flag;
			},
			isToday(y, m, d) {
				let checkD = y + '-' + m + '-' + d;
				let today = this.getToday().date;
				if (checkD == today) {
					return true;
				} else {
					return false;
				}
			},
			// 展开收起
			toggle() {
				this.monthOpen = !this.monthOpen;
				if (this.monthOpen) {
					this.positionTop = 0;
				} else {
					let index = -1;
					this.dates.forEach((i, x) => {
						this.isToday(i.year, i.month, i.date) && (index = x);
					});
					this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80;
				}
			},
			// 点击回调
			selectOne(i, event) {
				let date = `${i.year}-${i.month}-${i.date}`;
				let selectD = new Date(date).getTime();
				let curTime = new Date().getTime();
				let week = new Date(date).getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let response = {
					date: date,
					week: formatWeek
				};
				if (!i.isCurM) {
					// console.log('不在当前月范围内');
					return false;
				}
				if (selectD > curTime) {
					if (this.disabledAfter) {
						console.log('未来日期不可选');
						return false;
					} else {
						this.choose = date;
						this.$emit('onDayClick', response);
					}
				} else {
					this.choose = date;
					this.$emit('onDayClick', response);
				}
				console.log(response);
			},
			//改变年月
			changYearMonth(y, m) {
				this.dates = this.monthDay(y, m);
				this.y = y;
				this.m = m;
			},
			changeMonth(type) {
				if (type == 'pre') {
					if (this.m + 1 == 2) {
						this.m = 12;
						this.y = this.y - 1;
					} else {
						this.m = this.m - 1;
					}
				} else {
					if (this.m + 1 == 13) {
						this.m = 1;
						this.y = this.y + 1;
					} else {
						this.m = this.m + 1;
					}
				}
				this.dates = this.monthDay(this.y, this.m);
			}
		}
	}
</script>

<style scoped>
	.minh100 {
		background: #FFF7F8;
	}

	.top_box {
		position: relative;
		width: 100%;
	}

	.top_box_bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 511upx;
		z-index: 0;
	}

	.top_box_box {
		position: relative;
		width: 100%;
		height: 511upx;
		z-index: 1;
		padding-top: 238upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.qd_d1 {
		width: 210upx;
		height: 210upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #333;
		font-weight: bold;
	}

	.qd_num {
		font-size: 32upx;
		font-weight: bold;
		margin-bottom: 15upx;
	}

	.qd_d2 {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 60upx;
		font-size: 26upx;
	}

	.qd_d2 text {
		font-size: 32upx;
		color: #F50014;
		margin: 0 4upx;
		font-weight: bold;
	}

	.calendar_wbox {
		width: 100%;
		padding: 0 28upx;
	}
	.diandao_btn{
		background: #ED0611;
		width: 690upx;
		height: 90upx;
		border-radius: 45upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
		margin: 30upx auto;
	}
	.dq_tip_box{
		width: 100%;
		padding: 0 30upx 100upx;
	}
	.dq_tip_tit{
		width: 100%;
		display: flex;
		align-items: center;
		height: 100upx;
		font-size: 28upx;
		color: #333;
	}
	.dq_tip_text{
		font-size: 26upx;
		color: #333;
		line-height: 35upx;
	}
</style>
<style lang="scss" scoped>
	.calendar-wrapper {
		color: #bbb7b7;
		font-size: 28rpx;
		text-align: center;
		padding-bottom: 10rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			color: #42464A;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 2rpx solid #f2f2f2;

			.pre,
			.next {
				color: #4d7df9;
				font-size: 28rpx;
				font-weight: normal;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
				border: 2rpx solid #dcdfe6;
			}

			.pre {
				margin-right: 30rpx;
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);
			color: #F50014;
			view {
				flex: 1;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			transition: height 0.4s ease;
			
			background-color: #fff;
			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 80rpx;
					line-height: 80rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						overflow: hidden;
						border-radius: 60rpx;

						&.choose {
							background-color: #4d7df9;
							color: #fff;
						}

						&.nolm {
							color: #fff;
							opacity: 0.3;
						}
					}

					.isWorkDay {
						color: #42464a;
					}

					.notSigned {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #fa7268;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						
						pointer-events: none;
					}

					.today {
						color: #fff;
						background-color: #a8c0ff;
					}

					.workDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #4d7df9;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}

					.markDay {
						font-style: normal;
						width: 12rpx;
						height: 12rpx;
						// background: #fc7a64;
						background: #F50014;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						margin-left: -6upx;
						pointer-events: none;
					}
				}
			}
		}

		.hide {
			height: 80rpx !important;
		}

		.weektoggle {
			width: 85rpx;
			height: 32rpx;
			position: relative;
			bottom: -42rpx;

			&.down {
				transform: rotate(180deg);
				bottom: 0;
			}
		}
	}
</style>
