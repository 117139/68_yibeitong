<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			
		<view class="qy_list">
			<view class="qy_li"  v-for="(item,index) in datas">
				<image @tap="qy_del(item)" v-if="cz_jian==true" class="qy_li_del" :src="getimg('/static/images/img_del.png')" mode="aspectFit"></image>
				<image :src="getimg('/static/images/tx_m2.jpg')" mode="aspectFill"></image>
				<view>小Q</view>
			</view>
			<view v-if="cz_jian==false" class="qy_li" @tap='jump' data-url="/pagesA/xiaoxiao_add/xiaoxiao_add">
				<image :src="getimg('/static/images/qy_add.png')" mode="aspectFill"></image>
				<view></view>
			</view>
			<view v-if="cz_jian==false" class="qy_li" @tap="cz_jian=true">
				<image :src="getimg('/static/images/qy_jian.png')" mode="aspectFill"></image>
				<view></view>
			</view>
		</view>
		<view class="quan_name">
			<view>群名称</view>
			<view>物美团购群1</view>
		</view>
		<!-- <view class="qunyuan_list">
			<view class="qunyuan_li_tit">选择群成员</view>
			<view class="qunyuan_li" v-for="(item,index) in datas" @tap='xz_qy(item)'>
				<view class="qunyuan_li_d1" :class="item.active?'active':''"></view>
				<image class="qunyuan_li_d2" :src="getimg('/static/images/tx_m2.jpg')" mode=""></image>
				<view class="qunyuan_li_d3">用户{{index+1}}</view>
			</view>
		</view> -->
		<view v-if="cz_jian==true" class="sub_btn" @tap="cz_jian=false">取消</view>
		<view v-else class="sub_btn" @tap="sub_fuc">删除并退出</view>
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
				cz_jian:false,
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
			//删除成员
			deleteGroupMember(){
				let promise = tim.deleteGroupMember({groupID: 'group1', userIDList:['user1'], reason: '你违规了，我要踢你！'});
				promise.then(function(imResponse) {
				console.log(imResponse.data.group); // 删除后的群组信息
				console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
				}).catch(function(imError) {
				console.warn('deleteGroupMember error:', imError); // 错误信息
				});
			},
			//解散群
			dismissGroup(){
				let promise = tim.dismissGroup('group1');
				promise.then(function(imResponse) { // 解散成功
				console.log(imResponse.data.groupID); // 被解散的群组 ID
				}).catch(function(imError) {
				console.warn('dismissGroup error:', imError); // 解散群组失败的相关信息
				});
			},
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
			qy_del(item){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该成员',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										uni.showToast({
											icon:'none',
											title:'操作成功'
										})
										
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			sub_fuc(){
				uni.showModal({
				    title: '提示',
				    content: '是否退出该群',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										uni.showToast({
											icon:'none',
											title:'操作成功'
										})
										setTimeout(()=>{
											uni.navigateBack({
												delta:2
											})
										},1000)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
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
		position: relative;
	}
	.qy_li image{
		width: 108upx;
		height: 108upx;
		border-radius: 50%;
	}
	.qy_li .qy_li_del{
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: 10upx;
		right: 10upx;
	}
	.qy_li view{
		margin-top: 20upx;
		height: 35upx;
		display: flex;
		align-items: center;
		font-size: 22upx;
		color: #000;
	}
	.quan_name{
		width: 100%;
		padding: 0 30upx;
		font-size: 32upx;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100upx;
		font-weight: bold;
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
