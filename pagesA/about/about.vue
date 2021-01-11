<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view v-if="datas" class="xieyi_main" v-html="get_fwb(datas)"></view>
			<block v-else>
					<view v-if="type=='about'" class="xieyi_main">
						<!-- <u-parse :content="article" @preview="preview" @navigate="navigate" noData="正在加载中..." /> -->
						
						<image src="../../static/images/about_03.jpg" style="width: 100%;height: 1097upx;" mode="aspectFit"></image>
					</view>
					<view v-else-if="type=='yhxy'" class="xieyi_main">
						<view class="dis_flex aic ju_c" style="font-size: 46upx;color: #444;line-height: 100upx;">“依辈通”用户协议</view>
						<view style="font-size: 26upx;color: #444;line-height: 40upx;">
							欢迎您使用“依辈通”软件及相关服务
							<br>
							<br>用户须知：在此特别提醒各位用户认真阅读、充分理解本《软件许可及安装协议》（下称《协议》）——用户应认真阅读充分理解本《协议》中各条款。您的安装、使用、获取和登XXXapp等行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。
							<br>本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
							版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。 除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
							相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
							<br>
							<br>本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
							版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。 除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
							相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
							
						</view>
					</view>
					<view v-else-if="type=='ysxy'"  class="xieyi_main">
						<view class="dis_flex aic ju_c" style="font-size: 46upx;color: #444;line-height: 100upx;">“依辈通”隐私协议</view>
						<view style="font-size: 26upx;color: #444;line-height: 40upx;">
							欢迎您使用“依辈通”软件及相关服务
							<br>
							<br>用户须知：在此特别提醒各位用户认真阅读、充分理解本《软件许可及安装协议》（下称《协议》）——用户应认真阅读充分理解本《协议》中各条款。您的安装、使用、获取和登XXXapp等行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。
							<br>本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
							版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。 除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
							相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
							<br>
							<br>本《协议》是您（下称“用户”）与公司之间关于用户安装、使用软件，注册、使用、管理软件；以及使用公司公司提供的相关服务所订立的协议。本《协议》描述公司与用户之间关于“软件”许可使用及服务相关方面的权利义务。“用户”是指通过公司提供的获取软件授权和XXX注册的途径获得软件产品及号码授权许可以及使用公司公司提供的相关服务的个人或组织。本《协议》可由公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。用户可重新下载安装本软件或网站查阅最新
							版协议条款。在公司修改《协议》条款后，如果用户不接受修改后的款，请立即停止使用公司提供的软件和服务，用户继续使用公司提供的软件和服务将被视为已接受了修改后的协议。 除本《协议》有明确规定外，本《协议》并未对利用本“软件”使用的公司或合作单位的其他服务规定
							相关的服务条款。对于这些服务，一般有单独的服务条款加以规范，用户须在使用有关服务时另行了解与确认。单独的服务条款与本协议有冲突的地方，以单独的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
							
						</view>
					</view>
			</block>
		</block>
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
				title:'隐私协议',
				type:0,
				datas:'',
				htmlReset:-1,
				article: '<p>html代码，具体参见https://github.com/gaoyia/parse/tree/1.0.7/parse-demo中的demo</p>'
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
			
			that.htmlReset=0
			if(Option.type=='about'){
				that.type=Option.type
				that.title='关于我们'
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
				console.log(that.fj_data)
			}
			if(Option.type=='yhxy'){
				that.type=Option.type
				that.title='用户协议'
				uni.setNavigationBarTitle({
					title:'用户协议'
				})
				// this.getdata('ysxy')
			}
			if(Option.type=='ysxy'){
				that.type=Option.type
				that.title='隐私协议'
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
				// this.getdata('ysxy')
			}
			if(Option.type=='sm'){
				that.type=Option.type
				that.title='小程序说明'
				uni.setNavigationBarTitle({
					title:'小程序说明'
				})
				this.getdata('specification')
			}
			if(Option.type=='fw'){
				that.type=Option.type
				that.title='用户服务条款'
				uni.setNavigationBarTitle({
					title:'用户服务条款'
				})
				this.getdata('terms_of_service')
			}
			if(Option.type==3){
				that.type=Option.type
				that.title='用户协议'
				this.getdata('yhxy')
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','fj_data']),
		},
		
		methods: {
			
			preview(src, e) {  //事件：点击富文本里的图片
				// do something
			},
			navigate(href, e) {  //事件：点击富文本里的链接
				// do something
			},
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data = {
					keyword:keyword
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if(datas.length>0){
							that.datas = datas[0].body
						}else{
							that.datas = datas.body
						}
						
						console.log(datas)
							
							
					} else {
						that.htmlReset=1
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
						that.htmlReset=1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			}
		}
	}
</script>

<style scoped>
	
	 .xieyi_main{
		 width: 100%;
		 padding: 10px 30upx;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
		 font-size: 28upx;
		 color: #444;
	 }
	 
</style>
