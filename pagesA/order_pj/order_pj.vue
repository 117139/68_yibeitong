<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container" v-if="htmlReset==0">
			<view class="fw_list">
				
				<!-- <view class="fuwu_li">
					<view class="d1">评价标签:</view>
					<view class="fw_msg">
						
					</view>
				</view>
				<view class="pj_bq">
					<view class="bq_li" :class="item.xuan==true? 'cur':''" v-for="(item,idx) in catelist" @tap="xz(idx)">{{item.title}}</view>
				</view> -->
				<view class="fuwu_li">
					<view class="d1">发表评价:</view>
					<view class="fw_msg">
						
					</view>
				</view>
				<view class="tk_text">
					<textarea placeholder="请填写您的评价..." @input="get_val" :value="yname" maxlength="500"></textarea>
		      
				</view>
			</view>
			<view class="fw_list">
				<view class="imgbox mb20">
				  <view class="addimg1" v-for="(item,idx) in imgb" :data-idx="idx" @tap="imgdel">
				    <!-- <image src="{{filter.imgIP(item)}}" data-src="{{filter.imgIP(item)}}" mode="aspectFill"></image> -->
				    <image :src="getimg(item)" :lazy-load='true' :data-src="getimg(item)" mode="aspectFill"></image>
				  </view>
				
				  <view v-if="imgb.length<9" class="addimg" @tap="scpic">
				
				    <image :src="filter.imgIP('/static_s/51daiyan/images/upimg1.jpg')"></image>
				  </view>
				</view>
		    
			</view>
		   
			 <view class="sq_tx" @tap="save_val">发表</view>
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
	export default {
		data() {
			return {
				btn_kg:0,
				catelist:[],
				htmlReset:0,
				ov_id:'',
				yname:'',
				imgb:[],
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
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
		
		onLoad: function (option) {
			
			// this.getCate()
			if(option.id){
				this.ov_id=option.id
			}
			
			
			
		},
		onShow(){
			this.page=1
		  if (this.btnkg==1){
				that.btnkg=0
			}
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		cload(){
			var pages=1
			var goods=[1,1,]
			this.goods=goods
				this.pages=pages
				this.goods=this.goods
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		onReady(){
			
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			xz(idx){
				var that =this
				if (!that.catelist[idx].xuan) {
					that.$set(that.catelist[idx],'xuan',true)
					
				} else {
					that.$set(that.catelist[idx],'xuan',false)
				}
			},
			getCate(){
				var that =this
				var datas={
					type:4
				}
				// 单个请求
				service.P_get('/cate/list',datas).then(res => {
				  console.log(res)
					if(res.code==1){
						that.catelist=res.data
						
					}
				}).catch(e => {
				  console.log(e)
					uni.showToast({
						icon:'none',
						title:'获取数据失败'
					})
				})
				
			},
			save_val(){
				var that =this
				if(!that.yname){
					wx.showToast({
					  icon: 'none',
					  title: '请输入您的评价',
					})
					return
				}
				// var tag=[]
				// for(var i=0;i<that.catelist.length;i++){
				// 	if(that.catelist[i].xuan){
				// 		tag.push(that.catelist[i].title)
				// 	}
				// }
				// tag.join(',')
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					ov_id:that.ov_id,
					// tag:tag,
					img:that.imgb.join(','),
					content:that.yname,
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				// 单个请求
				service.P_post('/order/appraiseGoods',datas).then(res => {
				  console.log(res)
					if(res.code==1){
						wx.showToast({
							title: '操作成功',
						})
						setTimeout(function () {
						  wx.navigateBack()
						}, 1000)
						
						console.log(that.yname)
						console.log(that.imgb)
					}
				}).catch(e => {
				  console.log(e)
					uni.showToast({
						icon:'none',
						title:'获取数据失败'
					})
				})
			
			},
				
			get_val(e) {
			  console.log(e.detail)
			  this.yname= e.detail.value
			},
			imgdel(e){
				var that =this
				console.log(e.currentTarget.dataset.idx)
				wx.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							that.imgb.splice(e.currentTarget.dataset.idx,1)
							that.imgb=that.imgb
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			},
			scpic() {
			  var that = this
				var z_count = 9 - that.imgb.length
				uni.showActionSheet({
					itemList: ['拍照', '相册'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						uni.chooseImage({
							count: z_count,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
								
								const imglen = that.imgb.length
								that.upimg(tempFilePaths, 0)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			 
			},
			upimg(imgs, i) {
			  var that = this
			  const imglen = that.imgb.length
			  var newlen = Number(imglen) + Number(i)
			  if (imglen == 9) {
			    wx.showToast({
			      icon: 'none',
			      title: '最多可上传九张'
			    })
			    return
			  }
				service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.msg
						console.log(i)
						var newdata = that.imgb
						newdata.push(datas)
						that.imgb= newdata
						var news1 = that.imgb.length
						if (news1 < 9&& i<imgs.length-1) {
						  i++
						  that.upimg(imgs, i)
						}
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				/*var newdata = that.imgb
				console.log(i)
				newdata.push(imgs[i])
				that.imgb= newdata
				var news1 = that.imgb.length
				if (news1 < 9&& i<imgs.length-1) {
				  i++
				  that.upimg(imgs, i)
				}*/
				// return
			  // console.log(img1)
			  
			},
			//订单详情
			goOrderDetails(e){
				console.log(e.currentTarget.dataset.id)
				wx.navigateTo({
					url:'/pages/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id
				})
			},
			//付款
			pay(e){
			  var that =this
				let oid=e.currentTarget.dataset.code
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.Pay(oid,'info')
			},
			jump(e) {
			  service.jump(e)
			},
			onRetry(){
				this.onLoad()
			}
		}
	}
</script>

<style scoped>
page{
  background: #fff;
}
.container{
	min-height: 100vh;
	background: #fff;
	padding-top: 1rpx;
  padding-bottom: 100rpx;
}

.goodsImg image{
	width: 100%;
	height:100%;
}
.zanwu{
	font-size: 24rpx;
	color: #999;
	line-height: 140rpx;
	text-align: center;
}

.typecur{
  padding-bottom: 12rpx;
  border-bottom: 6rpx solid #F9B234;
	color: #333;
}

.orderstatus{
	height: 100rpx;
	border-bottom: 1px solid #eee;
}


.goodsBox{
	width: 100%;
}
.goodsOne{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	margin-bottom: 17rpx;
}
.goodsdft{
	padding: 38rpx 0 18rpx;
	display: flex;
	border-bottom: 1px solid #eeeeee;
}
.goodsImg{
	/* width: 138rpx;
	height: 138rpx;
	border: 1px solid #d2d2d2; */
	width: 200rpx;
	height: 200rpx;
	margin-right: 40rpx;
}
.goodsInr{
	width: 500rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	font-size: 28rpx;
	color: #999;
}
.goods2{
	width: 100%;
	padding:20rpx 0 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.goods2tit{
	width: 100%;
	line-height: 45rpx;
	font-size: 26rpx;
	color: #333;
}
.xiaoji{
	text-align: right;
	font-size: 28rpx;
	color: #333;
	padding: 30rpx 0;
}
.ml10{
	margin-left: 10px;
}
.xjjine{
	font-size: 32rpx;
	color: #fe0042;
}

.guige{
	width: 750rpx;
	height: 70rpx;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.guige_l{
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #333;
}
.guige_l_name{
	color: #333;
	margin-right: 25rpx;
}
.guige_r{
	width: 44rpx;
	height: 44rpx;
}
.wxicon{
	width: 38rpx;
	height: 38rpx;
	margin-right: 22rpx;
}


.fixbottom{
	width: 100%;
	position:fixed;
	bottom: 0;
	left: 0;
	height: 100rpx;
	background-color: #fff;
	display: flex;
}
.fb_l{
	flex: 1;
	height: 100rpx;
	padding-left: 28rpx;
	font-size: 38rpx;
	color: #f75852;
	display: flex;
	align-items: center;
	font-weight: bold;
}
.subbtn{
	width: 212rpx;
	height: 100rpx;
	background-color: #f75852;
	color:#fff;
	font-size: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.subbtn1{
	background-color: #999;
}

.contbox{
	width: 100%;
	padding: 0 0 10rpx;
	box-sizing: border-box;
	background-color: #f5f5f5;
}
.goodsImg image{
	width: 100%;
	height:100%;
}



/*  */
.dianpu_tit{
	display: flex;
	align-items: center;
	padding: 28rpx 28rpx 0;
	box-sizing: border-box;
	font-size: 26rpx;
	color: #333;
}
.dp_logo{
	width:60rpx;
	height:60rpx;
	border-radius:50%;
	margin-right: 10rpx;
}
.dianpu_tit .iconfont{
	font-size: 26rpx;
	color: #999;
}
.goods{
	width: 100%;
	background-color: #fff;
  border-bottom: 20rpx solid #F5F5F5;
	/* margin-bottom: 20rpx; */
}
.goods1{
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	/* border-bottom: 1px solid #ddd; */
	position: relative;
}
.scbg{
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 46rpx;
	height: 46rpx;
	line-height: 46rpx;
	border-radius: 50%;
	background-color: #999;
	color: #fff;
	font-size: 26rpx;
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
	text-align: center;
}
.goodsImg{
	width: 170rpx;
	height: 170rpx;
	/* border: 1px solid #d2d2d2; */
	margin-right: 22rpx;
}
.xuanze{
	width: 30rpx;
	height: 30rpx;
	padding: 40rpx 30rpx 40rpx 0rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex:none;
}
.xuanze1{
	width: 34rpx;
	height: 34rpx;
	border-radius: 50%;
	border: 1px solid #ddd;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex:none;
}
.xuanze2{
	border: 0;
}
.goodsinr{
  height: 140rpx;
	flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}
.goodsname{
	font-size: 30rpx;
	color: #333333;
	box-sizing: border-box;
	display:-webkit-box !important;  
	overflow:hidden;
	text-overflow:ellipsis;
	word-break:break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.goodspri{
	font-size: 26rpx;
	color: #999;
}
.scx{
	text-decoration:line-through;
}
.goodspri1{
	font-size: 32rpx;
	color: #fe0042;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.goods2{
	width: 100%;
	padding:20rpx 28rpx 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.goods2tit{
	width: 100%;
	line-height: 45rpx;
	font-size: 26rpx;
	color: #333;
}
.o_xj{
  width: 100%;
  height: 80rpx;
  padding: 0 28rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  border-top: 1px solid #eee;
}
text{
  color: #F75559;
  font-size: 28rpx;
}
.paytype{
  display: flex;
  align-items: center;
}
.paytype image{
  width:40rpx;
  height:34rpx;
  margin-right: 6rpx;
}
.bl1{
  width:6rpx;
  height:28rpx;
  background:rgba(247,85,89,1);
  border-radius:3rpx;
  margin-right: 6rpx;
}

.fw_list{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	background: #fff;
}
.fuwu_li{
	width: 100%;
	height: 75rpx;
	display: flex;
	align-items: center;
	/* border-top: 1px solid #eee; */
}

.fuwu_li text{
	font-size: 24rpx;
	color: #666;
	margin-left: 10rpx;
}
.fw_msg{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 24rpx;
	color: #999;
}
.fuwu_li .d1{
	flex: none;
	font-size: 30rpx;
	color: #333;
	margin-bottom: 10rpx;
}
.tk_text{
	width: 100%;
	padding: 0 0 28rpx;
	box-sizing: border-box;
	background: #fff;
}
.tk_text textarea{
	width: 100%;
	height: 290rpx;
	border-radius: 12rpx;
  border: 1px solid #eee;
	padding: 12rpx;
	box-sizing: border-box;
	background: #fff;
	font-size: 26rpx;
}
.tk_text view{
	border-bottom-right-radius: 12rpx;
	border-bottom-left-radius: 12rpx;
  box-sizing: border-box;
	background: #eee;
  font-size: 24rpx;
  color: #666;
  text-align: right;
  padding: 0 12rpx 10rpx 0;
}
.imgbox{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}
.addimg{
	width: 200rpx;
	height: 200rpx;
	margin: 20rpx 1.5%;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
}
.addimg image{
	width: 200rpx;
	height: 200rpx;
}
.addimg1{
	width: 200rpx;
	height: 200rpx;
	margin: 20rpx 1.5%;
}
.addimg1>image{
	width: 100%;
	height: 100%;
	/* border-radius: 20rpx; */
}

.sq_tx{
	display: flex;
	align-items: center;
	justify-content: center;
	width:694rpx;
	height:80rpx;
  border-radius: 12rpx;
	background:#f47416;
	font-size: 30rpx;
	color: #fff;
	margin: 10rpx auto 50rpx;
}
.zp_tip{
  font-size: 24rpx;
  color: #ea4628;
  padding-bottom: 20rpx;
}
.order_tip{
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #666;
}
.pj_bq{
	display: flex;
	flex-wrap: wrap;
}
.bq_li{

	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 60rpx;
	color: #F75559;
	border: 1px solid rgba(247, 85, 89, 1);
	border-radius: 14rpx;
	padding: 0 23rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	margin: 10rpx 18rpx;
}
.bq_li.cur{
	color: #F75559;
	border: 1px solid rgba(247, 85, 89, 1);
	background: rgba(250, 233, 234, 1);
}
</style>
