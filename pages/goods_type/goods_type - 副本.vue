<!-- 分类 -->
<template>
	<view class="contentSort">
		<!-- 导航 -->
		<view class="nav dis_flex aic ju_c">
			<scroll-view scroll-x="true" class="navLeft" style="" :scroll-into-view="scrollId"
				scroll-with-animation="true" show-scrollbar enable-flex>
				<view class="dis_flex aic ju_b ">
					<view class="navItem " :class="{'navItemA':active==0}" @click.stop="navTab(0)" id="id0">热门</view>
					<view class="navItem" v-for="(item,index) in nav" :key="index" :class="{'navItemA':active==index+1}"
						@click.stop="navTab(index+1,item.page_num)" :id="`id${index+1}`">{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="iconMore" @click.stop="filterClick">
				<text class="iconfont icon-filter2-fill" style="color: #333; font-size: 40rpx;"></text>
			</view>
		</view>
		<!-- 热门 -->
		<!-- banner -->
		<view class="banner" v-if="active==0">
			<uni-swiper-dot :info="swiperImg" :current="swiperCurrent" field="content" :mode="mode" class="swiperOne"
				:dotsStyles="dotsStyles">
				<swiper class="swiper-box" @change="changeSwiper">
					<swiper-item v-for="(item,index) in swiperImg" :key="index" class="swiperItem">
						<image :src="getimg(item.img)" mode="aspectFill" alt="路径错误"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>

		<!-- 超级爆品 -->
		<view class="Explosive" v-if="active==0">
			<view class="ExplosiveT dis_flex ju_b">
				<text class="ExplosiveT1">超级爆品</text>
				<view class="ExplosiveT2 dis_flex aic" @click.stop="jump" data-url="/pagesLzc/baos/baos?goods_type=1">
					<text>查看更多</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="dis_flex ExplosiveItemG" style="flex-wrap: wrap;">
				<view class="ExplosiveItem" v-for="(item,index) in baos" :key="index" @tap.stop="jump" :data-url="`/pagesA/details/details?id=${item.id}`">
					<image :src=getimg(item.phono[0]) mode="aspectFill" class="exPimg"></image>
					<view class="expView">
						<text class="expView1 oh1">{{item.title}}</text>
						<text class="expView2">￥{{item.basics_price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 品牌爆款 -->
		<view class="brand border-box wCon" v-if="active==0">
			<view class="brandT dis_flex ju_b">
				<text class="ExplosiveT1">品牌爆款</text>
				<view class="ExplosiveT2 dis_flex aic" @click.stop="jump" data-url="/pagesLzc/baos/baos?goods_type=2">
					<text>查看更多</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="brandB1" v-for="(item,index) in brandList" :key="index" @tap.stop="jump" :data-url="`/pagesA/details/details?id=${item.id}`">
				<view class="brandB1R dis_flex ais">
					<view class="brandB1RImg ">
						<image :src="getimg(item.phono[0])" mode="aspectFill"></image>
					</view>
					<view class="brandB1RDiv dis_flex_c ju_b">
						<view class="brandT1 oh1">{{item.title}}</view>
						<view class="brandT2 border-box dis_flex aic" v-if="item.sec_title.length!=0">
							<!-- <text class="border-box" v-for="(item2,index2) in item.type"
								:key="index2">{{item2.text}}</text> -->
								<!-- {{item.sec_title.length}} -->
							<text class="border-box oh1" >{{item.sec_title}}</text>
						</view>
						<view class="brandT3 dis_flex" style="flex-wrap: wrap;">
							<text class="border-box" v-for="(item1,index1) in item.brand_goods_type_tag.split(',')"
								:key="index1" v-if="item.brand_goods_type_tag.length>0">{{item1}}</text>
							<!-- <text class="border-box">官方授权</text> -->
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
			</view>
			
			<!-- <view class="qiItem" v-for="(item,index) in brandList" :key="index" @tap.stop="jump" :data-url="`/pagesA/details/details?id=${item.id}`">
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
			</view> -->
			
		</view>


		<!-- 其他 -->
		<view class="qiItem" v-if="active!=0" v-for="(item,index) in qishu" :key="index"
			@click.stop="toDeatil(item.sku_id)">
			<view class="qiItemI dis_flex">
				<image :src="getimg(item.img[0])" mode="aspectFill" class="qiImg"></image>
				<view class="qiRight border-box dis_flex_c ju_b">
					<view class="goods_tit oh2">
						<text class="qiType">京品</text>
						<text class="qiTit">{{item.name}}</text>
					</view>
					<!-- <view class="qiPin">
						<text class="qiPin1">{{item.ping}}条评价</text>
						<text class="qiPin2">好评率{{item.lv}}</text>
					</view> -->
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
		<view class="moreSort" v-if="active!=0">{{more}}</view>
		<!-- 筛选 -->
		<view class="filterView" v-if="isShai" @click.stop="iconDelClick">
			<view class="filterViewS dis_flex_c">
				<view class="dis_flex aic ju_c fil_tit">
					<text>全部分类</text>
					<text class="iconDel iconfont icon-del" @click.stop="iconDelClick"></text>
				</view>
				<view class="filView1 dis_flex" style="flex-wrap: wrap;">
					<view class="filViewI dis_flex aic ju_c" :class="{'filViewIA':active==0,'filViewIN':active!=0}"
						@click.stop="shaiTab(0)">
						热门</view>
					<view class="filViewI dis_flex aic ju_c"
						:class="{'filViewIA':active==index+1,'filViewIN':active!=index+1}" v-for="(item,index) in nav"
						:key="index" @click.stop="shaiTab(index+1,item.page_num)">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				more: "上拉加载更多",
				isBT: 0,
				myPage: 1,
				page_size: 20,
				page_num: 0,
				navTabS:false,
				/* 对接接口 */
				swiperImg: [],
				none: true,
				current: 0,
				mode: 'round',
				swiperCurrent: 0,
				dotsStyles: {
					width: 8,
					bottom: 54,
					backgroundColor: "rgba(255, 255, 255, 0.4)",
					selectedBackgroundColor: "#FFFFFF",
					selectedBorder: "none",
					border: "none"
				},
				active: 0,
				isShai: false,
				scrollId: "id0",
				nav: [],
				baos: [],
				brandList: [],
				qishu: []

			}
		},
		onLoad() {
			this.getAllType();
			this.getHotData();
		},
		onReachBottom() {
			if (this.active == 0) {
				return
			}
			
			// this.chudi = true;
			this.getTypeQi(this.page_num)
		},
		onPullDownRefresh() {
			this.myPage = 1;
			this.qishu = [];
			console.log(this.active)
			if(this.active == 0){
				this.getAllType();
				this.getHotData();
			}else{
				this.getTypeQi(this.page_num)
			}
		},
		methods: {
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			navTab(index, page_num) {
				
				this.qishu = [];
				this.baos = [];
				this.brandList = [];
				this.myPage = 1;
				this.scrollId = `id${index}`
				/* 热门 */
				if (index == 0) {
					this.getHotData()
				} else {
					this.getTypeQi(page_num)
				}
				this.active = index;
				this.page_num = page_num;
			},
			/* 筛选 */
			filterClick() {
				this.setTit("筛选");
				this.isShai = true
			},
			iconDelClick() {
				this.setTit("分类");
				this.isShai = false
			},
			setTit(title) {
				uni.setNavigationBarTitle({
					title: title,
				})
			},
			shaiTab(index, page_num) {
				// this.chudi = false;
				this.myPage = 1;
				this.qishu = [];
				this.setTit("分类");
				this.active = index;
				this.isShai = false;
				this.scrollId = `id${index}`
				if (index == 0) {
					this.getHotData()
				} else {
					this.getTypeQi(page_num)
				}

			},
			toDeatil(sku_id) {
				uni.navigateTo({
					url: `/pagesLzc/deatil/deatil?sku_id=${sku_id}`
				})
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			gouBtnClick() {
				console.log("购买")
			},
			/* 获取所有分类 */
			getAllType() {
				var myUrl = service.IP_lzc+"jd.JdGoods/getProductPool";
				service.P_get(myUrl).then(res => {
					console.log(res.data)
					if (res.code == 1) {
						this.nav = res.data;
					}
				}).catch(e => {
					uni.showToast({
						title: "服务器异常"
					})
				})
			},
			getHotData() {
				this.getHotDataBanner();
				this.getHotDataSuperExplosive(1)
				this.getHotDataSuperExplosive(2)
				this.isBT = 0;
			},
			/* 获取热门数据 banner */
			getHotDataBanner() {
				var myUrl = service.IP_lzc+"goods.Goods/banner";
				service.P_get(myUrl).then(res => {
					if (res.code == 1) {
						console.log(res, "热门数据 banner")
						this.swiperImg = res.data;
					} else {
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
					uni.showToast({
						title: "服务器异常"
					})
				})
			},
			/* 获取热门数据 爆品 */
			getHotDataSuperExplosive(goods_type) {
				var myUrl = service.IP_lzc+"goods.Goods/goodsList";
				service.P_get(myUrl, {
					"goods_type": goods_type,
					"page": 1,
					"size": 4
				}).then(res => {
					if (res.code == 1) {
						if (goods_type == 1) {
							console.log(res, "热门数据 超级爆品 ")
							this.baos = res.data;
						} else {
							console.log(res, "热门数据 品牌爆品 ")
							this.brandList = res.data;
						}
					} else {
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
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			/* 获取其他分类 */
			getTypeQi(page_num) {
				if (this.isBT == 1) {
					return
				}
				this.isBT = 1;
				var myUrl = service.IP_lzc+"jd.JdGoods/getSkuByPage";
				service.P_get(myUrl, {
					page_num,
					page: this.myPage,
					page_size: this.page_size
				}).then(res => {
					this.isBT = 0;
					if (res.code == 1) {
						var data = res.data;
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						if (this.myPage == 1) {
							if (data.length != 0) {
								this.qishu = data;
								this.myPage++
							}
						} else {
							if (data.length != 0) {
								this.qishu = this.qishu.concat(data)
								this.myPage++
							} else {
								console.log("没有了")
								this.more = "没有更多了"
							}
						}
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '请求成功,操作失败'
							})
						}
					}
				}).catch(e => {
					this.isBT = 0;
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			}


		}
	}
</script>

<style scoped>
	@import url("/static/css/commin.css");
	@import url("/commin_lzc/iconfont.css");

	.moreSort {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin-top: 20rpx;
	}

	.contentSort {
		width: 100vw;
		height: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f8f8f8;
		padding-bottom: 10rpx;
	}

	.nav {
		width: 100%;
		height: 107rpx;
		box-sizing: border-box;
		padding: 49rpx 30rpx 0 30rpx;
		position: relative;
		background-color: #fff;
	}

	.iconMore {
		position: absolute;
		right: 30rpx;
		top: 0;
		box-sizing: border-box;
		padding-top: 48rpx;
		font-size: 30rpx;
		color: #333333;

	}

	.navLeft {
		width: 100%;
		box-sizing: border-box;
		padding-right: 80rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.navItem {
		width: auto;
		height: auto;
		box-sizing: border-box;
		padding-bottom: 15rpx;
		/* font-size: 30rpx; */
		font-size: 34rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		margin-right: 40rpx;
		margin-bottom: 7rpx;

	}

	.navItemA {
		color: #F54248;
		font-size: 34rpx;
		border-bottom: 2rpx solid #F54248;
	}

	/* 超级爆品 */

	.Explosive {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 40rpx;
	}

	.ExplosiveT1 {
		font-size: 34rpx;
		font-family: "PingFang";
		font-weight: bold;
		color: #333333;
	}

	.ExplosiveT2 {
		font-size: 26rpx;
		font-family: "PingFang";
		font-weight: 500;
		color: #999999;
	}

	.ExplosiveItemG {
		margin-top: 26rpx;
	}

	.ExplosiveItem {
		width: 162rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 14rpx;

	}

	.ExplosiveItem:nth-child(4n+4) {
		margin-right: 0;
	}

	.ExplosiveItem:nth-child(n+5) {
		margin-top: 14rpx;
	}

	.exPimg {
		width: 100%;
		height: 160rpx;
		object-fit: cover;
		max-width: 100%;
		max-height: 160rpx;
	}

	.expView {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 4rpx 24rpx 6rpx 12rpx;
	}

	.expView1 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		line-height: 26rpx;
		height: 26rpx;
		max-width: 100%;
		margin-bottom: 22rpx;
	}

	.expView2 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #F54248;
		line-height: 26rpx;
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
		background-color: #f8f8f8;
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
		margin-top: 20rpx;
	}

	.brandT2 text {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #0078EC;
		line-height: 22rpx;
		margin-right: 0.25em;
		height: 26rpx;
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
		font-size: 20rpx;
		font-family: PingFang;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
		line-height: 22rpx;
		margin-top: 12rpx;
	}

	.brandT5 {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		line-height: 38rpx;
		margin-top: 12rpx;
	}

	.brandT6 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	/* 其他 */
	.qiItem {
		width: 750rpx;
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
	}

	.qiRight {
		width: 100%;
		height: 100%;
		padding-left: 25rpx;
		position: relative;
	}
	.goods_tit{
		height: 72rpx;
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
		line-height: 36rpx;
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
