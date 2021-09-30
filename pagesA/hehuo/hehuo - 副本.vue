<!-- 合伙人 -->
<template>
	<view class="content">
		<view class="heR1 dis_flex ju_b aic">
			<view class="heText1">
				筛选
			</view>
			<picker class="dis_flex aic" mode="date" @change="shaiDataChange">
				<text class="heText1">{{shaiData}}</text>
				<text class="iconfont1 icon-xiala xialaH"></text>
			</picker>
		</view>
		<view class="heR2 dis_flex ju_b aic">
			<view class="heR3l_1">
				总人数
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">12</text>
			</view>
		</view>
		<view class="heR3 dis_flex ju_b aic">
			<view class="heR3l">
				<view class="heR3l_1">消费业绩</view>
				<view class="heR3l_2">业绩分红</view>
			</view>
			<view class="heR3R">
				<view class="heR3R_1">￥2562.00</view>
				<view class="heR3l_2">￥556.00</view>
			</view>
		</view>
		<view class="heR3 dis_flex ju_b aic mb20">
			<view class="heR3l">
				<view class="heR3l_1">话费业绩</view>
				<view class="heR3l_2">业绩分红</view>
			</view>
			<view class="heR3R">
				<view class="heR3R_1">￥2562.00</view>
				<view class="heR3l_2">￥136.00</view>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				公司奖励
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">￥136.00</text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				账户余额
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1">￥136.00</text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic border-bottomf81">
			<view class="heR3l_1">
				提现
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1" style="color: #42BB32;">-￥1100.00</text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic mb20">
			<view class="heR3l_1">
				提现记录
			</view>
			<view class="dis_flex aic">
				<text class="iconfont1 icon-right" style="color: #bbbbbb;"></text>
			</view>
		</view>
		<view class="heR2 dis_flex ju_b aic">
			<view class="heR3l_1">
				累计已提
			</view>
			<view class="dis_flex aic">
				<text class="heR3R_1" style="color: #42BB32;">-￥1100.00</text>
			</view>
		</view>
		<view class="heBtn dis_flex aic ju_c">
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
				shaiData:"2021-08",
				shuju:{
					num:12,
					
				}
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
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
			shaiDataChange(e){
				var data = e.target.value.split("-");
				that.shaiData = `${data[0]}-${data[1]}`
			}
		}
	}
</script>

<style scoped>
/*  @import url("/static/css/commin.css"); */

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
	.heBtn{
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
