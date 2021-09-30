<template>
	<view class="minh100">
		<!-- <htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false"> -->
			<view class="my_top">
				<image class="my_top_bg" :src="getimg('/static/images/my_bg_02.png')" mode=""></image>
				<view v-if="hasLogin" class="my_top_box">
					<!-- 签到 -->
					<view class="qiandao_box" @tap="jump" :data-url="'/pagesA/my_qiandao/my_qiandao?type='+0">
						<view class="qd_nbox">
							<text class="iconfont iconqiandao"></text>
							<text v-if="loginDatas.is_day_sign">已签到</text>
							<text v-else>签到</text>
							<text class="iconfont iconqiandao" style="opacity: 0;"></text>
						</view>
					</view>
					<!-- 签到 -->
					<view class="top_user">
						<view class="dis_flex">
							<image class="user_tximg" :src="getimg(loginDatas.avatarurl)" mode="aspectFill"></image>
							<view class="user_msg">
								<view class="dis_flex aic">
									<view class="user_name">{{loginDatas.nickname}}</view>
									<view class="vip_box">
										<image class="vip_box_bg" :src="getimg('/static/images/vip_bg.png')" mode=""></image>
										<view class="vip_box_box">
											<image :src="getimg('/static/images/vip.png')" mode=""></image>
											<text>{{loginDatas.user_grade_value?loginDatas.user_grade_value:'青铜会员'}}</text>
										</view>
									</view>
								</view>
								<view class="user_tel" v-if="loginDatas.phone">电话：{{loginDatas.phone}}</view>
							</view>
						</view>
						<view class="dis_flex aic ju_a top_num">
							<view class="dis_flex_c aic" @tap="jump" :data-url="'/pagesA/my_yue/my_yue?type='+1" :data-login="true" :data-haslogin="hasLogin">
								<view class="top_pri">{{loginDatas.money}}</view>
								<view>账户余额(元)</view>
							</view>
							<view class="num_hg"></view>
							<view class="dis_flex_c aic" @tap="jump" :data-url="'/pagesA/share_index/share_index?type='+1"  :data-login="true" :data-haslogin="hasLogin">
								<view class="top_pri">{{loginDatas.commission}}</view>
								<view>当前佣金(元)</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="my_top_box dis_flex_c aic ju_c">
					<view class="user_name" data-url="/pages/login/login" @tap='jump'>登录/注册</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order_box" v-if="hasLogin">
				<view class="order_top dis_flex aic ju_b">
					<view>我的订单</view>
					<view class="go_more dis_flex aic"  @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList/OrderList?type='+0">查看全部<text class="iconfont iconnext-m"></text></view>
				</view>
				<view class="order_urls dis_flex aic ju_a">
					<view class="order_url dis_flex_c aic ju_c" @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList/OrderList?type='+1">
						<image :src="getimg('/static/images/my_icon_03.jpg')" mode="aspectFit"></image>
						<text>待付款</text>
					</view>
					<view class="order_url dis_flex_c aic ju_c" @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList/OrderList?type='+2">
						<image :src="getimg('/static/images/my_icon_05.jpg')" mode="aspectFit"></image>
						<text>待发货</text>
					</view>
					<view class="order_url dis_flex_c aic ju_c" @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList/OrderList?type='+3">
						<image :src="getimg('/static/images/my_icon_07.jpg')" mode="aspectFit"></image>
						<text>待收货</text>
					</view>
					<view class="order_url dis_flex_c aic ju_c" @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList/OrderList?type='+4">
						<image :src="getimg('/static/images/my_icon_09.jpg')" mode="aspectFit"></image>
						<text>待评价</text>
					</view>
					<view class="order_url dis_flex_c aic ju_c" @tap="jump" :data-login="true" :data-haslogin="hasLogin" :data-url="'/pagesA/OrderList_sh/OrderList_sh?type='+5">
						<image :src="getimg('/static/images/my_icon_11.jpg')" mode="aspectFit"></image>
						<text>退款/售后</text>
					</view>
				</view>
			</view>
			<!-- 服务 -->
			<view class="fuwu_box">
				<view class="fuwu_tit">我的服务</view>
				<view class="fuwu_list">
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/vip_home/vip_home"  :data-login="true" :data-haslogin="hasLogin">
						<image :src="getimg('/static/images/my_icon_22.jpg')" mode="aspectFit"></image>
						<text>会员中心</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/huafei_list/huafei_list"  :data-login="true" :data-haslogin="hasLogin">
						<image :src="getimg('/static/images/huafei.png')" mode="aspectFit"></image>
						<text>话费订单</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/my_address/my_address"  :data-login="true" :data-haslogin="hasLogin">
						<image :src="getimg('/static/images/my_icon_24.jpg')" mode="aspectFit"></image>
						<text>收货地址</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" :data-url="'/pagesA/share_index/share_index?type='+1"   :data-login="true" :data-haslogin="hasLogin">
						<image :src="getimg('/static/images/my_icon_19.jpg')" mode="aspectFit"></image>
						<text>我的推广</text>
					</view>
					<view v-if="loginDatas.user_grade_id>3" class="fuwu_li dis_flex_c aic ju_c" @tap="jump"  :data-url="'/pagesA/tg_list/tg_list2'"  :data-login="true" :data-haslogin="hasLogin">
						<image :src="'/static/images/my_team.png'" mode="aspectFit"></image>
						<text>我的团队</text>
					</view>
					<view v-else class="fuwu_li dis_flex_c aic ju_c" @tap="ntlj" :data-url="'/pagesA/tg_list/tg_list2'"   :data-login="true" :data-haslogin="hasLogin">
						<image :src="'/static/images/my_team.png'" mode="aspectFit"></image>
						<text>我的团队</text>
					</view>
					<view v-if="loginDatas.is_partner>0" class="fuwu_li dis_flex_c aic ju_c" @tap="jump" :data-url="'/pagesA/hehuo/hehuo'"   :data-login="true" :data-haslogin="hasLogin">
						<image :src="'/static/images/my_hhr.png'" mode="aspectFit"></image>
						<text>合伙人</text>
					</view>
					<view v-else class="fuwu_li dis_flex_c aic ju_c" @tap="ntlj1" :data-url="'/pagesA/tg_list/tg_list2'"   :data-login="true" :data-haslogin="hasLogin">
						<image :src="'/static/images/my_hhr.png'" mode="aspectFit"></image>
						<text>合伙人</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" :data-url="'/pagesA/my_yue/my_yue?type='+2"  :data-login="true" :data-haslogin="hasLogin">
						<image :src="getimg('/static/images/my_icon_27.jpg')" mode="aspectFit"></image>
						<text>财务记录</text>
					</view>
					<!-- <view class="fuwu_li dis_flex_c aic ju_c" @tap="fk_show=true"> -->
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="fk_fuc">
						<image :src="getimg('/static/images/my_icon_35.jpg')" mode="aspectFit"></image>
						<text>联系客服</text>
					</view>
					<!-- <view class="fuwu_li dis_flex_c aic ju_c" style="position: relative;">
						<button type="default" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;opacity: 0;z-index: 10;" open-type="contact"></button>
						<image :src="getimg('/static/images/my_icon_35.jpg')" mode="aspectFit"></image>
						<text>联系客服</text>
					</view> -->
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/about/about?type=about">
						<image :src="getimg('/static/images/my_icon_36.jpg')" mode="aspectFit"></image>
						<text>关于我们</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/about/about?type=yhxy">
						<image :src="getimg('/static/images/my_icon_32.jpg')" mode="aspectFit"></image>
						<text>用户协议</text>
					</view>
					<view class="fuwu_li dis_flex_c aic ju_c" @tap="jump" data-url="/pagesA/about/about?type=ysxy">
						<image :src="getimg('/static/images/my_icon_34.jpg')" mode="aspectFit"></image>
						<text>隐私协议</text>
					</view>
				</view>
			</view>
			
			<view class="zzc_box" v-if="fk_show" @tap="fk_show=false">
				<view class="fk_box"  @tap.stop="">
					<view class="d1" @tap.stop="call" :data-tel="serviceTel">客服电话：{{serviceTel}}</view>
					<view class="d2" @tap="fk_show=false">关闭</view>
				</view>
			</view>
		<!-- </htmlLoading> -->
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
				fk_show:false,
				show_num:0
			}
		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/my/my?pid=' + that.loginDatas.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		// onShareTimeline(){
		// 	return {
		// 		title:'依辈通',
		// 		query:'pid=' + that.loginDatas.id
		// 	}
		// },
		onPullDownRefresh() {
			if(that.hasLogin){
				uni.stopPullDownRefresh()
				service.wxlogin('token')
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
			that.htmlReset = 0
			
		},
		onShow(){
			if(that.show_num>0){
				if(that.hasLogin){
					uni.stopPullDownRefresh()
					service.wxlogin('token')
				}
			}
			
		},
		onHide() {
			that.show_num++
		},
		mounted(){
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'serviceTel'])
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			ntlj(){
				uni.showToast({
					title:'您还不是区域经理或代理，无查看权限',
					icon:'none'
				})
			},
			ntlj1(){
				uni.showToast({
					title:'您还不是合伙人，无查看权限',
					icon:'none'
				})
			},
			fk_fuc(){
				uni.showModal({
				    title: '提示',
				    content: '客服电话：'+that.serviceTel,
						// showCancel:false,
						confirmText:'拨打',
						// confirmText:'关闭',
						
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										wx.makePhoneCall({
											phoneNumber: that.serviceTel + ''
										})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			call(e){
				console.log(e)
				service.call(e)
			},
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.minh100 {
		background: #F8F8F8;
	}

	.my_top {
		width: 100%;
		height: 357upx;

		position: relative;
		overflow: hidden;
		margin-bottom: 34upx;
	}

	.my_top_bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 357upx;
	}

	.my_top_box {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		width: 100%;
		height: 357upx;
		padding: 66upx 63upx 0;
	}

	.qiandao_box {
		position: absolute;
		right: -50upx;
		top: 100upx;
		z-index: 10;
		min-height: 60upx;
		background: linear-gradient(127deg, #F9676C, #F54248);
		border: 1px solid #FFFFFF;
		border-radius: 31upx;
		padding: 5upx;
	}

	.qd_nbox {
		padding: 0 20upx;
		height: 50upx;
		background: #FFFFFF;
		border: 1px solid #FFFFFF;
		border-radius: 26px;
		display: flex;
		align-items: center;
	}

	.qd_nbox text {
		margin: 0 4upx;
	}

	.top_user {
		width: 100%;
	}

	.user_tximg {
		width: 118upx;
		height: 118upx;
		background: #FFFFFF;
		border: 2upx solid #CBB180;
		box-shadow: 0upx 0upx 12upx 0upx rgba(188, 157, 103, 0.2);
		border-radius: 50%;
		flex: none;
		margin-right: 15upx;
	}

	.user_msg {
		height: 118upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.user_name {
		font-size: 36upx;
		color: #fff;
		margin-right: 8upx;
	}

	.user_tel {
		font-size: 28upx;
		color: #fff;
	}

	.vip_box {
		min-width: 151upx;
		min-height: 44upx;
		background: #EBE0CE;
		border: 2px solid #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 22px;
		position: relative;
		padding: 4upx 6upx;
	}

	.vip_box_bg {
		z-index: 1;
		position: absolute;
		width: auto;
		height: auto;
		background: #DB3535;
		border-radius: 18upx;
		top: 2upx;
		bottom: 2upx;
		left: 4upx;
		right: 4upx;
	}

	.vip_box_box {
		position: relative;
		z-index: 2;
		font-size: 20upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2upx 11upx;
	}

	.vip_box_box image {
		width: 28upx;
		height: 25upx;
		margin-right: 6upx;
	}

	.top_num {
		margin-top: 45upx;
		font-size: 26upx;
		color: #fff;
	}

	.top_pri {
		font-size: 36upx;
	}

	.num_hg {
		width: 1px;
		height: 71upx;
		background: #FFFFFF;
		opacity: 0.2;
	}

	/* order_box */
	.order_box {
		width: 690upx;
		min-height: 247upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 0 auto;
	}

	.order_top {
		width: 100%;
		height: 86upx;
		padding: 0 30upx;
		border-bottom: 1px solid #F8F8F8;
		color: #333;
		font-weight: bold;
	}

	.go_more {
		font-weight: normal;
		font-size: 28upx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.go_more text {
		font-size: 16upx;
		color: #666;
		margin-left: 5upx;
	}

	.order_urls {
		width: 100%;
		height: 160upx;
	}

	.order_url {
		font-size: 22upx;
		color: #333;
	}

	.order_url image {
		width: 60upx;
		height: 60upx;
		margin-bottom: 15upx;
	}
	.fuwu_box{
		margin: 20upx auto 0;
		width: 690upx;
		min-height: 465upx;
		background: #FFFFFF;
		border-radius: 10upx;
	}
	.fuwu_tit{
		width: 100%;
		padding: 0 30upx;
		height: 100upx;
		font-size: 32upx;
		color: #333;
		display: flex;
		align-items: center;
	}
	.fuwu_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20upx;
	}
	.fuwu_li{
		width: 25%;
		height: 180upx;
		font-size: 26upx;
		color: #333;
	}
	.fuwu_li image{
		width: 75upx;
		height: 75upx;
		margin-bottom: 20upx;
	}
	
	.zzc_box{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fk_box{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 404upx;
		height: 229upx;
		background: #FFFFFF;
		border-radius: 10upx;
		position: relative;
		padding-bottom: 56upx;
	}
	.fk_box .d1{
		font-size: 28upx;
		color: #333;
		/* margin: 60upx auto; */
	}
	.fk_box .d2{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 56upx;
		font-size: 28upx;
		color: #666;
		border-top: 1px solid #E8E8E8;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
