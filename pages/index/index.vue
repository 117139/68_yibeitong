<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="index_top"  @tap="jump" data-url="/pagesA/good_list/good_list">
				<view class="index_top_srk dis_flex aic">
					<text class="iconfont iconsousuo"></text>
					<view>请输入关键词进行查找</view>
				</view>
			</view>
			<swiper class="card-swiper" :indicator-dots="false" :circular="true" :autoplay="true" interval="5000" duration="500"
			 @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper>
			<view class="index_zbox">
				<view class="dis_flex aic ju_b index_xxtz">
					<image class="xxtz_img" src="../../static/images/xxtz.png" mode="aspectFit"></image>
					<view class="xx_msg_box dis_flex aic">
						<text class="iconfont iconlaba"></text>
						<text class="flex_1 text-cut">恭喜张三充值100元话费，获得佣金6元获得佣金6元获得佣金6元获得佣金6元</text>
					</view>
				</view>
				<view class="huodong_tit dis_flex aic">
					精彩活动
				</view>
				<view class="huodong_list">
					<image class="huodong_li" src="../../static/images/index_03.jpg" mode="aspectFit" @tap="jump" data-url="/pagesA/my_address/my_address"></image>
					<image class="huodong_li" src="../../static/images/index_05.jpg" mode="aspectFit" @tap="jump" data-url="/pagesA/my_address/my_address"></image>
				</view>
				<view class="huodong_tit dis_flex aic">
					人气推荐<image class="huodong_tit_hot" src="/static/images/HOT.png" mode="aspectFit"></image>
				</view>
				
				<view class="huodong_list">
					<view  class="goods_li" v-for="(item,index) in goods_list">
						<image class="goods_li_img" :src="item.g_img" mode="aspectFit" @tap="jump" data-url="/pagesA/details/details"></image>
						<view class="text-cut goods_li_name">{{item.name}}</view>
						<view class=" goods_li_money"><text>￥</text>{{item.money}}</view>
					</view>
				</view>
				<view v-if="goods_list.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
			</view>
		</block>
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
				datas: '',
				htmlReset: -1,
				cardCur: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
				],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				goods_list:[
					{
						name:'Winter潮流男士衣裤',
						money:'650',
						id:1,
						g_img:'/static/images/index_09.jpg'
					},
					{
						name:'Winter潮流女士衣裤',
						money:'450',
						id:2,
						g_img:'/static/images/index_12.jpg'
					},
					{
						name:'Winter潮流女士衣裤',
						money:'450',
						id:3,
						g_img:'/static/images/index_15.jpg'
					},
					{
						name:'Winter潮流男士衣裤',
						money:'650',
						id:4,
						g_img:'/static/images/index_17.jpg'
					},
				],
				data_last:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','about_content']),
		},
		onLoad() {
			that = this
			that.htmlReset = 0
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
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
			
				
			},
			
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
	.minh100 {
		/* background: #F8F8F8; */
	}
	.index_top{
		width: 100%;
		padding: 15upx 30upx 0;
	}
	.index_top_srk{
		width: 100%;
		height: 64upx;
		background: #F4F4F4;
		border-radius: 4upx;
		font-size: 28upx;
		color: #999;
		padding: 0 20upx;
	}
	.index_top_srk text{
		font-size: 30upx;
		color: #bbb;
		margin-right: 20upx;
	}
	.index_zbox {
		width: 100%;
		padding: 0 30upx 15upx;
	}
	.index_xxtz{
		width: 100%;
	}
	.xxtz_img{
		width: 54upx;
		height: 54upx;
		margin-right: 14upx;
		flex: none;
	}
	.xx_msg_box{
		width: 614upx;
		height: 63upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 15upx 20upx;
		color: #666;
		font-size: 24upx;
	}
	.xx_msg_box .iconfont{
		margin-right: 20upx;
		flex: none;
		color: #999;
	}
	.huodong_tit{
		width: 100%;
		font-size: 36upx;
		color: #333;
		height: 100upx;
		font-weight: bold;
	}
	.huodong_tit_hot{
		position: relative;
		top: -20upx;
		width: 57upx;
		height: 30upx;
		margin-left: 8upx;
	}
	.huodong_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		
	}
	.huodong_li{
		width: 338upx;
		height: 147upx;
		/* background: linear-gradient(42deg, #FE7D6A, #FF9D78); */
		box-shadow: 0px 0px 10upx 0px rgba(230, 34, 0, 0.05);
		border-radius: 10upx;
		margin-right: 12upx;
		margin-bottom: 12upx;
	}
	.huodong_li:nth-child(2n){
		margin-right: 0;
	}
	.goods_li{
		width: 327upx;
		margin-right: 35upx;
		margin-bottom: 20upx;
	}
	.goods_li:nth-child(2n){
		margin-right: 0;
	}
	.goods_li_img{
		width: 327upx;
		height: 404upx;
		border-radius: 4px;
	}
	.goods_li_name{
		font-size: 32upx;
		line-height: 58upx;
		color: #333;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}
	.goods_li_money{
		font-size: 32upx;
		color: #A8896D;
	}
	.goods_li_money text{
		font-size: 26upx;
	}
</style>
