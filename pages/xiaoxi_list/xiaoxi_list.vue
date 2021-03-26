<template>
	<view class="minh100">
		<image class="jianqun_btn" :src="getimg('/static/images/jianqun.png')" mode="aspectFit" 
		  @tap="jump" data-url="/pagesA/xiaoxi_creat/xiaoxi_creat" data-login="true" :data-haslogin="hasLogin"></image>
		
		<!-- 聊天记录 会话列表 -->
		<!-- <view class="conversition-box" v-if="hasLogin">
			
			<view class="list-box" >
				<view v-for="(item,index) in 4" :key="index" @tap="toRoom(item)">
					<view class="item-box">
						<view class="item-img">
							<img  :src="getimg('/static/images/tx_m2.jpg')" alt="">
						</view>
						<view class="item-text">
							<view class="dis_flex ju_b aic">
								<view class="item-user">
									{{'物美团购群1'}}
								</view>
								<view>昨天</view>
								
							</view>
							<view class="dis_flex ju_b aic">
								<view class="item-text-info text-cut">
									<rich-text :nodes="nodesFliter('一起去物美团购群')"></rich-text>
								</view>
								<view class="weidu_num">3</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="conversition-box" v-if="hasLogin">
			<view class="list-box" v-if="conversationList.length>0">
				<view v-for="(item,index) in conversationList" :key="index" >
					<view v-if="item.conversationID=='@TIM#SYSTEM'"  class="item-box" @tap="toxt(item)">
						<view class="item-img">
							<img :src="getimg('/static/images/ybt_group.png')" alt="">
						</view>
						<view class="item-text">
							<view class="dis_flex ju_b aic">
								<view class="item-user">
									系统通知
								</view>
								<view>{{timeFliter(item.lastMessage.lastTime)}}</view>
								
							</view>
							<view class="dis_flex ju_b aic">
								<view class="item-text-info text-cut">
									<rich-text v-if="item.lastMessage.payload.data=='custom_img'" :nodes="nodesFliter('[图片]')"></rich-text>
									<rich-text :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>
								</view>
								<view class="weidu_num" v-if="item.unreadCount">{{item.unreadCount}}</view>
							</view>
						</view>
					</view>
					<view v-if="item.groupProfile" class="item-box" @tap="toRoom(item)">
						<view class="item-img">
							<img v-if="item.groupProfile.avatar" :src="getimg(item.groupProfile.avatar)" alt="">
							<img v-else :src="getimg('/static/images/ybt_group.png')" alt="">
						</view>
						<view class="item-text">
							<view class="dis_flex ju_b aic">
								<view class="item-user">
									{{item.groupProfile.name}}
								</view>
								<view>{{timeFliter(item.lastMessage.lastTime)}}</view>
								
							</view>
							<view class="dis_flex ju_b aic">
								<view class="item-text-info text-cut">
									<rich-text v-if="item.lastMessage.payload.data=='custom_img'" :nodes="nodesFliter('[图片]')"></rich-text>
									<rich-text :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>
								</view>
								<view class="weidu_num" v-if="item.unreadCount">{{item.unreadCount}}</view>
							</view>
						</view>
						
						<!-- <view class="item-text">
							<view class="item-user">
								{{item.userProfile.nick}}
							</view>
							<view class="item-text-info">
								<rich-text :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>
							</view>
						</view>
						<view class="item-msg">
							<view class="item-msg-icon" v-if="item.unreadCount">{{item.unreadCount}}</view>
						</view> -->
		
					</view>
		
		
				</view>
			</view>
			<!-- {{conversationList}} -->
			<view class="zanwu" v-if="conversationList.length==0">暂无群聊</view>
		</view>
		<view class="user-box" v-if="!hasLogin" style="padding-top: 40%;">
		
			<view class="btn" ><button type="default" @tap="jump" data-url="/pages/login/login">授权登录</button></view>
		</view>
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
				data_last:false
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','isLogin','isSDKReady','conversationList']),
		},
		watch: {
			isSDKReady(val) {
				//isSDKReady == true 
				if (val) {
					//更新用户自己的基础资料（头像+昵称+个性签名）
					this.updateUserInfo()
					//请求会话列表
					this.getConversationList()
				}
			},
		
		
		},
		onPullDownRefresh() {
			if(this.hasLogin){
				// this.getxcx_msg()
				if (that.isSDKReady) {
					console.log('2222')
					this.getConversationList()
				} else {
					console.log('333333')
					uni.stopPullDownRefresh();
				}
			}
		},
		onReachBottom() {
			
		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/xiaoxi_list/xiaoxi_list?pid=' + that.loginDatas.id,
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
			console.log(that.conversationList)
			that.getConversationList()
		},
		methods: {
			//时间过滤
			timeFliter(timer){
				let timeData = new Date(timer*1000)
				let str = this.$common.dateTimeFliter(timeData)		 
				return str
			},
			toRoom(item) {
				console.log('toRoom')
				this.$store.commit('updateConversationActive', item)
				uni.navigateTo({
					url: './room'
				})
			},
			toxt(item) {
				console.log('toRoom')
				this.$store.commit('updateConversationActive', item)
				uni.navigateTo({
					url: './xt_list'
				})
			},
			getimg(img){
				return service.getimg(img)
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
				return nodeStr
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				this.getGroup()
			},
			getGroup() {
				let promise = this.tim.getGroupList();
				promise.then(function(imResponse) {
					console.log('群组')
					console.log(imResponse.data.groupList); // 群组列表
				}).catch(function(imError) {
					console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
				});
			},
			//注销登录
			outLoginBtn() {
				let promise = this.tim.logout();
				promise.then(res => {
					this.$store.commit('reset')
					uni.reLaunch({
						url: '../index/index'
					})
				}).catch(err => {
					console.log('退出失败')
				});
			},
			//提交用户的基础信息到Im
			updateUserInfo() {
				//将已经登陆的用户信息 提交到IM中
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				let promise = this.tim.updateMyProfile({
					nick: userInfo.user,
					avatar: userInfo.img,
					gender: this.$TIM.TYPES.GENDER_MALE,
					selfSignature: '暂无个性签名',
					allowType: this.$TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
				});
				promise.then((res) => {
					console.log('提交资料成功')
				}).catch((err) => {
					console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
						uni.stopPullDownRefresh();
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length>0) {
						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit("updateConversationList", conversationList);
					}
				}).catch((err) => {
					uni.stopPullDownRefresh();
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
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
		padding: 0 30upx;
	}
	.jianqun_btn{
		width: 105upx;
		height: 105upx;
		background: #F54248;
		box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		position: fixed;
		bottom: 150upx;
		right: 50upx;
	}

	
	
	.list-box {
		width: 100%;
		margin: 0rpx auto;
	}
	
	.item-box {
		width: auto;
		min-height: 130rpx;
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
	}
	
	.item-img {
		
		width: 88upx;
		height: 88upx;
		flex: none;
		margin-right: 18upx;
	}
	
	.item-img img {
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
	}
	
	.item-text {
		flex: 1;
		height: 88rpx;
		color: #999;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
	}
	
	.item-user {
		color: #000;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.item-text-info {
		width: 475upx;
		height: 30rpx;
		line-height: 30rpx;
		color: #666;
		font-szie: 24rpx;
	}
	.weidu_num{
		width: 37upx;
		height: 37upx;
		background: #FF4F11;
		border-radius: 50%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user-box {
		width: auto;
		height: 80rpx;
		padding: 0 20rpx;
	}

	
	
	
	.clear-box {
		clear: both;
	}
	
</style>
