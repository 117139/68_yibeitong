<template>
	<view class="minh100">
		<view class="main_box">
			
			<view class="tx_list">
				<view class="tx_li" v-for="(item,index) in 3">
					<view class="tx_l">
						<view class="mx_name">提现</view>
						<view class="mx_time">2017-02-17</view>
					</view>
					<view class="tx_r">
						<view  class="mx_pri">-12.00</view>
					</view>
				</view>
			</view>
		</view>
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
		onLoad(option) {
			that=this
			if(option.type){
				this.type=option.type
			}
			that.datas=[]
			that.htmlReset=0
			return
			this.onRetry()
		},
		onShow(){
			if(this.show_num>1){
				this.page=1
				this.goods_sele=[]
				this.all=false
				this.onRetry()
			}
			this.show_num++
			// this.getOrderList('onshow')
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
			
			uni.stopPullDownRefresh()
			return
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			// this.getdatalist()
		},
		methods: {
			onRetry(){
				uni.stopPullDownRefresh()
				return
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/order'
				var data={
					token:that.loginMsg.userToken,
					type:that.type==0?99:that.type,
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
								that.datas=datas
							}else{
								if(datas.length==0){
								
									that.data_last=true
									
									return
								}
								that.datas=that.datas.concat(datas)
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
			jump(e) {
				var that = this
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.main_box{
		width: 100%;
		padding: 30upx;
	}
	.top_box{
		width: 100%;
		position: relative;
		border-radius: 27upx;
	}
	.top_box_img{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		border-radius: 27upx;
	}
	.top_box_box{
		width: 100%;
		position: relative;
		z-index: 10;
		min-height: 296upx;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.top_box_btn{
		position: absolute;
		top: 27upx;
		right: 30upx;
		width: 126upx;
		height: 40upx;
		background: #FFFFFF;
		border-radius: 20upx;
		font-size: 24upx;
		color: #FC6956;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top_box_btn text{
		color: #FC6855;
		font-size: 20upx;
		margin-left: 8upx;
	}
	.top_d1{
		font-size: 24upx;
		color: #fff;
	}
	.top_d2{
		font-size: 90upx;
		color: #fff;
		font-weight: bold;
		line-height: 95upx;
	}
	.tixian_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		color: #FD383B;
		font-size: 28upx;
	}
	.tixian_tit image{
		width: 30upx;
		height: 24upx;
		margin-right: 15upx;
	}
	.tx_list{
		width: 100%;
		padding: 15upx 0;
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
