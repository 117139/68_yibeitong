<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>

		<view v-if="htmlReset==0&&!goodsData" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==2">
			<view class="zanwu" style="">商品已下架</view>
			<!-- 猜你喜欢 -->
			<!-- <view class="you_like">
				<view class="like_tit">
					<text></text>猜你喜欢<text></text>
				</view>
				<view class="goods_list">
					<view class="like_goods_li" @tap="jump" :data-url="'/pages/details/details?id='+item.g_id" v-for="(item,index) in like_goods">
						<image class="goods_img" :lazy-load='true' :src="getimg(item.g_img[0])" mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="dis_flex aic"><text v-if="item.fk_is_way==2" class="xcxdy_zy_icon">自营</text><text class="flex_1 oh1">{{item.g_title}}</text></view>
							<view class="goods_pri">
								<text>￥{{item.g_current_price}}</text>
								<!-- <text class="pr2">￥{{item.g_original_price}}</text> --
							</view>
						</view>
					</view>

				</view>
			</view> -->
		</view>
		<view v-if="goodsData" :class="sheetshow1||sheetshow?'container-ban':'container'">
			<view class="swiper_box">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
				 indicator-active-color='#8e8e8e' :circular="circular" @change="swiper_change">
					<!-- <block v-for="(item,idx) in goodsData.img"> -->
					<block v-for="(item,idx) in goodsData.img">
						<swiper-item>
							<image :src="getimg(item)" class="slide-image" width="355" height="150" mode="aspectFill" :data-src="getimg(item)" :data-array="getimgarr(goodsData.img)"
							 @tap="pveimg" />
							<!-- <image :src="getimg(item)" class="slide-image" mode="aspectFill" width="355" height="150" :data-src="getimg(item)"
							 :data-array="filter.getgimgarrIP(goodsData.img)" @tap.stop="pveimg" /> -->
						</swiper-item>
					</block>

				</swiper>
				<!-- <view class="br_box">{{cur_swiper}}/{{goodsData.img.length}}</view> -->
				<view v-if="goodsData.img.length>0" class="br_box">{{cur_swiper}}/{{goodsData.img.length}}</view>
			</view>
			<view class="goods_msg">
				<!-- <view class="goods_pri">
					<view class="pri1  dis_flex aic">¥{{goodsData.current_price}}</view>
					<view class="pri2">代言费：¥{{goodsData.advocacy_price}}</view>
				</view>
				<view class="goods_pri" v-if="goodsData.original_price>0">
					<view class="pri2">原价：¥{{goodsData.original_price}}</view>
				</view> -->
				<view class="goods_name">
					<text class="goods_name_text">{{goodsData.title}}</text>
					<view class="goods_share" style="position: relative;">
						<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="g_id"></button>
						<text class="iconfont iconfenxiang"></text>
					</view>
				</view>
				
				<view class="dis_flex goods_pri_box">
					<view class="pri">会员价：<text>¥</text>{{goodsData.current_price*1}}</view>
					<view class="pri1 " v-if="goodsData.original_price">市场价：<text>¥</text><text class="scx">{{goodsData.original_price*1}}</text></view>
				</view>
				<view class="sku_box dis_flex">
					<!-- <view class="sku_li dis_flex aic">
						<text class="sku_bg">库</text>库存：{{goodsData.total_number}}
					</view>
					<view class="sku_li dis_flex aic">
							<text  class="sku_bg">销</text>销量：{{goodsData.sales_volume}}
					</view> -->
					<view class="sku_li dis_flex aic">
							<text  class="sku_bg">返</text>购物返现：￥{{goodsData.consumer_rebate}}
					</view>
					<view class="sku_li dis_flex aic">
							<text  class="sku_bg">返</text>一级返佣：￥{{goodsData.superior_rebate}}
					</view>
					<view class="sku_li dis_flex aic">
							<text  class="sku_bg">返</text>二级返佣：￥{{goodsData.up_superior_rebate}}
					</view>
				</view>
			</view>
			<!-- <view class="goods_xmsg" @tap="jump" data-url="/pagesA/my_yhq/my_yhq"> -->
			<!-- <view v-if="yh_list.length>0" class="goods_xmsg" @tap="yhq_get">
				<view class="v1">优惠券</view>
				<view class="v2">
					<text class="yhq_box">领券</text>
				</view>
				<view class="v3">
					<text class="iconfont iconcaozuo"></text>
				</view>
			</view> -->
			
			<view class="mt20 goods_xmsg" @tap="sheetshow_fuc">
				<view class="v1">选择</view>
				<view class="v2 v21">{{ggshow1?ggshow1+',':''}}{{cnum>0?cnum+'件':''}}</view>
				<view class="v3">
					<text class="iconfont iconnext-m"></text>
				</view>
			</view>
			<view class="hengxian"></view>
			<!-- 评价 -->
			<!-- <view class="pj_box mt20" v-if="goodsData.comment.comment.length>0"> -->
			<view class="pj_box mt20" >
				<view class="pj_box_tit">
					<view class="p_tit_l">商品评价（{{goodsData.comment_count>0?goodsData.comment_count:0}}）</view>
					<view v-if="goodsData.comment_count>0" class="p_tit_r" :data-url="'/pagesA/pl_list/pl_list?id='+g_id"
					 @tap="jump">查看全部
						<text class="iconfont iconnext-m"></text>
					</view>
				</view>
				<!-- <view class="pj_bq">
					<view v-for="(item,idx) in goodsData.comment.tag">{{item.name}}（{{item.number}}）</view>
				</view> -->
				<view v-if="goodsData.comment_count>0&&idx<1" class="pj_li" v-for="(item,idx) in goodsData.comment.comment">
					<view class="pj_d1">
						<view class="user_tx">
							<image class="user_tx" :src="getimg(item.head_portrait)"></image>
						</view> {{item.nickname}}
					</view>
					<view class="pj_d2">{{item.comment}}</view>
					<view class="pj_d3">
						<text v-for="(item1,idx1) in item.attr">{{item1.value}}</text>
					</view>
				</view>
			</view>
			<view class="hengxian"></view>
			<!-- 详情 -->
			<view class="goods_xq mt20">
				
				<view class="pj_box_tit">
					<view class="p_tit_l">商品详情</view>
					<view class="p_tit_r" ></view>
				</view>
				<!-- <view class="xq_box" v-html="goodsData.content"> -->
				<view class="xq_box" v-html="goodsData.content">
					<img :src="getimg('/static/images/goods_xq_04.jpg')" mode="aspectFill" style="width:750rpx;height:1264upx;display:block;" />
				</view>
			</view>
			<!-- 底部 -->
			<view class="bottom_box">
				<!-- #ifdef MP-WEIXIN -->
				<view class="kf_btn" style="position: relative;">
					<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="g_id"></button>
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
				<view v-if="goodsData.activity_id==0&&goodsData.is_pond_goods==1" class="buy_btn" @tap="sheetshow_fuc">加入购物车</view>
				<view class="buy_btn buy_btn1" @tap="sheetshow_fuc">{{goodsData.activity_id==0||goodsData.is_apply==2?'立即购买':'报名购买'}}</view>

			</view>
		</view>
		<!-- tk -->
		<uni-popup ref="popup_yh" type="center" @change="tkchange0">
			<!-- <view class="hb_tk" style="background-image: url(../../static/images/get_yh.png);"> -->
			<view v-if="yh_list.length>0" class="hb_tk">
				<image class="hb_tk_img" :src="getimg('/static/images/get_yh.png')" mode="scaleToFill"></image>
				<scroll-view style="width: 100%;height: 100%;position: relative;z-index: 9999;" scroll-y>
					<view class="dis_flex goods_yh_li" v-for="(item,idx) in yh_list">
						<view class="goods_yh_pri" v-if="item.coupon_setting_type==1">
							<view class="dis_flex d1"><text>￥</text>{{item.c_money*1}}</view>
							<view class="d2">满{{item.condition*1}}可用</view>
						</view>
						<view class="goods_yh_pri" v-if="item.coupon_setting_type==2">
							<view class="dis_flex d1">{{item.discount_ratio}}<text>折</text></view>
						</view>
						<view class="goods_yh_pri" v-if="item.coupon_setting_type==3">
							<view class="dis_flex d1">全额</view>
							<view class="dis_flex d1">抵扣</view>
						</view>
						<view class="flex_1 goods_yhmsg">
							<view class="yh_type">{{item.type_value}}</view>
							<view class="yh_time">
								<view>有效日期</view>
								<view>{{filter.getDate_ymd(item.use_start_time,'-')}}-{{filter.getDate_ymd(item.use_end_time,'-')}}</view>
							</view>

						</view>
						<view class="goods_get dis_flex">
							<view v-if="item.is_get==2" class="goods_get_btn" @tap="get_yh(item.id)">领取</view>
							<view v-if="item.is_get==1" class="goods_get_btn goods_get_btn1">已领</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="dis_flex aic ju_c">
				<!-- <image class="yh_gb_btn" :src="getimg('/static_s/51daiyan/images/closebtn_03.jpg')"></image> -->
				<image class="yh_gb_btn" :src="getimg('/static_s/51daiyan/images/off.png')" @tap="gb_yhtk"></image>
			</view>
		</uni-popup>
		<uni-popup ref="popup_goods" type="bottom" @change="tkchange">
			<view class="tk_popup_box">
				<view class="closebtn" @tap="onClose">
					<!-- <image :src="getimg('/static/images/img_del.png')"></image> -->
					<text class="iconfont iconguanbi"></text>
				</view>
				<scroll-view class=" dyr_scroll" style="height:800rpx;" scroll-y>

					<view class="popopBox1">
						<view class="goodsimg">
							<image v-if="show_img.length>0" :src="getimg(show_img[0])" :data-src="getimg(show_img[0])" mode="aspectFill"
							 @tap="pveimg"></image>
							<block  v-else>
								
								<image v-if="goodsData.img&&goodsData.img.length>0" :src="getimg(goodsData.img[0])" :data-src="getimg(goodsData.img[0])" mode="aspectFill"
								 @tap="pveimg"></image>
							</block>
							 <!-- <image :src="getimg('/static/images/goods_01.jpg')" mode="aspectFill"></image> -->
						</view>
						<view class="goodstkjg">

							<view class="goods_pri_h">￥<text>{{show_pri}}</text></view>
							<!-- <view class="kucun" v-if="guige_select.length>0">库存{{show_num}}件</view> -->
							<view class="tkname oh2">已选择：{{ggshow1}}</view>
						</view>
					</view>
					<block v-if="guige_arr.length>0" v-for="(item,idx) in guige_arr">
						<view class="tkguigetit">{{item.name}}：</view>
						<view class="guigeBox">
							<!-- :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx) }" -->
							<block v-for="(item1,idx1) in item.value">
								<text class="guigeOne" v-if="ggShow(item.name,item1,idx)" :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx)}"
								 :data-ggidx="idx" :data-name="item.name" :data-value="item1" @tap="selegg">{{item1}}</text>
								<text class="guigeOne" v-else :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx)}"
								 :data-ggidx="idx" :data-name="item.name" :data-value="item1">{{item1}}</text>
							</block>
						</view>
					</block>
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
					<view v-if="goodsData.activity_id==0&&goodsData.is_pond_goods==1" class="jrgwc" @tap="addwgc">加入购物车</view>
					<view class="buybtn" @tap="nowbuy">立即购买</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>
