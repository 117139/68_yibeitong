<template>
	<view class="content1">
			<view class="index_top">
				<view class="index_top_srk dis_flex aic">
					<text class="iconfont iconsousuo"></text>
					<input type="text" v-model="search_key" placeholder="请输入关键词进行查找" @input="daiyan_sousuo" confirm-type='搜索'
						 @confirm="onRetry">
					<!-- <view>请输入关键词进行查找</view> -->
				</view>
			</view>
			<view class="qiItem" v-for="(item,index) in datas" :key="index" @tap.stop="jump" :data-url="`/pagesLzc/deatil/deatil?sku_id=${item.sku_id}`">
			<view class="qiItemI dis_flex">
				<image :src="getimg(item.imageUrl)" mode="aspectFill" class="qiImg"></image>
				<view class="qiRight border-box dis_flex_c ju_b">
					<view class="goods_tit oh2">
						<text class="qiType">热品</text>
						<text class="qiTit">{{item.wareName}}</text>
					</view>
					
					<view class="qiP1">
						<text>原价</text><text>￥{{item.market_price}}</text>
					</view>
					<view class="dis_flex ju_b" style="align-items: flex-end;">
						<view class="qiP2"><text>现价￥</text><text class="qiP3">{{item.price}}</text></view>
						<view class="qiP4 dis_flex aic ju_c">马上抢</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="moreSort" v-if="isBt==1">{{more}}</view> -->
	</view>
</template>

