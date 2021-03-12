import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false,
		isSDKReady: false, // TIM SDK 是否 ready
		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		platform:'',
		userName: "游客",
		loginDatas1:{"id":8,"userToken":"3cfa5adb90154f3e0f510e8125bd24ca","phone":"18300000000","nickname":"依辈通会员","money":"0.00","commission":"0.00","total_commission":"0.00","submitted_commission":"0.00","introduction":null,"sex":"","birthday":"","province":"","city":"","county":"","avatarurl":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLoxbuAWKx7BAly1v5ppvGmy0MK8wgD8QMpR13s9NMubw11ib8UwbmRsTqbXJCyx1J8lMJbZA0oUiaA\/132","identification_id":"YBT100005","IMSign":"eJwtjMEKgkAURf-lbQt5bxodFdpUigsLQwtsJzjWQxJRi6Ho3xP17u45cL6Qxan11h34ICyE9fS51M3AFU8432WE4*xF9mVdtC2X4JNElEohebPRpuVOg**gdBFnNvBzJOQQkbAF2kuD72M5Wbmhiao6ENfi6EVeelBBoMILn14dPpr49jmne9ckctNv4fcH6EswFQ__","user_grade_id":1,"user_grade_value":"青铜会员"},
		loginDatas:{},
		company:'',
		uid:'',
		phone:'',
		token:'',
		uuid:'',
		order_ls_data:'',
		serviceTel:'',
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log(userName)
			console.log(state.userName)
		},
		logindata(state, logindata) {
			state.loginDatas = logindata || '';
			Vue.set(state,'loginDatas',logindata)
			// state.company=logindata.company
			// state.uid= logindata.id
			// state.phone= logindata.phone
			// state.token= logindata.token
			console.log(logindata)
			console.log(state.loginDatas)
		},
		order_ls(state,order_ls){
			state.order_ls_data=order_ls || ''
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		serviceTel_fuc(state, serviceTel) {
			state.serviceTel = serviceTel || '';
		},
		logout(state) {
			state.userName = "游客";
			state.hasLogin = false;
		},
		
		//更新登录状态
		toggleIsLogin(state, isLogin) {
			state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
			state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false
			state.isSDKReady = false
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state, toUserId) {
			state.conversationActive.conversationID = 'C2C' + toUserId
			console.log(toUserId)
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state, conversationItem) {
			state.conversationActive = Object.assign({}, conversationItem);
			if(conversationItem.type=='GROUP'){
				state.toUserId = conversationItem.groupProfile.groupID
			}
			if(conversationItem.type=='C2C'){
				state.toUserId = conversationItem.userProfile.userID
			}
			// state.toUserId = conversationItem.userProfile.userID
			
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			// 还没当前会话，则跳过
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.conversationID === state.conversationActive.conversationID) {
				state.currentMessageList = [...state.currentMessageList, data]
			}
			console.log('1111')
			console.log(state.currentMessageList)
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state, data) {
			console.log(data)
			if (data) {
				state.currentMessageList = [...data, ...state.currentMessageList]
			}
		},
	}
})

export default store
