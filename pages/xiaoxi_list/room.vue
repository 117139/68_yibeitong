<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<!-- <scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50"> -->
			<view class="msg-list">
				<view class="msg-list1">
					<!-- 加载历史数据waitingUI -->
					<view class="loading" v-if="isHistoryLoading">
						<view class="spinner">
							<view class="rect1"></view>
							<view class="rect2"></view>
							<view class="rect3"></view>
							<view class="rect4"></view>
							<view class="rect5"></view>
						</view>
					</view>
					<view v-if="item.from!='@TIM#SYSTEM'" class="row" v-for="(item,index) in msgList" :key="index" :id="item.ID">
						<!-- {{item.from!='@TIM#SYSTEM'}} -->
						<view class="msg_time">
							<view class="time" v-if="index==0">{{timeFliter(item.time)}}</view>
							<view class="time" v-else-if="index>0">{{gettime1(index-1)}}</view>
						</view>
						<!-- 用户消息 -->
						<block>
							<!-- 自己发出的消息 my -->
							<view  :class="item.flow=='out'?'my':'other'">
								
								<!-- 左-头像 -->
								<view v-if="item.flow!='out'" class="left">
									<image v-if="item.conversationID=='@TIM#SYSTEM'" :src="getimg('/static/images/ybt_group.png')"></image>
									<image v-else-if="item.avatar"  :src="item.avatar"></image>
									<image v-else :src="getimg('/static/images/tx_m2.jpg')"></image>
								</view>
								<!-- 左-消息 -->
								<view  :class="item.flow=='out'?'left':'right'">
									
									<!-- 文字消息 -->
									<view v-if="item.type==TIM.TYPES.MSG_TEXT" class="bubble">
										<rich-text :nodes="nodesFliter(item.payload.text)"></rich-text>
									</view>
									<!-- 图片消息 -->
									<view v-if="item.type==TIM.TYPES.MSG_IMAGE" class="bubble">
										<image @tap="previmg" :data-url="item.payload.imageInfoArray[0].imageUrl" :src="item.payload.imageInfoArray[0].imageUrl"
										 mode="aspectFill" style="width: 240upx;height: 240upx;"></image>
									</view>
									<!-- 自定义消息 -->
									<view v-if="item.type==TIM.TYPES.MSG_CUSTOM" class="bubble">
										
										<view v-if="item.payload.data=='group_create'">{{conversationActive.groupProfile.name+' 建群成功了！'}}</view>
										<image v-if="item.payload.data=='custom_img'" @tap="previmg" :data-url="item.payload.description"
										 :src="item.payload.description" mode="aspectFill"
											style="width: 240upx;height: 240upx;"></image>
										
										<view v-if="item.payload.data=='custom_good'" class="chat_box" @tap="jump" :data-url="'/pages/details/details?id='+getarg(item.payload.extension,'a2',item.payload.data)">
											<image class="chat_img" :src="getarg(item.payload.extension,'a3',item.payload.data)" mode="aspectFill" style="width: 196upx;height: 196upx;"></image>
											<view class="chat_msg">
												<view class="gb_name oh2">{{item.payload.description}}</view>
												<view class="gb_msg  oh1">{{'￥'+getarg(item.payload.extension,'a',item.payload.data)}}</view>
												
											</view>
										</view>
									</view>
								</view>
								<!-- 右-头像 -->
								<view v-if="item.flow=='out'" class="right">
										<image :src="loginDatas.avatarurl"></image>
										

								</view>
							</view>
							
						</block>
					</view>
					<!-- </scroll-view> -->
				</view>
			</view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<scroll-view  :class="{hidden:hideEmoji}" scroll-y="true" style="height: 100%;">
				<view class="rong-emoji-content_list" >
					<block v-for="(page,pid) in emojiList" :key="pid">
						<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)" class="rong-emoji-content_li">
							<image  class='rong-emoji-content' mode="widthFix" :src="filter.imgIP('/static/images/img/emoji/'+em.url)"></image>
						</view>
					</block>
				</view>
			</scroll-view>
			<!-- 表情 -->
			<!-- <swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="filter.imgIP('/static_s/51daiyan/img/emoji/'+em.url)"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
					<view class="box" @tap="jump" :data-url="'/pagesA/xiaoxi_set/xiaoxi_set?G_id='+toUserId">
						<view class=" iconfont iconicon_huabanfuben" style="font-size: 70upx;"></view>
					</view>
					<view v-if="msg_type==2" class="box" @tap="customModal">
						<view class="iconfont iconzidingyi"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<!-- <view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin"
				 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box" style="flex: 1;">
						<!-- <textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" cursor-spacing="18" /> -->
						<input type="text" class="input" v-model="textMsg" confirm-type="send" :focus="isFocus" @focus="isFocus = true"
						 @blur="isFocus = false" @confirm='sendText' cursor-spacing="18" />
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''">
				<view class="icon luyin2"></view>
			</view>
			<view class="cancel" :class="willStop?'':'hidden'">
				<view class="icon chehui"></view>
			</view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
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
	import userList from '../../common/tim/user.js'

	var that
	export default {
		data() {
			return {
				msg_type: 1, //客服  2
				goods_id: '',
				goods_name: '',
				goods_img: '',
				goods_pri: '',
				//TIM变量
				conversationActive: null,
				toUserId: '',
				toUserInfo: null,
				userInfo: null,
				nextReqMessageID: '',
				count: 15,
				isCompleted: '',
				msgList: [],
				TIM: null,


				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',

				msgImgList: [],
				myuid: 0,

				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,

				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				emojiList: this.$common.emojiList,
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji: {
					"100.gif": "AbNQgA.gif",
					"101.gif": "AbN3ut.gif",
					"102.gif": "AbNM3d.gif",
					"103.gif": "AbN8DP.gif",
					"104.gif": "AbNljI.gif",
					"105.gif": "AbNtUS.gif",
					"106.gif": "AbNGHf.gif",
					"107.gif": "AbNYE8.gif",
					"108.gif": "AbNaCQ.gif",
					"109.gif": "AbNN4g.gif",
					"110.gif": "AbN0vn.gif",
					"111.gif": "AbNd3j.gif",
					"112.gif": "AbNsbV.gif",
					"113.gif": "AbNwgs.gif",
					"114.gif": "AbNrD0.gif",
					"115.gif": "AbNDuq.gif",
					"116.gif": "AbNg5F.gif",
					"117.gif": "AbN6ET.gif",
					"118.gif": "AbNcUU.gif",
					"119.gif": "AbNRC4.gif",
					"120.gif": "AbNhvR.gif",
					"121.gif": "AbNf29.gif",
					"122.gif": "AbNW8J.gif",
					"123.gif": "AbNob6.gif",
					"124.gif": "AbN5K1.gif",
					"125.gif": "AbNHUO.gif",
					"126.gif": "AbNIDx.gif",
					"127.gif": "AbN7VK.gif",
					"128.gif": "AbNb5D.gif",
					"129.gif": "AbNX2d.gif",
					"130.gif": "AbNLPe.gif",
					"131.gif": "AbNjxA.gif",
					"132.gif": "AbNO8H.gif",
					"133.gif": "AbNxKI.gif",
					"134.gif": "AbNzrt.gif",
					"135.gif": "AbU9Vf.gif",
					"136.gif": "AbUSqP.gif",
					"137.gif": "AbUCa8.gif",
					"138.gif": "AbUkGQ.gif",
					"139.gif": "AbUFPg.gif",
					"140.gif": "AbUPIS.gif",
					"141.gif": "AbUZMn.gif",
					"142.gif": "AbUExs.gif",
					"143.gif": "AbUA2j.gif",
					"144.gif": "AbUMIU.gif",
					"145.gif": "AbUerq.gif",
					"146.gif": "AbUKaT.gif",
					"147.gif": "AbUmq0.gif",
					"148.gif": "AbUuZV.gif",
					"149.gif": "AbUliF.gif",
					"150.gif": "AbU1G4.gif",
					"151.gif": "AbU8z9.gif",
					"152.gif": "AbU3RJ.gif",
					"153.gif": "AbUYs1.gif",
					"154.gif": "AbUJMR.gif",
					"155.gif": "AbUadK.gif",
					"156.gif": "AbUtqx.gif",
					"157.gif": "AbUUZ6.gif",
					"158.gif": "AbUBJe.gif",
					"159.gif": "AbUdIO.gif",
					"160.gif": "AbU0iD.gif",
					"161.gif": "AbUrzd.gif",
					"162.gif": "AbUDRH.gif",
					"163.gif": "AbUyQA.gif",
					"164.gif": "AbUWo8.gif",
					"165.gif": "AbU6sI.gif",
					"166.gif": "AbU2eP.gif",
					"167.gif": "AbUcLt.gif",
					"168.gif": "AbU4Jg.gif",
					"169.gif": "AbURdf.gif",
					"170.gif": "AbUhFS.gif",
					"171.gif": "AbU5WQ.gif",
					"172.gif": "AbULwV.gif",
					"173.gif": "AbUIzj.gif",
					"174.gif": "AbUTQs.gif",
					"175.gif": "AbU7yn.gif",
					"176.gif": "AbUqe0.gif",
					"177.gif": "AbUHLq.gif",
					"178.gif": "AbUOoT.gif",
					"179.gif": "AbUvYF.gif",
					"180.gif": "AbUjFU.gif",
					"181.gif": "AbaSSJ.gif",
					"182.gif": "AbUxW4.gif",
					"183.gif": "AbaCO1.gif",
					"184.gif": "Abapl9.gif",
					"185.gif": "Aba9yR.gif",
					"186.gif": "AbaFw6.gif",
					"187.gif": "Abaiex.gif",
					"188.gif": "AbakTK.gif",
					"189.gif": "AbaZfe.png",
					"190.gif": "AbaEFO.gif",
					"191.gif": "AbaVYD.gif",
					"192.gif": "AbamSH.gif",
					"193.gif": "AbaKOI.gif",
					"194.gif": "Abanld.gif",
					"195.gif": "Abau6A.gif",
					"196.gif": "AbaQmt.gif",
					"197.gif": "Abal0P.gif",
					"198.gif": "AbatpQ.gif",
					"199.gif": "Aba1Tf.gif",
					"200.png": "Aba8k8.png",
					"201.png": "AbaGtS.png",
					"202.png": "AbaJfg.png",
					"203.png": "AbaNlj.png",
					"204.png": "Abawmq.png",
					"205.png": "AbaU6s.png",
					"206.png": "AbaaXn.png",
					"207.png": "Aba000.png",
					"208.png": "AbarkT.png",
					"209.png": "AbastU.png",
					"210.png": "AbaB7V.png",
					"211.png": "Abafn1.png",
					"212.png": "Abacp4.png",
					"213.png": "AbayhF.png",
					"214.png": "Abag1J.png",
					"215.png": "Aba2c9.png",
					"216.png": "AbaRXR.png",
					"217.png": "Aba476.png",
					"218.png": "Abah0x.png",
					"219.png": "Abdg58.png"
				},
				//红包相关参数
				windowsState: '',
				redenvelopeData: {
					rid: null, //红包ID
					from: null,
					face: null,
					blessing: null,
					money: null
				},


				customModalVisible: false,
				customData: '',
				customDescription: '',
				customExtension: '',
				focusedInput: '',


				isShow: false,
				isFocus:false,
			};
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
				this.screenMsg(newVal, oldVal)
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
			console.log(option.goods_name)
			console.log(option.goods_img)
			console.log(option.goods_pri)
			this.goods_name = option.goods_name
			this.goods_img = option.goods_img
			this.goods_pri = option.goods_pri
			this.goods_id = option.goods_id
			// if(typeof uni.getStorageSync('userInfo')=='string'){
			// 		this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// }
			if (option.type) {
				this.msg_type = option.type
			}
			this.toUserId = option.id ? option.id : this.$store.state.toUserId
			
			this.conversationActive = this.$store.state.conversationActive
			console.log('conversationActive===============>')
			console.log(this.conversationActive)
			uni.setNavigationBarTitle({
				title: this.conversationActive.groupProfile.name
			})
			this.TIM = this.$TIM
			// this.toUserId = 'wenxin'
			//获取聊天对象的用户信息---有后端的情况这里 使用后端api请求、
			//防止初次聊天的时候 没有对方的基础信息
			// this.getmsg()
			this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res) => {
				this.playMsgid = null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
			})
			// #endif
		},
		onShow() {
			var that = this
			that.isShow = true
			setTimeout(function() {
				that.scrollToBottom()
				that.scrollTop = 99999999999999;
				that.isHistoryLoading = false;
			}, 500)
		},
		onUnload() {
		// onHide() {
			//退出页面 将所有的会话内的消息设置为已读
			let promise = this.tim.setMessageRead({
				conversationID: this.conversationActive.conversationID
			});
			promise.then(function(imResponse) {
				console.log('全部已读')
				// 已读上报成功
			}).catch(function(imError) {
				// 已读上报失败
				console.warn('setMessageRead error:', imError);
			});
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			getmsg() {
				var that = this
				var datas = {
					token: that.loginDatas.userToken,
					type: that.msg_type,
					id: that.toUserId
				}

				// 单个请求
				service.P_get('/getTx', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.toUserInfo = res.data
						uni.setNavigationBarTitle({
							title: res.data.name
						})
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取对方数据失败'
					})
				})
			},
			gettime1(idx) {
				if (idx < 0) {
					return
				}
				console.log(idx, idx + 1)
				var time = this.msgList[idx].time
				var time1 = this.msgList[idx + 1].time
				console.log(this.getchattime(time), this.getchattime(time1))
				if (this.getchattime(time) != this.getchattime(time1)) {
					return this.getchattime(time1)
				}
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

			// 滚动到列表bottom
			scrollToBottom() {
				if (this.isShow) {
					wx.pageScrollTo({
						scrollTop: 9999999
					})
				}
			},
			getarg(str, arg, type) {
				if (type == 'custom') {
					return
				}
				if (!str) {
					return
				}
				// console.log(str)
				var reg = /\\$/gi
				str = str.replace(reg, '')
				// console.log(str)
				var jsonstr = JSON.parse(str)
				// console.log(jsonstr)
				if (jsonstr.hasOwnProperty(arg)) {

					// console.log(jsonstr[arg]);
					return jsonstr[arg]
				}
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div class="ltbox_div" style="word-wrap:break-word;line-height:40upx;">' + str + '</div>'
				return nodeStr
			},
			//时间过滤
			timeFliter(timer) {
				let timeData = new Date(timer * 1000)
				let str = this.$common.dateTimeFliter(timeData)
				return str
			},
			getchattime(time) {
				if (!time) {
					return
				}
				var newYear = new Date().getFullYear(); //目前系统时间是哪一年
				var nowMonth = new Date().getMonth() + 1; //目前系统时间是哪一月
				var nowDay = new Date().getDate(); //目前系统时间是几号
				time = Number(time * 1000)
				var sendtime = new Date(time)
				var sendYear = sendtime.getFullYear()
				var sendMonth = sendtime.getMonth() + 1
				var sendDate = sendtime.getDate()
				var sendHours = sendtime.getHours()
				var sendMinutes = sendtime.getMinutes()
				if (sendMinutes < 10) {
					sendMinutes = '0' + sendMinutes
				}
				// console.log(time)
				// console.log(sendtime)
				// console.log(sendtime.getDate())
				if (sendYear == newYear) {
					// console.log(sendDate, nowDay)
					if (sendMonth == nowMonth && sendDate == nowDay) {
						return sendHours + ':' + sendMinutes
					}
					return sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
				} else {
					return sendYear + '-' + sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
				}
			},
			// 接受消息(定位消息)
			screenMsg(newVal, oldVal) {
				if (newVal[0] && oldVal[0]) {
					if (newVal[0].ID != oldVal[0].ID && newVal.length >= this.count) {

						let _index = newVal.length - oldVal.length - 1
						this.$nextTick(() => {
							this.scrollToView = newVal[_index].ID
						});
						// console.log(this.scrollToView)
						//拉取历史记录不用改变定位消息
					} else {
						//新的消息来了 自动向下滑动到最新消息
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].ID
						});
					}
				} else {
					console.log('*****')
					//第一次拉取历史记录 定位到最后一条消息
					this.$nextTick(() => {
						this.scrollToView = newVal[newVal.length - 1].ID;
						this.scrollTop = 9999999;
					});
				}
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				this.isHistoryLoading = true;
				// 更多消息列表
				let conversationID = this.conversationActive.conversationID
				let promise = this.tim.getMessageList({
					conversationID: conversationID,
					nextReqMessageID: this.nextReqMessageID,
					count: this.count
				});
				promise.then((res) => {
					this.$store.commit('unshiftCurrentMessageList', res.data.messageList)
					this.nextReqMessageID = res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
					this.isCompleted = res.data.isCompleted
					this.isHistoryLoading = false;
				});

				// //这段代码很重要，不然每次加载历史数据都会跳到顶部
				// this.$nextTick(function() {
				// 	this.scrollToView = this.nextReqMessageID;//跳转上次的第一行信息位置
				// 	this.$nextTick(function() {
				// 		this.scrollAnimation = true;//恢复滚动动画
				// 	});	
				// });

			},
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
				
					setTimeout(function() {
						this.scrollTop = 9999;
						setTimeout(function() {
							this.scrollAnimation = true;
						}, 10)
					}, 10)
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},
			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes() {
				uni.navigateTo({
					url: 'HM-hand/HM-hand'
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type) {
				var that = this
				that.hideDrawer();
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					count: 1,
					success: (res) => {
						// #ifdef H5
						uni.request({
								url: res.tempFilePaths[0],
								method: 'GET',
								responseType: 'arraybuffer',
								success: (res) => {
										let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
										console.log('base64')
										// console.log(base64)
										base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
										// return base64
										var datas={
											file:base64,
											type:1,
										}
										var jkurl='/upload/base64Img'
										console.log('h5 upload')
										// 单个请求
										service.P_post(jkurl, datas).then(res => {
											that.btn_kg=0
											console.log(res)
											console.log(res.msg)
											// var ndata = JSON.parse(res.data)
											if (res.code == 1) {
												// console.log(imgs[i], i, res.msg)
												
												var img_msg=service.imgurl+res.msg
												that.sendMsg(img_msg,'img_cu');
												// that.sendMsg(img_msg,'img');
												
											} else {
												uni.showToast({
													icon: "none",
													title: "上传失败"
												})
											}
										}).catch(e => {
											that.btn_kg=0
											console.log(e)
											uni.showToast({
												icon: 'none',
												title: '上传数据失败'
											})
										})
								},
								fail: (err) => {
									console.log(err)
								}
						});
						
						// #endif
						// #ifndef H5
							that.sendMsg(res, 'img');
						// #endif
						return
						/*for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									console.log(image)
									console.log(image.width);
									console.log(image.height);
									let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
									that.sendMsg(msg,'img');
								}
							});
						}*/
					}
				});
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText() {
				this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {
					text: content
				}
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = service.imgurl+'/static/images/img/emoji/'
								// let imgstr = '<img class="emoji_i" src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								let imgstr = '<img class="emoji_i" src="' + onlinePath + EM.url + '">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},

			// 发送消息
			sendMsg(content, type) {
				console.log('????')
				let message
				console.log(type)
				if (type == 'custom') {
					message = this.tim.createCustomMessage({
						to: this.toUserId,
						conversationType: that.$TIM.TYPES.CONV_GROUP,
						payload: {
							data: content.data, //自定义消息的数据字段
							description: content.description, //自定义消息的说明字段
							extension: content.extension, //自定义消息的扩展字段
						}
					});
				} else if (type == 'img') {
					message = this.tim.createImageMessage({
						to: this.toUserId,
						conversationType: that.$TIM.TYPES.CONV_GROUP,
						payload: {
							file: content
						}
					});
				}else	if(type=='img_cu'){
					console.log(content)
					// console.log(content.tempFilePaths[0])
					message = this.tim.createCustomMessage({
					  to: this.toUserId,
					  conversationType: that.$TIM.TYPES.CONV_GROUP,
					  payload: {
					   data: 'custom_img',//自定义消息的数据字段
					   description: content,//自定义消息的说明字段
					   extension: content,//自定义消息的扩展字段
					  }
					});	
				} else {
					message = this.tim.createTextMessage({
						to: this.toUserId,
						conversationType: that.$TIM.TYPES.CONV_GROUP,
						payload: {
							text: content.text
						}
					});
				}

				console.log('????1')
				this.$store.commit('pushCurrentMessageList', message)
				let pomise = this.tim.sendMessage(message)
				pomise.then(
					(res) => {
						this.$nextTick(() => {
							// 滚动到底
							this.scrollToView = res.data.message.ID
							this.scrollToBottom()
						});
					},
					(err) => {
						console.log(err)
					}
				)
			},

			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			sendSystemMsg(content, type) {
				let lastid = this.msgList[this.msgList.length - 1].msg.id;
				lastid++;
				let row = {
					type: "system",
					msg: {
						id: lastid,
						type: type,
						content: content
					}
				};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(rid) {
				uni.navigateTo({
					url: 'HM-details/HM-details?rid=' + rid
				})
			},
			// 预览图片
			showPic(msg) {
				uni.previewImage({
					indicator: "none",
					current: msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg) {
				this.playMsgid = msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e) {
				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length: 0,
						url: e.tempFilePath
					}
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					this.sendMsg(msg, 'voice');
				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			customModal() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否发送此商品',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var ext = {
								a: that.goods_pri,
								a1: 'a1',
								a2: that.goods_id,
								a3: service.imgurl + that.goods_img,
							}
							ext = JSON.stringify(ext)
							var msg = {
								data: 'custom_good',
								description: that.goods_name,
								extension: ext
							}
							that.sendMsg(msg, 'custom')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 选项卡关闭
			handleClose() {
				this.rateModal = false
				this.isFocus = false
				this.isMoreOpen = false
				this.isEmojiOpen = false
			},
			previmg(e) {
				console.log(e)
				var urls = []
				urls.push(e.currentTarget.dataset.url)
				// return
				uni.previewImage({
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss";

	.msg-list {
		// padding-bottom: 140px;

	}

	.msg-list1 {
		width: 100%;
		padding-bottom: 120upx;
	}

	.chat_box {
		width: 500upx;
		display: flex;
	}

	.chat_img {
		width: 240upx;
		height: 240upx;
		margin-right: 20upx;
	}

	.chat_msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.gb_name {
		font-size: 28upx;
	}

	.gb_msg {
		font-size: 22upx;
	}

	.ltbox_div {
		line-height: 45upx;
	}

	.emoji_i {
		height: 40upx;
		width: 40upx;
		padding: 2upx;
		box-sizing: border-box;
		vertical-align: text-bottom;
	}

	.other {
		padding-top: 20rpx;
	}

	.msg_time {
		position: relative;
		// height: 1rpx !important;
		display:flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}

	.msg_time .time {
		// position: absolute;
		// // top: -40upx;
		// left: 0;
		// right: 0;
		text-align: center;
		// padding-right: 130rpx;

	}

	.bubble {
		max-width: 80% !important;
	}
	.rong-emoji-content_list{
		display: flex;
		flex-wrap: wrap;
	}
	.rong-emoji-content_li{
		width: 12.5%;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	 .rong-emoji-content_list .rong-emoji-content{
		 width: 50upx;
		 height: 50upx;
	 } 
	 
	 .msg-list.showLayer{
	 		 padding-top: 45vh;
	 		 transform: translate3d(0, -45vh, 0);
	 }
</style>
