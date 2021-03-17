<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/images/js_banner_02.jpg')" mode="aspectFit"></image>
				<view class="top_msg">您的订单已创建成功，请立即支付！</view>
			</view>
			<view class="guige_list">
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">订单号：</view>
					  <!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.o_order_num}}</view>
					</view>
				</view>
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">订单金额：</view>
					  <!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.money}}</view>
					</view>
				</view>
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">下单时间：</view>
					  <!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{gettime(datas.create_time)}}</view>
					</view>
				</view>
			</view>
			<view class="hengxian"></view>
			<view class="guige_list">
				<view class="guige_tit">支付方式</view>
				
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name"><image :src="getimg('/static/images/wxpay.png')" mode=""></image>微信支付</view>
						<!-- <view>10元</view> -->
					</view>
					<!-- <view class="xuanze1 " :class="my_dou_xuan==true? 'xuanze2':''" @tap.stop="select"> -->
					<view class="xuanze1 " :class="my_dou_xuan==true? 'xuanze2':''">
						<text v-if="my_dou_xuan==true" class="iconfont iconduigou-copy active"></text>
					</view>
				</view>
			</view>
			
			
			<view class="pay_btn" @tap="pay_fuc">立即支付</view>
		</view>
		
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		data() {
			return {
				htmlReset: -1,
				my_dou_xuan: true,
				pay_data:'',
				datas:''
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
		onLoad(option) {
			that=this
			that.htmlReset=0
			that.getpay(JSON.parse(option.datas))
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			gettime(mj){
				if (!mj) {
					return ''
				}
			
				var ntime = new Date(mj * 1000)
				// console.log(ntime)
				var n_year = ntime.getFullYear();
				var n_month = ntime.getMonth() + 1;
				var n_date = ntime.getDate();
				var n_hour = ntime.getHours();
				var n_minute = ntime.getMinutes();
				return n_year + '-' + n_month + '-' + n_date + n_hour + ':' + n_minute
			},
			select() {
			  var that = this
			  that.my_dou_xuan= !that.my_dou_xuan
			  // that.jisuan()
			},
			getpay(datas){
				 let jkurl='/makeOrder'
				 uni.showLoading({
				 	mask:true,
					title:'正在生成订单'
				 })
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
					that.btnkg=0
					console.log(res)
					/*if(res.code==1001){
						uni.showToast({
							icon: 'none',
							title: '购买成功'
						})
						service.wxlogin()
						setTimeout(()=>{
							uni.hideLoading()
						
							that.btnkg=0
								uni.redirectTo({
									url:'/pagesA/OrderList/OrderList'
								})
						},1000)
						return
					}*/
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.pay_data=res.payData
						that.datas=datas
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
							
			},
			pay_fuc(){
				service.wxpay(that.pay_data).then(res => {
					
					uni.showToast({
						icon: 'none',
						title: '购买成功'
					})
					service.wxlogin('token')
					setTimeout(() => {
						uni.redirectTo({
							url:'/pagesA/OrderList/OrderList'
						})
					}, 1000)
				}).catch(e => {
					that.btn_kg=0
					uni.showToast({
						icon: 'none',
						title: '微信支付失败'
					})
					service.wxlogin()
					setTimeout(() => {
						uni.redirectTo({
							url:'/pagesA/OrderList/OrderList'
						})
					}, 1000)
				})
				return
				uni.showToast({
					icon: 'none',
					title: '购买成功'
				})
				setTimeout(()=>{
					uni.hideLoading()
				
					that.btnkg=0
						uni.redirectTo({
							url:'/pagesA/OrderList/OrderList'
						})
				},1000)
				return
				var datas = {
			  		token: that.loginMsg.userToken,
			  		type:that.type,
						address_id:that.address.id,
						advocacy_bean:that.use_dou,
			  		g_data:that.g_data,
						coupon_list:coupon_list
			  	}
				let jkurl='/makeOrder'
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
					that.btnkg=0
					console.log(res)
					if(res.code==1001){
						uni.showToast({
							icon: 'none',
							title: '购买成功'
						})
						service.wxlogin()
						setTimeout(()=>{
							uni.hideLoading()
						
							that.btnkg=0
								uni.redirectTo({
									url:'/pagesA/OrderList/OrderList'
								})
						},1000)
						return
					}
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						service.wxpay(res.data).then(res => {
							uni.showToast({
								icon: 'none',
								title: '购买成功'
							})
							service.wxlogin()
							setTimeout(() => {
								uni.redirectTo({
									url:'/pagesA/OrderList/OrderList'
								})
							}, 1000)
						}).catch(e => {
							that.btn_kg=0
							uni.showToast({
								icon: 'none',
								title: '微信支付失败'
							})
							service.wxlogin()
							setTimeout(() => {
								uni.redirectTo({
									url:'/pagesA/OrderList/OrderList'
								})
							}, 1000)
						})
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.top_box{
		
		position: relative;
	}
	.top_box_bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 750upx;
		height: 246upx;
		z-index: 0;
	}
	.top_msg{
		width: 750upx;
		height: 246upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		color: #FEFEFE;
		position: relative;
		z-index: 1;
	}
	.guige_list{
		width: 100%;
		padding: 0 30upx;
	}
	.guige_li{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.guige_l{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #333;
	}
	.guige_l_name{
		color: #333;
		margin-right: 25rpx;
		display: flex;
		align-items: center;
	}
	.guige_l_name image{
		width: 56upx;
		height: 50upx;
		margin-right: 15upx;
	}
	.guige_r{
		font-size: 28upx;
		color: #999;
	}
	
	.hengxian{
		width: 100%;
		height: 20upx;
		background: #F4F4F4;
	}
	.guige_tit{
		font-size: 28upx;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		
	}
	.xuanze1{
		width: 30upx;
		height: 30upx;
		background: #FFFFFF;
		border: 1px solid #C7C7C7;
		border-radius: 50%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex:none;
	}
	.xuanze2{
		border: 0;
	}
	.active {
		color: #FD383B;
	}
	.pay_btn{
		width: 690upx;
		height: 85upx;
		background: #F84336;
		border-radius: 43upx;
		position: fixed;
		bottom: 30px;
		left: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
	}
</style>