<!-- #ifdef MP-WEIXIN -->
<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<!-- #endif -->
<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	var that
	export default {
		data() {
			return {
				btn_kg: 0,
				htmlReset: 0,
				g_id: '',
				dy_id: '', //代言id
				advocacyviceId: '', //代言数据id
				v_id: '', //sku_id
				indicatorDots: false,
				autoplay: false,
				circular: true,
				interval: 3000,
				duration: 1000,
				data_list: [],



				yh_list: [], //优惠券列表
				cur_swiper: 1,
				star_list: [], //代言人列表
				star_page: 1,
				size: 20,

				sheetshow: false, //规格弹框控制
				sheetshow1: false,
				dyr_type: 0,
				showcan: false,
				goods_total_limit: '', //商品阶梯
				goodsData: '',
				guige_arr: [],

				guige_arr_show: [],
				guige_select: [],
				guige: [], //规格
				show_pri: 0,
				show_img: 0,
				show_num: 0,





				type1: [-1], //规格index
				ggshow1_jjj: [],
				cnum: 0, //数量
				goods_sku_id: 0, //商品id

				page: 1,
				like_goods: []
			}
		},
		components: {
			uniPopup
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			]),
			ggshow1() {
				var arr = this.guige_select
				if (!arr) {
					return
				}
				var newarr = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] && arr[i].value) {
						newarr.push(arr[i].value)
					}


				}
				console.log(newarr.join(','))
				return newarr.join(',')
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onShareAppMessage() {
			return {
				title: '依辈通',
				path: '/pagesA/details/details?pid=' + that.loginDatas.id+'&id='+that.g_id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onShareTimeline(){
			return {
				title:'依辈通',
				query:'pid=' + that.loginDatas.id+'&id=' + that.g_id
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
			if(options.id){
				that.g_id = options.id
			}
		
			that.onRetry()
		},
		onShow() {
			// this.onRetry()
			this.btnkg = 0
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			// this.getyhlist()
			this.onRetry()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.htmlReset == 2) {
				this.getdatalist()
			}
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			getimgarr(arr){
				return service.getimgarr(arr,'arr')
			},
			getdatalist() {

				let that = this
				var jkurl = '/goods/getGoodsList'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					cateId: 3,
				}
				if (that.data_last) return
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if (datas.length == 0) {
							// uni.showToast({
							// 	icon: 'none',
							// 	title: '暂无更多数据'
							// })
							if (that.page == 1) {
								that.like_goods = datas
							} else {
								that.data_last = true
							}
							return
						}
						if (that.page == 1) {
							that.like_goods = datas
						} else {

							that.like_goods = that.like_goods.concat(datas)
						}

						that.page++
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},

			toroom(id) {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/login/login',
					});
					return
				}
				this.$store.commit('createConversationActive', id)
				uni.navigateTo({
					url: '/pages/tim/room?id=' + id + '&type=2' + '&goods_id=' + this.g_id + '&goods_name=' + this.goodsData.title +
						'&goods_img=' + this.goodsData.img[0] + '&goods_pri=' + this.goodsData.current_price
				})
			},
			yhq_get() {
				if (this.yh_list.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '此商品暂无优惠'
					})
					return
				}
				this.$refs.popup_yh.open()
			},
			get_yh(id) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					id: id
				}
				service.P_post('/goods/getCoupon', data).then(res => {
					console.log(res)
					that.btnkg = 0
					if (res.code == -1) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 0 && res.msg == '请先登录账号~') {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 1) {
						that.getyhlist()
						uni.showToast({
							icon: 'none',
							title: '领取成功'
						})
					} else {

					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			onRetry() {
				this.getSku()
				return
				this.star_page = 1
				this.getStarlist()
				this.StarText_page = 1
				this.getStarTextlist()
				this.LaterBuy_page = 1
				this.getLaterBuylist()
				this.page = 1
				this.like_goods = []
				this.getdatalist()
			},
			//获取优惠列表
			getyhlist() {
				let that = this
				// if(that.btn_kg==1){
				// 	return
				// }else{
				// 	that.btn_kg=1
				// }
				var jkurl = '/goods/goodsCoupon'
				var datas = {
					gid: that.g_id,
					token: that.loginMsg.userToken ? that.loginMsg.userToken : '',
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						// if (datas.length == 0) {
						// 	if(that.star_page>1){
						// 		uni.showToast({
						// 			icon: 'none',
						// 			title: '暂无更多数据'
						// 		})
						// 	}

						// 	that.btn_kg=0
						// 	return
						// }
						that.yh_list = datas
						if (datas.length > 0) {
							var tk_kg = true
							for (var i = 0; i < datas.length; i++) {
								if (datas[i].is_get == 1) {
									tk_kg = false
								}
							}
							if (tk_kg) {
								this.$refs.popup_yh.open()
							}
						}
						// if(that.star_page==1){
						// 	that.star_list =datas
						// }else{

						// 	that.star_list = that.star_list.concat(datas)
						// }
						that.btn_kg = 0
						// that.star_page++
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},


			scFuc(id, key) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: 5,
					id: id,
					operate: key,
				}
				if (key == 'affirm') {
					service.P_post('/attention/operation', data).then(res => {
						console.log(res)
						that.btnkg = 0
						if (res.code == -1) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							return
						} else if (res.code == 0 && res.msg == '请先登录账号~') {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							return
						} else if (res.code == 1) {
							that.getSku()
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
						} else {

						}
					}).catch(e => {
						that.btnkg = 0
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					})
					return
				}
				wx.showModal({
					title: '提示',
					content: '是否取消收藏?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							service.P_post('/attention/operation', data).then(res => {
								console.log(res)
								that.btnkg = 0
								if (res.code == -1) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 0 && res.msg == '请先登录账号~') {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 1) {
									that.getSku()
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
								} else {

								}
							}).catch(e => {
								that.btnkg = 0
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})


			},
			guanzhuFuc(id, key) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: 1,
					id: id,
					operate: key,
				}
				if (key == 'affirm') {
					service.P_post('/attention/operation', data).then(res => {
						console.log(res)
						that.btnkg = 0
						if (res.code == -1) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							return
						} else if (res.code == 0 && res.msg == '请先登录账号~') {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							return
						} else if (res.code == 1) {
							that.getSku()
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
						} else {

						}
					}).catch(e => {
						that.btnkg = 0
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					})
					return
				}
				wx.showModal({
					title: '提示',
					content: '是否取消关注?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							service.P_post('/attention/operation', data).then(res => {
								console.log(res)
								that.btnkg = 0
								if (res.code == -1) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 0 && res.msg == '请先登录账号~') {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 1) {
									that.getSku()
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
								} else {

								}
							}).catch(e => {
								that.btnkg = 0
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})


			},
			getSku() {
				var that = this
				
				var datas = {
					token: that.$store.state.loginDatas.userToken||'',
					id: that.g_id
				}
				// 单个请求
				service.P_get('/goods/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						// that.catelist=res.data
						var guige_sku = JSON.stringify(res.data.attr.sku_all)
						var guige_skuarr = JSON.stringify(res.data.attr.specification)
						console.log('guige_sku------------------------->')
						console.log(res.data)
						console.log(guige_sku)
						that.guige = JSON.parse(guige_sku)
						that.guige_arr_show = JSON.parse(guige_skuarr)
						that.guige_arr = res.data.attr.specification
						that.goodsData = res.data
						that.show_img = res.data.img
						that.show_pri = res.data.current_price
						that.show_num = 0
						uni.setNavigationBarTitle({
							title: '商品详情'
						})
					} else {
						uni.setNavigationBarTitle({
							title: '商品详情'
						})
						if (res.msg = '商品已下架') {
							// setTimeout(()=>{
							// 	uni.navigateBack({
							// 		delta:1
							// 	})
							// },3000)
							// that.getdatalist()
							that.htmlReset = 2
						} else {
							that.htmlReset = 1
						}
					}
				}).catch(e => {
					console.log(e)
					that.htmlReset = 1
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})


			},

			ggShow(name, value, idx) {
				var that = this
				var newselect = {
					name: name,
					value: value,
				}
				// var show_select=JSON.parse(JSON.stringify(that.guige_select))
				// show_select[idx]=newselect




				var show_arr = []
				for (var i = 0; i < that.guige.length; i++) {
					var str = JSON.stringify(that.guige[i].sku)
					var push_type = true
					for (var s = 0; s < that.guige_arr.length; s++) {
						var a = false
						if (that.guige_select[s]) {
							a = JSON.stringify(that.guige_select[s])
						}
						if (s == idx) {
							a = JSON.stringify(newselect)
						}

						// console.log(a=='false')
						if (!a || a == 'false') {
							push_type = true
							// console.log('跳过'+a)
						} else if (str.indexOf(a) == -1) {
							// console.log(that.guige[i].sku)
							// console.log('-1'+a)
							push_type = false
							break
						}

					}
					// console.log(a,push_type)
					if (push_type) {
						show_arr.push(that.guige[i])
					}

				}
				// console.log(show_arr)
				// console.log(value,show_arr)
				if (show_arr.length > 0) {
					return true
				}
				return false
				// var str=that.guige_arr_show[idx].value
				// var a=value
				// if(str.indexOf(a)!=-1){
				// 	return true

				// }
				// return false
			},

			//选择规格
			selegg(e) {
				var that = this
				// console.log(e.currentTarget.dataset.name)
				console.log(e.currentTarget.dataset.value)
				// console.log(e.currentTarget.dataset.ggidx)

				var newselect = {
					name: e.currentTarget.dataset.name,
					value: e.currentTarget.dataset.value,
				}
				// that.type1[e.currentTarget.dataset.ggidx] = newselect

				// this.type1= this.type1
				// var ggs = this.guige
				// var ggidxs = this.type1
				var str = JSON.stringify(that.guige_select)
				var a = JSON.stringify(newselect)

				var id_kg = false
				if (str.indexOf(a) == -1) {
					that.$set(that.guige_select, e.currentTarget.dataset.ggidx, newselect)

				} else {
					// console.log(str.indexOf(a)==-1)
					that.$set(that.guige_select, e.currentTarget.dataset.ggidx, false)
					id_kg = true
					// console.log(that.guige_select)
				}
				// console.log(str.indexOf(a)==-1)
				// console.log(a,str)
				var show_arr = []
				for (var i = 0; i < that.guige.length; i++) {
					// console.log('---------------------------------------')
					// console.log({...that.guige[i].guige,newselect})
					// console.log('---------------------------------------')
					// console.log(that.guige[i].guige.indexOf(newselect.value))
					var str = JSON.stringify(that.guige[i].sku)
					var push_type = true
					for (var s = 0; s < that.guige_select.length; s++) {

						if (!that.guige_select[s]) {
							push_type = true
						} else {
							var a = JSON.stringify(that.guige_select[s])
							if (a.length > 0 && str.indexOf(a) == -1) {
								// console.log(that.guige[i].sku)
								push_type = false
								break

							}
						}

					}
					if (push_type) {
						show_arr.push(that.guige[i])
					}

				}
				// console.log('show_arr---------------------->')
				console.log(show_arr)
				var idx = e.currentTarget.dataset.ggidx
				var kucun_num = 0
				var pri = 0
				var sku_img = ''
				for (var i = 0; i < show_arr.length; i++) {
					kucun_num += show_arr[i].number
					if (pri == 0) {
						that.v_id = show_arr[i].v_id
						if (id_kg) {
							that.v_id = 0
						}
						pri = show_arr[i].current_price
					}
					if (sku_img == "") {
						sku_img = show_arr[i].v_img
					}
				}
				/*for(var i=0;i<	that.guige_arr.length;i++){
					var newVal=[]
					
					if(i!=idx){
						
						for(var j=0;j<	show_arr.length;j++){
							for(var s=0;s<	show_arr[j].sku.length;s++){
								
								if(show_arr[j].sku[s].name==that.guige_arr[i].name){
									var a=show_arr[j].sku[s].value
									// console.log(that.guige_arr[i].name,a)
									if(newVal.indexOf(a)==-1){
										newVal.push(a)
										if(pri==0){
											pri=show_arr[j].current_price
										}
										if(sku_img==""){
											sku_img=show_arr[j].v_img
										}
										kucun_num+=show_arr[j].number
										console.log(kucun_num)
									}
								}
							}
						}
						// console.log(newVal)
						that.$set(that.guige_arr_show[i],'value',newVal)
						newVal=[]
						
					}else{
						// that.$set(that.guige_arr_show[i],'value',that.guige_arr[i].value)
					}
				}*/
				that.show_pri = pri
				that.show_num = kucun_num
				if (kucun_num < that.cnum) {
					that.cnum = kucun_num
				}
				if (kucun_num > 0 && that.cnum == 0) {
					that.cnum = 1
				}
				that.show_img = sku_img
				if (that.show_img.length == 0) {
					that.show_img = that.goodsData.img
				}
				if (that.show_pri == 0) {
					that.show_pri = that.goodsData.current_price
				}

			},
			goods_num(type){
				if (that.guige_select.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请先选择规格'
					})
					this.cnum = 0
					return
				}
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
			//数量
			onChange(e) {
				var that = this

				//显示优选的购买
				// if(that.goodsData.is_pond_goods==2){
				// 	this.cnum= 1
				// 	return
				// }
				// console.log(e.detail)
				if (that.guige_select.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请先选择规格'
					})
					this.cnum = 0
					return
				}
				if (this.cnum > this.show_num) {
					this.cnum = this.show_num
					return
				}
				if (this.cnum <1) {
					this.cnum = 1
					return
				}
				// this.data.goods_sele[idx].num=e.detail
				this.cnum = e.detail

			},
			//加入购物车
			addwgc() {
				// if (!wx.getStorageSync('userWxmsg')) {
				//   wx.navigateTo({
				//     url: '/pages/login/login',
				//   })
				//   return
				// }
				// that.onClose()
				// wx.showToast({
				// 	title: '添加成功'
				// })
				// return
				let that = this
				if (!that.v_id || that.guige_select.length != that.guige_arr.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择规格'
					})
					return
				}
				for (var i; i < that.guige_arr.length; i++) {
					if (that.guige_select[i] == 'false') {
						uni.showToast({
							icon: 'none',
							title: '请选择' + that.guige_arr[i].name
						})
						return
					}
				}
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)

				console.log('addwgc')
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var jkurl = '/cart/add'
				var datas = {
					
					token: that.$store.state.loginDatas.userToken||'',
					g_id: that.g_id,
					v_id: that.v_id,
					sum: that.cnum,
					// advocacyId: that.dy_id,
					// advocacyviceId: that.advocacyviceId,
					// advocacy_user_id: that.dyr_type
				}
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.onClose()
						wx.showToast({
							title: '添加成功'
						})
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			nowbuy() {
				let that = this
				if (!that.v_id || that.guige_select.length != that.guige_arr.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择规格'
					})
					return
				}
				for (var i; i < that.guige_arr.length; i++) {
					if (that.guige_select[i] == 'false') {
						uni.showToast({
							icon: 'none',
							title: '请选择' + that.guige_arr[i].name
						})
						return
					}
				}
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)

				console.log('addwgc')
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				that.onClose()
				// advocacyId:that.dy_id,
				// advocacyviceId:that.advocacyviceId,
				uni.navigateTo({
					url: '/pagesA/Order/Order?type=1&v_id=' + that.v_id + '&number=' + that.cnum + '&advocacy_user_id=' + that.dyr_type +
						 '&dy_id=' + that.dy_id + '&advocacyviceId=' + that.advocacyviceId
				})
			},
			bm_fuc() {
				// var id = e.currentTarget.dataset.id
				// var newdata = this.pinpai
				// newdata[idx].bm = 2
				// this.pinpai= newdata
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var datas = {
					token: that.loginMsg.userToken,
					id: that.goodsData.activity_id
				}
				// 单个请求
				service.P_post('/activity/join', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.btnkg = 0

						that.$set(that.goodsData, 'is_apply', 2)
						uni.showToast({
							title: '报名成功'
						})
					} else {
						that.btnkg = 0
						// that.getdata()
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			jump(e) {
				var that = this
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 2000)
				}
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
			},
			onClose() {
				this.sheetshow = false
				this.sheetshow1 = false
				// this.$refs.popup.close()
				this.$refs.popup_goods.close()
			},
			sheetshow_fuc() {
				if (this.goodsData.activity_id !== 0 && this.goodsData.is_apply == 1) {
					this.bm_fuc()
				}
				this.sheetshow = true
				this.btnkg = 0
				this.$refs.popup_goods.open()

			},
			sheetshow1_fuc() {
				if (this.star_list.length == 0) return
				this.sheetshow1 = true
				this.$refs.popup.open()
				this.btnkg = 0

			},
			gb_yhtk() {
				this.$refs.popup_yh.close()
			},
			tkchange0(e) {
				console.log(e)
				this.sheetshow = e.show
			},
			tkchange(e) {
				console.log(e)
				this.sheetshow = e.show
			},
			tkchange1(e) {
				console.log(e)
				this.sheetshow1 = e.show
			},
			swiper_change(e) {
				// console.log(e.detail )
				var num = e.detail.current + 1
				this.cur_swiper = num
			},

			txtype_fuc(id) {
				if (this.dyr_type == id) {
					// this.dyr_type= 0
				} else {
					this.dyr_type = id
				}
				console.log(this.dyr_type)
			},
			xz_dyr() {
				console.log(this.dyr_type)
				this.sheetshow1 = false
				this.$refs.popup.close()
			},
			call(e) {
				service.call(e)
			},

			pveimg(e) {
				service.pveimg(e)
			},
		}
	}
