<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view v-if="datas" class="xieyi_main" v-html="get_fwb(datas)"></view>
			<block v-else>
				<view class="my_top">
					<image class="my_top_bg" src="../../static/images/my_bg_02.png" mode=""></image>
					<view class="my_top_box">
						<!-- 签到 -->
						<view class="qiandao_box">
							<view class="qd_nbox">
								<text class="iconfont iconqiandao"></text>
								<text>签到</text>
								<text class="iconfont iconqiandao" style="opacity: 0;"></text>
							</view>
						</view>
						<!-- 签到 -->
						<view class="top_user dis_flex">
							<image class="user_tximg" src="../../static/images/tx_m2.jpg" mode="aspectFill"></image>
							<view class="user_msg">
								<view class="dis_flex aic">
									<view class="user_name">依辈通用户</view>
									<view class="vip_box">
										<image class="vip_box_bg" src="../../static/images/vip_bg.png" mode=""></image>
										<view class="vip_box_box">
											<image src="../../static/images/vip.png" mode=""></image>
											<text>普通会员</text>
										</view>
									</view>
								</view>
								<view class="user_tel">电话：16852563542</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				datas:'',
				htmlReset:-1,
			}
		},
		onLoad() {
			that=this
			that.htmlReset=0
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.minh100{
		background: #F8F8F8;
	}
	.my_top{
		width: 100%;
		height: 357upx;
		
		position: relative;
		overflow: hidden;
	}
	.my_top_bg{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 357upx;
	}
	.my_top_box{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		width: 100%;
		height: 357upx;
		padding: 66upx 63upx 0;
	}
	.qiandao_box{
		position: absolute;
		right: -50upx;
		top: 100upx;
		z-index: 10;
		min-height: 60upx;
		background: linear-gradient(127deg, #F9676C, #F54248);
		border: 1px solid #FFFFFF;
		border-radius: 31upx;
		padding: 5upx;
	}
	.qd_nbox{
		padding: 0 20upx;
		height: 50upx;
		background: #FFFFFF;
		border: 1px solid #FFFFFF;
		border-radius: 26px;
		display: flex;
		align-items: center;
	}
	.qd_nbox text{
		margin: 0 4upx;
	}
	.top_user{
		width: 100%;
	}
	.user_tximg{
		width: 118upx;
		height: 118upx;
		background: #FFFFFF;
		border: 2upx solid #CBB180;
		box-shadow: 0upx 0upx 12upx 0upx rgba(188, 157, 103, 0.2);
		border-radius: 50%;
		flex:none;
		margin-right: 15upx;
	}
	.user_msg{
		height: 118upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.user_name{
		font-size: 36upx;
		color: #fff;
		margin-right: 8upx;
	}
	.user_tel{
		font-size: 28upx;
		color: #fff;
	}
	.vip_box{
		min-width: 151upx;
		min-height: 44upx;
		background: #EBE0CE;
		border: 2px solid #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 22px;
		position: relative;
		padding: 4upx 6upx;
	}
	.vip_box_bg{
		z-index: 1;
		position: absolute;
		width: auto;
		height: auto;
		background: #DB3535;
		border-radius: 18upx;
		top: 2upx;
		bottom: 2upx;
		left: 4upx;
		right: 4upx;
	}
	.vip_box_box{
		position: relative;
		z-index: 2;
		font-size: 20upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2upx 11upx;
	}
	.vip_box_box image{
		width: 28upx;
		height: 25upx;
		margin-right: 6upx;
	}
</style>
