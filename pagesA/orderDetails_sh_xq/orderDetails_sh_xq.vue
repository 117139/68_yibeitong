<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0" class="container">
			<view class="order_box1">
				<image :src="getimg('/static/images/images/order_xq_bg_02.jpg')"></image>
				<view v-if="datas.s_status==1" class="order_tit">

					<view class="ot_msg">
						<view class="d1">待处理</view>
					</view>
				</view>
				<view v-if="datas.s_status==2" class="order_tit">
					<view class="ot_msg">
						<view class="d1">已同意</view>
					</view>
				</view>
				<view v-if="datas.s_status==3" class="order_tit">
					<view class="ot_msg">
						<view class="d1">已拒绝</view>
					</view>
				</view>
				<view v-if="datas.s_status==4" class="order_tit">
					<view class="ot_msg">
						<view class="d1">已取消</view>
					</view>
				</view>
			</view>
			<view class="goodsBox">
				<view class="goods">
					<block  v-if="datas.goods">
						<view class="goods1" @tap="jump" :data-url="'/pages/details/details?id='+datas.goods.g_id">
							<view class="goodsImg">
								<!-- <image v-if="item.gd_vice_pic.length>0" class="goodsImg" :src="getimg(item.gd_vice_pic[0])" mode="aspectFill"></image>
								<image v-else class="goodsImg" :src="getimg(item.gd_mastr_pic[0])" mode="aspectFill"></image> -->
								<image class="goodsImg" :src="getimg('/static/images/index_12.jpg')" mode="aspectFill"></image>
							</view>
							<view class="goodsinr">
								<!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
								<view class="goodsname">{{datas.goods.gd_name}}</view>
								<view class="goodspri"><text v-for="(item1,idx1) in datas.goods.gd_attr">{{item1.value+' '}}</text></view>
								<view class="goodspri1">
									<!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
									<view class="goods_pri">
										￥<text >{{datas.goods.single_price}}</text>
									</view>
									<view>×{{datas.goods.number}}</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="guige_list">
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">订单号：</view>
					  <!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
					  <view >1235452151321</view>
					</view>
				</view>
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">下单时间：</view>
					  <!-- <view>10元</view> -->
					</view>
					<view class="dis_flex aic guige_r">
					  <view >2019-08-05 12:20:12</view>
					</view>
				</view>
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">售后类型：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.type_value}}</view>
					</view>
				</view>
			  <view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">售后原因：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.explain}}</view>
					</view>
				</view>
			  <view class="guige_li" v-if="datas.o_create_time">
					<view class="guige_l">
					  <view class="guige_l_name">支付时间：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{filter.getDate_ymd(datas.o_pay_addtime)}}</view>
					</view>
				</view>
			  <view class="guige_li" v-if="datas.o_sub_addtime">
					<view class="guige_l">
					  <view class="guige_l_name">收货时间：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{filter.getDate_ymd(datas.o_sub_addtime)}}</view>
					</view>
				</view>
			  <view v-if="datas.type!=3" class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">退款金额：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.retreat_price}}</view>
					</view>
				</view>
			  <view  class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">售后编号：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.o_order_sernum}}</view>
					</view>
				</view>
			  <view  class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">申请时间：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{filter.getDate_ymd(datas.create_time)}}</view>
					</view>
				</view>
			  <view  class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">支持的物流：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >
							<block v-for="(item,index) in datas.zc_logistics">
								{{item +' '}} 
							</block>
						</view>
					</view>
				</view>
			  <view v-if="datas.s_status_time"   class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">商家处理时间：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{filter.getDate_ymd(datas.s_status_time)}}</view>
					</view>
				</view>
			  <view v-if="datas.s_status==3"   class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">商家拒绝原因：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.s_status_refuse}}</view>
					</view>
				</view>
			  <view v-if="datas.type!=3"   class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">是否已经退款：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  <view >{{datas.is_return_price==1?'未退款':'已退款'}}</view>
					</view>
				</view>
				<block  v-if="datas.logistics_name">
					<view class="guige_li">
						<view class="guige_l">
						  <view class="guige_l_name">用户填写的物流公司：</view>
						</view>
						<view class="dis_flex aic guige_r">
						  <view >{{datas.logistics_name}}</view>
						</view>
					</view>
					<view class="guige_li">
						<view class="guige_l">
						  <view class="guige_l_name">用户填写的物流单号：</view>
						</view>
						<view class="dis_flex aic guige_r">
						  <view >{{datas.logistics}}</view>
						</view>
					</view>
				</block>
				
				<block  v-if="datas.merchant_logistics_name">
					<view class="guige_li">
						<view class="guige_l">
						  <view class="guige_l_name">商家选择的物流公司：</view>
						</view>
						<view class="dis_flex aic guige_r">
						  <view >{{datas.merchant_logistics_name}}</view>
						</view>
					</view>
					<view class="guige_li">
						<view class="guige_l">
						  <view class="guige_l_name">商家填写的物流单号：</view>
						</view>
						<view class="dis_flex aic guige_r">
						  <view >{{datas.merchant_logistics}}</view>
						</view>
					</view>
				</block>
			</view>
			<view class="hengxian"></view>
			<view class="guige_list"  v-if="datas.s_status==2&&datas.type!=1&&datas.logistics_name==''">
				
				<picker @change="bindPickerChange" data-type="wl_list" value="" :range="datas.zc_logistics"   class="set_name">
					<view class="guige_li">
						<view class="guige_l">
						  <view class="guige_l_name">物流公司：</view>
						</view>
						<view class="dis_flex aic guige_r">
						  <view>{{datas.zc_logistics[wl_idx]}}</view>
						  <text class="iconfont iconnext-m"></text>
						</view>
					</view>
				</picker>
				<view class="guige_li">
					<view class="guige_l">
					  <view class="guige_l_name">物流单号：</view>
					</view>
					<view class="dis_flex aic guige_r">
					  	<input class="set_int" placeholder="请填写您的售后物流单号" v-model="wl_num" maxlength="50"></input>
					</view>
				</view>
			</view>
			<view class="o_cz">
				<view v-if="datas.s_status==2&&datas.type!=1&&datas.logistics_name==''"  class="qx" @tap="save_val">提交</view>
				<view v-if="datas.merchant_logistics" class="qx" @tap.stop="jump" :data-url="'/pagesA/Order_wuliu/Order_wuliu?id='+item.id">查看物流</view>
				
			</view>
			<!-- 底部占位 -->
			<view class="o_cz" style="position: relative;z-index: 1;opacity: 0;">
			
				<view ></view>
				<!-- <view v-if="item.order.o_paystatus==1" class="qx" @tap.stop='del_order(item.order.o_id)'>取消订单</view> -->
			</view>

		</view>

	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	// const QRCode = require('../../utils/weapp-qrcode.js')
	// import rpx2px from '../../utils/rpx2px.js'
	// let qrcode;
	// const qrcodeWidth = rpx2px(210)
	export default {
		data() {
			return {
				id: '',
				htmlReset: -1,
				h_type: "",
				btnkg: 0,
				htmlkg: 0,

				datas: '',
				wl_idx:0,
				wl_num:''
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
		
		onLoad: function(option) {
			that = this
			
			if (option.id) {
				// uni.showLoading({
				// 	title:'正在加载中'
				// })
				that.id = option.id
				that.h_type = option.type

			}
			
			that.getdata()


		},
		onShow() {
			if (that.btnkg == 1) {
				that.btnkg = 0
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.getdata()
		},
		methods: {
			...mapMutations(['dy_fb_fuc']),
			bindPickerChange(e){
				console.log(e)
				var datas=e.currentTarget.dataset
				if(datas.type=='wl_list'){
					this.wl_idx=e.detail.value
				}
			},
			save_val() {
				/*if (!this.wl_gs) {
					wx.showToast({
						icon: 'none',
						title: '请填写您的售后物流公司',
					})
					return
				}*/
				if (!this.wl_num) {
					wx.showToast({
						icon: 'none',
						title: '请填写您的售后物流单号',
					})
					return
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '提交成功'
				// })
				// return
				var datas = {
					token: that.$store.state.loginDatas.userToken||'',
					id: that.id,
					logistics_name: that.datas.zc_logistics[that.wl_idx],
					logistics: this.wl_num,
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask: true,
					title: '正在提交'
				})
				var jkurl = '/afterSale/receiptLogistics'
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						var pages = getCurrentPages(); //当前页面
						var prevPage = pages[pages.length - 1]; //上一页面
						prevPage.setData({
							//直接给上一个页面赋值
							sh_wl: true,
						});
			
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
			
			
			
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				console.log(this.uname)
			},
			
			getimg(img) {
				return service.getimg(img)
			},
			order_pay(id) {
				var that = this
				var jkurl = '/order/goPay'
				var datas = {
					token: that.loginMsg.userToken,
					ids: id
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}

				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						service.wxpay(res.data, 'fwb').then(res => {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							setTimeout(function() {
								that.onRetry()
							}, 1000)
						}).catch(e => {
							that.btnkg = 0
							uni.showToast({
								icon: 'none',
								title: '微信支付失败'
							})

						})



					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},

			jump(e) {
				service.jump(e)
			},
			getnum(idx) {
				var that = this
				if (that.datas.order_goods.length == 0) return
				var list = that.datas.order_goods
				var znum = 0
				for (var i = 0; i < list.length; i++) {
					znum += list[i].number * 1
				}
				return znum
			},
			jump_fabu(item) {
				let that = this
				if (!item) {
					if (that.goods_sele.length == 0) {
						uni.showToast({
							icon: 'none',
							title: '请先选择商品'
						})
						return
					}
					console.log(that.goods_sele)
					that.dy_fb_fuc(that.goods_sele)
				} else {
					var arr = []
					arr.push(item)
					that.dy_fb_fuc(arr)
				}



				wx.navigateTo({
					url: '/pagesA/daiyan_fabu/daiyan_fabu',
				})


			},
			cload() {
				this.getdata()
			},
			getdata() {
				var that = this
				var datas = {
					token: that.$store.state.loginDatas.userToken||'',
					id: that.id
				}
				// 单个请求
				service.P_get('/afterSale/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						// that.catelist=res.data
						that.datas = res.data
					} else {
						that.htmlReset = 1
					}
				}).catch(e => {
					that.htmlReset = 1
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})


			},



			del_order(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消该订单',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var jkurl = '/order/cancel'
							var data = {
								token: that.loginMsg.userToken,
								id: id
							}
							service.post(jkurl, data,
								function(res) {

									// if (res.data.code == 1) {
									if (res.data.code == 1) {
										var datas = res.data.data
										// console.log(typeof datas)
										that.htmlReset = 0
										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										that.onRetry()
									} else {
										that.htmlReset = 1
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
									that.htmlReset = 1
									that.btnkg = 0

									uni.showToast({
										icon: 'none',
										title: '操作失败'
									})

								}
							)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//确认收货
			get_goods(id) {
				var that = this
				var jkurl = '/order/confirmReceipt'
				var data = {
					token: that.loginMsg.userToken,
					id: id
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {

							var datas = res.data.data
							// console.log(typeof datas)
							that.htmlReset = 0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							that.onRetry()
						} else {
							that.htmlReset = 1
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
						that.htmlReset = 1
						that.btnkg = 0

						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})

					}
				)
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.show0 = e.detail.value
			},
			bchange1(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.show1 = e.detail.value
			},
			bchange2(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.show2 = e.detail.value
			},

			//取消订单
			cancelOrder(e) {
				let that = this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let oid = e.currentTarget.dataset.oid
				wx.showModal({
					title: '提示',
					content: '是否取消该订单?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							wx.request({
								url: app.IPurl + '/api/order',
								data: {
									status: -1,
									order_id: oid,
									token: wx.getStorageSync('token')
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								dataType: 'json',
								method: 'PUT',
								success(res) {
									if (res.data.error == -2) {
										app.checktoken(res.data.error)
										that.onLoad()
									}
									if (res.data.code == 1) {
										wx.showToast({
											title: '删除成功',
											duration: 1000
										});
										setTimeout(function() {
											// var pages=[1,1,1,1,1]
											// var goods=[ [],[],[],[],[], ]
											// that.setData({
											// 	pages:pages,
											// 	goods:goods
											// })
											// that.getOrderList()
											wx.navigateBack()
										}, 1000)
										// that.getOrderList(that.data.type)
									} else {
										wx.showToast({
											title: '操作失败',
											duration: 1000
										});
									}


								},
								fail() {
									wx.showToast({
										title: '操作失败',
										duration: 1000
									});
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
			//去评论
			gopinlun(e) {
				uni.navigateTo({
					url: '/pages/fabiaopl/fabiaopl?oid=' + e.currentTarget.dataset.oid
				})
			},
			shouhuoBtn(e) {
				let that = this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let oid = e.currentTarget.dataset.oid
				wx.showModal({
					title: '提示',
					content: '是否确认收货?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if (that.btnkg == 1) {
								return
							} else {
								that.btnkg = 1
							}
							wx.request({
								url: app.IPurl + '/api/order',
								data: {
									status: 1,
									order_id: oid,
									token: wx.getStorageSync('token')
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								dataType: 'json',
								method: 'PUT',
								success(res) {
									that.btnkg = 0
									console.log(res.data)
									if (res.data.code == 1) {
										wx.showToast({
											title: '收货成功',
											duration: 1000
										});
										setTimeout(function() {
											// 	var pages=[1,1,1,1,1]
											// 	var goods=[ [],[],[],[],[], ]
											// 	that.setData({
											// 		pages:pages,
											// 		goods:goods
											// 	})
											// 	that.getOrderList()
											wx.navigateBack()
										}, 1000)
									} else {
										if (res.data.msg) {
											wx.showToast({
												title: res.data.msg,
												duration: 2000,
												icon: 'none'
											});
										} else {
											wx.showToast({
												title: '网络异常',
												duration: 2000,
												icon: 'none'
											});
										}
									}


								},
								fail() {
									that.btnkg = 0
									wx.showToast({
										title: '操作失败',
										duration: 1000
									});
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})


			},
			//获取订单详情
			getOrderList(id) {
				// const pageState1 = pageState.default(this)
				// pageState1.loading()    // 切换为loading状态

				let that = this
				//http://water5100.800123456.top/WebService.asmx/order
				wx.request({
					url: app.IPurl + '/api/order/1',
					data: {
						order_id: id,
						token: wx.getStorageSync('token')
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					method: 'get',
					success(res) {
						// console.log(res.data)

						if (res.data.code == 1) {

							let resultd = res.data
							console.log(res.data)
							// console.log(resultd.info.delivery_code)
							// that.data.spimg = that.data.spimg.concat(imgb)
							that.Odata = resultd.data
							that.htmlReset = 0
							wx.setNavigationBarTitle({
								title: '订单详情'
							})
						} else {
							wx.showToast({
								icon: 'none',
								title: '获取失败'
							})
							console.log(res.data)
							that.htmlReset = 1
						}
						// pageState1.finish()    // 切换为finish状态
					},
					fail(err) {
						wx.showToast({
							icon: 'none',
							title: '获取失败'
						})
						that.htmlReset = 1
						console.log(err)
					}
				})
			},
			//阶梯价
			ladderpri(idx, num) {

				let that = this
				let ygnum = that.goods.list[idx].havenum //已购
				// let ygnum=0  //已购
				let jt = that.goods.list[idx].pricelist //规则
				let nownum = that.goods.list[idx].order_product.goods_count //本次购买数量


				if (num) {
					nownum = num
				}
				// let numz=ygnum+nownum
				let nownum1 //定义临时变量
				let numlen //定义单个阶梯的限购数量
				let jtlist = [] //阶梯列表
				let jtnum = [] //阶梯数量
				let jtTotal = [] //阶梯总价
				let numladd = [] //阶梯的区间
				let priladd = [] //阶梯的价格
				let Totalpri = 0
				let laddermsg = []
				for (let i in jt) {
					let lownum = jt[i].lower_num
					let upnum = jt[i].upper_num
					let bpri = jt[i].price
					// console.log(lownum)
					// console.log(upnum)

					let jtzsy = jt[i].limit_num - jt[i].saled_num //阶梯限购的剩余
					if (lownum - 1 <= ygnum && ygnum < upnum) { //根据已购获取开始阶梯

						let item1
						item1 = upnum - ygnum //n1阶梯限售剩余

						if (jtzsy < item1) {
							item1 = jtzsy
						}
						if (item1 == 0) {
							continue //售罄
						}
						if (nownum <= item1) { //限售剩余足够
							// Totalpri +=100*bpri*nownum/100
							let ladderOne = {
								'numladd': lownum + '-' + upnum,
								'jtnum': nownum,
								'priladd': bpri,
								'jtTotal': 100 * bpri * nownum / 100
							}
							laddermsg.push(ladderOne)
							break; //结束
						} else { //限售剩余不足
							nownum1 = nownum - item1
							let ladderOne = {
								'numladd': lownum + '-' + upnum,
								'jtnum': item1,
								'priladd': bpri,
								'jtTotal': 100 * bpri * item1 / 100
							}
							// Totalpri +=100*bpri*item1/100
							laddermsg.push(ladderOne)
						}
					}
					if (ygnum < lownum) { //后续阶梯（最小值大于已购）
						numlen = upnum - lownum + 1 //当前阶梯的限购数量
						if (jtzsy < numlen) {
							numlen = jtzsy
						}
						if (numlen == 0) {
							continue //售罄
						}
						if (nownum1 <= numlen) { //限售剩余足够
							let ladderOne = {
								'numladd': lownum + '-' + upnum,
								'jtnum': nownum1,
								'priladd': bpri,
								'jtTotal': 100 * bpri * nownum1 / 100
							}
							// Totalpri +=100*bpri*nownum1/100
							laddermsg.push(ladderOne)
							break; //结束
						} else { //限售剩余不足
							nownum1 = nownum1 - numlen

							let ladderOne = {
								'numladd': lownum + '-' + upnum,
								'jtnum': numlen,
								'priladd': bpri,
								'jtTotal': 100 * bpri * numlen / 100
							}
							// Totalpri +=100*bpri*numlen/100
							laddermsg.push(ladderOne)
						}
					}
				}

				let laddermsgs = {
					'laddermsg': laddermsg,
					'Totalpri': Totalpri
				}
				console.log(laddermsgs)
				return laddermsgs
			},
			opengoods(e) {
				let id = e.currentTarget.dataset.id
				app.opengoods(id)
			},

			ewm(code) {
				qrcode = new QRCode('canvas', {
					usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
					text: code,
					// image: '/images/bg.jpg',
					width: qrcodeWidth,
					height: qrcodeWidth,
					colorDark: "#000",
					colorLight: "white",
					correctLevel: QRCode.CorrectLevel.H,
				});
			},
			pay() {
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var that = this
				service.Pay(that.order_id, 'info')
			},
			onRetry() {
				this.onLoad()
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background: #eeeeee;
	}

	image {
		width: 100%;
		height: 100%;
	}






	

	.orderbder {
		width: 100%;
		height: 6rpx;
		display: flex;
	}

	.goodsBox {
		width: 100%;
		padding: 0;
	}

	


	


	.slh2 {
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}



	.ml10 {
		margin-left: 10px;
	}


	.ordermsg {
		width: 100%;
		background-color: #fff;
		padding: 30rpx 28rpx 30rpx;
		box-sizing: border-box;

	}





	.goods {
		width: 100%;
		background-color: #fff;
		border-bottom: 10rpx solid #F1F1F1;
		/* margin-bottom: 20rpx; */
	}

	.goods1 {
		width: 100%;
		padding: 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid #ddd; */
		position: relative;
	}




	.goodsname {
		font-size: 27rpx;
		line-height: 35upx;
		color: #333333;
		margin-bottom: 5rpx;
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.goodspri {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 5rpx;
	}

	.scx {
		text-decoration: line-through;
	}

	.goodspri1 {
		font-size: 30rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	


	/*  */
	.order_box1 {
		width: 100%;

		height: 246upx;
		position: relative;
	}

	.order_tit {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		
		padding-left: 50rpx;
		display: flex;
		align-items: center;
	}

	.type_img {
		width: 69rpx;
		height: 70rpx;
		margin-right: 22rpx;
	}

	.ot_msg {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #fff;
	}

	.ot_msg .d1 {
		font-size: 30rpx;
	}

	.ot_msg .d2 {
		font-size: 24rpx;
	}
	
	
	/* new */
	
	.address{
		display: flex;
		width: 100%;
		min-height: 200rpx;
		padding:28rpx;
		box-sizing: border-box;
		background-color: #fff;
		align-items: center;
		
	}
	.address_icon{
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
	.address_icon text{
		font-size: 26upx;
		color: #fff;
	}
	.add_l{
		max-width: 595upx;
		/* height: 80%; */
		min-height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		font-size: 26upx;
		color: #666;
	}
	.al_1{
		font-size: 30rpx;
		color: #000033;
		font-weight: bold;
	}
	.l_tel{
		margin-left: 27rpx;
		font-size: 26upx;
		color: #666;
		font-weight: normal;
	}
	.al_2{
		font-size: 24rpx;
		color: #999;
		
	}
	.add_r{
		width: 23rpx;
		height: 40rpx;
		margin-left: 50upx;
		flex: none;
	}
	.goodsInr {
		width: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	
		font-size: 28rpx;
		color: #999;
		flex: 1;
	}
	
	.goods_pri{
		font-size: 22upx;
		color: #FD383B;
		font-weight: bold;
	}
	.goods_pri text{
		font-size: 28upx;
	}
	.guige_list{
		width: 100%;
		padding: 0 30upx;
		background: #fff;
	}
	.guige_li{
		width: 100%;
		min-height: 100rpx;
		padding: 10upx 0;
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
	}
	.guige_r{
		font-size: 26upx;
		color: #666;
		max-width: 60%;
	}
	.guige_r input{
		text-align: right;
	}
	.hengxian{
		width: 100%;
		height: 10upx;
		background: #F1F1F1;
	}
	.goodsImg {
	width: 163upx;
	height: 163upx;
		margin-right: 30rpx;
		flex:none;
	}
	.goodsImg image {
		width: 100%;
		height: 100%;
	}
	
	.o_cz{
	  width: 100%;
	  display: flex;
	  align-items: center;
	  flex-direction: row-reverse;  
	  padding: 20rpx 28rpx 40upx;
	  box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		z-index: 990;
		
		box-shadow: 0px 0px 9upx 0px rgba(195, 195, 195, 0.49);
	}
	.o_cz view{
	 width: 128upx;
	 height: 59upx;
	 background: #FFFFFF;
	 border: 1px solid #666666;
	 border-radius: 5upx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  color: #666666;
	  font-size: 22rpx;
	  margin-left: 20rpx;
	}
	.o_cz .qx{
	  color: #fff;
		border: 0;
	  background: linear-gradient(-34deg, #FC3B27, #FF6D5A);
	  box-shadow: 0px 3upx 6upx 0px rgba(255, 30, 30, 0.35);
	}
</style>
