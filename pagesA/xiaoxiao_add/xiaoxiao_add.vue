<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			
		<!-- <input class="qun_name" type="text" v-model="qun_name" placeholder="请输入群名称" /> -->
		<view class="qunyuan_list">
			<view class="qunyuan_li_tit">选择群成员</view>
			<view class="qunyuan_li" v-for="(item,index) in datas" @tap='xz_qy(item)'>
				<view class="qunyuan_li_d1" :class="item.active?'active':''"></view>
				<image class="qunyuan_li_d2" :src="getimg(item.head_portrait)" mode=""></image>
				<view class="qunyuan_li_d3">{{item.nickname}}</view>
			</view>
		</view>
		<view class="sub_btn" @tap="sub_fuc">完成</view>
		</htmlLoading>
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
				qun_name:'',
				conversationActive:'',
				ids:'',
				datas:[],
				page:1,
				size:20,
				data_last:false
			}
		},
		onLoad(option) {
			that = this
			that.ids=option.ids
			console.log(option.ids)
			
			this.conversationActive = this.$store.state.conversationActive
			that.onRetry()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','isLogin','isSDKReady','conversationList']),
		},
		methods: {
			onRetry() {
				this.page = 1
				this.goods_list = []
				this.data_last = false
				this.getdata()
			},
			getdata() {
				
				if (that.data_last) {
					return
				}
				var datas = {
				
					token: that.$store.state.loginDatas.userToken||'',
					page: that.page,
					size: that.size,
					keyword:'',
					uids:that.ids
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				console.log('datas>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
				console.log(datas)
				//selectSaraylDetailByUserCard
				var jkurl = '/getUserAll'
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					that.$refs.htmlLoading.htmlReset_fuc(0)
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
					that.$refs.htmlLoading.htmlReset_fuc(1)
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
			
			addGroupMember() {
				let promise = this.tim.addGroupMember({
					groupID: that.conversationActive.groupProfile.groupID,
					userIDList: ['user1','user2','user3']
				});
				promise.then(function(imResponse) {
				console.log(imResponse.data.successUserIDList); // 添加成功的群成员 userIDList
				console.log(imResponse.data.failureUserIDList); // 添加失败的群成员 userIDList
				console.log(imResponse.data.existedUserIDList); // 已在群中的群成员 userIDList
				console.log(imResponse.data.group); // 添加后的群组信息
				}).catch(function(imError) {
				console.warn('addGroupMember error:', imError); // 错误信息
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
			sub_fuc(){
				var memberList=[]
				for(var i=0;i<that.datas.length;i++){
					if(that.datas[i].active){
						var newlist=that.datas[i].identification_id
						memberList.push(newlist)
					}
				}
				console.log(memberList)
				if(memberList.length==0){
					uni.showToast({
						icon:'none',
						title:'请选择群成员'
					})
					return
				}
				console.log({
					groupID: that.conversationActive.groupProfile.groupID,
					userIDList: memberList
				})
				let promise = this.tim.addGroupMember({
					groupID: that.conversationActive.groupProfile.groupID,
					userIDList: memberList
				});
				promise.then(function(imResponse) {
					console.log(imResponse.data.successUserIDList); // 添加成功的群成员 userIDList
					console.log(imResponse.data.failureUserIDList); // 添加失败的群成员 userIDList
					console.log(imResponse.data.existedUserIDList); // 已在群中的群成员 userIDList
					console.log(imResponse.data.group); // 添加后的群组信息
					uni.showToast({
						icon:'none',
						title:'添加成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}).catch(function(imError) {
				console.warn('addGroupMember error:', imError); // 错误信息
				});
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
