<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			
		<view class="qy_list">
			<view class="qy_li"  v-for="(item,index) in datas">
				<image v-if="item.avatar" :src="getimg(item.avatar)" mode="aspectFill"></image>
				<image v-else :src="getimg('/static/images/tx_m2.jpg')" mode="aspectFill"></image>
				<image @tap="qy_del(item)" v-if="cz_jian==true&&conversationActive.groupProfile.ownerID!=item.userID" class="qy_li_del" :src="getimg('/static/images/img_del.png')" mode="aspectFit"></image>
				<view class="tac " style="width: 6em;text-align: center;" v-if="item.nick"><text  class="text-cut">{{item.nick}}</text></view>
				<view class="tac" style="width: 6em;text-align: center;" v-else><text  class="text-cut">{{'用户'+item.userID}}</text></view>
			</view>
			<block v-if="conversationActive.groupProfile.ownerID==loginDatas.identification_id">
				<view v-if="cz_jian==false" class="qy_li" @tap='jump' :data-url="'/pagesA/xiaoxiao_add/xiaoxiao_add?ids='+ids">
					<image :src="getimg('/static/images/qy_add.png')" mode="aspectFill"></image>
					<view></view>
				</view>
				<view v-if="cz_jian==false" class="qy_li" @tap="cz_jian=true">
					<image :src="getimg('/static/images/qy_jian.png')" mode="aspectFill"></image>
					<view></view>
				</view>
			</block>
			
		</view>
		<view class="quan_name">
			<view>群名称</view>
			<view>{{conversationActive.groupProfile.name}}</view>
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
		<block v-else>
			<view v-if="conversationActive.groupProfile.ownerID==loginDatas.identification_id" class="sub_btn" @tap="sub_fuc('解散')">删除并退出</view>
			<view v-else class="sub_btn" @tap="sub_fuc('退出')">删除并退出</view>
		</block>
			
		
		
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
				conversationActive:'',
				datas:[],
				ids:'',
				show_num:0
			}
		},
		onLoad() {
			that = this
			this.conversationActive = this.$store.state.conversationActive
			console.log(this.conversationActive)
			that.getroupMember()
		},
		onShow() {
			if(that.show_num){
				that.getroupMember()
			}
			
		},
		onHide() {
			that.show_num++
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','isLogin','isSDKReady','conversationList']),
		},
		methods: {
			//获取成员
			getroupMember(){
				console.log(that.conversationActive.groupProfile)
				let promise = that.tim.getGroupMemberList({ groupID: that.conversationActive.groupProfile.groupID, count: 500, offset:0 }); // 从0开始拉取30个群成员
				promise.then(function(imResponse) {
					that.htmlReset = 0
				  console.log('群成员列表-imResponse.data.memberList>>>>>>>>>>>>>>>>>>>>>>'); // 群成员列表
				  console.log(imResponse.data.memberList); // 群成员列表
					that.datas=imResponse.data.memberList
					var ids=[]
					for(var i=0;i<that.datas.length;i++){
						ids.push(that.datas[i].userID)
					}
					that.ids=ids.join(',')
					console.log(that.ids)
					that.htmlReset = 0
				}).catch(function(imError) {
					
					that.htmlReset = 1
				  console.warn('getGroupMemberList error:', imError);
				});
			},
			//删除成员
			deleteGroupMember(){
				let promise = that.tim.deleteGroupMember({groupID: that.conversationActive.groupProfile.groupID, userIDList:['user1'], reason: '你违规了，我要踢你！'});
				promise.then(function(imResponse) {
				console.log(imResponse.data.group); // 删除后的群组信息
				console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
				}).catch(function(imError) {
				console.warn('deleteGroupMember error:', imError); // 错误信息
				});
			},
			//解散群
			dismissGroup(){
				let promise = that.tim.dismissGroup(that.conversationActive.groupProfile.groupID);
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
										var id=item.userID
										let promise = that.tim.deleteGroupMember({
											groupID: that.conversationActive.groupProfile.groupID,
											userIDList:[id], 
											reason: '你违规了，我要踢你！'
										});
										promise.then(function(imResponse) {
											console.log(imResponse.data.group); // 删除后的群组信息
											console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
											uni.showToast({
												icon:'none',
												title:'操作成功'
											})
											setTimeout(()=>{
												that.getroupMember()
											},1000)
										}).catch(function(imError) {
										console.warn('deleteGroupMember error:', imError); // 错误信息
										});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			sub_fuc(str){
				uni.showModal({
				    title: '提示',
				    content: '是否'+str+'该群',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										if(str=='解散'){
											let promise = that.tim.dismissGroup(that.conversationActive.groupProfile.groupID);
											promise.then(function(imResponse) { // 解散成功
												console.log(imResponse.data.groupID); // 被解散的群组 ID
												uni.showToast({
													icon:'none',
													title:'操作成功'
												})
												setTimeout(()=>{
													uni.navigateBack({
														delta:2
													})
												},1000)
											}).catch(function(imError) {
												console.warn('dismissGroup error:', imError); // 解散群组失败的相关信息
											});
										}else{
											let promise = that.tim.quitGroup(that.conversationActive.groupProfile.groupID);
											promise.then(function(imResponse) { // 解散成功
												console.log(imResponse.data.groupID); // 被解散的群组 ID
												uni.showToast({
													icon:'none',
													title:'操作成功'
												})
												setTimeout(()=>{
													uni.navigateBack({
														delta:2
													})
												},1000)
											}).catch(function(imError) {
												console.warn('dismissGroup error:', imError); // 解散群组失败的相关信息
											});
										}
										
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
		z-index: 10;
	}
	.qy_li view{
		margin-top: 20upx;
		height: 35upx;
		display: flex;
		align-items: center;
		font-size: 22upx;
		color: #000;
		justify-content: center;
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
