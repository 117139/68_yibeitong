<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="index_top">
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
				direction: ''
			}
		},
		onLoad() {
			that = this
			that.htmlReset = 0
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
</style>
