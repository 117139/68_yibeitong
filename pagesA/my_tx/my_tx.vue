<template>
	<view class="minh100">
		<view class="main_box">
			<view class="tx_int">
				<text>￥</text><input type="number"  v-model="tx_num" confirm-type='done'
						 @confirm="sub"/>
			</view>
			<view class="tx_tip">当前可提现金额：{{tx_max}}</view>
			<view class="tx_btn" @tap="sub">提现</view>
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
				tx_num:'',
				tx_max:100
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
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			// this.getdatalist()
		},
		methods: {
			sub(){
				if(that.tx_num<0){
					uni.showToast({
						icon: 'none',
						title: '请输入金额'
					})
					return
				}
				if(that.tx_num>that.tx_max){
					uni.showToast({
						icon: 'none',
						title: '提现金额不足'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'操作成功'
				})
				setTimeout(function() {
					uni.navigateBack({
						delta:1
					})
				}, 1000)
			},
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
	.tx_int{
		width: 100%;
		padding: 35upx 0;
		display: flex;
		align-items: baseline;
		border-bottom: 1px solid #eee;
		margin-bottom: 10upx;
	}
	.tx_int text{
		font-size: 28upx;
		color: 33px;
	}
	.tx_int input{
		font-size: 64upx;
		line-height: 100upx;
		height: auto;
		color: 33px;
	}
	.tx_tip{
		color: #999999;
		font-size: 28upx;
		height: 90upx;
		display: flex;
		align-items: center;
	}
	.tx_btn{
		font-size: 30upx;
		color: #fff;
		width: 690upx;
		height: 85upx;
		background: #F84336;
		border-radius: 43upx;
		margin: 600upx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
