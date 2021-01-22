<template>
	<view class="minh100">
		<view class="top_box">
			<image class="top_box_img" :src="getimg('/static/images/share_index_02.jpg')" mode="aspectFill"></image>
			<view class="top_box_box">
				<view class="top_box_btn" @tap="jump" data-url="/pagesA/my_tx_list/my_tx_list">
					提现记录<text class="iconfont iconnext-m"></text>
				</view>
				<view class="top_d1">当前佣金(元)</view>
				<view class="top_d2">{{loginDatas.commission}}</view>
				<view class="dis_flex aic ju_a top_num">
					<view class="dis_flex_c aic">
						<view>累计佣金</view>
						<view class="top_pri">{{loginDatas.total_commission}}</view>
					</view>
					<view class="num_hg"></view>
					<view class="dis_flex_c aic">
						<view>累计已提</view>
						<view class="top_pri">{{loginDatas.submitted_commission}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main_box">
			<view class="main_li" @tap="jump" data-url="/pagesA/tg_img/tg_img">
				<image :src="getimg('/static/images/share_index_05.jpg')" mode="aspectFit"></image>
				<text>推荐名片</text>
			</view>
			<view class="main_li" @tap="jump" data-url="/pagesA/tg_list/tg_list">
				<image :src="getimg('/static/images/share_index_07.jpg')" mode="aspectFit"></image>
				<text>推广人统计</text>
			</view>
			<view class="main_li" @tap="jump" data-url="/pagesA/tgyj_list/tgyj_list">
				<image :src="getimg('/static/images/share_index_09.jpg')" mode="aspectFit"></image>
				<text>佣金明细</text>
			</view>
		</view>
		<view class="bottom_box" @tap="jump" data-url="/pagesA/my_tx/my_tx">立即提现</view>
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
				tx_num:'',
				tx_max:100
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
				// 'order_ls_data'
			]),
			
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
		onShow(){
			if(this.show_num>1){
				this.page=1
				this.goods_sele=[]
				this.all=false
				this.onRetry()
			}
			this.show_num++
			// this.getOrderList('onshow')
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			// this.getdatalist()
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				var that = this
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.top_box{
		position: relative;
		width: 100%;
	}
	.top_box_img{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
	.top_box_box{
		width: 100%;
		position: relative;
		z-index: 10;
		min-height: 338upx;
		padding: 30upx 30upx 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.top_box_btn{
		position: absolute;
		top: 27upx;
		right: 30upx;
		width: 152upx;
		height: 40upx;
		background: #FFFFFF;
		border-radius: 20upx;
		font-size: 24upx;
		color: #FC6956;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top_box_btn text{
		color: #FC6855;
		font-size: 20upx;
		margin-left: 8upx;
	}
	.top_d1{
		font-size: 24upx;
		color: #fff;
	}
	.top_d2{
		font-size: 90upx;
		color: #fff;
		margin-top: 20upx;
	}
	
	.top_num {
		width: 100%;
		margin-top: 15upx;
		font-size: 26upx;
		color: #fff;
	}
	
	.top_pri {
		font-size: 36upx;
		margin-top: 20upx;
	}
	
	.num_hg {
		width: 1px;
		height: 71upx;
		background: #FFFFFF;
		opacity: 0.2;
	}
	.main_box{
		width: 690upx;
		height: 264upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		margin: -24upx auto 30upx;
		display: flex;
		position: relative;
		z-index: 90;
		align-items: center;
		
	}
	.main_li{
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
	}
	.main_li image{
		width: 100upx;
		height: 100upx;
		margin-bottom: 36upx;
	}
	.mian_li text{
		font-size: 30upx;
		color: #333;
	}
	.bottom_box{
		position: fixed;
		bottom: 50upx;
		left: 30upx;
		font-size: 30upx;
		color: #fff;
		width: 690upx;
		height: 80upx;
		background: #F84336;
		border-radius: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
