<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view class="container">
			<!-- <view class="hengxian"></view> -->
			<view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
				<block v-for="(item,idx) in datalist">
					<view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'>{{item}}</view>
				</block>

			</view>
			<view v-if="htmlReset==0" class="goodsBox w100">
				<view class="zanwu" v-if="datas.length==0">暂无内容</view>

				<view class="goodsBox contbox">
					<view class="goods" v-for="(item,idx) in datas">
						<!-- <view class="dianpu_tit">
		          <image class="dp_logo" :src="filter.imgIP(item.order.head_portrait)"></image>
		          <text>{{item.store_name}}</text>
		        </view> -->
						<block v-for="(item1,idx1) in item.order_goods">
							<view class="goods1" @tap="jump_sh" :data-url="'/pagesA/orderDetails_sh_xq/orderDetails_sh_xq?id='+item1.id+'&type='+type">
								<!-- <view v-if="type==4}}" class="xuanze" data-selec="idx}}" data-selec1="idx1}}" catchtap="select">
		            <view class="xuanze1 {{goods_sele[idx][idx1].xuan==true? 'xuanze2':''}}">
		              <icon v-if="goods_sele[idx][idx1].xuan==true}}" type="success" size="14" color="#F7B43B" />
		            </view>
								</view> -->
								<view class="goodsImg">
									<!-- <image class="goodsImg" :src="filter.imgIP(item1.gd_vice_pic)" mode="aspectFill"></image> -->
									<image class="goodsImg" :src="item1.gd_vice_pic[0]" mode="aspectFill"></image>
								</view>
								<view class="goodsinr">
									<!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
									<view class="goodsname fz30 c30 oh1">{{item1.gd_name}}</view>
									<view class="goodspri"><text v-for="(item2,idx2) in item1.gd_attr">{{item2.value+' '}}</text></view>
									<view class="goodspri1">
										<text class="fz24 c6 ">数量：{{item1.may_retreat_number}}</text>
										<text v-if="type==2">{{item1.s_status_value}}</text>
									</view>
								</view>

							</view>
							<block  v-if="type!=2">
								<view  style="width: 100%;height: 1px;background: #eee;"></view>
								<view class="o_cz">
									<view v-if="type==0" @tap.stop="jump" class="qx" :data-url="'/pagesA/OrderDetails_sh_sq/OrderDetails_sh_sq?item='+JSON.stringify(item1)">申请售后</view>
									<!-- <view v-if="type==1&&item1.s_status==1" @tap.stop='del_order(item1.id)'>取消售后</view> -->
									<view v-if="type==1&&item1.s_status==2"  class="qx" @tap.stop='del_order(item1.id)'>取消售后</view>
									<view v-if="type==1&&item1.s_status==2" @tap="jump_sh" :data-url="'/pagesA/OrderDetails_sh/OrderDetails_sh?id='+item1.id+'&type='+type">已同意</view>
								</view>
							</block>
						</block>

					</view>
				</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
	export default {
		data() {
			return {
				btnkg: 0,
				htmlReset: -1,
				data_last: false,
				datalist: [
					'售后申请',
					'处理中',
					'申请记录'
				],
				page: 1,
				size: 20,
				type: 0,
				sum: 0,
				otype: -2,



				datas: [],
				// goods_sele: [],
				xuan: false,
				all: false,
				show_num: 0
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
		onLoad(option) {

			this.onRetry()
		},
		onShow() {
			// this.page=1
			// this.goods_sele=[]
			// this.all=false
			// #ifdef MP-WEIXIN
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.reset_type) {
				//将携带的参数赋值
				this.type = 1
				this.onRetry()
				currPage.data.reset_type = false

				console.log(this.address, '地址')

			}
			if (currPage.data.sh_wl) {
				//将携带的参数赋值
				that.onRetry()
				currPage.setData({
					sh_wl: false
				})
			}
			// #endif
			// this.getOrderList('onshow')
		},

		onReady() {

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getdatalist()
		},
		methods: {
			onRetry() {
				this.datas = []
				this.page = 1
				this.btnkg = 0
				this.data_last = false

				this.getdatalist()
			},
			getdatalist() {
				this.datas = [{
						"order": {
							"group_code": 3,
							"head_portrait": "/resource/merchant/head_portrait/20200713/24137047dde648c211008e53f927cbfb.png",
							"store_name": "Nick",
							"o_id": 396,
							"o_order_num": "OEC29A316390816551",
							"o_price": "0.01",
							"o_totalprice": "0.01"
						},
						"order_goods": [{
							"id": 38,
							"ov_id": 403,
							"g_id": 24,
							"gd_name": "Winter潮流男士衣裤",
							"gd_mastr_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_vice_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_attr": [{
									"name": "颜色",
									"value": "蓝色翡翠"
								},
								{
									"name": "内存",
									"value": "256G"
								}
							],
							"single_price": "0.01",
							"number": 1,
							"may_retreat_number": 1,
							"s_status": 2,
							"s_status_value": "已同意",
							"s_status_refuse": "",
							"is_return_price": 1
						}]
					},
					{
						"order": {
							"group_code": 3,
							"head_portrait": "/resource/merchant/head_portrait/20200713/24137047dde648c211008e53f927cbfb.png",
							"store_name": "Nick",
							"o_id": 395,
							"o_order_num": "OEC29A312310426719",
							"o_price": "0.01",
							"o_totalprice": "0.01"
						},
						"order_goods": [{
							"id": 37,
							"ov_id": 402,
							"g_id": 24,
							"gd_name": "Winter潮流男士衣裤",
							"gd_mastr_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_vice_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_attr": [{
									"name": "颜色",
									"value": "蓝色翡翠"
								},
								{
									"name": "内存",
									"value": "256G"
								}
							],
							"single_price": "0.01",
							"number": 1,
							"may_retreat_number": 1,
							"s_status": 2,
							"s_status_value": "已同意",
							"s_status_refuse": "",
							"is_return_price": 1
						}]
					},
					{
						"order": {
							"group_code": 3,
							"head_portrait": "/resource/merchant/head_portrait/20200713/24137047dde648c211008e53f927cbfb.png",
							"store_name": "Nick",
							"o_id": 382,
							"o_order_num": "OEC28A461607727830",
							"o_price": "0.01",
							"o_totalprice": "0.01"
						},
						"order_goods": [{
							"id": 35,
							"ov_id": 389,
							"g_id": 24,
							"gd_name": "Winter潮流男士衣裤",
							"gd_mastr_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_vice_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_attr": [{
									"name": "颜色",
									"value": "黑色"
								},
								{
									"name": "内存",
									"value": "128G"
								}
							],
							"single_price": "0.01",
							"number": 1,
							"may_retreat_number": 1,
							"s_status": 2,
							"s_status_value": "已同意",
							"s_status_refuse": "",
							"is_return_price": 1
						}]
					},
					{
						"order": {
							"group_code": 3,
							"head_portrait": "/resource/merchant/head_portrait/20200713/24137047dde648c211008e53f927cbfb.png",
							"store_name": "Nick",
							"o_id": 390,
							"o_order_num": "OEC29A076915933795",
							"o_price": "0.01",
							"o_totalprice": "0.01"
						},
						"order_goods": [{
							"id": 33,
							"ov_id": 397,
							"g_id": 24,
							"gd_name": "Winter潮流男士衣裤",
							"gd_mastr_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_vice_pic": [
								"/static/images/index_09.jpg"
							],
							"gd_attr": [{
									"name": "颜色",
									"value": "蓝色翡翠"
								},
								{
									"name": "内存",
									"value": "128G"
								}
							],
							"single_price": "0.01",
							"number": 1,
							"may_retreat_number": 1,
							"s_status": 2,
							"s_status_value": "已同意",
							"s_status_refuse": "",
							"is_return_price": 1
						}]
					}
				]
				this.htmlReset = 0
				return
				let that = this
				var jkurl = '/afterSale'
				var data = {
					token: that.loginMsg.userToken,
					type: that.type - 1 + 2,
					page: that.page,
					size: that.size
				}
				if (that.data_last) return
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				service.get(jkurl, data,
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
							if (that.page == 1) {
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
							title: '获取数据失败'
						})

					}
				)
			},
			del_order(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消该售后订单',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var jkurl = '/afterSale/cancelAfter'
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

			bindcur(e) {
				var that = this
				console.log(e.currentTarget.dataset.type)
				if (that.type == e.currentTarget.dataset.type) return
				that.type = e.currentTarget.dataset.type
				// that.getOrderList()
				that.onRetry()

			},
			select(e) {
				let that = this
				// console.log(e.currentTarget.dataset.selec)
				let sid = e.currentTarget.dataset.selec
				let sid1 = e.currentTarget.dataset.selec1
				// console.log(this.data.goods_sele[sid].xuan)
				if (that.goods_sele[sid][sid1].xuan == false) {
					that.goods_sele[sid][sid1].xuan = true
					that.goods_sele = that.goods_sele
				} else {
					that.goods_sele[sid][sid1].xuan = false
					that.goods_sele = that.goods_sele
				}
				let qx = true
				for (let i in that.goods_sele) {
					for (let j in that.goods_sele[i]) {
						if (that.goods_sele[i][j].xuan == false) {
							qx = false
							break
						}
					}
				}
				console.log(qx)
				//触发全选
				if (qx == true) {
					that.all = true
				} else {
					that.all = false
				}
				// //计算总价
				// that.countpri()
			},

			gopinlun(e) {
				wx.navigateTo({
					url: '/pages/fabiaopl/fabiaopl?oid=' + e.currentTarget.dataset.oid
				})
			},


			jump(e) {
				service.jump(e)
			},
			jump_sh(e) {
				if (this.type == 0) {
					return
				}
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	page {
		background: #f5f5f5;
	}

	.container {
		min-height: 100vh;
		background: #F5F5F5;
		padding-top: 80rpx;
		padding-bottom: 100rpx;
	}

	.tab_box {
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: calc(44px + env(safe-area-inset-top));
		/* #endif */
		z-index: 90;
		font-size: 30rpx;
		width: 100%;
		height: 76upx;
		line-height: 76upx;
		left: 0;
		right: 0;
		background: #f8f8f8;
	}

	.goodsImg image {
		width: 100%;
		height: 100%;
	}

	.zanwu {
		font-size: 24rpx;
		color: #999;
		line-height: 140rpx;
		text-align: center;
	}

	.typecur{
	  padding-bottom: 12rpx;
	  border-bottom: 6rpx solid #FE4141;
		color: #FE4141;
	}

	.orderstatus {
		height: 100rpx;
		border-bottom: 1px solid #eee;
	}


	.goodsBox {
		width: 100%;
	}


	.goodsInr {
		width: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		font-size: 28rpx;
		color: #999;
	}



	.contbox {
		width: 100%;
		padding: 10rpx 0;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.goodsImg image {
		width: 100%;
		height: 100%;
	}



	/*  */
	.dianpu_tit {
		display: flex;
		align-items: center;
		padding: 28rpx 28rpx 0;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333;
	}

	.dp_logo {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.dianpu_tit .iconfont {
		font-size: 26rpx;
		color: #999;
	}

	.goods {
		width: 100%;
		background-color: #fff;
		/* border-bottom: 20rpx solid #F5F5F5; */
		margin-bottom: 10rpx;
	}

	.goods1 {
		width: 100%;
		padding: 20upx 28rpx ;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid #ddd; */
		position: relative;
	}

	.scbg {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 46rpx;
		height: 46rpx;
		line-height: 46rpx;
		border-radius: 50%;
		background-color: #999;
		color: #fff;
		font-size: 26rpx;
		/* display: flex;
	justify-content: space-between;
	align-items: center; */
		text-align: center;
	}

	.goodsImg {
		width: 160rpx;
		height: 160rpx;
		/* border: 1px solid #d2d2d2; */
		margin-right: 22rpx;
	}



	.goodsinr {
		height: 140rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}



	.heji {
		/* flex: 1; */
		margin-right: 10rpx;
		font-size: 32rpx;
		color: #f75852;
		/* font-weight: bold; */
		text-align: right;
	}

	.jiesuan {
		/* width: 210rpx;
	height: 100rpx;
	background: #f75852; */
		width: 174rpx;
		height: 57rpx;
		background: rgba(244, 116, 22, 1);
		border-radius: 29px;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 28rpx;
	}

	.jiesuan1 {
		background: #B5B5B5;
	}


	/*  */

	.goodsname {
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 10upx;
		font-weight: bold;
	}

	.goodspri {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 20upx;
	}

	.scx {
		text-decoration: line-through;
	}

	.goodspri1 {
		font-size: 32rpx;
		color: #FD383B;
		display: flex;
		align-items: center;
		font-weight: bold;
		justify-content: space-between;
	}

	.goodspri1 text {
		font-size: 24upx;
	}

	.o_cz {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		padding: 20rpx 28rpx;
		box-sizing: border-box;
	}

	.o_cz view {
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

	.o_cz .qx {
		color: #fff;
		background: linear-gradient(-34deg, #FC3B27, #FF6D5A);
		box-shadow: 0px 3upx 6upx 0px rgba(255, 30, 30, 0.35);
	}
</style>
