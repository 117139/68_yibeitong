<template>
	<view class="minh100">
		<view class="pj_li" v-for="(item,idx) in datas">
			<view class="pj_d1">
				<view class="user_tx">
					<image class="user_tx" :src="filter.imgIP(item.head_portrait)"></image>
				</view> {{item.nickname}}
			</view>
			<view class="pj_d2">{{item.comment}}</view>
			<view class="pj_d3">
				<text v-for="(item1,idx1) in item.attr">{{item1.value}}</text>
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
	export default {
		data() {
			return {
				datas:''
			}
		},
		onLoad() {
			that=this
			var resdata = [
						{
							head_portrait:'/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg',
							nickname:'昵称',
							comment:'宝贝收到了，和卖家描述的一样，很漂亮，一直想买这样一个杯子，这个蓝色稍微有点小瑕疵，不过自己用没问题',
							attr:[
								{
									value:'黑色'
								},
								{
									value:'XL'
								},
							]
						},
						{
							head_portrait:'/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg',
							nickname:'昵称1515',
							comment:'宝贝收到了，和卖家描述的一样，很漂亮，一直想买这样一个杯子，这个蓝色稍微有点小瑕疵，不过自己用没问题',
							attr:[
								{
									value:'黑色'
								},
								{
									value:'XL'
								},
							]
						},
						{
							head_portrait:'/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg',
							nickname:'昵称1515',
							comment:'宝贝收到了，和卖家描述的一样，很漂亮，一直想买这样一个杯子，这个蓝色稍微有点小瑕疵，不过自己用没问题',
							attr:[
								{
									value:'黑色'
								},
								{
									value:'XL'
								},
							]
						},
						{
							head_portrait:'/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg',
							nickname:'昵称1515',
							comment:'宝贝收到了，和卖家描述的一样，很漂亮，一直想买这样一个杯子，这个蓝色稍微有点小瑕疵，不过自己用没问题',
							attr:[
								{
									value:'黑色'
								},
								{
									value:'XL'
								},
							]
						},
						{
							head_portrait:'/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg',
							nickname:'昵称1515',
							comment:'宝贝收到了，和卖家描述的一样，很漂亮，一直想买这样一个杯子，这个蓝色稍微有点小瑕疵，不过自己用没问题',
							attr:[
								{
									value:'黑色'
								},
								{
									value:'XL'
								},
							]
						},
					]
			that.datas = resdata
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.minh100{
		/* background: #f7f7f7; */
	}
	.pj_li {
		width: 100%;
		padding: 20rpx 28rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		
	}

	.pj_d1 {
		font-size: 28rpx;
		color: #666;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.pj_d2 {
		font-size: 26rpx;
		color: #333;
		margin-bottom: 10upx;
	}
	.pj_d3{
		font-size: 24upx;
		color: #666;
	}
	.pj_d3 text{
		margin-right: 8upx;
	}
	.user_tx {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
	}

	view.user_tx {
		margin-right: 19rpx;
	}
</style>