</script>

<style scoped>
	.hb_tk {
		/* width: 750upx;
	height: 976upx; */
		width: 660rpx;
		height: 763rpx;

		/* background: #f00; */
		padding: 320upx 80upx 20upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-radius: 10upx;
		margin-bottom: 20upx;
		background-position: top;
		background-size: contain;
		background-repeat: no-repeat;
		position: relative;
		z-index: 9999;
	}

	.hb_tk_img {
		position: absolute;
		z-index: 9998;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.yh_gb_btn {
		width: 80upx;
		height: 80upx;
	}

	.goods_yh_li {
		width: 100%;
		min-height: 100upx;
		margin-bottom: 20upx;
		color: #fff;
		align-items: stretch;
		background: #fff;
	}

	.goods_yh_pri {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120upx;
		background: linear-gradient(0deg, rgba(254, 86, 6, 1) 0%, rgba(248, 190, 58, 1) 100%);
	}

	.goods_yh_pri .d1 {
		align-items: baseline;
		font-size: 40upx;
	}

	.goods_yh_pri .d1 text,
	.goods_yh_pri .d2 {
		align-items: baseline;
		font-size: 20upx;
	}

	.goods_get {
		padding: 0 20upx;
		align-items: center;
		justify-content: center;
	}

	.goods_get_btn {
		padding: 5upx 10upx;
		border: 1px solid #F8BE3A;
		color: #F8BE3A;
		font-size: 24upx;
	}

	.goods_get_btn1 {
		border: 1px solid #ddd;
		color: #ddd;
	}

	.goods_yhmsg {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20upx 0 20upx 20upx;
	}

	.yh_type {
		font-size: 26upx;
		color: #333;
	}

	.yh_time {
		font-size: 22upx;
		color: #999;
	}





	.container {
		padding-bottom: 100rpx;
		background: #f5f5f5;
	}

	image {
		/* width: 100%;
	height: 100%; */
	}

	.swiper_box {
		width: 750rpx;
		height: 750rpx;
		position: relative;
	}

	.swiper {
		width: 100%;
		height: 750rpx;
		position: relative;
		z-index: 99;
	}

	.swiper image {
		width: 100%;
		height: 750rpx;
	}

	.br_box {
		z-index: 100;
		position: absolute;
		bottom: 40rpx;
		right: 40rpx;
		width: 66rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 18rpx;
		font-size: 26rpx;
		color: #eee;
		text-align: center;
		line-height: 36rpx;
	}

	.goods_msg {
		width: 100%;
		padding: 28rpx 0 15rpx;
		background: #fff;
	}




	.goods_bz {
		border-top: 1px solid #eee;
		padding: 20rpx 28rpx 0;
		box-sizing: border-box;
		width: 100%;
	}

	.g_bz_1 {
		font-size: 26rpx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.g_bz_1 text {
		width: 118rpx;
		height: 38rpx;
		background: rgba(247, 59, 103, 1);
		border-radius: 10rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
	}

	.bz_li {
		margin-top: 15rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.bz_li view {
		width: 33%;
		font-size: 24rpx;
		text-align: center;
		color: #999;
	}

	.goods_xmsg {
		display: flex;
		width: 100%;
		padding: 22rpx 28rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 1px solid #eee;
		justify-content: space-between;
		align-items: center;
	}

	.goods_xmsg .v1 {
		width: 3em;
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #333;
	}

	.goods_xmsg .v2 {
		flex: 1;
		font-size: 24rpx;
		color: #bbb;
		display: flex;
		align-items: center;
	}

	.goods_xmsg .v3 {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}

	.goods_xmsg .v3 text {
		font-size: 20rpx;
		color: #bbb;
	}

	.yhq_box {
		width: 90rpx;
		height: 40rpx;
		background: rgba(250, 233, 234, 1);
		border: 2rpx solid rgba(247, 85, 89, 1);
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #F8757A;
		margin-right: 10rpx;
	}

	.goods_xmsg .v21 {
		font-size: 23rpx;
		color: #333;
		flex-direction: row-reverse;
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

	/*  */

	.dyr_text {
		width: 100%;


		background: #fff;
		height: 286rpx;
		display: flex;
		white-space: nowrap;
		margin-bottom: 20rpx;

	}

	.dyr_text1 {
		padding: 10rpx 29rpx 40rpx;
		box-sizing: border-box;
		height: 286rpx;
	}

	.dyr_li {
		display: inline-flex;
		width: 480rpx;
		height: 240rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		margin-right: 20rpx;
		/* flex-direction: column; */
		align-items: center;
		/* padding: 17rpx; */
		box-sizing: border-box;
	}

	.dyr_msg {
		width: 240rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.dyr_img {
		flex: none;
		width: 240rpx;
		height: 240rpx;
		border-radius: 0px 10rpx 10rpx 0px;
		position: relative;
		z-index: 1;
	}

	.dyr_imgnum {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		z-index: 9;
		height: 29rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		font-size: 16rpx;
		color: #fff;
		padding: 0 10rpx;
	}

	.dyr_imgnum text {
		font-size: 14rpx;
		margin-right: 8rpx;
	}

	.dyr_d {
		color: #999;
		font-size: 24rpx;
		white-space: pre-line;
	}

	.dp_box {
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #eee;
		padding: 20rpx 28rpx;
		box-sizing: border-box;


	}

	.dp_b1 {
		width: 100%;
		display: flex;
	}

	.dp_logo {
		width: 123rpx;
		height: 123rpx;
		border-radius: 10rpx;
		border: 1px solid #eee;
	}

	.dp_logo image {
		width: 123rpx;
		height: 123rpx;
		border-radius: 10rpx;
	}

	.dp_msg {
		flex: 1;
		height: 123rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.dp_name {
		font-size: 28rpx;
	}

	.dp_lv {
		display: flex;
		align-items: center;
	}

	.dp_lv image {
		width: 31rpx;
		height: 25rpx;
		margin-right: 10rpx;
	}

	.dp_bq {
		font-size: 24rpx;
		color: #bbb;
		display: flex;
		align-items: center;
	}

	.dp_bq text {
		margin-right: 20rpx;
	}

	.dp_bq .bq {
		width: 28rpx;
		height: 28rpx;
		background: rgba(241, 241, 241, 1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dp_cz {
		margin-top: 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.dp_cz view {
		width: 336rpx;
		height: 80rpx;
		background: rgba(241, 241, 241, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}

	.htk {
		padding-top: 20rpx;
		padding-bottom: 30rpx;
		width: 100%;
		background: #fff;
	}

	.htk_img {
		width: 143rpx;
		height: 67rpx;
	}

	.htk_text {
		padding: 0 28rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
	}

	.htk_msg {
		margin-top: 15rpx;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.htk_tx {
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
	}

	.htk_name {
		font-size: 26rpx;
		color: #999;
		margin-left: 10rpx;
	}

	.htk_num {
		height: 32rpx;
		background: rgba(248, 89, 81, .2);
		border-radius: 4px;
		padding: 0 9rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #F85951;
		margin-left: 10rpx;
	}

	/* goods_list */
	.goods_list {
		width: 100%;
		display: flex;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.goods_li {
		width: 223rpx;
		margin-right: 12rpx;
	}

	.goods_li:nth-child(3n) {
		margin-right: 0
	}

	.goods_img {
		width: 223rpx;
		height: 223rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.htk_goods_name {
		margin-top: 10rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666;
	}

	.htk_goods_pri {
		font-size: 26rpx;
		color: #F85951;
	}

	.htk_goods_pri text {
		font-size: 36rpx;
	}

	/* 详情 */
	.goods_xq {
		width: 100%;
		background: #fff;
	}

	.xq_tit {

		width: 100%;
		display: flex;
		font-size: 28rpx;
		color: #333;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.xq_tit text {
		margin: 0 10rpx;
		color: #bbb;
	}

	.xq_box {
		width: 100%;
		padding: 0 30upx;
	}

	.xq_box img {
		max-width: 100%;
	}

	/* bottom_box */
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

	.sj_list {
		width: 154rpx;
		height: 56rpx;
		display: flex;
		flex-direction: row-reverse;
		position: relative;
		margin-right: 20rpx;
	}

	.sj_li {
		width: 56rpx;
		height: 56rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 10rpx 0px rgba(119, 119, 119, 0.2);
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 6;
	}

	.sj_li:nth-child(2) {
		left: 36rpx;
		z-index: 7;
	}

	.sj_li:nth-child(3) {
		left: 72rpx;
		z-index: 8;
	}

	.sj_li:nth-child(4) {
		left: 98rpx;
		z-index: 9;
	}

	.sj_li:nth-child(5) {
		left: 134rpx;
		z-index: 10;
	}


	/***/
	.b_view_o {
		width: 100%;
		height: 120rpx;
		background: #fff;
	}

	.popopBox {
		width: 100%;
		padding: 20rpx 28rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: auto;
		position: relative;
		z-index: 999;
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

	.goodstkjg {
		flex: 1;
		position: relative;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around
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

	.kucun {
		color: #333;
		font-size:26rpx;
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

	.tkguigetit {
		font-size: 26rpx;
		color: #333;
		padding: 20rpx 0 20rpx;
	}

	.guigeBox {
		display: felx;
		align-items: center;
	}

	.guigeOne {
		/* width: 114rpx; */
		min-width: 150upx;
		height: 56rpx;
		padding: 0 10rpx;
		border-radius: 8rpx;
		/* border: 1px solid #ddd; */
		background: #F0F0F0;
		color: #999;
		font-size: 26rpx;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.guigeOne.cur {
		background: #F84336;
		/* border: 1px solid #F84336; */
		color: #fff;
	}

	.guigeOne.goods_null {
		background: #eee !important;
		/* border: 1px solid #ddd !important; */
		color: #ddd !important;
		text-decoration: line-through;
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

	.shuxian {
		width: 1px;
		height: 90rpx;
		margin: 0 15rpx;
		background-color: #eeeeee;
	}

	.contbox {
		width: 100%;
		padding: 10rpx 28rpx;
		box-sizing: border-box;
		background-color: #fff;
	}



	.tcc {
		width: 80vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hiddenbox {
		width: 0;
		height: 0;
		overflow: hidden;
		opacity: 0;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: -1;
	}

	.htoi {
		position: relative;
		width: 750px;
		height: 1206px;
		/* box-shadow:4rpx 4rpx 8rpx rgba(0,0,0,0.5); */
		/* margin-top: 20px; */
		/* transform:scale(.5); */
		opacity: 0;
		z-index: -1;
	}

	.showimg {
		width: 375rpx;
		height: 603rpx;
		margin-top: 20px;
		background-color: #eee;
	}

	.saveimg {
		width: 300rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #f75852;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		margin-top: 40rpx;
		margin-bottom: 20px;
	}

	action-sheet-item {
		padding: 0 !important;
		position: relative;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff !important;
		opacity: 0;
	}

	.guige {
		position: relative;
	}

	/* 选择代言人 */
	/* .uni-popup__wrapper-box{
	background: #fff;
} */
	.dy_box {
		width: 100%;
		padding: 0 0 20rpx;
		margin: 0 auto;
		box-sizing: border-box;
		background: #fff;
	}

	.dyr_scroll {
		width: 694rpx;
		margin: 0 auto;
		position: relative;
	}

	.tk_dyr_li {
		width: 100%;
		height: 106rpx;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tk_user_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
	}

	.tk_user_v {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 27rpx;
		height: 28rpx;
	}

	.tk_user_name {
		font-size: 30rpx;
		color: #333;
		margin: 0 15rpx;
	}

	.hy_bq {
		color: #FE3569;
		width: 60rpx;
		height: 32rpx;
		border: 1px solid rgba(254, 53, 105, 1);
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		line-height: 22rpx;
		margin-right: 5rpx;
	}

	.hy_bq1 {
		color: #FEC335;
		border: 1px solid #FEC335;
	}

	.hy_bq2 {
		color: #3598FE;
		border: 1px solid #3598FE;
	}

	.dy_btn {
		position: fixed;
		bottom: 20rpx;
		left: 28rpx;
		right: 28rpx;
		height: 98rpx;
		background: rgba(244, 116, 22, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
	}

	.tx_type2 {
		width: 38rpx;
		height: 38rpx;
		border: 1px solid rgba(210, 210, 210, 1);
		border-radius: 50%;
	}


	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.container-ban {
		height: 100vh;
		overflow: hidden;
	}



	/* like_tit */
	.you_like {
		width: 100%;
		background: #fff;
	}

	.like_tit {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}

	.like_tit text {
		width: 60rpx;
		height: 1px;
		background: #eee;
		margin: 0 20rpx;
	}

	.goods_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0 28rpx 40rpx;
		box-sizing: border-box;
	}

	.like_goods_li {
		width: 338rpx;
		height: 468rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		margin-bottom: 16rpx;
	}

	.like_goods_li:nth-child(2n) {
		margin-left: 16rpx;
		/* margin-right: 0; */
	}

	.like_goods_li .goods_img {
		width: 100%;
		height: 338rpx;
		border-radius: 10rpx 10rpx 0px 0px;
	}

	.like_goods_li .goods_msg {
		width: 100%;
		box-sizing: border-box;
		padding: 15rpx 24rpx;
		font-size: 28rpx;
		color: #333;
	}

	.like_goods_li .goods_pri {
		color: #e53030;
		font-size: 36rpx;
	}

	.like_goods_li .goods_pri .pr2 {
		font-size: 28rpx;
		font-family: "PingFangSC";
		color: rgb(153, 153, 153);
		text-decoration: line-through;
	}


	/* new */
	.goods_name {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		padding: 0 28rpx;
		margin-bottom: 14rpx;
		box-sizing: border-box;
		/* flex-wrap: wrap; */
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.goods_name_text {
		font-size: 34upx;
		color: #333;
	}

	.goods_share {
		flex: none;
		width: 75upx;
		height: 75upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 5px 0px rgba(178, 178, 178, 0.35);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10upx;
	}

	.goods_share text {
		font-size: 32upx;
		color: #FC3B27;
	}

	.goods_pri_box{
		width: 100%;
		padding: 0 30upx;
		align-items: baseline;
	}
	.pri {
		font-size: 40rpx;
		color: #FD383B;
	}



	.pri text {
		font-size: 27rpx;
	}

	.pri1 {
		font-size: 35upx;
		color: #999;
		margin-left: 15upx;
	}
	.sku_box{
		width: 100%;
		min-height: 60upx;
		align-items: center;
		flex-wrap: wrap;
	}
	.sku_li{
		width: 50%;
		padding: 0 30upx;
		font-size: 24upx;
		color: #666;
		height: 40upx;
	}
	.sku_bg{
		width: 27upx;
		height: 27upx;
		background: linear-gradient(5deg, #FDBA35, #FF901B);
		border: 1px solid #FFFFFF;
		border-radius: 4upx;
		margin-right: 10upx;
		font-size: 18upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.hengxian{
		width: 100%;
		height: 10upx;
		background: #F5F5F5;
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
</style>
