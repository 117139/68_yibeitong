<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/images/tg_bg_02.png')" mode=""></image>
				<view class="top_box_msg">
					<view class="top_l">
						<view class="top_l1">当前佣金</view>
						<view class="top_l2">{{loginDatas.commission*1}}</view>
					</view>
					<image class="tg_icon" :src="getimg('/static/images/tgyj.png')" mode="aspectFit"></image>
				</view>
			</view>
			<view class="list_box">
				<view class="list_tit">
					<view class="tit_l">
						<image :src="getimg('/static/images/mon_icon.png')" mode="aspectFit"></image>明细
					</view>
					<picker  class="dis_flex" @change="bindPickerChange" :value="hetong_index" :range="hetong_list" range-key="title" data-type="3">
							<view class="tit_r">{{hetong_list[hetong_index].title}}<text class="iconfont iconoff"></text></view>
					</picker>
					
				</view>
				<view class="tx_li" v-for="(item,index) in datas">
					<view class="tx_l">
						<view class="mx_name">{{item.change_type_value}}</view>
						<view class="mx_time">{{item.create_time}}</view>
					</view>
					<view class="tx_r">
						<view  class="mx_pri">{{item.symbol}}{{item.price}}</view>
					</view>
				</view>
				
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				<!-- <view  class="data_last">我可是有底线的哟~~~</view> -->
			</view>
		</htmlLoading>
		
	</view>
</template>

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
				btnkg:0,
				htmlReset:-1,
				data_last:false,
				tab_cur:3,
				hetong_list:[
					{
						title:'一级返佣',
						id:3
					},
					{
						title:'二级返佣',
						id:4
					},
					{
						title:'公司奖励',
						id:5
					},
				],
				datas:[],
				hetong_index:0,
				page:1,
				size:20
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
				// 'order_ls_data'
			]),
			
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
			
			if(option.type){
				this.type=option.type
			}
			that.datas=[]
			that.htmlReset=0
		
			this.onRetry()
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdatalist()
		},
		methods: {
			getimg(img){
			 return	service.getimg(img)
			},
			tab_fuc(num){
				that.tab_cur=num
			},
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.currentTarget.dataset)
					console.log('picker发送选择改变，携带值为', e.target.value)
					var datas=e.currentTarget.dataset
					if(datas.type==1){ //套餐
						this.taocan_index = e.target.value
					}
					if(datas.type==2){ //时间
						this.date = e.target.value
					}
					if(datas.type==3){ //合同
						this.hetong_index = e.target.value
						that.onRetry()
						// that.gettaocan(that.hetong_list[e.target.value].id)
					}
					
			},
			onRetry(){
				// uni.stopPullDownRefresh()
				// return
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/user/getMyMoney'
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					page:that.page,
					size:that.size,
					type:that.hetong_list[that.hetong_index].id
				}
				if(that.data_last) return
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					that.$refs.htmlLoading.htmlReset_fuc(0)
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
				
						if (page_that == 1) {
				
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++
				
					} else {
						that.htmlReset = 1
					that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
				
			},
			
		}
	}
</script>

<style scoped>
	.top_box{
		width: 100%;
		position: relative;
	}
	.top_box_bg{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.top_box_msg{
		position: relative;
		z-index: 1;
		width: 100%;
		height: 314upx;
		padding-top: 45upx;
		padding-bottom: 100upx;
		display: flex;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 80upx;
		align-items: center;
	}
	.tg_icon{
		width: 150upx;
		height: 150upx;
	}
	.top_l1{
		font-size: 28upx;
		color: #fff;
	}
	.top_l2{
		font-size: 70upx;
		color: #fff;
		display: flex;
		align-items: baseline;
	}
	.top_l2 text{
		font-size: 28upx;
	}
	.list_box{
		width: 690upx;
		padding: 0 30upx;
		min-height: calc(100vh - 220upx);
		background: #fff;
		position: relative;
		margin: -94upx auto 0;
		z-index: 10;
		
		background: #FFFFFF;
		box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
	}
	.list_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tit_l{
		font-size: 28upx;
		color: #FD383B;
		display: flex;
		align-items: center;
	}
	.tit_l image{
		width: 30upx;
		height: 24upx;
		margin-right: 15upx;
	}
	.tit_r{
		width: 149upx;
		height: 43upx;
		background: #FFFFFF;
		border: 1px solid #F33E45;
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #FD383B;
	}
	.tit_r text{
		font-size: 20upx;
		margin-left: 5upx;
	}
	.tx_li{
		width: 100%;
		padding: 15upx 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
	}
	.tx_li+.tx_li{
		margin-top: 12upx;
	}
	.tx_l{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.tx_r{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.mx_name{
		color: #292929;
		font-size: 28upx;
	}
	.mx_time{
		color: #999;
		font-size: 20upx;
		margin-top: 10upx;
	}
	.mx_pri{
		color: #FD383B;
		font-size: 27upx;
		font-weight: bold;
	}
</style>
