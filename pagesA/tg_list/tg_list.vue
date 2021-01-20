<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" src="../../static/images/images/tg_bg_02.png" mode=""></image>
				<view class="top_box_msg">
					<view class="top_l">
						<view class="top_l1">推广人数</view>
						<view class="top_l2">6<text>人</text></view>
					</view>
					<image class="tg_icon" src="../../static/images/tg_num.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="list_box">
				<view class="list_tit">
					<view class="list_tab" :class="tab_cur==1?'cur':''" @tap="tab_fuc(1)">一级(6)</view>
					<view class="list_tab" :class="tab_cur==2?'cur':''" @tap="tab_fuc(2)">二级(0)</view>
				</view>
				<block v-for="(item,index) in 10">
					<view class="hy_li">
						<image class="hy_li_tx" src="/static/images/tx_m2.jpg" mode="aspectFill"></image>
						<view class="hy_li_msg">
							<view class="hy_li_msg1">
								<view class="hy_name">会员{{tab_cur}}</view>
								<view>消费：￥98元</view>
							</view>
							<view class="hy_li_msg2">
								<view class="hy_time">2020-06-08</view>
								<view>推广人数：9人</view>
							</view>
						</view>
					</view>
				</block>
				
				<!-- <view v-if="goods_list.length==0" class="zanwu">暂无数据</view> -->
				<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
				<view  class="data_last">我可是有底线的哟~~~</view>
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
	var that
	export default {
		data() {
			return {
				btnkg:0,
				htmlReset:-1,
				data_last:false,
				tab_cur:1
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			
		},
		onLoad(option) {
			that=this
			if(option.type){
				this.type=option.type
			}
			that.datas=[]
			that.htmlReset=0
			return
			this.onRetry()
		},
		methods: {
			tab_fuc(num){
				that.tab_cur=num
			}
		}
	}
</script>

<style scoped>
	.top_box{
		width: 100%;
		position: relative;
	}
	.top_box_bg{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.top_box_msg{
		position: relative;
		z-index: 1;
		width: 100%;
		height: 314upx;
		padding-top: 45upx;
		padding-bottom: 100upx;
		display: flex;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 80upx;
		align-items: center;
	}
	.tg_icon{
		width: 150upx;
		height: 150upx;
	}
	.top_l1{
		font-size: 28upx;
		color: #fff;
	}
	.top_l2{
		font-size: 70upx;
		color: #fff;
		display: flex;
		align-items: baseline;
	}
	.top_l2 text{
		font-size: 28upx;
	}
	.list_box{
		width: 100%;
		padding: 0 30upx;
	}
	.list_tit{
		width: 100%;
		height: 118upx;
		background: #FFFFFF;
		box-shadow: 1px 3px 6upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 4upx;
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		margin-top: -90upx;
		margin-bottom: 30upx;
		position: relative;
		z-index: 10;
	}
	.list_tab{
		font-size: 30upx;
		color: #999;
		display: flex;
		align-items: center;
		border-bottom: 2px solid rgba(0,0,0,0);
	}
	.list_tab.cur{
		color: #F23C44;
		border-bottom: 2px solid #F23C44;
	}
	.hy_li{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid #F5F5F5;
	}
	.hy_li_tx{
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		flex: none;
		margin-right: 17upx;
	}
	.hy_li_msg{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.hy_li_msg1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_li_msg2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_name{
		font-size: 32upx;
		color: #000;
	}
	.hy_time{
		font-size: 24upx;
	}
</style>
