<template>
	<view class="minh100">
		<view class="list" v-for="(item,index) in msgList">
			<view class="time" >{{timeFliter(item.time)}}</view>
			<!-- 1 有用户申请加群	群管理员/群主接收 -->
			<view v-if="item.payload.operationType==1">
					用户{{item.payload.operatorID}}申请加群--{{item.payload.groupProfile.name}}
					<!-- 位添加处理方法 -->
					<!-- <view>处理</view> -->
			</view>
			<!-- 2	申请加群被同意	申请加群的用户接收 -->
			<view v-if="item.payload.operationType==2">
					成功加入群组:{{item.payload.groupProfile.name}}
			</view>
			<!-- 3	申请加群被拒绝	申请加群的用户接收 -->
			<view v-if="item.payload.operationType==3">
					您的申请已被拒绝--{{item.payload.groupProfile.name}}
			</view>
			<!-- 4	被踢出群组	被踢出的用户接收 -->
			<view v-if="item.payload.operationType==4">
					您已被踢出群组--{{item.payload.groupProfile.name}}
			</view>
			<!-- 5	群组被解散	全体群成员接收 -->
			<view v-if="item.payload.operationType==5">
					您所在群组已被解散--{{item.payload.groupProfile.name}}
			</view>
			<!-- 6	创建群组	创建者接收 -->
			<view v-if="item.payload.operationType==6">
					创建群组--{{item.payload.groupProfile.name}}
			</view>
			<!--7	邀请加群	被邀请者接收 -->
			<view v-if="item.payload.operationType==7">
					您已被邀请加入群组--{{item.payload.groupProfile.name}}
			</view>
			<!--8	退群	退群者接收 -->
			<view v-if="item.payload.operationType==8">
					您已退出群组--{{item.payload.groupProfile.name}}
			</view>
			<!--9	设置管理员	被设置方接收 -->
			<view v-if="item.payload.operationType==9">
					您已被设置为管理员--{{item.payload.groupProfile.name}}
			</view>
			<!--10	取消管理员	被取消方接收 -->
			<view v-if="item.payload.operationType==10">
					您的管理员身份已被取消--{{item.payload.groupProfile.name}}
			</view>
			<!--255	用户自定义通知	默认全员接收-->
			<view v-if="item.payload.operationType==222">
					<!-- 自定义通知--{{item.payload.groupProfile.name}} -->
			</view>
			<view v-if="item.payload.handleMessage" class="fy_text">{{item.payload.handleMessage}}</view>
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
				TIM:'',
				msgList:''
			}
		},
		computed: {
			...mapState({
				loginDatas: 'loginDatas',
				hasLogin: 'hasLogin',
				currentMessageList: state => state.currentMessageList,
			})
		},
		watch: {
			currentMessageList(newVal, oldVal) {
				this.msgList = newVal
				// this.screenMsg(newVal, oldVal)
			},
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
		
		onLoad(option) { 
			that = this
			
			console.log('对方聊天id' + option.id)
			console.log('对方聊天type' + option.type)
			
			if (!this.hasLogin) {
				uni.navigateBack({
					delta: 1
				})
				return
			}
			
		
			this.conversationActive = this.$store.state.conversationActive
			console.log('conversationActive===============>')
			console.log(this.conversationActive)
			
			this.TIM = this.$TIM
			// this.toUserId = 'wenxin'
			//获取聊天对象的用户信息---有后端的情况这里 使用后端api请求、
			//防止初次聊天的时候 没有对方的基础信息
			// this.getmsg()
			this.getMsgList();
		
		},
		
		methods: {
			// 加载初始页面消息
			getMsgList() {
				// 历史消息列表
				let conversationID = this.conversationActive.conversationID
				let promise = this.tim.getMessageList({
					conversationID: conversationID,
					count: this.count
				});
				console.log(conversationID)
				console.log(this.count)
				console.log(promise)
				promise.then((res) => {
					console.log(res.data)
					if (!res.data.nextReqMessageID) {
						return
					}
					this.$store.commit('pushCurrentMessageList', res.data.messageList)
					this.nextReqMessageID = res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
					this.isCompleted = res.data.isCompleted
					this.scrollToView = res.data.messageList[res.data.messageList.length - 1].ID
				
					
				});
			},
			//时间过滤
			timeFliter(timer) {
				let timeData = new Date(timer * 1000)
				let str = this.$common.dateTimeFliter(timeData)
				return str
			},
		}
	}
</script>

<style scoped>
	.minh100{
		padding: 15upx 30upx;
	}
.list{
	/* border-bottom: 1px solid #ddd; */
	padding: 25upx 30upx;
	border-radius: 10upx;
	box-shadow: 0px 0px 7px 0px rgba(179, 179, 179, 0.55);
	background:rgba(163, 206, 246, .1);
	font-size: 26upx;
}
.list+.list{
	margin-top: 30upx;
}
.time{
	font-size: 24upx;
	margin-bottom: 10upx;
}
.fy_text{
	margin-top: 10upx;
	color: #666;
}
</style>
