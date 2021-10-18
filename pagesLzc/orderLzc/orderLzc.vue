<template>
	<view class="minh100">

		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode="aspectFit"></image>
		</view>
		<view v-if="htmlReset==0" class="container">

			<view class="address" data-url="/pagesA/my_address/my_address?type=1" @tap="jump">
				<view class="address_icon">
					<text class="iconfont icondizhi "></text>
				</view>
				<view class="add_l">
					<view v-if="address.name" class="al_1">{{address.name}}
						<text class="l_tel">{{address.phone}}</text>
					</view>
					<view v-if="address.name" class="al_2">
						{{address.province}}{{address.city}}{{address.area}}{{address.address}}
					</view>
					<view v-if="!address.name" class="fz30">请选择地址</view>
				</view>

				<!-- <view class="add_r"> -->
				<text class="iconfont iconnext-m add_r"></text>
				<!-- </view> -->
			</view>
			<view class="orderbder">
				<!-- <image :src="getimg('/static_s/51daiyan/images/orderborder.png')"></image> -->
				<image :src="getimg('/static/images/orderBorder_02.jpg')"></image>
			</view>
			<view class="hengxian"></view>
			<view class="goodsBox contbox">

				<view class="goods1" v-for="(item,index) in shujuLzc.goods">
					<view class="goodsImg">
						<image class="goodsImg" :src="getimg(item.pic[0])" mode="aspectFill"></image>
						<!-- <image class="goodsImg" :src="getimg(item1.photo[0])" mode="aspectFill"></image> -->
					</view>
					<view class="goodsinr">
						<view class="goodsname oh2">{{item.title}}</view>
						<view class="goodspri1">
							<!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
							<view class="goods_pri"><text style="font-size: 22upx;">￥</text>{{item.real_price}}
							</view>

							<text class="goods_num"><text>×</text>{{item.sum}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="hengxian"></view>
			<view class="guige_list">
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">商品总价</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
						<view >￥{{get_goods_pri(shujuLzc)}}</view>
					</view>
				</view>
				<view class="guige_li">
					<view class="guige_l">
						<view class="guige_l_name">商品运费</view>
						<!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
						<view>{{shujuLzc.freight>0?'￥'+shujuLzc.freight:'免运费'}}</view>
					</view>
				</view>
			</view>


			<view class="fixbottom">
				<view class="fb_l"><text>￥</text>{{shujuLzc.all_price}}</view>
				<view v-if="paykg" class="subbtn" @tap="subbtn">提交订单</view>
				<view v-if="!paykg" class="subbtn subbtn1">提交订单</view>
			</view>

		</view>
	</view>
</template>

<!-- <script module="filter" lang="wxs" src="../../utils/filter.wxs"></script> -->
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
				btnkg: 0,
				htmlReset: -1,
				type: 0, ///1 单品下单  2 购物车下单
				sku_id: '', //规格
				sku_number: '', //数量
				advocacy_user_id: '', //代言人
				dy_id: '',
				use_dou: 0,

				g_data: '', //1,2（type=2）购物车 c_id
				data_list: [],

				datas: [],
				yunfei: [], //运费
				yhlist: [], //优惠
				yhidx: 0,
				addresslist: [], //地址列表
				paykg: true, //按钮开关
				address: '',
				sum: 1000,
				my_dou: 100,
				my_dou_xuan: false,
				zsum: 577.99,
				order_ls_data: '',
				shujuLzc: {
					real_price: ""
				},
				huoAdd: 0,
				pageNum:1
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
			that.getShou();
			// console.log(that.$store.state.loginDatas.userToken)
			if (option.type == 1) {
				that.type = option.type
				that.sku_id = option.v_id
				that.sku_number = option.number
			} else {
				that.type = option.type
				that.g_data = option.g_data

			}
		},
		onShow() {
			var that = this
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			// #ifndef H5
			if (currPage.data.addresschose) {
				//将携带的参数赋值

				this.address = currPage.data.addresschose
				this.addressBack = true

				console.log(this.address, '地址')
				if(that.pageNum>1){
					that.onRetry();
				}
			}
			// #endif
			uni.$on('update_address', (data) => {
				console.log('监听到时间来自update,携带参数msg为:' + data.msg)
				this.address = data.msg
				this.addressBack = true
			})
			setTimeout(function() {
				// that.jisuan()
			}, 1000)
			
		},
		onReady() {

		},
		onHide() {
			that.btnkg = 0
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			that.getdata()
		},
		methods: {
			...mapMutations(['order_ls']),
			get_goods_pri(datas){
				var g_pri=datas.all_price-datas.freight
				g_pri=g_pri.toFixed(2)
				if(g_pri>0){
					return g_pri
				}else{
					return 0
				}
				
			},
			getimg(img) {
				return service.getimg(img)
			},
			onRetry() {
				this.getdata()
			},
			
			//获取订单
			getdata() {
				let that = this
				var jkurl = service.IP_lzc + 'jd.JdOrder/getMakeOrderGoodsInfo';
				var datas = {
					token: that.$store.state.loginDatas.userToken || '',
					sku_id: that.sku_id,
					address_id: that.address.id,
					goods_sum: that.sku_number,
					make_type:that.type
				}
				if(that.type==2){
					datas = {
						token: that.$store.state.loginDatas.userToken || '',
						sku_id: that.g_data,
						address_id: that.address.id,
						make_type:that.type
					}
				}
				service.P_get(jkurl, datas).then(res => {
					if (res.code == 1) {
						this.htmlReset = 0;
						that.shujuLzc = res.data;
					} else {
						this.htmlReset = 0;
						if (res.msg) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "请求失败",
								icon: "none"
							})
						}

					}
				}).catch(e => {
					this.htmlReset = 1;
					console.log(e);
					uni.showToast({
						title: "请求异常",
						icon: "none",
						success() {
							that.htmlReset = 1
						}
					})
				})
				// 单个请求
				// service.P_get(jkurl, datas).then(res => {
				// 	that.btn_kg=0
				// 	console.log(res)
				// 	if (res.code == 1) {
				// 		var datas = res.data
				// 		// console.log(typeof datas)

				// 		if (typeof datas == 'string') {
				// 			datas = JSON.parse(datas)
				// 		}
				// 			that.htmlReset=0
				// 			that.data_list =datas
				// 			that.order_ls(datas)
				// 			that.order_ls_data=JSON.parse(JSON.stringify(datas))
				// 			var address={
				// 				"id":res.address.id,
				// 				"name": res.address.a_name,
				// 				"phone": res.address.a_phone,
				// 				"province": res.address.province,
				// 				"city": res.address.city,
				// 				"area": res.address.area,
				// 				"address": res.address.address,
				// 			}
				// 			that.address=address
				// 			that.my_dou=res.common_data.bean
				// 			uni.setNavigationBarTitle({
				// 				title:'填写订单'
				// 			})
				// 			that.jisuan()
				// 			console.log(address)
				// 			that.getyf()
				// 	}else{
				// 		that.htmlReset=1
				// 	}
				// }).catch(e => {
				// 	that.btn_kg=0
				// 	that.htmlReset=1
				// 	console.log(e)
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '获取数据失败'
				// 	})
				// })

			},
			/* 获取收货地址 */
			getShou() {
				this.pageNum++
				let that = this
				var jkurl = 'user/address'
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: 1,
					size: 20
				}
				service.P_get(jkurl, data).then(res => {
					var address = res.data.address;
					if (res.code == 1) {
						if (address.length == 0) {
							uni.navigateTo({
								url:"/pagesA/my_address/my_address?type=1"
							})
						} else {
							for (var i = 0; i < address.length; i++) {

								if (address[i].is_default == 1) {
									that.address = address[i];
									console.log(that.address)
									that.huoAdd = 1
									that.getdata()
								}
							}
						}
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},
			//获取运费
			getyf() {
				// const pageState1 = pageState.default(this)
				// /cart
				let that = this
				if (!that.address.id) {
					return
				}
				var jkurl = '/makeOrder/calculatePrice'
				var newarr = []
				for (var i = 0; i < that.data_list.length; i++) {
					var new_i = {
						price: that.data_list[i].sum_price,
						number: that.data_list[i].sum_number,
						manager_id: that.data_list[i].group_code,
					}
					newarr.push(new_i)
				}
				var datas = {
					token: that.$store.state.loginDatas.userToken || '',
					data: JSON.stringify(newarr),
					address_id: that.address.id
				}

				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.yunfei = datas
						that.jisuan()
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},
			select() {
				var that = this
				that.my_dou_xuan = !that.my_dou_xuan
				that.jisuan()
			},
			jisuan() {
				var that = this
				var zsum = 0
				for (var i = 0; i < that.data_list.length; i++) {
					if (!that.data_list[i].js_price && that.data_list[i].js_price != 0) {
						zsum += that.data_list[i].sum_price * 1
					} else {
						zsum += that.data_list[i].js_price * 1
					}
				}
				if (that.my_dou_xuan) {
					var my_d = that.my_dou * 1
					var my_dou_new = that.my_dou * 1
					if (zsum > my_d) {
						zsum = zsum - my_d
						that.use_dou = my_d
						my_dou_new = 0
					} else {
						my_dou_new = my_d - zsum
						that.use_dou = zsum
						zsum = 0
					}
					console.log('我的代言豆还有：' + my_dou_new + '个')
					// that.zsum= zsum

				} else {
					// var zsum = that.sum - yhnum
					// that.zsum= zsum
					that.use_dou = 0
				}

				that.zsum = zsum.toFixed(2)
				//   var yhnum = that.yhmsg ? that.yhmsg.arg1 : ''
				//   if (that.my_dou_xuan) {
				//     var zsum = that.sum - yhnum
				//     var my_dou_new = that.my_dou
				//     if (zsum > that.my_dou) {
				//       zsum = zsum - that.my_dou
				//       my_dou_new = 0
				//     } else {
				//       my_dou_new = that.my_dou - zsum
				//       zsum = 0
				//     }
				//     console.log(zsum)
				//     console.log('我的代言豆还有：' + my_dou_new + '个')
				//     that.zsum= zsum

				//   } else {
				//     var zsum = that.sum - yhnum
				//     that.zsum= zsum
				//   }
			},

			/*计算价格*/
			countpri() {
				var that = this
				let heji = 0
				let var2 = this.xzarr
				// console.log(this.goods_sele)
				// console.log(var2)
				for (let i in var2) {

					heji += var2[i].num * (var2[i].goods_real_price * 100)



				}
				console.log(heji)
				heji = (heji / 100).toFixed(0)

				this.sum = heji
			},

			subbtn() {
				let that = this
				if (that.address == null || that.address.id == '' || that.address.id == undefined) {
					wx.showToast({
						icon: 'none',
						title: '请先添加地址'
					})
					return
				}
				console.log(that.$store.state.loginDatas.userToken);
				// return
				var datas = {
					sku_id: that.sku_id,
					address_id: that.address.id,
					goods_sum: that.sku_number,
					pay_type:0,
					token:that.$store.state.loginDatas.userToken || '',
					make_type:1
				}
				if(that.type==2){
					datas = {
						sku_id: that.g_data,
						address_id: that.address.id,
						pay_type:0,
						token:that.$store.state.loginDatas.userToken || '',
						make_type:2
					}
				}
				uni.redirectTo({
					url: `/pagesLzc/orderPay/orderPay?datas=${JSON.stringify(datas)}`
				})

			},
			goaddress() {
				service.goaddress()
			},
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
			}
		}
	}
