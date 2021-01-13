<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<scroll-view class="scroll_L" scroll-y="true" >
				<view class="scroll_L_list">
					<view class="l_remen">热门推荐</view>
					<view v-for="(item,index) in goods_type" class="scroll_L_li" :class="l_active==index?'active':''" @tap="l_active_fuc(item,index)">{{item.name}}</view>
				</view>

			</scroll-view>
			<scroll-view class="scroll_R" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
			 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" @scrolltolower="getdata" @scroll="scroll_fuc">
				<view class="scroll_R_list">
					<block v-if="l_active==-1">
						<view class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>热门推荐</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas">
									<image class="goods_type_li_img" :src="item.pic" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>精选专区</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas">
									<image class="goods_type_li_img" :src="item.pic" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.name}}</view>
								</view>
							</view>
						</view>
					</block>
					<block v-else>
						
						<view class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>{{goods_type[l_active].name}}</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas">
									<image class="goods_type_li_img" :src="item.pic" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.name}}</view>
								</view>
							</view>
						</view>
					</block>
					
				</view>

			</scroll-view>
		</block>
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
				goods_type:[
					{
						name:'服装配饰',
						id:1
					},
					{
						name:'美发护肤',
						id:2
					},
					{
						name:'男士护肤',
						id:3
					},
					{
						name:'日用文创',
						id:4
					},
					{
						name:'谢箱数码',
						id:5
					},
					{
						name:'运动户外',
						id:6
					},
					{
						name:'礼物套装',
						id:7
					},
				],
				l_active:-1,
				datas: [
					{
						pic:'/static/images/goods_type_03.jpg',
						name:'笔类',
						id:1
					},
					{
						pic:'/static/images/goods_type_05.jpg',
						name:'手表',
						id:2
					},
					{
						pic:'/static/images/goods_type_07.jpg',
						name:'行李箱',
						id:3
					},
					{
						pic:'/static/images/goods_type_12.jpg',
						name:'男装',
						id:4
					},
					{
						pic:'/static/images/goods_type_13.jpg',
						name:'灯具',
						id:5
					},
					{
						pic:'/static/images/goods_type_14.jpg',
						name:'鞋子',
						id:6
					},
				],
				page: 1,
				size: 20,
				data_last: false,
				triggered: true, //设置当前下拉刷新状态
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'about_content']),
		},
		onLoad() {
			that = this
			that.htmlReset = 0
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			l_active_fuc(item,index){
				that.l_active=index
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this.btn_kg == 1) {
					that.triggered = false
					that._freshing = false
					return
				}
				if (that._freshing) return;
				that._freshing = true;
				// this.onRetry()
				setTimeout(() => {
					that.triggered = false
					that._freshing = false
				}, 500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				this.getdata()
			},
			getdata() {
				var that = this
				if(!that.hasLogin){
					this.htmlReset=0
					return
				}
				if (that.data_last) {
					return
				}
				uni.getLocation({
				    type: 'gcj02',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
								that.longitude=res.longitude
								that.latitude=res.latitude
				        console.log('当前位置的纬度：' + res.latitude);
								var datas = {
								
									token: that.loginDatas.token,
									long:that.longitude,
									lat:that.latitude,
									page: that.page,
									size: that.size,
									status:''
								}
								if (that.btn_kg == 1) {
									return
								}
								that.btn_kg = 1
								//selectSaraylDetailByUserCard
								var jkurl = '/engineer/list'
								uni.showLoading({
									title: '正在获取数据',
									mask: true
								})
								var page_that = that.page
								service.P_get(jkurl, datas).then(res => {
									that.btn_kg = 0
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
								
				    }
				});
			
				
			},
			
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},
		}
	}
</script>

<style scoped>
	.minh100{
		background: #F8F8F8;
	}
	.scroll_L{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 180upx;
		width: 180upx;
		height: 100vh;
		/* #ifdef H5 */
		height:calc( 100vh - 44px);
		top: 44px;
		/* #endif */
	}
	.scroll_R{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 180upx;
		width: calc(100vw - 180upx);
		height: 100vh;
		/* #ifdef H5 */
		height:calc( 100vh - 44px);
		top: 44px;
		/* #endif */
	}
	.scroll_L_list{
		width: 165upx;
		min-height: 100vh;
		/* #ifdef H5 */
		min-height:calc( 100vh - 44px);
		/* #endif */
		background: #FFFFFF;
		box-shadow: 0px 0px 9px 0px rgba(172, 172, 172, 0.11);
		padding-top: 100upx;
		position: relative;
	}
	.l_remen{
		width: 175upx;
		height: 90upx;
		background: #FE3C3D;
		box-shadow: 1px 3px 5px 0px rgba(255, 30, 30, 0.35);
		border-radius: 0 0 30upx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27upx;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
	}
	.scroll_L_li{
		width: 165upx;
		height: 91upx;
		color: #666;
		font-size: 28upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.scroll_L_li.active{
		background: #FE3C3D;
		color: #fff;
	}
	.scroll_R_list{
		width: 100%;
		padding-top: 30upx;
		padding-right: 30upx;
		padding-left: 5upx;
	}
	.goods_type_box{
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 9upx 0px rgba(172, 172, 172, 0.11);
		border-radius: 5upx;
		padding: 0 35upx;
	}
	.goods_type_box+.goods_type_box{
		margin-top: 30upx;
	}
	.goods_type_tit{
		display: flex;
		width: 100%;
		height: 100upx;
		align-items: center;
		justify-content: center;
		font-size: 50upx;
		color: #F88F59;
		font-weight: bold;
	}
	.goods_type_tit text{
		font-size: 30upx;
		margin: 0 10upx;
	}
	.goods_type_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.goods_type_li{
		width: 126upx;
		margin-right: 40upx;
		margin-bottom: 35upx;
	}
	.goods_type_li:nth-child(3n){
		margin-right: 0;
	}
	.goods_type_li_img{
		width: 126upx;
		height: 126upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(192, 192, 192, 0.4);
		border-radius: 5upx;
	}
	.goods_type_li_text{
		font-size: 24upx;
		color: 33px;
		margin-top: 15upx;
		text-align: center;
	}
</style>
