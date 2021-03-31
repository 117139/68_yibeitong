<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			
			<input class="qun_name" type="text" v-model="qun_name" placeholder="请输入群名称" />
			<view class="qunyuan_list">
				<view class="qunyuan_li_tit">选择群成员</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
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
				datas:[],
				page:1,
				size:20,
				data_last:false
			}
		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/index/index?pid=' + that.$store.state.loginDatas.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		
		onLoad() {
			that = this
		
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
					uids:''
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
			
			createGroup() {
				let promise = this.tim.createGroup({
					type: this.$TIM.TYPES.GRP_PUBLIC,
					name: that.qun_name,
					memberList: [{
						userId: '3'
					}, {
						userId: '4'
					}] // 如果填写了 memberList，则必须填写 userID
				});
				promise.then(function(imResponse) { // 创建成功
					console.log(imResponse.data.group); // 创建的群的资料
					console.log('sss')
				}).catch(function(imError) {
					console.warn('createGroup error:', imError); // 创建群组失败的相关信息
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
				if(!that.qun_name){
					uni.showToast({
						icon:'none',
						title:'请输入群名称'
					})
					
					return
				}
				var memberList=[]
				for(var i=0;i<that.datas.length;i++){
					if(that.datas[i].active){
						var newlist={
						userID: that.datas[i].identification_id
					}
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
					type: this.$TIM.TYPES.GRP_PUBLIC,
					name: that.qun_name,
					memberList: memberList// 如果填写了 memberList，则必须填写 userID
				})
				uni.showLoading({
					title:'正在创建',
					mask:true
				})
				// return
				let promise = this.tim.createGroup({
					type: this.$TIM.TYPES.GRP_PUBLIC,
					name: that.qun_name,
					Owner_Account:that.loginDatas.identification_id,
					memberList: memberList// 如果填写了 memberList，则必须填写 userID
				});
				promise.then(function(imResponse) { // 创建成功
				
					console.log(imResponse.data.group); // 创建的群的资料
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:'创建成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					/*let promise = that.tim.setGroupMemberRole({
					  groupID: imResponse.data.group.groupID,
					  userID: that.$store.state.loginDatas.identification_id,
					  role: that.$TIM.TYPES.GRP_MBR_ROLE_ADMIN // 将群 ID: group1 中的用户：user1 设为管理员
					});
					promise.then(function(imResponse) {
					  console.log(imResponse.data.group); // 修改后的群资料
					  console.log(imResponse.data.member); // 修改后的群成员资料
						
					}).catch(function(imError) {
						uni.hideLoading()
					  console.warn('setGroupMemberRole error:', imError); // 错误信息
					});*/
					
					/*let promise_up = that.tim.updateGroupProfile({
					  groupID: imResponse.data.group.groupID,
						avatar:'/static/images/ybt_group.png'
					});
					promise_up.then(function(imResponse) {
					  console.log(imResponse.data.group) // 修改成功后的群组详细资料
						uni.showToast({
							icon:'none',
							title:'创建成功'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}).catch(function(imError) {
					  console.warn('updateGroupProfile error:', imError); // 修改群组资料失败的相关信息
					});*/
					console.log('sss')
				}).catch(function(imError) {
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:'创建群组失败-'+imError
					})
					console.warn('createGroup error:', imError); // 创建群组失败的相关信息
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