</script>

<style scoped>
	.hengxian {
		width: 100%;
		height: 20upx;
		background: #F4F4F4;
	}

	.container {
		min-height: 100vh;
		height: auto;
		/* background: #eeeeee; */
		padding-bottom: 100rpx;
		display: block;
		border-top: 1px solid #eee;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.address {
		display: flex;
		width: 100%;
		min-height: 200rpx;
		padding: 28rpx;
		box-sizing: border-box;
		background-color: #fff;
		align-items: center;
	}

	.address_icon {
		width: 47upx;
		height: 47upx;
		background: linear-gradient(0deg, #FF3131, #FF5757);
		box-shadow: 0px 2upx 6upx 0px rgba(255, 43, 43, 0.35);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 28upx;
		flex: none;
	}

	.address_icon text {
		font-size: 26upx;
		color: #fff;
	}

	.add_l {
		max-width: 515upx;
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;

	}

	.al_1 {
		font-size: 30rpx;
		color: #333;
	}

	.l_tel {
		margin-left: 47rpx;
	}

	.al_2 {
		font-size: 24rpx;
		color: #999;

	}

	.add_r {
		width: 23rpx;
		height: 40rpx;
		margin-left: 50upx;
		flex: none;
	}

	.orderbder {
		width: 100%;
		height: 9rpx;
		display: flex;
	}

	.goodsBox {
		width: 100%;
		padding: 19upx 28rpx;
	}

	.goodsImg {

		width: 163rpx;
		height: 163rpx;
		margin-right: 29rpx;
	}



	.ml10 {
		margin-left: 10px;
	}





	.goodsImg image {
		width: 100%;
		height: 100%;
	}




	.goods1 {
		width: 100%;
		padding: 19upx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid #ddd; */
		position: relative;
	}


	.goodsinr {
		flex: 1;
	}

	.goodsname {
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.goodspri {
		font-size: 22rpx;
		color: #999;
	}

	.scx {
		text-decoration: line-through;
	}

	.goodspri1 {
		font-size: 32rpx;
		color: #fe0042;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}



	text {
		color: #F75559;
		font-size: 28rpx;
	}

	.goods_pri {
		color: #FD383B;
		font-size: 28upx;
		font-weight: bold;
	}

	.goods_num {
		font-size: 30uxp;
		color: #333;
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
	}

	.guige_r {
		font-size: 28upx;
		color: #999;
	}


	.fixbottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100rpx;

		background: #FFFFFF;
		box-shadow: 0px 0px 9upx 0px rgba(195, 195, 195, 0.49);
		display: flex;
	}

	.fb_l {
		flex: 1;
		height: 100rpx;
		padding-left: 28rpx;
		font-size: 28rpx;
		color: #f75852;
		display: flex;
		align-items: center;
		font-weight: bold;
	}

	.fb_l text {
		font-size: 22upx;
	}

	.subbtn {
		width: 212rpx;
		height: 100rpx;
		background-color: #f75852;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.subbtn1 {
		background-color: #999;
	}
</style>
