<template>
	<view class="content" v-if="isReady">
		<uni-popup ref="popup_goods" type="bottom" @change="tkchange">
			<view class="tk_popup_box">
				<view class="closebtn" @tap="onClose">
					<!-- <image :src="getimg('/static/images/img_del.png')"></image> -->
					<text class="iconfont iconguanbi"></text>
				</view>
				<scroll-view class="dyr_scroll" style="height:800rpx;" scroll-y>
		
					<view class="popopBox1">
						<view class="goodsimg">
							<image v-if="shuju.pic.length>0" :src="getimg(shuju.pic[0])" :data-src="getimg(shuju.pic[0])" mode="aspectFill"
							 @tap="pveimg"></image>
							<!-- <block  v-else>
								
								<image v-if="goodsData.img&&goodsData.img.length>0" :src="getimg(goodsData.img[0])" :data-src="getimg(goodsData.img[0])" mode="aspectFill"
								 @tap="pveimg"></image>
							</block> -->
							 <!-- <image :src="getimg('/static/images/goods_01.jpg')" mode="aspectFill"></image> -->
						</view>
						<view class="goodstkjg">
							<view class="goods_pri_h">￥<text>{{shuju.real_price}}</text></view>
							<!-- <view class="tkname oh2">已选择：{{ggshow1}}</view> -->
						</view>
					</view>
					<view class="countnum">
						<text>选择数量：</text>
						
						<view class="dis_flex aic">
							<view class="jian_btn" @tap="goods_num(1)"><text class="iconfont iconjian"></text></view>
							<input class="js_goods_num" type="number" v-model="cnum">
							<view class="jian_btn" @tap="goods_num(2)"><text class="iconfont iconjia1"></text></view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<!-- <van-stepper custom-class="steppera" input-class="vanipt" plus-class="vantjia" minus-class="vantjian" v-model="cnum"
						 min="0" :max="goodsData.is_pond_goods==2?1:show_num" @input="onChange" @change="onChange" /> -->
						<!-- #endif -->
						<!-- <van-stepper custom-class="steppera" input-class="vanipt" plus-class="vantjia" minus-class="vantjian" v-model="cnum"
						 min="0" :max="show_num" @input="onChange" @change="onChange" /> -->
					</view>
					<view class="b_view_o"></view>
				</scroll-view>
				<view class="czbtnG" style="background: #fff;z-index: 999;">
					<view class="jrgwc" @tap="addwgc">加入购物车</view>
					<view class="buybtn" @tap="nowbuy">立即购买</view>
				</view>
			</view>
		</uni-popup>
		<!-- 轮播图 -->
		<uni-swiper-dot :info="shuju.pic" :current="swiperCurrent" field="content" :mode="mode" class="swiperOne"
			:dotsStyles="dotsStyles">
			<swiper class="swiper-box" @change="changeSwiper">
				<swiper-item v-for="(item,index) in shuju.pic" :key="index" class="swiperItem">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="detail_Tit1">
			<view class="detail_Tit2 oh2">
				<text class="detail_Tit3">京品</text>
				<text class="detail_Tit4">{{shuju.title}}</text>
				<view class="shareView dis_flex aic ju_c" style="">
					<button class="iconfont icon-fenxiang1" style="font-size: 30rpx;color: #F54248;"
						open-type="share"  :data-id="sku_id"></button>
				</view>
			</view>
			<view class="detail_fan dis_flex" style="flex-wrap: wrap;">
				<view class="detail_fan1">
					<text class="detail_fan1_1">返</text> <text
						class="detail_fan1_2">购物返现:￥{{shuju.o_consumer_rebate_sum}}</text>
				</view>
				<view class="detail_fan1">
					<text class="detail_fan1_1">返</text> <text
						class="detail_fan1_2">一级返佣:￥{{shuju.o_superior_rebate_sum}}</text>
				</view>
				<view class="detail_fan1">
					<text class="detail_fan1_1">返</text> <text
						class="detail_fan1_2">二级返佣:￥{{shuju.o_up_superior_rebate_sum}}</text>
				</view>
			</view>
			<view class="detail_price dis_flex ju_b aic">
				<view class="">
					<text class="detail_price1">会员价:</text>
					<text class="detail_price2 detail_price1">￥</text>
					<text class="detail_price3 detail_price1">{{shuju.real_price}}</text>
					<text class="detail_price4" style="text-decoration: none;">市场价:</text>
					<text class="detail_price4">￥{{shuju.price}}</text>
				</view>
				<!-- <view class="detail_PingL">
					<text class="detail_PingL1">评论数 {{getNum(shuju.pingN)}}</text>
					<text class="detail_PingL2">好评率 {{shuju.lv}}</text>
				</view> -->
			</view>
		</view>
		<view class="detailNum dis_flex aic aift">
			<text class="detailNum_tit">商品编号</text>
			<text class="detailNum_N">{{shuju.upc}}</text>
		</view>
		<!-- 评价 -->
		<!-- <view class="pj_box mt20" v-if="goodsData.comment.comment.length>0"> -->
		<view class="pj_box mt20" >
			<view class="pj_box_tit">
				<view class="p_tit_l">商品评价（{{comment_count>0?comment_count:0}}）</view>
				<view v-if="comment.length>0" class="p_tit_r" :data-url="'/pagesLzc/pl_list/pl_list?id='+sku_id"
				 @tap="jump">查看全部
					<text class="iconfont iconnext-m"></text>
				</view>
			</view>
			<!-- <view class="pj_bq">
				<view v-for="(item,idx) in comment.tag">{{item.name}}（{{item.number}}）</view>
			</view> -->
			<view v-if="comment.length>0" class="pj_li" v-for="(item,idx) in comment">
				<view class="pj_d1">
					<view class="user_tx">
						<image class="user_tx" :src="getimg(item.head_portrait)"></image>
					</view> {{item.nickname}}
				</view>
				<view class="pj_d2">{{item.content}}</view>
				<!-- <view class="pj_d3">
					<text v-for="(item1,idx1) in item.attr">{{item1.value}}</text>
				</view> -->
			</view>
		</view>
		<view class="hengxian"></view>
		<view class="detailType dis_flex ju_b aic">
			<text v-for="(item,index) in lab" :key="index">
				<text class="iconfont icon-duigou" style="font-size: 26rpx;margin-right: 15rpx;"></text>
				{{item.text}}
			</text>
		</view>
		<view class="detailbody">
			<view class="detailbodyR1 dis_flex ju_b">
				<text class="title">推荐商品</text>
				<!-- <text class="more dis_flex aic">
					<text>查看更多</text>
					<text class="iconfont icon-right"></text>
				</text> -->
			</view>
			<view class="detailbodyR2 dis_flex" style="flex-wrap: wrap;">
				<view class="detailbodyR2i" v-for="(item,index) in tuiList" :key="index"
					v-if="tuiList.length > 0 && index<3" @click.stop="toDeatil(item.sku_id)">
					<image :src=getimg(item.pic) mode="aspectFill"></image>
					<view class="detailbodyR2iv">
						<view class="oh1 bodyTit">{{item.saleValue}}</view>
						<view class="bodyPrcie">￥{{item.price}}</view>
					</view>
				</view>
				<view class="zanwu" v-if="tuiList.length == 0">暂无推荐</view>
			</view>
			<view class="detailTit5 dis_flex ju_b aic mb39">
				<view class="hr1D"></view>
				<view class="detailTit6">商品详情</view>
				<view class="hr1D"></view>
			</view>
			<view class="" style="max-width: 100%;">
				<!-- <u-parse :content="shuju.desc"></u-parse> -->
				<image :src="item" mode="widthFix" style="width: 100%;height: auto;" v-for="(item,index) in shuju.desc"
					:key="index"></image>
			</view>
			<!-- <image src="../../static/image/liu/sort/f6e17d88ef89ad8de21c9a35d1fbdc3.png" mode="aspectFill"
				class="detailImg"></image>
			<image src="../../static/image/liu/sort/59549dfd6904e8433b94b004234244b.png" mode="aspectFill"
				class="detailImg"></image> -->
		</view>
		<view class="" style="width: 100vw;height: 80rpx;"></view>
		<view class="footDetail dis_flex ju_b">
			<!-- <view class="dis_flex gouLeft aic">
				<button class="btnDeG dis_flex_c  aic" open-type="share">
					<text class="iconfont icon-fenxiang" style="font-size: 34rpx; color: #999;margin-top: 9rpx;"></text>
					<view type="" open-type="share" class="btnDe">分享</view>
				</button>
				<view class="footHr1" style="">

				</view>
				<button class="dis_flex_c  aic btnDeG" open-type="contact">
					<text class="iconfont icon-kefu" style="font-size: 34rpx; color: #999;margin-top: 9rpx;"></text>
					<view type="" class="btnDe">客服</view>
				</button>
			</view> -->
			<view class="bottom_box">
				<!-- #ifdef MP-WEIXIN -->
				<view class="kf_btn" style="position: relative;">
					<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="sku_id"></button>
					<text class="iconfont iconfenxiang2"></text>
					<text>分享</text>
				</view>
				<view class="sg"></view>
				<!-- <view class="kf_btn" @tap="toroom(goodsData.support_staff)">/ -->
				<view class="kf_btn" style="position: relative;">
					<button type="default" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;opacity: 0;z-index: 10;" open-type="contact"></button>
					<text class="iconfont iconkefu"></text>
					<text>客服</text>
				</view>
				<!-- #endif -->
				<view class="buy_btn" @tap="gouBtn">加入购物车</view>
				<view class="buy_btn buy_btn1" @click="gouBtn">立即购买</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				isReady: false,
				sku_id: 1,
				cnum: 1, //数量
				/* 对接接口 */
				swiperImg: [
					'../../static/image/liu/sort/bao3.png',
					'../../static/image/liu/sort/bao4.png'
				],
				none: true,
				current: 0,
				mode: 'round',
				swiperCurrent: 0,
				dotsStyles: {
					width: 8,
					bottom: 10,
					backgroundColor: "rgba(255, 255, 255, 0.4)",
					selectedBackgroundColor: "rgba(245, 66, 72, 1)",
					selectedBorder: "none",
					border: "none"
				},
				lab: [{
						text: "京选商品"
					},
					{
						text: "品质保证"
					},
					{
						text: "无忧售后"
					}
				],
				shuju: {},
				tuiList: [],
				comment_count:0,
				comment:[]
			}
		},
		onHide() {

		},
		onLoad(option) {
			this.shuju = "";
			that = this;
			console.log(option)
			if (option.sku_id) {
				that.sku_id = option.sku_id
			}
			this.getDetail();
			this.getPickOfTheWeek();

		},
		onShow() {

		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])

		},
		onShareTimeline(){
			return {
				title:'依辈通',
				query:'pid=' + that.loginDatas.id+'&sku_id=' + that.sku_id
			}
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getpj(){
				// /jd.JdGoods/getCommentList
				var jkurl="/jd.JdGoods/getCommentList"
				var datas={
					sku_id: that.sku_id,
					page:1,
					size:1
				}
				service.P_get(jkurl, datas).then(res => {
					console.log(res, "推荐商品")
					if (res.code == 1) {
						that.comment_count = res.length;
						that.comment = res.data;
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			getNum(num) {
				if (num > 1000) {
					return "1000+"
				} else {
					return num;
				}
			},
			gouBtn(){
				this.$refs.popup_goods.open()
			},
			onClose(){
				this.$refs.popup_goods.close()
			},
			/* 推荐商品 */
			getPickOfTheWeek() {
				var jkurl=service.IP_lzc+"jd.JdGoods/getSimilarSku"
				var datas={
					sku_id: that.sku_id
				}
				service.P_get(jkurl, datas).then(res => {
					console.log(res, "推荐商品")
					if (res.code == 1) {
						that.tuiList = res.data;
						console.log(res.data.desc)
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			/* 获取详情 */
			getDetail() {
				var lzcUrl = service.IP_lzc+"jd.JdGoods/getGoodsInfo";
				var data = {
					sku_id: that.sku_id
				}
				service.P_get(lzcUrl, data).then(res => {
					console.log(res, "分类详情")
					if (res.code == 1) {
						that.shuju = res.data;
						that.isReady = true;
						console.log(res.data.desc)
						that.getpj()
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			toDeatil(sku_id) {
				uni.redirectTo({
					url: `/pagesLzc/deatil/deatil?sku_id=${sku_id}`
				})
			},
			tkchange(e) {
				console.log(e)
				this.sheetshow = e.show
			},
			goods_num(type){
				
				console.log(type)
				console.log(this.show_num)
				if(that.cnum==1&&type==1){
					return
				}else if (that.cnum == this.show_num&&type==2) {
					this.cnum = this.show_num
					return
				}else if(type==1){
					that.cnum--
				}else{
					that.cnum++
				}
			},
			nowbuy() {
				let that = this
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)
				if(!that.hasLogin){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				console.log('addwgc')
				that.onClose()
				// advocacyId:that.dy_id,
				// advocacyviceId:that.advocacyviceId,
				uni.navigateTo({
					url:`/pagesLzc/orderLzc/orderLzc?type=1&v_id=${that.sku_id}&number=${that.cnum}`,
				})
			},
			addwgc(){
				let that = this
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)
				if(!that.hasLogin){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				console.log('addwgc')
				
				var lzcUrl = "/jd.JdCart/add";
				var data = {
					token: that.$store.state.loginDatas.userToken||'',
					sku_id: that.sku_id,
					sum:that.cnum
				}
				service.P_get(lzcUrl, data).then(res => {
					console.log(res, "添加成功")
					if (res.code == 1) {
						that.onClose()
						wx.showToast({
							title: '添加成功'
						})
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


	/* 弹框 */
	.czbtnG {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 120rpx;
		/* padding: 0 28rpx; */
		box-sizing: border-box;
	}
	.b_view_o {
		width: 100%;
		height: 120rpx;
		background: #fff;
	}
	.tk_popup_box {
		width: 100%;
		background: #fff;
		padding: 20rpx 28rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: auto;
		position: relative;
		z-index: 999;
	}
	.popopBox1 {
		width: 100%;
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	
	.goodsimg {
		margin-top: 16rpx;
		width: 235rpx;
		height: 235rpx;
		border: 1rpx solid #d2d2d2;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 30rpx;
	}
	
	.goodsimg image {
		width: 235rpx;
		height: 235rpx;
	}
	
	.jian_btn{
		width: 60upx;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f7f8fa;
		font-size: 20upx;
		color: #333;
		margin: 0 2upx;
	}
	.js_goods_num{
		min-width: 0;
		width: 60upx;
		height: 60upx;
		background-color: #f7f8fa;
		font-size: 32upx;
		text-align: center;
		color: #333;
		margin: 0 2upx;
	}
	.tkname {
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 45rpx;
		font-size: 26rpx;
		color: #333;
	}
	.countnum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #333;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
	}
	.goodstkjg {
		flex: 1;
		position: relative;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around
	}
	.dyr_scroll {
		width: 694rpx;
		margin: 0 auto;
		position: relative;
	}
	
	.closebtn {
		width: 37rpx;
		height: 37rpx;
		border-radius: 50%;
		border: 1px solid #dddddd;
		overflow: hidden;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
	}
	.closebtn text{
		font-size: 38upx;
	}
	.closebtn image {
		width: 37rpx;
		height: 37rpx;
		border-radius: 50%;
	}
	.goods_pri_h {
		font-size: 24rpx;
		color: #FF2C2C;
	}
	.goods_pri_h text{
		font-size: 36rpx;
	}
	.czbtnG .jrgwc,
	.czbtnG .buybtn {
		width: 338rpx;
		flex: 1;
		/* margin: 0 10rpx; */
		height: 90rpx;
		background: linear-gradient(-25deg, #FF872F, #FF7418);
		/* border-radius: 40rpx; */
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 30rpx;
	}
	
	.czbtnG .buybtn {
		background: linear-gradient(-25deg, #FC4144, #FA272A);
	}
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #f8f8f8;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.swiperItem {
		width: 750rpx;
		height: 750rpx;
	}

	.swiperItem image {
		width: 750rpx;
		height: 750rpx;
	}

	.detail_Tit1 {
		width: 100vw;
		height: auto;
		background-color: #fff;
		box-sizing: border-box;
		padding: 30rpx 33rpx 34rpx 30rpx;
		position: relative;
	}

	.detail_Tit2 {
		max-width: 85%;
	}

	.shareView {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		width: 70rpx;
		height: 70rpx;
		background-color: #fff;
		box-shadow: -2rpx -2rpx 5rpx 5rpx #eee;
		border-radius: 50%;

	}

	.detail_Tit3 {
		background: #F54248;
		border-radius: 4rpx;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 28rpx;
		box-sizing: border-box;
		padding: 4rpx 9rpx;

	}

	.detail_Tit4 {
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		margin-left: 14rpx;
		line-height: 64rpx;
		height: 64rpx;
	}

	.detail_Ping {
		margin-top: 43rpx;
	}

	.detail_PingL {
		/* width: 100%; */
		box-sizing: border-box;
		/* padding-right: 50rpx; */
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		margin-top: 5rpx;
	}

	.detail_PingL2 {
		margin-left: 1em;
	}

	.detail_Ping1 {
		font-size: 25rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		min-width: 100rpx;
	}

	.detail_fan {
		margin-top: 31rpx;
	}

	.detail_fan1 {
		margin-right: 36rpx;
		margin-bottom: 20rpx;
	}

	/* .detail_fan1:nth-child(3n+3){
		margin-right: 0;
	} */

	.detail_fan1_1 {
		background: linear-gradient(0deg, #FF934C 0%, #FC686F 100%);
		border-radius: 4px;
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		box-sizing: border-box;
		padding: 4rpx;
	}

	.detail_fan1_2 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		margin-left: 7rpx;
	}

	.detail_price {
		margin-top: 17rpx;
	}

	.detail_price1 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #F54248;
	}

	.detail_price2 {
		margin-left: 0.25em;
	}

	.detail_price3 {
		font-size: 38rpx
	}

	.detail_price4 {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
		margin-left: 28rpx;
	}

	.detailNum {
		width: 100vw;
		height: 80rpx;
		background-color: #fff;
		margin: 20rpx 0;
		box-sizing: border-box;
		padding: 27rpx 30rpx 28rpx 30rpx;
	}

	.detailNum_tit {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}

	.detailNum_N {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		margin-left: 25rpx;
	}

	.detailType {
		width: 100vw;
		height: 80rpx;
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx 90rpx;
	}

	.detailType text {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #666666;
	}

	.detailbody {
		width: 100vw;
		height: auto;
		box-sizing: border-box;
		padding: 30rpx;
	}

	.detailbodyR1 {
		width: 100%;
		height: auto;
		margin-bottom: 30rpx;
	}

	.detailbodyR2 {
		width: 100%;
		height: auto;
		margin-bottom: 41rpx;
	}

	.detailbodyR2i {
		width: 216rpx;
		height: auto;
		min-height: 332rpx;
		margin-right: 21rpx;
		background-color: #fff;
		margin-bottom: 21rpx;
	}

	.detailbodyR2i image {
		width: 216rpx;
		height: 216rpx;
	}

	.detailbodyR2i:nth-child(3n+3) {
		margin-right: 0;
	}

	.title {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}

	.more {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
	}

	.detailbodyR2iv {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		/* padding: 21rpx 14rpx; */
		padding: 0 14rpx;
	}

	.bodyTit {
		max-width: 100%;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #333333;
		margin-top: 11rpx;
		height: 28rpx;
		line-height: 28rpx;
	}

	.bodyPrcie {
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #F54248;
		margin-top: 16rpx;
		line-height: 28rpx;
	}

	.hr1D {
		width: 280rpx;
		height: 1px;
		background: #999999;
		opacity: 0.4;

	}

	.detailTit6 {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;

	}

	.detailImg {
		width: 100vw;
		min-height: 750rpx;
		object-fit: contain;
		margin-left: -30rpx;
	}

	.footDetail {
		width: 100vw;
		min-height: 90rpx;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		box-sizing: border-box;
		/* padding-left: 60rpx; */
		/* padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); */
	}

	.gouLeft {
		width: 236rpx;
		height: 100%;
		box-sizing: border-box;
	}

	.gouDetail {
		width: 514rpx;
		height: 90rpx;
		background: linear-gradient(-25deg, #FC4144, #FA272A);
		box-shadow: 0px 3px 6px 0px rgba(255, 18, 21, 0.57);
		font-size: 33rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
	}

	.btnDeG {
		width: 48%;
		height: 90rpx;
		box-sizing: border-box;
		/* border-right: 1px solid #eee; */
		/* padding-right: 29rpx; */
	}

	.footHr1 {
		width: 1px;
		height: 50rpx;
		background-color: #eee;
	}

	.btnDe {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 400;
		color: #666666;
		position: absolute;
		bottom: 8rpx;
		width: 50%;
		/* bottom: calc(8rpx + constant(safe-area-inset-bottom));
		bottom: calc(8rpx + env(safe-area-inset-bottom)); */
	}

	/* #ifdef H5 */
	uni-button::after {
		position: unset;
		border: none;
		border-radius: none;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	button::after {
		position: unset;
		border: none;
		border-radius: none;
	}

	/* #endif */

	uni-button,
	button {
		position: unset;
		padding: 0;
		margin: 0;
		line-height: 1;
		border: none;
		background-color: #FFFFFF;
		border-radius: none;

	}

	/deep/.swiperOne uni-swiper {
		height: 750rpx;
		width: 750rpx;
		/* #ifdef MP-WEIXIN */
		height: 750rpx !important;
		/* #endif */
	}

	/deep/ swiper {
		height: 750rpx;
	}
	
	
	.bottom_box {
		position: fixed;
		bottom: 0;
		height: 90rpx;
		background: #fff;
		z-index: 10;
		/* padding-right: 28rpx; */
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		border-top: 1px solid #eee;
	}
	
	.buy_btn {
		/* width:192rpx; */
		flex: 1;
		height: 90rpx;
		
		background: linear-gradient(-25deg, #FF872F, #FF7418);
		/* border-radius: 10rpx; */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		/* margin-left: 18rpx; */
	}
	
	.buy_btn1 {
		background: linear-gradient(-25deg, #FC4144, #FA272A);
	}
	
	
	
	
	
	
	/* pingjia */
	.pj_box {
		background: #fff;
		width: 100%;
		/* padding: 0 28rpx; */
		border-bottom: 1px solid #eee;
	}
	
	.pj_box_tit {
		padding: 0 28upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24upx;
		color: #999;
		/* height: 75rpx; */
		height: 90upx;
	}
	
	.p_tit_l {
		font-size: 31rpx;
		font-weight: bold;
		color: #333;
		position: relative;
		padding-left: 27upx;
	}
	.p_tit_l::before{
		position: absolute;
		content: '';
		width: 7upx;
		height: 30upx;
		left: 0;
		top: 50%;
		margin-top: -15upx;
		background: linear-gradient(-25deg, #FF8218, #FBA134);
		box-shadow: 0px 2upx 5upx 0px rgba(254, 144, 37, 0.46);
	}
	.p_tit_r {
		display: flex;
		align-items: center;
	}
	
	.p_tit_r text {
		font-size: 24rpx;
		margin-left: 10rpx;
		color: #bbb;
	}
	
	.pj_bq {
		padding: 0 10rpx;
		box-sizing: border-box;
		width: 100%;
	}
	
	.pj_bq view {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		background: rgba(250, 233, 234, 1);
		border-radius: 30rpx;
		padding: 0 23rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #333;
		margin: 10rpx 18rpx;
	}
	
	.pj_li {
		width: 100%;
		padding: 20rpx 28rpx;
		box-sizing: border-box;
	}
	
	.pj_d1 {
		font-size: 28rpx;
		color: #666;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	
	.pj_d2 {
		font-size: 26rpx;
		color: #333;
		margin-bottom: 10upx;
	}
	.pj_d3{
		font-size: 24upx;
		color: #666;
	}
	.pj_d3 text{
		margin-right: 8upx;
	}
	.user_tx {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
	}
	
	view.user_tx {
		margin-right: 19rpx;
	}
	.kf_btn {
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 22rpx;
		color: #666666;
	}
	
	.kf_btn text.iconfont {
		font-size: 40rpx;
		margin-bottom: 5rpx;
	}
	
	.sg {
		width: 1px;
		height: 48rpx;
		background: rgba(238, 238, 238, 1);
	}
</style>
