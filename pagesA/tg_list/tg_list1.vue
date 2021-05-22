<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/images/images/tg_bg_02.png')" mode=""></image>
				<view class="top_box_msg">
					<view class="top_l">
						<view class="top_l1">推广人数</view>
						<view class="top_l2">{{datas_z.allCount?datas_z.allCount:0}}<text>人</text></view>
					</view>
					<image class="tg_icon" :src="getimg('/static/images/tg_num.png')" mode="aspectFit"></image>
				</view>
			</view>
			<view class="list_box">
				<view class="list_tit">
					<view class="list_tab" :class="tab_cur==1?'cur':''" @tap="tab_fuc(1)">一级({{datas_z.yjCount?datas_z.yjCount:0}})</view>
					<view class="list_tab" :class="tab_cur==2?'cur':''" @tap="tab_fuc(2)">二级({{datas_z.ejCount?datas_z.ejCount:0}})</view>
				</view>
				<block v-for="(item,index) in datas">
					<view class="hy_li">
						<image class="hy_li_tx" :src="getimg(item.head_portrait)" mode="aspectFill"></image>
						<view class="hy_li_msg">
							<view class="hy_li_msg1">
								<view class="hy_name">{{item.nickname}}</view>
								<view class="hy_r_d"><text>消费业绩：</text>￥{{item.dd_consume}}元</view>
							</view>
							<view class="hy_li_msg1">
								<view class="hy_name">{{item.nickname}}</view>
								<view class="hy_r_d"><text>话费业绩：</text>￥{{item.cz_consume}}元</view>
							</view>
							<view class="hy_li_msg2">
								<view class="hy_time">{{item.time}}</view>
								<view class="hy_r_d"><text>推广人数：</text>{{item.user_sum}}人</view>
							</view>
						</view>
					</view>
				</block>
				
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
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
				tab_cur:1,
				datas_z:'',
				datas:'',
				page:1,
				size:20,
				id:'',
				name:''
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onPullDownRefresh() {
			// uni.stopPullDownRefresh()
			that.onRetry()
		},
		onReachBottom() {
			this.getdatalist()
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
			if(option.id){
				this.id=option.id
			}
			if(option.name){
				this.name=option.name
				uni.setNavigationBarTitle({
					title:option.name+'的推广统计'
				})
			}
			
			that.datas=[]
			
			this.onRetry()
		},
		methods: {
			tab_fuc(num){
				that.tab_cur=num
				this.onRetry()
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
				var jkurl='/user/promotionStatis'
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					page:that.page,
					size:that.size,
					type:that.tab_cur,
					user_id:that.id
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
						that.datas_z=datas
						if (page_that == 1) {
							
							that.datas = datas.list
						} else {
							if (datas.list.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas.list)
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
			
			getimg(img){
				return service.getimg(img)
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
		width: 100%;
		padding: 0 30upx;
	}
	.list_tit{
		width: 100%;
		height: 118upx;
		background: #FFFFFF;
		box-shadow: 1px 3px 6upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 4upx;
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		margin-top: -90upx;
		margin-bottom: 30upx;
		position: relative;
		z-index: 10;
	}
	.list_tab{
		font-size: 30upx;
		color: #999;
		display: flex;
		align-items: center;
		border-bottom: 2px solid rgba(0,0,0,0);
	}
	.list_tab.cur{
		color: #F23C44;
		border-bottom: 2px solid #F23C44;
	}
	.hy_li{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid #F5F5F5;
	}
	.hy_li_tx{
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		flex: none;
		margin-right: 17upx;
	}
	.hy_li_msg{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.hy_li_msg1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_li_msg2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_name{
		font-size: 32upx;
		color: #000;
	}
	.hy_time{
		font-size: 24upx;
	}
</style>
