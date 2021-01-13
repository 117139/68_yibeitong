<template>
	<view class="minh100">
		<!-- <view class="hengxian"></view> -->
		<form class="" @submit="formSubmit">
			<view  class="container ">
				<view class="addmsg">
					<view class="msgtit">收货人</view>
					<input class="msgsrk" name="name" :value="uname" type="text" placeholder="请填写收货人姓名" />
				</view>
				<view class="addmsg">
					<view class="msgtit">手机号码</view>
					<input class="msgsrk" name="tel" :value="phone" type="number" placeholder="请填写收货人手机号码" />
				</view>
				
				<region-picker v-if="areaJson"  style="width: 100%;" mode="region" :jsonData="areaJson" @change="bindRegionChange" :value="region">
				
					<view class="addmsg">
						<view class="msgtit">所在地区</view>
						<input class="msgsrk" name="address" type="text" placeholder="请选择地区" :value="region[0]+' '+region[1]+' '+region[2]"
						 disabled />
						 <text class="iconfont iconnext-m"></text>
					</view>
				</region-picker>
				<view class="addmsg">
					<view class="msgtit">详细地址</view>
					<textarea class="msgsrk" name="xxaddress" :value="xxaddress" auto-height type="text" placeholder="街道、楼牌号等" maxlength="40" ></textarea>
				</view>
				<view class="addmsg">
					<view class="msgtit flex_1">设置默认地址</view>
					<switch :checked="moren" class="mrdz" @change="switch1Change" color="#999999" style="transform:scale(0.7)"/>
					<input hidden type="text" name="moren" :value="moren" />
				</view>
				<!-- <view class="definebtn">保存</view> -->
				<button class="definebtn" form-type="submit">保存</button>
			</view>
		</form>

	</view>
</template>

<!-- <script module="filter" lang="wxs" src="../../utils/filter.wxs"></script> -->
<script>
	import service from '../../service.js';
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg: 0, //0ok  1off
				id: '',
				uname: '',
				phone: '',
				region_id:[1, 35, 36],
				region: ['北京市', '北京', '东城区'],
				moren: false,
				xxaddress: '',
				areaJson:{},
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		components: {
			regionPicker
		},
		onLoad: function(option) {
			this.getarea()
			if (option.address) {
				console.log(option.address)
				var editaddress = JSON.parse(option.address)
				this.id = editaddress.id
				this.phone = editaddress.phone
				this.uname = editaddress.name
				this.region[0] = editaddress.province
				this.region[1] = editaddress.city
				this.region[2] = editaddress.area
				var region_id=[]
				region_id[0]= editaddress.province_id
				region_id[1] = editaddress.city_id
				region_id[2] = editaddress.area_id
				this.region_id=region_id
				this.xxaddress = editaddress.address
				this.moren = editaddress.is_default ? true : false
				console.log(this.region)
			}


		},
		methods: {
			//选择地区
			bindRegionChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail)
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region = e.detail.value
				this.region_id = e.detail.code
				this.region = this.region
				this.region_id = this.region_id
			},
			//设置默认
			switch1Change(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				this.moren = e.detail.value == true ? 1 : 0
			},
			getarea() {
				var that =this
				var jkurl='/area'
				var data={}
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							
							that.areaJson=datas
						} else {
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
						that.btnkg = 0

						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})

					}
				)
			},
			//提交表单
			formSubmit(e) {
				let that = this

				console.log('form发生了submit事件，携带数据为：', e.detail.value)
				let formresult = e.detail.value
				if (formresult.name == '') {
					wx.showToast({
						title: '收货人姓名不能为空',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (!(/^1\d{10}$/.test(formresult.tel))) {
					wx.showToast({
						title: '手机号码有误',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (formresult.address == '') {
					wx.showToast({
						title: '请选择地区',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (formresult.xxaddress == '') {
					wx.showToast({
						title: '请填写详情地址',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				return
				var jkurl = '/user/address'
				var data = {
					token: that.loginMsg.userToken,
					name: formresult.name,
					tel: formresult.tel,
					province_id: that.region_id[0],
					city_id: that.region_id[1],
					area_id: that.region_id[2],
					address: formresult.xxaddress,
					is_default: that.moren ? 1 : 0
				}
				if (that.id) {
					jkurl = '/user/address/amend'
					data = {
						id: that.id,
						token: that.loginMsg.userToken,
						name: formresult.name,
						tel: formresult.tel,
						province_id: that.region_id[0],
						city_id: that.region_id[1],
						area_id: that.region_id[2],
						address: formresult.xxaddress,
						is_default: that.moren ? 1 : 0
					}
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
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
						that.btnkg = 0

						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})

					}
				)
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 750upx;
		min-height: 100vh;
		/* #ifdef H5 */
		min-height:calc( 100vh - 60px);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		/* #endif */
		padding: 0 28rpx;
		box-sizing: border-box;
		background-color: #fff;
		position: relative;
	}

	.addmsg {
		width: 694rpx;
		min-height: 90rpx;
		border-bottom: 1px solid #e8e8e8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #333;
		padding: 26upx 0;
	}

	.msgtit {
		width: 138rpx;
		font-weight: bold;
	}

	.msgsrk {
		flex: 1;
		font-size: 30rpx;
		
	}

	.definebtn {
		position: absolute;
		border-radius: 0;
		bottom: 30rpx;
		left: 28rpx;
		right: 28rpx;
		height: 84rpx;
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
		background: linear-gradient(0deg, #FB3536, #FD4447);
		border: 1px solid #FF7575;
		box-shadow: 0px 3px 6px 0px rgba(255, 26, 26, 0.35);
	}

	.wx-switch-input {
		width: 50rpx !important;
		height: 30rpx !important;
	}

	.wx-switch-input::before {
		width: 48rpx !important;
		height: 28rpx !important;
	}

	.wx-switch-input::after {
		width: 24rpx !important;
		height: 24rpx !important;
	}
	.iconnext-m{
		font-size: 30upx;
		color: #999;
	}
</style>