<script>
	import service from '../../service.js';
	var that
	var inputt
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				brandList: [],
				goods_type: 0,
				myPage: 1,
				page_size: 10,
				more: "上拉加载更多",
				isBt: 1,
				data_last:false,
				page:1,
				size:20,
				datas:[]
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			if (option.goods_type) {
				this.goods_type = option.goods_type;
				this.getHotDataSuperExplosive(this.goods_type);
				if (option.goods_type == 1) {
					uni.setNavigationBarTitle({
						title: "超级爆品"
					})
				} else {
					uni.setNavigationBarTitle({
						title: "品牌爆品"
					})
				}
			}

		},
		onShow() {
			// this.getHotDataSuperExplosive(this.goods_type);
			// if(this.brandList.length>10){
			// 	this.isBt = 0
			// }
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onReachBottom() {
			console.log("触底了");
			this.getdata()
		},
		onPullDownRefresh() {
			console.log("下拉了");
			this.onRetry()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			daiyan_sousuo(e) {
				var that = this
				console.log(e.detail.value)
				// this.daiyan_ss=e.detail.value
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.search_key
					console.log(kw.length)
					if (kw.length > 0) {
			
						that.onRetry()
			
					} else {
						that.onRetry()
						// that.qy_show = that.qy_arr3
					}
				}, 1000)
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				this.getdata()
			},
			getdata() {
				
				if (that.data_last) {
					return
				}
				var datas = {
				
					token: that.$store.state.loginDatas.userToken||'',
					
					page: that.page,
					size: that.size,
					keyword:that.search_key
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/jd.JdGoods/search'
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
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
				
						if (page_that == 1) {
				
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			
				
			},
			
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			getHotDataSuperExplosive(goods_type) {
				if (this.isBt == 0) {
					return
				}
				this.isBt = 0;
				// if(that.data_last  == true){
				// 	this.isBt = 1;
				// 	return
				// }
				var myUrl = service.IP_lzc + "goods.Goods/goodsList";
				var data = {
					"goods_type": goods_type,
					"page": this.myPage,
					"size": this.page_size
				}
				service.P_get(myUrl, data).then(res => {
					if (res.code == 1) {
						this.isBt = 1;
						console.log(res, "热门数据 品牌爆品 ");
						var data = res.data;
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						if (this.myPage == 1) {
							this.brandList = res.data;
							if (data.length != 0) {
								this.myPage++
							}
						} else {
							if (data.length != 0) {
								that.brandList.concat(data)
								this.myPage++
							} else {
								this.more = "到底了"
								// that.data_last = true
							}

						}

					} else {
						this.isBt = 1;
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
					this.isBt = 1;
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
		}
	}
</script>

<style scoped>
	.moreSort {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin-top: 20rpx;
	}

	.content {
		background-color: #F8F8F8;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 30rpx;
		box-sizing: border-box;
	}

	/* 品牌爆款 */
	.brand {
		height: auto;
		margin-top: 40rpx;
	}

	.brandT {
		margin-bottom: 25rpx;
	}

	.brandB1 {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		padding: 20rpx 0rpx 25rpx 20rpx;
	}

	.brandB1R {
		width: 100%;
		/* height: 220rpx; */
		background-color: #fff;
	}

	.brandB1R2 {
		width: 100%;
		height: 50rpx;
		position: relative;
		margin-top: 25rpx;
	}

	.gouBtn {
		width: 134rpx;
		height: 50rpx;
		background: #FFFFFF;
		border: 1px solid #333333;
		border-radius: 25rpx;
		/* position: absolute;
		right: 0;
		bottom: 0rpx; */
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		margin-left: 516rpx;

	}

	.brandB1RImg {
		width: 220rpx;
		height: 220rpx;
		border-radius: 8rpx;
		background-color: #F8F8F8;
		min-width: 220rpx;
	}

	.brandB1RImg image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		max-width: 100%;
		max-height: 100%;
		border-radius: 8rpx;
	}

	.brandB1RDiv {
		width: 100%;
		/* height: 100%; */
		padding-left: 25rpx;
	}

	.brandT1 {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		min-height: 30rpx;
		line-height: 30rpx;

	}

	.brandT2 {
		width: fit-content;
		width: -moz-fit-content;
		border-radius: 4rpx;
		padding: 8rpx;
		background-color: rgba(0, 120, 236, 0.1);
		margin-top: 10rpx;
	}

	.brandT2 text {
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #0078EC;
		line-height: 22rpx;
		margin-right: 0.25em;
	}

	.brandT3 text {
		background: rgba(153, 153, 153, 0.1);
		border-radius: 4rpx;
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		margin-right: 10rpx;
		padding: 4rpx 8rpx;
		line-height: 24rpx;
		margin-top: 10rpx;
	}

	.brandT4 {
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
		line-height: 24rpx;
		margin-top: 30rpx;
	}

	.brandT5 {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		line-height: 38rpx;
		margin-top: 13rpx;
	}

	.brandT6 {
		font-size: 26rpx;
		line-height: 26rpx;
	}
	
	
	
	
	
	
	
	
	
	/* 其他 */
	.qiItem {
		width: 750rpx;
		max-width: 100%;
		height: auto;
		padding: 40rpx 30rpx;
		/* margin: 0 30rpx; */
		background-color: #ffffff;
		border-bottom: 1px solid #eee;
	}
	
	.qiItemI {
		width: 100%;
		height: 220rpx;
	}
	
	.qiImg {
		width: 220rpx;
		height: 220rpx;
		min-width: 220rpx;
		object-fit: cover;
		border-radius: 8rpx;
	}
	
	.qiRight {
		width: 100%;
		height: 100%;
		padding-left: 25rpx;
		position: relative;
	}
	.goods_tit{
		height: 80rpx;
	}
	.qiType {
		background: #F54248;
		border-radius: 4rpx;
		font-size: 22rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		padding: 3rpx 5rpx;
	}
	
	.qiTit {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		margin-left: 4rpx;
		line-height: 40rpx;
	}
	
	.qiPin {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		line-height: 24rpx;
		margin-top: 14rpx;
	}
	
	.qiPin2 {
		margin-left: 0.25em;
	}
	
	.qiP1 {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
		line-height: 24rpx;
		margin-top: 21rpx;
	}
	
	.qiP2 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #F54248;
		line-height: 26rpx;
		margin-top: 22rpx;
	}
	
	.qiP3 {
		font-size: 38rpx;
		line-height: 34rpx;
	}
	
	.qiP4 {
		width: 110rpx;
		height: 42rpx;
		background: #F54248;
		border-radius: 6rpx;
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 22rpx;
		/* position: absolute;
		bottom: 0;
		right: 0; */
	}
	
	/* 筛选 */
	.filterView {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
	
	}
	
	.filterViewS {
		width: 100vw;
		height: auto;
		box-sizing: border-box;
		padding-bottom: 50rpx;
		background-color: #fff;
		z-index: 999;
	}
	
	.fil_tit {
		width: 100vw;
		height: 72rpx;
		background-color: #fff;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		position: relative;
		/* #ifdef H5 */
		margin-top: 102rpx;
		/* #endif */
	}
	
	.filView1 {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	
	.filViewI {
		/* width: 122rpx; */
		min-width: 132rpx;
		min-height: 44rpx;
		box-shadow: 0px 5rpx 10rpx 2rpx rgba(245, 66, 72, 0.06);
		border-radius: 22rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		margin-top: 30rpx;
		padding: 0 15rpx;
		box-sizing: border-box;
		line-height: 2;
	
	
	}
	
	.filViewIA {
		background-color: rgba(245, 66, 72, 1);
		color: #fff;
	}
	
	.filViewIN {
		color: #F54248;
		background-color: rgba(255, 255, 255, 1);
	}
	
	/* .filViewI:nth-child(4n+4) {
		margin-right: 0;
	} */
	
	/* .filViewI:nth-child(n+5) {
		margin-top: 30rpx;
	} */
	
	.iconDel {
		font-size: 30rpx;
		color: rgba(245, 66, 72, 1);
		position: absolute;
		right: 36rpx;
	}
	
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	
	.banner {
		width: 690rpx;
		height: 244rpx;
		margin: 20rpx 30rpx 0 30rpx;
	}
	
	.swiperItem {
		width: 690rpx;
		height: 244rpx;
	}
	
	.swiperItem image {
		width: 690rpx;
		height: 244rpx;
	}
	
	swiper {
		height: 244rpx;
	}
	
	/* #ifdef MP-WEIXIN */
	/deep/.uni-swiper__dots-box {
		justify-content: flex-end !important;
		right: 20rpx !important;
	}
	
	/* #endif */
	/* #ifdef H5 */
	/deep/.uni-swiper__dots-box {
		justify-content: flex-end;
		right: 20rpx;
	}
	
	/* #endif */
	
	/* .bannerI image {
		width: 100%;
		height: 244rpx;
	} */
	
	
	.index_top{
		width: 100%;
		padding: 15upx 30upx;
		background: #fff;
	}
	.index_top_srk{
		width: 100%;
		height: 64upx;
		background: #F4F4F4;
		border-radius: 4upx;
		font-size: 28upx;
		color: #999;
		padding: 0 20upx;
	}
	.index_top_srk text{
		font-size: 30upx;
		color: #bbb;
		margin-right: 20upx;
	}
	.index_top_srk input{
		flex:1;
		font-size: 28upx;
	}
</style>
