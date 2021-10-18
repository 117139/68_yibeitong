<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0" class="main">
			<view class="order_box1">
				<image :src="getimg('/static/images/images/order_xq_bg_02.jpg')"></image>
				
				<view class="order_tit">
					<view class="ot_msg">
						<view class="d1">物流信息</view>
					</view>
				</view>
				
			</view>
			<view class="goodsBox">
				<view class="goods">
					<block  v-if="datas.gd_name">
						<view class="goods1" @tap="jump" :data-url="'/pages/details/details?id='+datas.g_id">
							<view class="goodsImg">
								<image v-if="datas.gd_vice_pic.length>0" class="goodsImg" :src="getimg(datas.gd_vice_pic[0])" mode="aspectFill"></image>
								<image v-else class="goodsImg" :src="getimg(datas.gd_mastr_pic[0])" mode="aspectFill"></image>
								<!-- <image class="goodsImg" :src="getimg('/static/images/index_12.jpg')" mode="aspectFill"></image> -->
							</view>
							<view class="goodsinr flex_1">
								<!-- <view class="goodsname fz30 c30 oh1">{{item_name}}</view> -->
								<view class="goodsname">{{datas.gd_name}}</view>
								<view class="goodspri"><text v-for="(item1,idx1) in datas.gd_attr">{{item1.value+' '}}</text></view>
								<view class="goodspri1">
									<!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
									<view class="goods_pri">
										￥<text >{{datas.single_price}}</text>
									</view>
									<view>×{{datas.number}}</view>
								</view>
							</view>
						</view>
					</block>
					<block  v-if="datas1.length>0">
						<view class="goods1" v-for="(item,index) in datas1" @tap="jump" :data-url="'/pages/details/details?id='+datas.g_id">
							<view class="goodsImg">
								<image v-if="item.gd_vice_pic.length>0" class="goodsImg" :src="getimg(item.gd_vice_pic[0])" mode="aspectFill"></image>
								<image v-else class="goodsImg" :src="getimg(item.gd_mastr_pic[0])" mode="aspectFill"></image>
								<!-- <image class="goodsImg" :src="getimg('/static/images/index_12.jpg')" mode="aspectFill"></image> -->
							</view>
							<view class="goodsinr flex_1">
								<!-- <view class="goodsname fz30 c30 oh1">{{item_name}}</view> -->
								<view class="goodsname">{{item.gd_name}}</view>
								<view class="goodspri"><text v-for="(item1,idx1) in item.gd_attr">{{item1.value+' '}}</text></view>
								<view class="goodspri1">
									<!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
									<view class="goods_pri">
										￥<text >{{item.single_price}}</text>
									</view>
									<view>×{{item.number}}</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<block v-if="isJd==0">
				<block v-if="wl_data.logistics">
					<view class="wuliu_tit boxsiz dis_flex">
						<view class="flex_1 dis_flex">
							<!-- <view class="wl_icon p_img_div" :style="'background-image: url('+filter.imgIP(wl_data.g_img)+');'"></view> -->
							<view class="dis_flex ju_a wl_tit_msg">
								<view v-html="'快递名称：'+wl_data.logistics_name">{{wl_data.logistics_name}}</view>
								<view class="dis_flex aic">快递单号：
									<em id="copy1_msg" v-html="wl_data.logistics">{{wl_data.logistics}}</em>
									<!-- <span class="dis_flex aic ju_c"  id="copy1">复制</span> -->
								</view>
							</view>
						</view>
						<!-- <view class="flex0 wl_btn dis_flex aic ">
					    <img src="../../image/wl_kf.png" alt="">
					    <span>物流服务</span>
					  </view> -->
					</view>
					<view class="wx_list boxsiz">
						<view class="wx_li boxsiz" v-for="(item,index) in wl_data.wuliu">
							<view class="wl_time">
								<view v-html="gettime(item.time,1)">03-11</view>
								<view v-html="gettime(item.time,2)">08:20</view>
							</view>
							<view class="wl_msg boxsiz">
								<!-- <view>已签收</view> -->
								<view v-html="item.status">快件到达【山东省潍坊集中中心】，准备发往山东潍坊小区30000 </view>
							</view>
						</view>
					</view>
				</block>
				<view v-else class="zanwu">暂无数据</view>
			</block>
			<block v-if="isJd==1">
				<block v-if="wl_data.waybillCode">
					<view class="wuliu_tit boxsiz dis_flex">
						<view class="flex_1 dis_flex">
							<!-- <view class="wl_icon p_img_div" :style="'background-image: url('+filter.imgIP(wl_data.g_img)+');'"></view> -->
							<view class="dis_flex ju_a wl_tit_msg">
								<view v-html="'快递名称：'+wl_data.waybillCode[0].carrier">{{wl_data.waybillCode[0].carrier}}</view>
								<view class="dis_flex aic">快递单号：
									<em id="copy1_msg" v-html="wl_data.waybillCode[0].orderId">{{wl_data.waybillCode[0].orderId}}</em>
									<!-- <span class="dis_flex aic ju_c"  id="copy1">复制</span> -->
								</view>
							</view>
						</view>
						<!-- <view class="flex0 wl_btn dis_flex aic ">
					    <img src="../../image/wl_kf.png" alt="">
					    <span>物流服务</span>
					  </view> -->
					</view>
					<view class="wx_list boxsiz">
						<view class="wx_li boxsiz" v-for="(item,index) in wl_data.orderTrack">
							<view class="wl_time">
								<view v-html="gettime(item.msgTime,1)">03-11</view>
								<view v-html="gettime(item.msgTime,2)">08:20</view>
							</view>
							<view class="wl_msg boxsiz">
								<view v-if="item.operator">{{item.operator}}</view>
								<view v-html="item.content">快件到达【山东省潍坊集中中心】，准备发往山东潍坊小区30000 </view>
							</view>
						</view>
					</view>
				</block>
				<view v-else class="zanwu">暂无数据</view>
			</block>
		</view>
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
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
				htmlReset:-1,
				id: '',
				wl_data: {},
				isJd:0,
				ztype:0,
				datas:'',
				datas1:[]
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
			
			that.id = option.id
			that.isJd = option.is_jd||0
			that.wuNum = option.num
			that.ztype=option.ztype||0   //0 售后  1订单
			if(option.datas){
				that.datas=JSON.parse(option.datas)
			}
			if(option.datas1){
				that.datas1=JSON.parse(option.datas1)
				console.log(that.datas1)
			}
			that.getMsg()
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin'
			])
		},
		methods: {
			gettime(str, type) {
				if (!str) {
					return
				}
				var sendtime = new Date(str)
				var sendYear = sendtime.getFullYear()
				var sendMonth = sendtime.getMonth() + 1
				var sendDate = sendtime.getDate()
				var sendHours = sendtime.getHours()
				var sendMinutes = sendtime.getMinutes()
				if (sendMinutes < 10) {
					sendMinutes = '0' + sendMinutes
				}
				if (type == 1) {
					return sendMonth + '-' + sendDate
				} else {
					return sendHours + ':' + sendMinutes
				}
			},
			getimg(img) {
				return service.getimg(img)
			},
			getMsg() {
				var jkurl = '/after_sale.AfterSale/lookLogistics'
				var datas = {
					token: that.loginDatas.userToken,
					id: that.id
				}
				if(that.ztype==1){  //订单
					if(that.isJd == 0){
						jkurl = '/order/lookLogistics'
						datas = {
							token: that.loginDatas.userToken,
							oid: that.id
						}
					}
					if(that.isJd == 1){
						jkurl = '/jd.JdOrder/queryDeliveryNo'
						datas = {
							token: that.loginDatas.userToken,
							o_order_num: that.wuNum
						}
					}
				}else{
					if(that.isJd == 1){
						jkurl = '/jd.JdAfterSale/queryDeliveryNo'
						datas = {
							token: that.loginDatas.userToken,
							jd_o_after_sale_id: that.wuNum
						}
					}
				}
				
				if (that.data_last) return
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.htmlReset=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.wl_data = datas
					}
				}).catch(e => {
					that.htmlReset=1
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
	#wrap {
		width: 100%;

		box-sizing: border-box;
		background: #FBFBFB;
	}

	.main {
		width: 100%;
		padding: 20upx 30upx 0;
		box-sizing: border-box;
	}

	.wuliu_tit {
		width: 100%;
		padding: 15upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		margin-bottom: 20upx;
		border-bottom: 1px solid #ddd;
	}

	.wl_btn {
		flex-direction: column;
		width: 10upx;
		font-size: 24upx;
		color: #999;
	}

	.wl_btn img {
		width: 40upx;
		margin-bottom: 10upx;
	}

	.wl_icon {
		width: 10upx;
		height: 10upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}

	.wl_tit_msg {
		/* font-size: 24upx; */
		font-size: 32upx;
		color: #000;
		flex-direction: column;
	}

	.wl_tit_msg span {
		width: 66upx;
		height: 30upx;
		border-radius: 3px;
		border: 1px solid #000;
		margin-left: 20upx;
	}

	.wx_list {
		width: 100%;
		padding: 40upx 24upx 50upx 100upx;
		background: #fff;
		border-radius: 2px;

	}

	.wx_li {
		border-left: 1px solid #C4C4C4;
		position: relative;

		min-height: 170upx;
	}

	.wx_li::before {
		content: '';
		position: absolute;
		top: 0;
		left: -6upx;
		width: 10upx;
		height: 10upx;
		background: #C4C4C4;
		border-radius: 50%;
	}

	.wx_li:first-child::before {
		content: '';
		width: 24upx;
		height: 24upx;
		left: -14upx;
		/* background-image: url(../../image/wl_li.png); */
		background: #FF0000;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.wx_li:last-child {
		border-left: 1px solid transparent;
	}

	.wl_time {
		position: absolute;
		left: -100upx;
		width: 100upx;
		text-align: center;
		top: -30upx;
		color: #999;
		/* font-size: 24upx; */
		font-size: 28upx;
	}

	.wl_msg {
		position: relative;
		left: 0;
		top: -30upx;
		width: 100%;
		padding-left: 20upx;
		color: #999;
		padding-bottom: 20upx;
		/* font-size: 24upx; */
		/* font-size: 28upx; */
		font-size: 32upx;
	}

	.wx_li:first-child .wl_time,
	.wx_li:first-child .wl_msg {
		color: #333;
	}
	
	
	
	image {
		width: 100%;
		height: 100%;
	}
	.order_box1 {
		width: 100%;
	
		height: 246upx;
		position: relative;
	}
	
	.order_tit {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		
		padding-left: 50rpx;
		display: flex;
		align-items: center;
	}
	
	.type_img {
		width: 69rpx;
		height: 70rpx;
		margin-right: 22rpx;
	}
	
	.ot_msg {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #fff;
	}
	
	.ot_msg .d1 {
		/* font-size: 30rpx; */
		font-size: 38rpx;
	}
	
	.ot_msg .d2 {
		font-size: 24rpx;
	}
	
	
	
	.goodsBox {
		width: 100%;
		padding: 0;
	}
	.goods {
		width: 100%;
		background-color: #fff;
		border-bottom: 10rpx solid #F1F1F1;
		/* margin-bottom: 20rpx; */
	}
	
	.goods1 {
		width: 100%;
		padding: 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid #ddd; */
		position: relative;
	}
	
	
	
	
	.goodsname {
		/* font-size: 27rpx;
		line-height: 35upx; */
		font-size: 32rpx;
		line-height: 42upx;
		max-height: 84rpx;
		color: #333333;
		margin-bottom: 5rpx;
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.goodspri {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 5rpx;
	}
	
	.scx {
		text-decoration: line-through;
	}
	
	.goodspri1 {
		font-size: 30rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goodsImg {
		width: 163upx;
		height: 163upx;
		margin-right: 30rpx;
		flex:none;
	}
	.goodsImg image {
		width: 100%;
		height: 100%;
	}
</style>
