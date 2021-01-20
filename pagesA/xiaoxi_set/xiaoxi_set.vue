<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			
		<view class="qy_list">
			<view class="qy_li"  v-for="(item,index) in datas">
				<image :src="getimg('/static/images/tx_m2.jpg')" mode="aspectFill"></image>
				<view>小Q</view>
			</view>
			<view class="qy_li">
				<image :src="getimg('/static/images/qy_add.png')" mode="aspectFill"></image>
				<view></view>
			</view>
			<view class="qy_li">
				<image :src="getimg('/static/images/qy_jian.png')" mode="aspectFill"></image>
				<view></view>
			</view>
		</view>
		<!-- <view class="qunyuan_list">
			<view class="qunyuan_li_tit">选择群成员</view>
			<view class="qunyuan_li" v-for="(item,index) in datas" @tap='xz_qy(item)'>
				<view class="qunyuan_li_d1" :class="item.active?'active':''"></view>
				<image class="qunyuan_li_d2" :src="getimg('/static/images/tx_m2.jpg')" mode=""></image>
				<view class="qunyuan_li_d3">用户{{index+1}}</view>
			</view>
		</view> -->
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
	.minh100{
		padding-bottom: 120upx;
	}
	.qy_list{
		width: 100%;
		padding: 0 30upx;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 10upx solid #F1F1F1;
	}
	.qy_li{
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 14upx 0;
	}
	.qy_li image{
		width: 108upx;
		height: 108upx;
		border-radius: 50%;
	}
	.qy_li view{
		margin-top: 20upx;
		height: 35upx;
		display: flex;
		align-items: center;
		font-size: 22upx;
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
