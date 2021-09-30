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
					<view class="conView2 oh1">系统消息</view>
				</view>
				<view class="conTime">
					
				</view>
			</view>
		</view>
		<view class="contentRow" v-for="(item,index) in shuju" :key="index" v-if="shuju.length>0" @click="jump"
			:data-url="`/pagesLzc/newList/newList?id=${item.id}&type=${item.name}`">
			<view class="contentRow1 dis_flex ju_b ais">
				<image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="type==0">
				</image>
				<!-- <image src="/static/images/liu/sort/xi.png" mode="aspectFill" class="headImg" v-if="item.type==1"> -->
				</image>
				<view class="conView  dis_flex_c ju_b">
					<view class="conView1 dis_flex_c ju_c">{{item.name}}</view>
					<view v-if="item.article" class="conView2 oh1">{{item.article.title}}</view>
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
			that.getData();
			that.getNew()

		},
		onShow() {

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
			getData() {
				var jkurl = "article.Article/cate";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
				}
				service.P_get(jkurl, data).then(res => {
					var data = res.data;
					console.log(data)
					this.shuju = [];
					if (res.code == 1) {
						this.shuju = res.data;
					}
				}).catch(e => {
					console.log(e)
				})
			},
			getNew() {
				var jkurl = "User/message";
				var data = {
					token: that.$store.state.loginDatas.userToken || '',
					page: that.page,
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
						if (this.page == 1) {
							this.news = data;
							if (data.length != 0) {
								this.page++
							}
						} else {
							if (data.length != 0) {
								that.news.concat(data)
								this.myPage++
							} else {
								// this.more = "到底了"
								// that.data_last = true
							}
						}
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
		font-size: 34rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx;
		height: 38rpx;
		margin-top: 5rpx;
	}

	.conView2 {
		font-size: 28rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
		/* margin-top: 17rpx; */
		height: 32rpx;
		/* position: absolute;
		bottom: 20rpx; */
		padding-right: 30rpx;
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
