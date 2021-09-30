<template>

	<view class="content">
		<view class="contentRow" v-for="(item,index) in shuju" :key="index" v-if="shuju.length>0" @click="jump"
			:data-url="`/pagesLzc/newDetail/newDetail?id=${item.id}`">
			<view class="contentRow1 dis_flex ju_b aic">
				<image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="type==0">
				</image>
				<!-- <image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="item.type==1"> -->
				</image>
				<view class="conView dis_flex aic">
					<view class="conView1 oh1">{{item.title}}</view>
					<!-- <view class="conView2 oh1">{{item}}</view> -->
				</view>
				<view class="conTime flex_0">
					{{gettime(item.create_time)}}
				</view>
			</view>

		</view>
		<view class="contentRow" v-for="(item,index) in news" :key="index" v-if="news.length>0">
			<view class="contentRow1 dis_flex ju_b aic">
				<image src="../../static/images/liu/sort/newsIcon.png" mode="aspectFill" class="headImg" v-if="type==0">
				</image>
				<!-- <image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="item.type==1"> -->
				</image>
				<view class="conView dis_flex aic">
					<view class="conView1 oh1">{{item.content}}</view>
					<!-- <view class="conView2 oh1">{{item}}</view> -->
				</view>
				<view class="conTime flex_0">
					{{gettime(item.create_time)}}
				</view>
			</view>
		
		</view>
		
	</view>
</template>
<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				shuju: [],
				page: 1,
				size: 20,
				type: 0,
				id: 1,
				isBt: 0,
				titleType:"默认",
				news:[]
			}
		},
		onHide() {

		},
		onLoad(options) {
			that = this;
			that.id = options.id;
			
			if (options.type) {
				that.titleType = options.type;
				uni.setNavigationBarTitle({
					title: `${options.type}列表`
				})
				if (options.type == "系统消息") {
					that.getNew()
				} else {
					that.getData()
				}
			}
		},
		onReachBottom() {
			if(that.titleType == "系统消息"){
				that.getNew()
			}else{
				that.getData()
			}
		},
		onPullDownRefresh() {
			that.shuju = [];
			that.page = 1;
			if(that.titleType == "系统消息"){
				that.getNew()
			}else{
				that.getData()
			}
			console.log(that.getTime("1632758400"))
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			gettime(timestamp){
				console.log(service.gettime(timestamp))
				return service.gettime(timestamp)
			},
			
			getTime(timestamp) {
				// 补全为13位
				var arrTimestamp = (timestamp + '').split('');
				for (var start = 0; start < 13; start++) {
					if (!arrTimestamp[start]) {
						arrTimestamp[start] = '0';
					}
				}
				timestamp = arrTimestamp.join('') * 1;

				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - timestamp;

				// 如果本地时间反而小于变量时间
				if (diffValue < 0) {
					return '不久前';
				}

				// 计算差异时间的量级
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;

				// 数值补0方法
				var zero = function(value) {
					if (value < 10) {
						return '0' + value;
					}
					return value;
				};

				// 使用
				if (monthC > 12) {
					// 超过1年，直接显示年月日
					return (function() {
						var date = new Date(timestamp);
						return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) +
							'日';
					})();
				} else if (monthC >= 1) {
					return parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					return parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					return parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					return parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					return parseInt(minC) + "分钟前";
				}
				return '刚刚';
			},
			getData() {
				if (that.isBt == 1) {
					return
				}
				that.isBt = 1;
				var jkurl = "article.Article/lst";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: this.page,
					size: this.size,
					cate_id: that.id

				}
				service.P_get(jkurl, data).then(res => {
					that.isBt = 0;
					var data = res.data;
					console.log(data)
					if (res.code == 1) {
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						if (this.page == 1) {
							this.shuju = res.data;
							if (data.length != 0) {
								this.page++
							}
						} else {
							if (data.length != 0) {
								that.shuju.concat(data)
								this.page++
							} else {
								this.more = "到底了"
								// that.data_last = true
							}

						}
					} else {
						if (res.msg) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "请求失败",
								icon: "none"
							})
						}
					}
				}).catch(e => {
					that.isBt = 0;
					console.log(e)
					uni.showToast({
						title: "请求异常",
						icon: "none"
					})
				})
			},
			getNew() {
				var jkurl = "User/message";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: that.page,
					size: that.size
				}
				service.P_get(jkurl, data).then(res => {
					var data = res.data;
					console.log(data)
					if (res.code == 1) {
						var data = res.data;
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						if (this.page == 1) {
							this.news = data;
							if (data.length != 0) {
								this.page++
							}
						} else {
							if (data.length != 0) {
								that.news.concat(data)
								this.page++
							} else {
								// this.more = "到底了"
								// that.data_last = true
							}
						}
					}
				}).catch(e => {
					console.log(e)
				})
			}
		}
	}
</script>

<style scoped>
	@import url("/static/css/commin.css");

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.contentRow {
		width: 100vw;
		height: 140rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 22rpx 24rpx 20rpx 29rpx;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.contentRow:last-child {
		border: none;
	}

	.headImg {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		min-width: 82rpx;
		position: relative;
	}

	.dain {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: #fff;
		left: 92rpx;
		top: 30rpx;
		border-radius: 50%;
	}

	.conView {
		width: 490rpx;
		/* flex:1; */
		height: 100%;
		min-width: 490rpx;
		box-sizing: border-box;
		padding-left: 19rpx;
	}

	.conView1 {
		font-size: 34rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #333333;
		line-height: 34rpx;
		margin-top: 5rpx;
		height: 34rpx;
	}

	.conView2 {
		font-size: 28rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
		/* margin-top: 17rpx; */
		height: 28rpx;
		position: absolute;
		bottom: 20rpx;
		padding-right: 30rpx;
	}

	.conTime {
		/* width: 100%; */
		height: 100%;
		font-size: 24rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 23rpx;
		min-width: 100rpx;
	}

	.dianNew {
		position: absolute;
		bottom: 2rpx;
		right: 30rpx;
		background-color: #007AFF;
	}
</style>
