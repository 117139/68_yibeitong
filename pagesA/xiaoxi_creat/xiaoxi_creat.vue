<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			
		<input class="qun_name" type="text" v-model="qun_name" placeholder="请输入群名称" />
		<view class="qunyuan_list">
			<view class="qunyuan_li_tit">选择群成员</view>
			<view class="qunyuan_li" v-for="(item,index) in datas" @tap='xz_qy(item)'>
				<view class="qunyuan_li_d1" :class="item.active?'active':''"></view>
				<image class="qunyuan_li_d2" :src="getimg('/static/images/tx_m2.jpg')" mode=""></image>
				<view class="qunyuan_li_d3">用户{{index+1}}</view>
			</view>
		</view>
		<view class="sub_btn" @tap="sub_fuc">完成</view>
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
				htmlReset: -1,
				data_last:false,
				qun_name:'',
				datas:[
					{name:'用户1'},
					{name:'用户2'},
					{name:'用户3'},
					{name:'用户4'},
					{name:'用户5'},
					{name:'用户6'},
					{name:'用户7'},
					{name:'用户8'},
					{name:'用户9'},
					{name:'用户10'},
					{name:'用户11'},
					{name:'用户12'},
					{name:'用户13'},
				]
			}
		},
		onLoad() {
			that = this
			that.htmlReset = 0
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','isLogin','isSDKReady','conversationList']),
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			xz_qy(item){
				var type=true
				if(item.active){
					type=false
				}
				Vue.set(item,'active',type)
			},
			sub_fuc(){
				if(!that.qun_name){
					uni.showToast({
						icon:'none',
						title:'请输入群名称'
					})
					
					return
				}
				uni.showToast({
					icon:'none',
					title:'操作成功'
				})
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			}
		}
	}
</script>

<style scoped>
	.qun_name{
		width: 100%;
		height: 96upx;
		padding:0 35upx;
		border-bottom: 6upx solid #F1F1F1;
		font-size: 30upx;
	}
	.qunyuan_list{
		width: 100%;
		padding: 0 35upx 120upx;
	}
	.qunyuan_li_tit{
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #333;
		height: 100upx;
	}
	.qunyuan_li{
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20upx 0;
		border-bottom: 1px solid #F1F1F1;
	}
	.qunyuan_li_d1{
		width: 25upx;
		height: 25upx;
		border: 1px solid #999999;
		border-radius: 50%;
		margin-right: 47upx;
		flex: none;
	}
	.qunyuan_li_d1.active{
		border: 1px solid #F54248;
		background: #F54248;
	}
	.qunyuan_li_d2{
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		margin-right: 12upx;
		flex: none;
	}
	.qunyuan_li_d3{
		flex: 1;
		font-size: 32upx;
		color: #000;
	}
	.sub_btn{
		width: 100%;
		height: 100upx;
		color: #fff;
		font-size: 32upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F54248;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 20;
	}
</style>
