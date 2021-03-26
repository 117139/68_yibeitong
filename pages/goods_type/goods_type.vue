<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<scroll-view class="scroll_L" scroll-y="true" >
				<view class="scroll_L_list">
					<!-- <view class="l_remen" :class="l_active==-1?'active':''" @tap="l_active_fuc('item',-1)">热门推荐</view> -->
					<view class="scroll_L_li" :class="l_active==-1?'active':''" @tap="l_active_fuc('item',-1)">热门推荐</view>
					<view v-for="(item,index) in goods_type" class="scroll_L_li" :class="l_active==index?'active':''" @tap="l_active_fuc(item,index)">{{item.title}}</view>
				</view>

			</scroll-view>
			<scroll-view class="scroll_R" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
			 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" @scrolltolower="getdata" @scroll="scroll_fuc">
				<view class="scroll_R_list">
					<block v-if="l_active==-1">
						<view v-if="datas.recommendData" class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>热门推荐</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas.recommendData" @tap="jump" :data-url="'/pagesA/good_list/good_list?id='+item.id+'&name='+item.title">
									<image class="goods_type_li_img" :src="getimg(item.img)" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.title}}</view>
								</view>
							</view>
								<!-- <view v-if="datas.recommendData.length==0" class="zanwu">暂无数据</view> -->
						</view>
						<view class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>精选专区</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas.choicenessData" @tap="jump" :data-url="'/pagesA/good_list/good_list?id='+item.id+'&name='+item.title">
									<image class="goods_type_li_img" :src="getimg(item.img)" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.title}}</view>
								</view>
							</view>
							<!-- <view v-if="datas.choicenessData.length==0" class="zanwu">暂无数据</view> -->
						</view>
					</block>
					<block v-else>
						
						<view class="goods_type_box clearfix">
							<view class="goods_type_tit">
								·<text>{{goods_type[l_active].title}}</text>·
							</view>
							<view class="goods_type_list">
								<view class="goods_type_li" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/good_list/good_list?id='+item.id+'&name='+item.title">
									<image class="goods_type_li_img" :src="getimg(item.img)" mode="aspectFit"></image>
									<view class="goods_type_li_text text-cut">{{item.title}}</view>
								</view>
								<view v-if="datas.length==0" class="zanwu">暂无数据</view>
								<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
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
				htmlReset:-1,
				goods_type:[],
				l_active:-1,
				datas: [],
				page: 1,
				size: 20,
				data_last: false,
				triggered: true, //设置当前下拉刷新状态
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'about_content']),
		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/goods_type/goods_type?pid=' + that.loginDatas.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onLoad(options) {
			that = this
			if(options.pid){
				console.log('pid>>>>>>>>>>>>')
				
				console.log(options.pid)
				console.log('pid>>>>>>>>>>>>>>>>>')
				uni.setStorageSync('pid',options.pid)
			}
			that.onRetry()
		},
		methods: {
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				that.getcate(0)
				// this.getdata()
			},
			l_active_fuc(item,index){
				that.l_active=index
				that.datas=[]
				if(index==-1){
					that.getcate(-1)
				}else{
					that.getcate(item.id)
				}
				
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
			getcate(pid){
				 var data = {
					 pid:pid
				 }
				 			
				 //selectSaraylDetailByUserCard
				 var jkurl = '/cate/list'
				
				service.P_get(jkurl, data).then(res => {
				 	that.btn_kg = 0
				 	console.log(res)
				 	if (res.code == 1) {
				 		var datas = res.data
				 		console.log(typeof datas)
				 			
				 		if (typeof datas == 'string') {
				 			datas = JSON.parse(datas)
				 		}
				 			
				 		if(pid==0){
							that.goods_type = datas
							that.l_active=-1
							that.getcate(-1)
							// if(datas.length>0){
							// 	var cate_list=JSON.stringify(datas)
							// 	uni.setStorageSync('cate_list',cate_list)
							// }
						}else{
							that.htmlReset = 0
							that.datas = datas
						}
						
				 		console.log(datas)
				 			
				 			
				 	} else {
				 		if (res.msg) {
				 			uni.showToast({
				 				icon: 'none',
				 				title: res.msg
				 			})
				 		} else {
				 			uni.showToast({
				 				icon: 'none',
				 				title: '获取失败'
				 			})
				 		}
				 	}
				}).catch(e => {
				 	that.btn_kg = 0
					that.htmlReset = 1
				 	console.log(e)
				 	uni.showToast({
				 		icon: 'none',
				 		title: '获取数据失败'
				 	})
				})
			},
			
			
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
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
		/* padding-top: 100upx; */
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
