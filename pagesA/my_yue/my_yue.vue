<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="main_box">
				<view class="top_box">
					<image class="top_box_img" :src="getimg('/static/images/mon_banner_03.jpg')" mode="aspectFill"></image>
					<view class="top_box_box">
						<view class="top_box_btn" @tap="jump" data-url="/pagesA/my_tx/my_tx?type=1">
							提现<text class="iconfont iconnext-m"></text>
						</view>
						<view class="top_d1">账户余额(元)</view>
						<view class="top_d2">{{loginDatas.money?loginDatas.money:'0.00'}}</view>
					</view>
				</view>
				<view class="tixian_tit"><image :src="getimg('/static/images/mon_icon.png')" mode="aspectFit"></image>明细</view>
				<view class="tx_list">
					<view class="tx_li" v-for="(item,index) in datas">
						<view class="tx_l">
							<view class="mx_name">{{item.change_type_value}}</view>
							<view class="mx_time">{{item.create_time}}</view>
						</view>
						<view class="tx_r">
							<view  class="mx_pri">{{item.symbol}}{{item.price}}</view>
						</view>
					</view>
					<view v-if="datas.length==0" class="zanwu">暂无数据</view>
					<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				</view>
			</view>
		</htmlLoading>
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
				datas:'',
				page:1,
				size:20
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
			this.getdatalist()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img){
				return service.getimg(img)
			},
			onRetry(){
				// uni.stopPullDownRefresh()
				// return
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/user/getMyMoney'
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					page:that.page,
					size:that.size,
					type:1
				}
				if(that.data_last) return
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					that.$refs.htmlLoading.htmlReset_fuc(0)
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
				
						if (page_that == 1) {
				
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++
				
					} else {
						that.htmlReset = 1
					that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
				
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
	.main_box{
		width: 100%;
		padding: 30upx;
	}
	.top_box{
		width: 100%;
		position: relative;
		border-radius: 27upx;
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
		border-radius: 27upx;
	}
	.top_box_box{
		width: 100%;
		position: relative;
		z-index: 10;
		min-height: 296upx;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.top_box_btn{
		position: absolute;
		top: 27upx;
		right: 30upx;
		width: 126upx;
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
		font-weight: bold;
		line-height: 95upx;
	}
	.tixian_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		color: #FD383B;
		font-size: 28upx;
		margin-top: 20upx;
	}
	.tixian_tit image{
		width: 30upx;
		height: 24upx;
		margin-right: 15upx;
	}
	.tx_list{
		width: 100%;
		/* padding: 15upx 0; */
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
