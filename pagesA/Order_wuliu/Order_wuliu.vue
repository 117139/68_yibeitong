<template>
	<view class="minh100">
		<view class="zanwu" v-if="!wl_data">暂无数据</view>
		<view v-else class="main">
			<view class="wuliu_tit boxsiz dis_flex">
				<view class="flex_1 dis_flex">
					<!-- <view class="wl_icon p_img_div" :style="'background-image: url('+filter.imgIP(wl_data.g_img)+');'"></view> -->
					<view class="dis_flex ju_a wl_tit_msg">
						<view v-html="wl_data.logistics_name">邮政快递包裹</view>
						<view class="dis_flex aic">快递单号：
							<em id="copy1_msg" v-html="wl_data.logistics">9851548135482</em>
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
				id: '',
				wl_data: {
					"logistics": "4311701734931",
					"logistics_name": "韵达快递",
					"wuliu": [{
						"time": "2021-01-12 20:28:49",
						"status": "【临汾市】您的快件已被 赵城派出所对面 代签收，地址：赵城镇永安大街64号，如有疑问请电联快递员：续美荣【18835725582】。"
					}, {
						"time": "2021-01-12 18:53:54",
						"status": "【临汾市】山西洪洞县公司赵城镇分部 快递员 续美荣18835725582 正在为您派件【95114\/95121\/95013\/95546为韵达快递员外呼专属号码，请放心接听】"
					}, {
						"time": "2021-01-12 16:51:16",
						"status": "【临汾市】已离开 山西洪洞县公司；发往 山西洪洞县公司赵城镇分部"
					}, {
						"time": "2021-01-12 14:36:36",
						"status": "【临汾市】已到达 山西洪洞县公司"
					}, {
						"time": "2021-01-12 07:40:45",
						"status": "【太原市】已离开 山西太原分拨中心；发往 山西洪洞县公司"
					}, {
						"time": "2021-01-12 07:27:46",
						"status": "【太原市】已到达 山西太原分拨中心"
					}, {
						"time": "2021-01-11 02:22:47",
						"status": "【嘉兴市】已离开 浙江杭州分拨中心；发往 山西太原分拨中心"
					}, {
						"time": "2021-01-11 02:19:16",
						"status": "【嘉兴市】已到达 浙江杭州分拨中心"
					}, {
						"time": "2021-01-10 23:29:41",
						"status": "【嘉兴市】已离开 浙江嘉兴分拨中心；发往 浙江杭州分拨中心"
					}, {
						"time": "2021-01-10 23:25:07",
						"status": "【嘉兴市】已到达 浙江嘉兴分拨中心"
					}, {
						"time": "2021-01-10 21:51:01",
						"status": "【嘉兴市】已离开 浙江桐乡市公司；发往 山西太原分拨中心"
					}, {
						"time": "2021-01-10 21:44:42",
						"status": "【嘉兴市】浙江桐乡市公司 已揽收"
					}]

				}
			}
		},
		onLoad(option) {
			that = this
			that.id = option.id
			// that.getMsg()
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
				var jkurl = '/order/lookLogistics'
				var datas = {
					token: that.loginDatas.userToken,
					oid: that.id
				}
				if (that.data_last) return
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
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
		font-size: 24upx;
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
		font-size: 24upx;
	}

	.wl_msg {
		position: relative;
		left: 0;
		top: -30upx;
		width: 100%;
		padding-left: 20upx;
		color: #999;
		padding-bottom: 20upx;
		font-size: 24upx;
	}

	.wx_li:first-child .wl_time,
	.wx_li:first-child .wl_msg {
		color: #333;
	}
</style>
