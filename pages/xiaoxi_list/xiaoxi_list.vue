<template>

	<view class="content">
		<view class="contentRow"  @click="jump" :data-url="`/pagesLzc/newList/newList?type=系统消息`">
			<view class="contentRow1 dis_flex ju_b ais">
				<image src="../../static/images/liu/sort/newsIcon.png" mode="aspectFill" class="headImg" v-if="Newtype==1">
				</image>
				<!-- <image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="Newtype==1"> -->
				</image>
				<view class="conView dis_flex_c ju_b">
					<view class="conView1 dis_flex_c ju_c">系统消息</view>
					<view class="conView2 oh1" v-if="news.length>0">{{news[0].content}}</view>
					<view class="conView2 oh1" v-else>系统消息</view>
				</view>
				<view class="conTime">
					
				</view>
			</view>
		</view>
		<!-- 
		<view class="contentRow" v-for="(item,index) in shuju" :key="index" v-if="shuju.length>0" @click="jump"
			:data-url="`/pagesLzc/newList/newList?id=${item.id}&type=${item.name}`"> -->
		<view class="contentRow" v-for="(item,index) in shuju" :key="index" v-if="shuju.length>0" @click="jump"
			:data-url="`/pagesLzc/newDetail/newDetail?id=${item.id}`"> 
			<view class="contentRow1 dis_flex ju_b ais">
				<image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="type==0">
				</image>
				<!-- <image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="item.type==1"> -->
				</image>
				<view class="conView  dis_flex_c ju_b">
					<view class="conView1 dis_flex_c ju_c  oh1">{{item.title}}</view>
					<view class="conView2 oh1">{{item.cate_name}}</view>
				</view>
				<!-- <view class="conTime">
					{{item.time}}
				</view> -->
			</view>
		</view>
		
		<!-- <view class="contentRow" v-for="(item,index) in news" :key="index" v-if="news.length>0">
			<view class="contentRow1 dis_flex ju_b aic">
				<image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="Newtype==1">
				</image>
				<view class="conView" style="display: flex; align-items: center;">
					<text class="conView3 oh1">{{item}}</text>
				</view>
				<view class="conTime">
					{{item.time}}
				</view>
			</view>

		</view> -->
		<view class="zanwu" v-if="news.length==0">
			暂无最新消息
		</view>
		<view class="" style="background-color: #fff;height: 100rpx;width: 750rpx;"></view>
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
				shuju: [],
				page: 1,
				size: 10,
				type: 0,
				Newtype: 1,
				news: []
			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			that.onRetry();
			that.getNew()

		},
		onShow() {

		},
		onPullDownRefresh() {
			that.onRetry();
		},
		onReachBottom() {
			that.getData()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			gettime(time) {
				return service.gettime(time)
			},
			jump(e) {
				return service.jump(e)
			},
			// getData() {
			// 	var jkurl = "article.Article/cate";
			// 	var data = {
			// 		token: that.$store.state.loginDatas.userToken || '',
			// 	}
			// 	service.P_get(jkurl, data).then(res => {
			// 		var data = res.data;
			// 		console.log(data)
			// 		this.shuju = [];
			// 		if (res.code == 1) {
			// 			this.shuju = res.data;
			// 		}
			// 	}).catch(e => {
			// 		console.log(e)
			// 	})
			// },
			onRetry(){
				that.page=1
				that.shuju=[]
				that.getData()
			},
			getData() {
				if (that.isBt == 1) {
					return
				}
				that.isBt = 1;
				var jkurl = "article.Article/lst";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: this.page,
					size: this.size,
					// cate_id: that.id
			
				}
				var now_page=this.page
				service.P_get(jkurl, data).then(res => {
					that.isBt = 0;
					var data = res.data;
					console.log(data)
					if (res.code == 1) {
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						if (now_page == 1) {
							this.shuju = res.data;
							if (data.length != 0) {
								this.page++
							}
						} else {
							if (data.length != 0) {
								that.shuju.concat(data)
								this.page++
							} else {
								this.more = "到底了"
								// that.data_last = true
							}
			
						}
					} else {
						if (res.msg) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "请求失败",
								icon: "none"
							})
						}
					}
				}).catch(e => {
					that.isBt = 0;
					console.log(e)
					uni.showToast({
						title: "请求异常",
						icon: "none"
					})
				})
			},
			
			getNew() {
				var jkurl = "User/message";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: 1,
					size: that.size
				}
				service.P_get(jkurl, data).then(res => {
					var data = res.data;
					console.log(data)
					if (res.code == 1) {
						var data = res.data;
						if (typeof data == 'string') {
							data = JSON.parse(data)
						}
						that.news = data;
					}
				}).catch(e => {
					console.log(e)
				})
			}
		}
	}
</script>

<style scoped>
	@import url("/static/css/commin.css");

	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.contentRow {
		width: 100vw;
		height: 140rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 22rpx 24rpx 20rpx 29rpx;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.contentRow:last-child {
		border: none;
	}

	.headImg {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		min-width: 82rpx;
		position: relative;
	}

	.dain {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: #fff;
		left: 92rpx;
		top: 30rpx;
		border-radius: 50%;
	}

	.conView {
		/* width: 550rpx; */
		flex:1;
		height: 100%;
		/* min-width: 550rpx; */
		box-sizing: border-box;
		padding-left: 19rpx;
	}

	.conView1 {
		/* font-size: 34rpx; */
		font-size: 38rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #333333;
		line-height: 45rpx;
		height: 45rpx;
		margin-top: 5rpx;
	}

	.conView2 {
		/* font-size: 28rpx; */
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 35rpx;
		/* margin-top: 17rpx; */
		height: 35rpx;
		/* position: absolute;
		bottom: 20rpx; */
		padding-right: 30rpx;
		margin-top: 10rpx;
	}

	.conView3 {
		font-size: 28rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
		/* margin-top: 17rpx; */
		height: 28rpx;
	}

	.conTime {
		/* width: 100%; */
		height: 100%;
		font-size: 24rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 23rpx;
		min-width: 100rpx;
	}

	.dianNew {
		position: absolute;
		bottom: 2rpx;
		right: 30rpx;
		background-color: #007AFF;
	}
	
	.contentRow1{
		width: 100%;
	}
</style>
