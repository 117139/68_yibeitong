<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/images/js_banner_02.jpg')" mode="aspectFit">
				</image>
				<view class="top_msg">您的订单待支付，请立即支付！</view>
			</view>
			<view class="guige_list">
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">订单号：</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
						<view>{{datas.o_order_num}}</view>
					</view>
				</view>
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">订单金额：</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
						<view>{{datas.o_price}}</view>
					</view>
				</view>
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">下单时间：</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
						<view>{{gettime(datas.o_create_time)}}</view>
					</view>
				</view>
			</view>
			<view class="hengxian"></view>
			<view class="guige_list">
				<view class="guige_tit">支付方式</view>

				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">
							<image :src="getimg('/static/images/wxpay.png')" mode=""></image>微信支付
						</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="xuanze1 " :class="my_dou_xuan==1? 'xuanze2':''" @tap.stop="select(1)">
						<!-- <view class="xuanze1 " :class="my_dou_xuan==true? 'xuanze2':''"> -->
						<text v-if="my_dou_xuan==1" class="iconfont iconduigou-copy active"></text>
					</view>
				</view>
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">
							<image src="/static/images/ye_pay.png" mode=""></image>余额支付
						</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="xuanze1 " :class="my_dou_xuan==2? 'xuanze2':''" @tap.stop="select(2)">
						<!-- <view class="xuanze1 " :class="my_dou_xuan==true? 'xuanze2':''"> -->
						<text v-if="my_dou_xuan==2" class="iconfont iconduigou-copy active"></text>
					</view>
				</view>
			</view>


			<view class="pay_btn" @tap="pay_fuc">立即支付</view>
		</view>


		<view v-if="show_tk" class="tk_big_box dis_flex aic ju_c" @touchmove.stop.prevent='test'>
			<view class="tk_show_box">
				<image class="tk_imgbg" :src="getimg('/static/images/hf_tk_03.jpg')" mode="aspectFit"></image>
				<view class="tk_show_msg">
					<view class="tk_msg1">恭喜您获得现金红包</view>
					<view class="tk_msg2">{{hb_money}}<text>元</text></view>
					<!-- <view class="tk_msg3">红包已发到你的账户余额，请查收</view> -->
					<view class="tk_msg3">以红包实际到账为准</view>
				</view>
			</view>
			<text class="iconfont iconguanbi off_btn" @tap="off_fuc"></text>
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
				my_dou_xuan: 1,
				pay_data: '',
				datas: '',
				show_tk: false,
				hb_money: ''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),

		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/index/index?pid=' + that.$store.state.loginDatas.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},

		onLoad(option) {
			that = this
			console.log(option, "1111111111111111111111111111")
			that.htmlReset = 0
			that.datas = JSON.parse(option.datas)
			// that.getpay(JSON.parse(option.datas))
		},
		methods: {
			test() {},
			getimg(img) {
				return service.getimg(img)
			},
			gettime(mj) {
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
				return n_year + '-' + n_month + '-' + n_date + ' ' + n_hour + ':' + n_minute
			},
			select(num) {
				var that = this
				that.my_dou_xuan = num
				// that.jisuan()
				console.log(num)
			},

			pay_fuc() {
				if (that.my_dou_xuan == 2) {
					that.yue_pay()
					console.log("余额支付")
					return
				}else{
					console.log("微信支付")
					that.we_pay()
					// return
				}
				

			},
			yue_pay() {
				console.log(that.datas)
				if (that.datas.is_jd == 1) {
					console.log("是京东");
					var myUrl = service.IP_lzc + "jd.JdOrder/balancePay";
					var datas = {
						token: that.$store.state.loginDatas.userToken || '',
						jd_o_id: this.datas.o_id
					}
					service.P_get(myUrl, datas).then(res => {
						if (res.code == 1) {
							this.isPay = 0;
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							that.hb_money=res.data.o_consumer_rebate_sum
							that.show_tk = true
						} else {
							this.isPay = 0;
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
						this.isPay = 0;
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})
					})
					return
				} else {

					let jkurl = '/order/goPay'
					uni.showLoading({
						mask: true,
						title: '正在提交'
					})
					var datas = {
						token: that.$store.state.loginDatas.userToken || '',
						pay_type: 2,
						ids: that.datas.o_id
					}
					// 单个请求
					service.P_post(jkurl, datas).then(res => {
						that.btnkg = 0
						console.log(res)
						
						if (res.code == 1001) {
							uni.showToast({
								icon: 'none',
								title: '购买成功'
							})
							that.hb_money = res.o_consumer_rebate_sum
							that.show_tk = true
							service.wxlogin('token')
							return
						}
						if (res.code == 1) {
							var datas = res.data
							console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon: 'none',
								title: '购买成功'
							})
							that.show_tk = true
							service.wxlogin('token')
						}
					}).catch(e => {
						that.btnkg = 0
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})
					})
				}

			},
			we_pay() {
				var jUrl = "/jd.JdOrder/makeOrder";
				var data = {
					jd_o_id: that.datas.o_id,
					token: that.$store.state.loginDatas.userToken || ''
				}
				service.P_get(jUrl, data).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: "支付成功",
							icon: "none",
							success() {
								that.hb_money=res.data.o_consumer_rebate_sum
								service.wxpay(res.payData).then(res => {
									uni.showToast({
										icon: 'none',
										title: '购买成功'
									})
									that.show_tk = true
									service.wxlogin('token')
								}).catch(e => {
									that.btn_kg = 0
									uni.showToast({
										icon: 'none',
										title: '微信支付失败'
									})
									// service.wxlogin('token')
									// setTimeout(() => {
									// 	uni.navigateBack({
									// 		delta:1
									// 	})
									// }, 1000)
								})
								return
							}
						})
					}
				}).catch(e => {
					uni.showToast({
						icon: 'none',
						title: '系统错误'
					})
				})
			},
			off_fuc() {
				that.show_tk = false
				// uni.redirectTo({
				// 	url: '/pagesA/OrderList/OrderList'
				// })
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped>
	.top_box {

		position: relative;
	}

	.top_box_bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 750upx;
		height: 246upx;
		z-index: 0;
	}

	.top_msg {
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

	.guige_list {
		width: 100%;
		padding: 0 30upx;
	}

	.guige_li {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}

	.guige_l {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #333;
	}

	.guige_l_name {
		color: #333;
		margin-right: 25rpx;
		display: flex;
		align-items: center;
	}

	.guige_l_name image {
		width: 56upx;
		height: 50upx;
		margin-right: 15upx;
	}

	.guige_r {
		font-size: 28upx;
		color: #999;
	}

	.hengxian {
		width: 100%;
		height: 20upx;
		background: #F4F4F4;
	}

	.guige_tit {
		font-size: 28upx;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;

	}

	.xuanze1 {
		width: 30upx;
		height: 30upx;
		background: #FFFFFF;
		border: 1px solid #C7C7C7;
		border-radius: 50%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: none;
	}

	.xuanze2 {
		border: 0;
	}

	.active {
		color: #FD383B;
	}

	.pay_btn {
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
