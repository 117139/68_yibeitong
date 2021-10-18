<template>
	<view class="minh100">
		<!-- <htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false"> -->
		<view v-if="htmlReset==1" class="zanwu minh100" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def minh100">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-show="htmlReset==0">
			<view class="index_top" @tap="jump" data-url="/pagesA/good_list/good_list">
				<view class="index_top_srk dis_flex aic">
					<text class="iconfont iconsousuo"></text>
					<view>请输入关键词进行查找</view>
				</view>
			</view>
			<swiper class="card-swiper" :indicator-dots="false" :circular="true" :autoplay="true" interval="4000"
				duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="getimg(item.img)" mode="aspectFill"></image>
						<!-- <video :src="getimg(item.url)" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
					</view>
				</swiper-item>
			</swiper>
			<view class="index_zbox">
				<view v-if="messageDataArr.length>0" class="dis_flex aic ju_b index_xxtz">
					<image class="xxtz_img" :src="getimg('/static/images/xxtz.png')" mode="aspectFit"></image>
					<view class="xx_msg_box dis_flex aic">
						<swiper class="card-swiper1" :indicator-dots="false" :circular="true" :vertical="false" :autoplay="true" interval="6000"
							duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
							<swiper-item class="dis_flex aic" v-for="(item,index) in messageDataArr">
								<text class="iconfont iconlaba"></text>
								<text class="flex_1 text-cut">{{item.content}}</text>
							</swiper-item>
						</swiper>
						
					</view>
				</view>
				<view v-if="appstatus==1" :class="{block:appstatus==1}" style="display: none;">
					<view class="huodong_tit dis_flex aic">
						精彩活动
					</view>
					<view class="huodong_list">
						<image class="huodong_li" :src="getimg('/static/images/index_03.jpg')" mode="aspectFit" @tap="jump"
							data-url="/pagesA/huafei_cz/huafei_cz"></image>
						<image class="huodong_li" :src="getimg('/static/images/index_05.jpg')" mode="aspectFit" @tap="jump"
							data-url="/pagesA/share_index/share_index"></image>
					</view>
				</view>
				
			</view>
			<view class="index_zbox index_zbox1">
				<block v-for="(item,index) in datas">
					<view class="huodong_tit huodong_tit_good dis_flex aic ju_b">
						<view>
							{{item.name}}
							<image class="huodong_tit_hot" :src="getimg('/static/images/HOT.png')" mode="aspectFit"></image>
						</view>
						<view style="font-size: 26rpx;color: #999;" @tap="jump" :data-url="'/pagesA/goods_list/goods_list?id='+item.id+'&title='+item.name">更多</view>
					</view>

					<view class="huodong_list">
						<view class="goods_li_box" v-for="(item1,index1) in item.goods_data">
							<view class="goods_li">
								<image class="goods_li_img" :src="getimg(item1.g_img[0])" mode="aspectFill" @tap="jump"
									:data-url="'/pagesA/details/details?id='+item1.id"></image>
								<view class="text-cut goods_li_name">{{item1.title}}</view>
								<view class=" goods_li_money">
									<text>￥</text>{{item1.basics_price*1}}
									
									<text v-if="item1.basics_original_price" class="scx" style="color: #999;margin-left: 10upx;">￥{{item1.basics_original_price*1}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
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
				htmlReset: -1,
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '/static/images/banner_03.jpg',
				}, {
					id: 2,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, {
					id: 3,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, {
					id: 4,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, {
					id: 5,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, {
					id: 6,
					type: 'image',
					url: '/static/images/banner_03.jpg'
				}, ],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				messageDataArr: '',
				datas: [],
				data_last: false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'about_content','isSDKReady','appstatus']),
		},

		watch: {
			
		},
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pages/index/index?pid=' + that.loginDatas.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onShareTimeline(){
			return {
				title:'依辈通',
				query:'pid=' + that.loginDatas.id
			}
		},
		onLoad(options) {
			that = this
			console.log(this.IPurl)
			
			if(options.pid){
				console.log('pid>>>>>>>>>>>>')
				
				console.log(options.pid)
				console.log('pid>>>>>>>>>>>>>>>>>')
				uni.setStorageSync('pid',options.pid)
			}
			if(options.scene){
				const scene = decodeURIComponent(options.scene)
				console.log(scene)
				var arr=scene.split('=')
				console.log(scene)
				var obj = {};
				obj[arr[0]] = arr[1]
				// this.uid = obj.user_id
				uni.setStorageSync('pid',obj.user_id)
			}
			
			
			that.onRetry()
			that.event.on('/pages/index/index', 'test', function(args) {
				//args为trigger中所有的参数，可自定义数据，除了type和page及success
				console.log('testindex:' + args);
				console.log(args);
				// that.getdata()
				// that.Imlogin()
				//返回数据，在trigger中success方法可以收到
				return {

				};

			});
		},
		methods: {
			...mapMutations[('serviceTel_fuc')],
			
			onRetry() {
				// this.page = 1
				// this.datas = []
				// this.data_last = false
				this.getdata()
			},
			getdata() {

				var datas = {

					token: that.$store.state.loginDatas.userToken || '',
					// long:that.longitude,
					// lat:that.latitude,
					// page: that.page,
					// size: that.size,
					// status:''
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/index'
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
						that.swiperList = datas.bannerData
						that.messageDataArr = datas.messageDataArr
						that.datas = datas.cateTagData
						// that.serviceTel_fuc(datas.serviceTel)
						that.$store.commit("serviceTel_fuc", datas.serviceTel);

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

			getimg(img) {
				// console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
	.minh100 {
		/* background: #F8F8F8; */
	}

	.index_top {
		width: 100%;
		padding: 15upx 30upx 0;
	}

	.index_top_srk {
		width: 100%;
		height: 64upx;
		background: #F4F4F4;
		border-radius: 4upx;
		font-size: 28upx;
		color: #999;
		padding: 0 20upx;
	}

	.index_top_srk text {
		font-size: 30upx;
		color: #bbb;
		margin-right: 20upx;
	}

	.index_zbox {
		width: 100%;
		padding: 0 30upx 0;
	}

	.index_xxtz {
		width: 100%;
	}

	.xxtz_img {
		width: 54upx;
		height: 54upx;
		margin-right: 14upx;
		flex: none;
	}

	.xx_msg_box {
		width: 614upx;
		height: 63upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 15upx 20upx;
		color: #666;
		font-size: 24upx;
	}
	.card-swiper1{
		width: 100%;
		height: 63upx;
	}
	.xx_msg_box .iconfont {
		margin-right: 15upx;
		flex: none;
		color: #999;
		position: relative;top: 1px;
	}

	.huodong_tit {
		width: 100%;
		font-size: 36upx;
		color: #333;
		height: 100upx;
		font-weight: bold;
	}

	.huodong_tit_hot {
		position: relative;
		top: -20upx;
		width: 57upx;
		height: 30upx;
		margin-left: 8upx;
	}

	.index_zbox1 {

		padding: 0 15upx 15upx;
	}

	.huodong_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

	}

	.huodong_li {
		width: 338upx;
		height: 147upx;
		/* background: linear-gradient(42deg, #FE7D6A, #FF9D78); */
		box-shadow: 0px 0px 10upx 0px rgba(230, 34, 0, 0.05);
		border-radius: 10upx;
		margin-right: 12upx;
		margin-bottom: 12upx;
	}

	.huodong_li:nth-child(2n) {
		margin-right: 0;
	}

	.huodong_tit_good {
		padding: 0 15upx;
	}

	.goods_li_box {
		width: 50%;
		padding: 15upx;
	}

	.goods_li {
		width: 100%;
		/* margin-right: 35upx;
		margin-bottom: 20upx; */
	}

	/* .goods_li:nth-child(2n){
		margin-right: 0;
	} */
	.goods_li_img {
		/* width: 327upx; */
		width: 100%;
		height: 404upx;
		border-radius: 4px;
		display: block;
	}

	.goods_li_name {
		font-size: 32upx;
		line-height: 58upx;
		color: #333;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}

	.goods_li_money {
		font-size: 32upx;
		color: #A8896D;
	}

	.goods_li_money text {
		font-size: 26upx;
	}
	.block{
		display: block!important;
	}
</style>
