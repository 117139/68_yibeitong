<template>
	<view class="minh100">
		<view class="pj_li" v-for="(item,idx) in datas">
			<view class="pj_d1">
				<view class="user_tx">
					<image class="user_tx" :src="filter.imgIP(item.head_portrait)"></image>
				</view> {{item.nickname}}
			</view>
			<view class="pj_d2">{{item.comment}}</view>
			<view class="pj_d3">
				<text v-for="(item1,idx1) in item.attr">{{item1.value}}</text>
			</view>
		</view>
		<view class="zanwu" v-if="datas.length==0">暂无内容</view>
		<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
				id:'',
				datas:[],
				page:1,
				size:20,
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
			that=this
		
			that.id=option.id
			this.onRetry()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			this.getdatalist()
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			onRetry(){
				
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/goods/goodsAppraise'
				var data={
					token: that.$store.state.loginDatas.userToken||'',
					gid:that.id,
					page:that.page,
					size:that.size
				}
				if(that.data_last) return
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.get(jkurl, data,
					function(res) {
						that.btnkg=0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							that.htmlReset=0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if(that.page==1){
								that.datas=datas.comment
							}else{
								if(datas.comment.length==0){
								
									that.data_last=true
									
									return
								}
								that.datas=that.datas.concat(datas.comment)
							}
							that.page++
						} else {
							that.htmlReset=1
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.htmlReset=1
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			
		}
	}
</script>

<style scoped>
	.minh100{
		/* background: #f7f7f7; */
	}
	.pj_li {
		width: 100%;
		padding: 20rpx 28rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		
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
</style>
