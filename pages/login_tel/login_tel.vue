<template>
	<view class="login_bg">
		<view class="login_box dis_flex_c ju_c aic">
			<image class="logo" src="../../static/logo.png" mode=""></image>
			<text>依辈通</text>
		</view>
		<view class="dis_flex aic ju_c login_tip">登录表示您同意<text @tap="jump" data-url="/pagesA/about/about?type=yszc">《法律声明和隐私政策》</text></view>
		<view class="dis_flex aic ju_c login_btn">
			<button class='bottom' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
				<image class="wx_icon" src="../../static/images/wx.png"></image>
				绑定手机号
			</button>
		</view>
		<view class="dis_flex aic ju_c goback_btn" @tap="goback()">返回</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				code:'',
				nickname:'',
				avatarurl:'',
			}
		},
		onLoad(option) {
			var that =this
			this.nickname=option.nickname
			this.avatarurl=option.avatarurl
			wx.login({
				success: (res) => {
					if (res.code) { //微信登录成功 已拿到code  
						// ...doSomething 
						that.code=res.code
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'loginDatas'
			])
		},
		methods: {
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},
			
			
			onGetPhoneNumber: function(e) {
				var that = this
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
				console.log(e.detail.encryptedData)
				// return
				if (e.detail.iv) {
					//用户按了允许授权按钮后需要处理的逻辑方法体
					wx.login({
						success: (res) => {
							if (res.code) { //微信登录成功 已拿到code  
								console.log(e.detail.iv)
								var token=uni.getStorageSync('token')
								var data = {
									encryptedData:e.detail.encryptedData,
									iv:e.detail.iv,
									code:res.code,
									token:token,
									nickname:that.nickname,
									avatarurl:that.avatarurl,
									type:3
								}
								//selectSaraylDetailByUserCard
								var jkurl = '/login'
								
								
								service.post(jkurl, data,
									function(res) {
										
										// if (res.data.code == 1) {
										if (res.data.code == 1) {
											var datas = res.data.data
											console.log(typeof datas)
											
											if (typeof datas == 'string') {
												datas = JSON.parse(datas)
											}
											uni.showToast({
												icon: 'none',
												title: '操作成功'
											})
											service.wxlogin(1)
											
											
								
										} else {
											that.btnkg=0
											if (res.data.msg) {
												uni.showToast({
													icon: 'none',
													title: res.data.msg
												})
											} else {
												uni.showToast({
													icon: 'none',
													title: '操作失败'
												})
											}
										}
								},
									function(err) {
										that.btnkg=0
										
											uni.showToast({
												icon: 'none',
												title: '获取数据失败，请检查您的网络连接'
											})
									
									}
								)
							} else {
								console.log('登录失败！' + res.errMsg)
							}
						}
					})
					

				} else {
					//用户按了拒绝按钮
					uni.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法登录小程序，请点击返回授权!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击了“返回授权”')
							}
						}
					})
				}
			},
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.login_bg{
		height: 100vh;
		background: #F4F8FB;
	}
	.login_box{
		width: 100%;
		height: 650upx;
		font-size: 38upx;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo{
		width: 165upx;
		height: 165upx;
		margin-bottom: 25upx;
	}

	.login_tip {
		font-size: 26upx;
		color: #999;
	}

	.login_btn {
		width: 100%;
		margin-top: 40upx;
	}

	.login_btn button {
		width: 690upx;
		height: 88upx;
		background: #1AAC19;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
	}

	.wx_icon {
		width: 53upx;
		height: 43upx;
		margin-right: 30upx;
	}
	.goback_btn{
		width: 690upx;
		height: 95upx;
		margin: 30px auto;
		background: #fff;
		border-radius: 95upx;
		border: 1px solid #eee;
	}
</style>
