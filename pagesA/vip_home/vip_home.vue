<template>
	<!-- <view class="minh100" :style="style2"> -->
	<view class="minh100" >
		<image class="head_box_img" :src="getimg('/static/images/vip_lvbg_01.jpg')" mode="aspectFill"></image>
		<!-- <view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<view class="my_tit_box" :style="style1">
				会员中心
				
			</view>
		</view> -->
		<!-- <cu-custom :bgImage="getimg('/static/images/vip_lvbg_01.jpg')" :isBack="true"> -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会员中心</block>
		</cu-custom>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0" style="position: relative;z-index: 100;">
			
			<swiper class="card-swiper" :indicator-dots="false" :circular="false" :autoplay="false" interval="5000" duration="500"
			 @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff" :current='cardCur'>
				<swiper-item v-for="(item,index) in swiperList" :key="item.id" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="getimg(item.g_pic)" mode="aspectFill" ></image>
						
						<block v-if="item.id==myvip">
							<view v-if="index==1" class="lv_tip" style="color:#7F4718">您已经达到该等级</view>
							<view v-else-if="index==2" class="lv_tip" style="color:#393361">您已经达到该等级</view>
							<view v-else-if="index==3" class="lv_tip" style="color:#F5E4D6">您已经达到该等级</view>
							<view v-else-if="index==4" class="lv_tip" style="color:#C09676">您已经达到该等级</view>
							<view v-else class="lv_tip" >您已经达到该等级</view>
						</block>
					</view>
				</swiper-item>
			</swiper>
			<view class="vip_box">
				<image class="vip_box_qy" :src="getimg(swiperList[cardCur].g_equity_pic)" mode="aspectFill"></image>
				<view class="vip_gz">会员规则</view>
				<view class="vip_gz_box" v-html="swiperList[cardCur].g_rule"></view>
			</view>
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
				cardCur:0,
				myvip:1,
				swiperList: [{
						id: 1,
						type: 'image',
						url: '/static/images/vip_lv0_03.jpg',
						qy: '/static/images/vip_lv0_07.jpg',
						yq:'注册即成青铜会员，消费返红包'
					}, {
						id: 2,
						type: 'image',
						url: '/static/images/vip_lv1_03.jpg',
						qy: '/static/images/vip_lv1_07.jpg',
						yq:'直推会员消费后，成为黄金会员，消费返现金红包，并享受直推会员和间推会员（粉丝）的消费返现全红包。'
					}, {
						id: 3,
						type: 'image',
						url: '/static/images/vip_lv2_03.jpg',
						qy: '/static/images/vip_lv2_07.jpg',
						yq:'钻石会员：直推会员100名以上，间推会员（粉丝）10000名以上，团队月销售10万以上（含自己）。除享受黄金会员所有福利外，并享受公司每个月2000——8000元的分红奖励，业绩达标，每个月按500——1000元递增，不达标则递减，每个月最高奖励为人民币8000元。连续5个月业绩不达标，降为黄金会员待遇'
					}, {
						id: 4,
						type: 'image',
						url: '/static/images/vip_lv3_03.jpg',
						qy: '/static/images/vip_lv3_07.jpg',
						yq:'代理：钻石会员连续拿公司最高奖励3个月以上，有稳定的团队，有开拓精神。代理除享受下级会员消费红包返利外，并享受团队销售利润的百分之十分成，享受公司每个月扶持奖励8000——80000元人民币。业绩达标每个月按5000——10000元递增，不达标就递减，每个月最高扶持奖励为人民币8万元。连续5个月不达标，降回钻石会员。'
					}, {
						id: 5,
						type: 'image',
						url: '/static/images/vip_lv4_03.jpg',
						qy: '/static/images/vip_lv4_07.jpg',
						yq:'区域经理：连续3个月拿公司最高扶持奖励的代理。可申请 为区域经理，要求有办公场所，除享受代理所有福利外， 每个月最低不少于8万元人民币的扶持奖励，最高50万。 并享受公司百分之五的股份分红。（其他的福利面详）'
					}
				],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				PageScroll:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
		
				return style
			},
			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;
			
				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				CustomBar=CustomBar+StatusBar
				var style = `padding-top:${CustomBar}px;`;
						
				return style
			},
			
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			if(e.scrollTop>10){
				uni.showToast({
					title:e.scrollTop
				})
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
		
		onLoad(option) {
			that = this
			if(option.pid){
				console.log('pid')
				console.log(option.pid)
				uni.switchTab({
					url:'/pages/index/index?pid=' +option.pid
				})
				return
			}
			that.htmlReset = 0
			that.myvip=that.loginDatas.user_grade_id
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			that.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getdata(){
				// /user/getUserGradeInfo
				var datas = {
							
					// token: that.$store.state.loginDatas.userToken || '',
				
				}
				// https://yibeitong.com.aa.800123456.top/api//getUserGrade
				// https://yibeitong.com.aa.800123456.top/api/getUserGrade?token=1ea004ec129fa9389c86206cc85c98a0
				//selectSaraylDetailByUserCard
				var jkurl = '/getUserGrade'
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(0)
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						that.swiperList = datas
							for(var i=0;i<datas.length;i++){
								if(datas[i].id==that.myvip){
									that.cardCur=i
								}
							}
					} else {
						that.htmlReset = 1
						// that.$refs.htmlLoading.htmlReset_fuc(1)
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
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			getimg(img){
				return service.getimg(img)
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
				console.log(e.detail.current)
			},
			vip_color(index){
				return 'color:#7F4718;'
			},
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
		}
	}
</script>

<style scoped>
	.minh100 {
		/* background: #F8F8F8; */
		/* padding-top: 60px; */
	}
	.action .iconfont{
		color: #fff;
	}
	.head_box {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		/* text-align: center; */
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		
		color: rgba(0,0,0,0);
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;
	
	
		padding-right: 220rpx;
		-webkit-box-shadow: 0rpx 0rpx 0rpx;
		box-shadow: 0rpx 0rpx 0rpx;
		z-index: 9999;
		overflow: hidden;
	}
	.head_box_img{
		position: absolute;
		top: -60px;
		width: 100%;
		height: 417upx;
		left: 0;
		right: 0;
		z-index: 0;
	}
	.my_tit_box {
		width: calc(100% - 440rpx);
		position: absolute;
		text-align: center;
		/* width: calc(100% - 340rpx); */
		left: 0;
	
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #fff;
	}
	.cur_H {
		background: #fff;
		color: #333;
	}
	.swiper-item{
		border: 1px solid #fff;
		position: relative;
	}
	.lv_tip{
		position: absolute;
		top: 160upx;
		left: 40upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #90584A;
	}
	.vip_box{
		width: 100%;
		padding: 20upx 30upx;
	}
	.vip_box_qy{
		width: 100%;
		height: 374upx;
		border-radius: 4px;
		margin-bottom: 10upx;
	}
	.vip_gz{
		width: 100%;
		height: 80upx;
		font-size: 30upx;
		color: #333;
		display: flex;
		align-items: center;
	}
	.vip_gz_box{
		font-size: 26upx;
		color: #999;
		line-height: 45upx;
	}
</style>
