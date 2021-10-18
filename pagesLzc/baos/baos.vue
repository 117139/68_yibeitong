<template>
	<view class="content">
		<!-- <view class="brandB1" v-for="(item,index) in brandList" :key="index" @tap.stop="jump" :data-url="`/pagesA/details/details?id=${item.id}`">
			<view class="brandB1R dis_flex ais">
				<view class="brandB1RImg">
					<image :src="getimg(item.phono[0])" mode="aspectFill"></image>
				</view>
				<view class="brandB1RDiv dis_flex_c border-box ju_b">
					<view class="brandT1 oh1">{{item.title}}</view>
					<view class="brandT2 border-box dis_flex aic" v-if="item.sec_title.length!=0">
						
						<text class="border-box">{{item.sec_title}}</text>
					</view>
					<view class="brandT3 dis_flex" style="flex-wrap: wrap;">
						<text class="border-box" v-for="(item1,index1) in item.brand_goods_type_tag.split(',')"
							:key="index1" v-if="item.brand_goods_type_tag.length>0">{{item1}}</text>
					</view>
					<text class="brandT4">￥{{item.basics_original_price}}</text>
					<view class="brandT5"><text class="brandT6">￥</text>{{item.basics_price}}</view>
				</view>
			</view>
			<view class="brandB1R2">
				<view class="gouBtn dis_flex aic ju_c">
					去购买
				</view>
			</view>
		</view> -->
		<view class="qiItem" v-for="(item,index) in brandList" :key="index" @tap.stop="jump" :data-url="`/pagesA/details/details?id=${item.id}`">
			<view class="qiItemI dis_flex">
				<image :src="getimg(item.phono[0])" mode="aspectFill" class="qiImg"></image>
				<view class="qiRight border-box dis_flex_c ju_b">
					<view class="goods_tit oh2">
						<text class="qiType">热品</text>
						<text class="qiTit">{{item.title}}</text>
					</view>
					
					<view class="qiP1">
						<text>原价</text><text>￥{{item.basics_original_price}}</text>
					</view>
					<view class="dis_flex ju_b" style="align-items: flex-end;">
						<view class="qiP2"><text>现价￥</text><text class="qiP3">{{item.basics_price}}</text></view>
						<view class="qiP4 dis_flex aic ju_c">马上抢</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="moreSort" v-if="isBt==1">{{more}}</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	var that
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
				data_last:false
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
			this.getHotDataSuperExplosive(this.goods_type)
		},
		onPullDownRefresh() {
			console.log("下拉了");
			this.myPage = 1;
			that.data_last=false;
			that.more = "上拉加载更多"
			this.getHotDataSuperExplosive(this.goods_type)
		},
		methods: {
			...mapMutations(['logout', 'login']),
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
</style>
