<template>
	<view class="minh100">
		<!-- <htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false"> -->
		<view v-if="htmlReset==1" class="zanwu minh100" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def minh100">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-show="htmlReset==0">
			<view class="index_zbox index_zbox1">
				<view class="huodong_list">
					<view class="goods_li_box" v-for="(item,index) in datas">
						<view class="goods_li">
							<image class="goods_li_img" :src="getimg(item.g_img[0])" mode="aspectFill" @tap="jump"
								:data-url="'/pagesA/details/details?id='+item.id"></image>
							<view class="text-cut goods_li_name">{{item.title}}</view>
							<view class=" goods_li_money">
								<text>￥</text>{{item.basics_price*1}}
								
								<text v-if="item.basics_original_price" class="scx" style="color: #999;margin-left: 10upx;">￥{{item.basics_original_price*1}}</text>
							</view>
						</view>
					</view>
				</view>
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
				
				datas: [],
				page:1,
				size:20,
				data_last: false,
				id:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'about_content','isSDKReady']),
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
			that.id=options.id||0
			that.title=options.title||0
			uni.setNavigationBarTitle({
				title:options.title
			})
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
			
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
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
					page: that.page,
					size: that.size,
					cate_id:that.id,
					// status:''
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/Index/moreCateList'
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var now_page=that.page
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
						if (now_page == 1) {
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
						that.htmlReset = 0
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
</style>
