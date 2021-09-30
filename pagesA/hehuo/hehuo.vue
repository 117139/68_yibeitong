<!-- 合伙人 -->
<template>
	<view class="content">
		<view class="heR1 dis_flex ju_b aic">
			<view class="heText1">
				筛选
			</view>
			<picker class="dis_flex aic" mode="date" @change="shaiDataChange" fields="month">
				<text class="heText1">{{shaiData}}</text>
				<text class="iconfont icon-xiala xialaH"></text>
			</picker>
		</view>
		<view class="heR2 dis_flex ju_b aic">
			<view class="heR3l_1">
				总人数
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">{{shuju.allPeople||0}}</text>
			</view>
		</view>
		<view class="heR3 dis_flex ju_b aic">
			<view class="heR3l">
				<view class="heR3l_1">消费业绩</view>
				<view class="heR3l_2">业绩分红</view>
			</view>
			<view class="heR3R">
				<view class="heR3R_1">￥{{shuju.allOrderPayMoney||0}}</view>
				<view class="heR3l_2">￥{{shuju.allOrderMoney||0}}</view>
			</view>
		</view>
		<view class="heR3 dis_flex ju_b aic mb20">
			<view class="heR3l">
				<view class="heR3l_1">话费业绩</view>
				<view class="heR3l_2">业绩分红</view>
			</view>
			<view class="heR3R">
				<view class="heR3R_1">￥{{shuju.prepaidPayMoney||0}}</view>
				<view class="heR3l_2">￥{{shuju.prepaidMoney||0}}</view>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				公司奖励
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">￥{{shuju.record||0}}</text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				账户余额
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">￥{{shuju.commission||0}}</text>
			</view>
		</view>
		<!-- <view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				提现
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1" style="color: #42BB32;">-￥{{shuju.submitted||0}}</text>
			</view>
		</view> -->
		<view class="heR2 dis_flex ju_b aic mb20" @tap="jump" :data-url="'/pagesA/my_yue/my_yue?type='+2">
			<view class="heR3l_1">
				提现记录
			</view>
			<view class="dis_flex aic">
				<text class="iconfont icon-right" style="color: #bbbbbb;"></text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic">
			<view class="heR3l_1">
				累计已提
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1" style="color: #42BB32;">-￥{{shuju.submitted_commission||0}}</text>
			</view>
		</view>
		<view class="heBtn dis_flex aic ju_c" @tap="jump" data-url="/pagesA/my_tx/my_tx?type=1">
			提现
		</view>
	</view>
</template>

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
				shaiData: "2021-08",
				shuju: {
					allPeople: 12,//总人数
					allOrderMoney:0,//总消费金额
					prepaidMoney:0,//总花费
					record:0,//公司奖励
					commission:0,//账户余额
					submitted:0,//提现
					submitted_commission:0,//累计已提
					allOrderPayMoney:0,//消费业绩
					allOrderMoney:0,//业绩分红
					prepaidPayMoney:0,//话费业绩
					prepaidMoney:0//业绩分红
					
					
				}
			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			
			this.getShuJu(new Date().getTime())
			var year = new Date().getFullYear();
			var mou = new Date().getMonth()+1;
			that.shaiData = `${year}-${mou}`
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			shaiDataChange(e) {
				var data = e.target.value.split("-");
				that.shaiData = `${data[0]}-${data[1]}`
				var time = new Date(data).getTime();
				this.getShuJu(time)
				
			},
			getShuJu(time) {
				var time = time;
				var myUrl = service.IP_lzc+"User/myTeam3";
				var data = {
					month_date: time,
					token: that.$store.state.loginDatas.userToken || ''
				}
				service.P_get(myUrl,data).then(res => {
					if (res.code == 1) {
						console.log(res.data)
						this.shuju = res.data;
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					uni.showToast({
						title: "服务器异常"
					})
				})
			}
		}
	}
</script>

<style scoped>
	@import url("/commin_lzc/iconfont.css");
	@import url("/static/css/commin.css");

	.content {
		background-color: #f8f8f8;
		width: 100%;
		max-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.heR1 {
		width: 100vw;
		height: 84rpx;
		box-sizing: border-box;
		padding: 0 31rpx;
	}

	.xialaH {
		font-size: 20rpx;
		color: #333;
		margin-left: 11rpx;
	}

	.heText1 {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
	}

	.heR2 {
		width: 100vw;
		height: 90rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30rpx 0 28rpx;
	}

	.heR3 {
		width: 100vw;
		height: 138rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30rpx 0 29rpx;
		margin-top: 20rpx;
	}

	.heR3R {
		text-align: end;
	}

	.heR3l_1 {
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		line-height: 32rpx;
	}

	.heR3l_2 {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #666666;
		line-height: 24rpx;
		margin-top: 23rpx;
	}

	.heR3R_1 {
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #F54248;
		line-height: 28rpx;
	}

	.heBtn {
		width: 690rpx;
		height: 80rpx;
		background: #F54248;
		border-radius: 4rpx;
		margin: 54rpx 30rpx 0 30rpx;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;

	}
</style>
