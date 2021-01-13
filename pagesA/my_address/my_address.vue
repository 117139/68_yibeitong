<template>
	<view>
		<view class="container log-list">
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view class="addressOne " v-for="(item,idx) in datas" @tap="xz_add" :data-idx="idx">
				<view class="setting1 " :data-id="item.id" @tap="select_del(item)">
					<text :class="item.active==1?'moren_add':''" class="iconfont iconduigou-copy fz26 mr5"></text>
				</view>
				<view class="flex_1">
					<view class="addp1">
						<text class="mr20">{{item.name}}</text>
						<text>{{getTel(item.phone)}}</text>
						<text v-if="item.is_default==1" class="moren_bq">默认</text>
					</view>
					<view class="addp2">{{item.province}}{{item.city}}{{item.area}} {{item.address}}</view>
				</view>


				<view v-if="form_type!=1" class="setting2" :data-id="idx" @tap="addressEdit">
					<text class="iconfont iconxiugai fz26 mr5"></text>
					<!-- 编辑 -->
				</view>

			</view>
			<view class="fixbottom">
				<view class="addbtn addbtn1" @tap="del_add">删除</view>
				<navigator class="addbtn" url="/pagesA/my_addressEdit/my_addressEdit">

					添加新地址
				</navigator>
			</view>
			<!-- 底部占位 -->
			<view class="fixbottom" style="position: relative;opacity: 0;">
				<view class="addbtn addbtn1" >删除</view>
				<view class="addbtn" >添加新地址</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				btnkg: 0,
				moren: 1,
				page: 1,
				page_size: 20,
				datas: [],
				mridx: 0,
				form_type: 0
			}
		},
		onLoad: function(option) {
			that = this
			if (option.type) {
				that.form_type = option.type
			}
			that.datas = [{
					name: '徐先生',
					phone: '17800000330',
					province: '山东省',
					city: '青岛市',
					area: '开发区',
					address: '青岛经济开发区紫金山支路精图小区1023号',
					is_default: 1,
					id: 1
				},
				{
					name: '赵先生',
					phone: '17800000330',
					province: '山东省',
					city: '济南市',
					area: '历下区',
					address: '银河南街紫御国际3号楼12 01',
					is_default: 0,
					id: 1
				},
			]
			// this.getaddlist()
		},
		onShow() {

			// this.onRetry()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			// this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			// this.getaddlist()
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {

			getTel(str) {
				return service.getTel(str, 3, 4)
			},
			select_del(item) {
				if (item.active == 1) {
					Vue.set(item, 'active', 0)
				} else {
					Vue.set(item, 'active', 1)
				}
			},
			del_add(){
				var del_list=[]
				for(var i=0;i<that.datas.length;i++){
					if(that.datas[i].active){
						del_list.push(that.datas[i].id)
					}
				}
				if(del_list.length==0){
					uni.showToast({
						icon:'none',
						title:'请选择地址'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'删除'
				})
			},
			onRetry() {
				this.datas = []
				this.btn_kg = 0
				this.btnkg = 0
				this.page = 1
				this.getaddlist()
			},
			xz_add(e) {
				var that = this
				if (that.form_type != 1) {
					return
				}
				console.log(e.currentTarget.dataset.idx)
				var idx = e.currentTarget.dataset.idx
				var pages = getCurrentPages(); //当前页面
				var prevPage = pages[pages.length - 2]; //上一页面
				prevPage.setData({
					//直接给上一个页面赋值
					addresschose: that.datas[idx],
				});

				wx.navigateBack({
					//返回
					delta: 1
				})
			},
			//设置默认
			selecmr(e) {
				let that = this
				var id = e.currentTarget.dataset.id

				console.log(e.currentTarget.dataset.id)
				// let id=e.currentTarget.dataset.id
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				///address/default
				var jkurl = '/user/address/default'
				var data = {
					token: that.loginMsg.userToken,
					id: id
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							that.onRetry()
						} else {
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
						that.btnkg = 0

						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})

					}
				)
			},
			addressEdit(e) {

				console.log(e.currentTarget.dataset.id)
				let address = this.datas[e.currentTarget.dataset.id]
				address = JSON.stringify(address)
				wx.navigateTo({
					url: '/pagesA/my_addressEdit/my_addressEdit?address=' + address
				})
			},
			addressDel(e) {
				let that = this
				console.log(e.currentTarget.dataset.id)
				let id = e.currentTarget.dataset.id
				wx.showModal({
					content: "确定要删除该地址吗?",
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if (that.btnkg == 1) {
								return
							} else {
								that.btnkg = 1
							}
							var jkurl = '/user/address/del'
							var data = {
								token: that.loginMsg.userToken,
								id: id
							}
							service.post(jkurl, data,
								function(res) {
									that.btnkg = 0
									// if (res.data.code == 1) {
									if (res.data.code == 1) {
										var datas = res.data.data
										// console.log(typeof datas)

										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										that.onRetry()
									} else {
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
									that.btnkg = 0

									uni.showToast({
										icon: 'none',
										title: '获取数据失败'
									})

								}
							)

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			getaddlist() {

				let that = this
				var jkurl = '/user/address'
				var data = {
					token: that.loginMsg.userToken,
					page: that.page,
					size: that.page_size
				}
				service.get(jkurl, data,
					function(res) {

						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if (that.page == 1) {
								that.datas = datas.address
							} else {
								if (datas.address.length) {
									uni.showToast({
										icon: 'none',
										title: '到底了。。。'
									})
									return
								}
								that.datas = that.datas.concat(datas.address)
							}
							that.page++
						} else {
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
						that.btnkg = 0

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
	.container {
		min-height: 100vh;
		background: #F7F7F7;
		padding-top: 2rpx;
		/* padding-bottom: 180rpx; */
		box-sizing: border-box;
	}

	.addressOne {
		width: 100%;
		padding: 24rpx 28rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		/* margin-bottom: 20rpx; */
		border-bottom: 1px solid #eee;
	}

	.addp1 {
		font-size: 27upx;
		color: #333;
		display: flex;
		align-items: center;
	}

	.mr20 {
		margin-right: 20upx;
	}

	.addp2 {
		font-size: 22rpx;
		color: #666;
		height: 80rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		word-wrap: break-word;
		word-break: break-all;
	}

	.moren_bq {
		font-size: 22upx;
		display: flex;
		padding: 2upx 5upx;
		line-height: 30upx;
		min-height: 30upx;
		align-items: center;
		justify-content: center;
		background: #FD383B;
		color: #fff;
		margin-left: 10upx;
		border-radius: 4upx;
	}

	.setting1 {
		font-size: 36upx;
		color: #F1F1F1;
		width: 70upx;
		flex: none;
	}

	.moren_add {
		color: #FD383B;
	}

	.setting2 {
		margin-left: 80upx;
		font-size: 38upx;
		flex: none;
	}

	.setting3 {
		margin-left: 40rpx;
	}

	.fixbottom {
		width: 100%;
		padding: 20upx 28rpx 40upx;
		box-sizing: border-box;
		background-color: #F7F7F7;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
	}

	.addbtn {
		width: 100%;
		height: 82upx;
		background: linear-gradient(0deg, #FB3536, #FD4447);
		border: 1px solid #FF7575;
		box-shadow: 0px 3px 6px 0px rgba(255, 26, 26, 0.35);
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
	}

	.addbtn1 {
		margin-bottom: 20upx;
		color: #333;
		background: #D1D1D1;
		border: 1px solid #D1D1D1;
		box-shadow: 0px 3px 6px 0px #D1D1D1;
	}

	.addicon {
		margin-right: 14rpx;
		width: 22rpx;
		height: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.addicon image {
		width: 22rpx;
		height: 22rpx;
	}
</style>
