<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/images/tg_bg_02.png')" mode=""></image>
				<view class="top_box_msg">
					<view class="top_l">
						<view class="top_l1">当前佣金</view>
						<view class="top_l2">26</view>
					</view>
					<image class="tg_icon" :src="getimg('/static/images/tgyj.png')" mode="aspectFit"></image>
				</view>
			</view>
			<view class="list_box">
				<view class="list_tit">
					<view class="tit_l">
						<image :src="getimg('/static/images/mon_icon.png')" mode="aspectFit"></image>明细
					</view>
					<picker  class="dis_flex" @change="bindPickerChange" :value="hetong_index" :range="hetong_list" range-key="title" data-type="3">
							<view class="tit_r">{{hetong_list[hetong_index].title}}<text class="iconfont iconoff"></text></view>
					</picker>
					
				</view>
				
				<view class="tx_li" v-for="(item,index) in 3">
					<view class="tx_l">
						<view class="mx_name">提现</view>
						<view class="mx_time">2017-02-17</view>
					</view>
					<view class="tx_r">
						<view  class="mx_pri">+12.00</view>
					</view>
				</view>
				
				<!-- <view v-if="goods_list.length==0" class="zanwu">暂无数据</view> -->
				<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
				<!-- <view  class="data_last">我可是有底线的哟~~~</view> -->
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
				tab_cur:1,
				hetong_list:[
					{
						title:'一级返佣',
						id:1
					},
					{
						title:'二级返佣',
						id:2
					},
					{
						title:'公司奖励',
						id:3
					},
				],
				hetong_index:0,
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
			getimg(img){
			 return	service.getimg(img)
			},
			tab_fuc(num){
				that.tab_cur=num
			},
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.currentTarget.dataset)
					console.log('picker发送选择改变，携带值为', e.target.value)
					var datas=e.currentTarget.dataset
					if(datas.type==1){ //套餐
						this.taocan_index = e.target.value
					}
					if(datas.type==2){ //时间
						this.date = e.target.value
					}
					if(datas.type==3){ //合同
						this.hetong_index = e.target.value
						// that.gettaocan(that.hetong_list[e.target.value].id)
					}
					
			},
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
		width: 690upx;
		padding: 0 30upx;
		min-height: calc(100vh - 220upx);
		background: #fff;
		position: relative;
		margin: -94upx auto 0;
		z-index: 10;
		
		background: #FFFFFF;
		box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
	}
	.list_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tit_l{
		font-size: 28upx;
		color: #FD383B;
		display: flex;
		align-items: center;
	}
	.tit_l image{
		width: 30upx;
		height: 24upx;
		margin-right: 15upx;
	}
	.tit_r{
		width: 149upx;
		height: 43upx;
		background: #FFFFFF;
		border: 1px solid #F33E45;
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #FD383B;
	}
	.tit_r text{
		font-size: 20upx;
		margin-left: 5upx;
	}
	.tx_li{
		width: 100%;
		padding: 15upx 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
	}
	.tx_li+.tx_li{
		margin-top: 12upx;
	}
	.tx_l{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.tx_r{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.mx_name{
		color: #292929;
		font-size: 28upx;
	}
	.mx_time{
		color: #999;
		font-size: 20upx;
		margin-top: 10upx;
	}
	.mx_pri{
		color: #FD383B;
		font-size: 27upx;
		font-weight: bold;
	}
</style>
