<template>
	<view>
		<!-- <view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view> -->
		<view class="container" v-if="htmlReset==0">
		
			<view v-if="datas" class="goodsBox w100" >
				<!-- <view class="zanwu" v-if="goods[idx0].length==0">暂无内容</view> -->
				<view class="order_box1">
					<image src="/static/images/images/shouhou_bg_02.jpg"></image>
					<view class="order_tit">
				
						<view class="ot_msg">
							<view class="d1">申请售后</view>
						</view>
					</view>
				</view>
				<view class="goodsBox contbox">
					<view class="goods">
		
		
						<view class="goods1">
		
							<view class="goodsImg">
								<image class="goodsImg" :src="filter.imgIP(datas.gd_vice_pic[0])" mode="aspectFill"></image>
							</view>
							<view class="goodsinr">
								<!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
								<view class="goodsname fz30 c30 oh1">{{datas.gd_name}}</view>
		
								<view class="goodspri1">
									<text class="fz24 cf6377a ">￥{{datas.single_price}}</text>
									<text class="fz24 c6 ">x{{datas.may_retreat_number}}</text>
								</view>
							</view>
		
						</view>
					</view>
				</view>
			</view>
			<view class="fw_list">
				<picker class="w100" @change="bindPickerChange" :value="index" :range="zhaungtai" range-key='name'>
					<view class="fuwu_li bt0">
						<view class="d1">货物状态</view>
						<view class="fw_msg">
							{{zhaungtai[index].name}}
						</view>
						<text class="iconfont iconnext-m"></text>
					</view>
				</picker>
				<view class="fuwu_li bt0">
					<view class="d1">数量</view>
					<view class="fw_msg">
						<!-- <van-stepper custom-class="steppera" input-class="vanipt" plus-class="vantjia" minus-class="vantjian" v-model="cnum" min="1" :max="datas.may_retreat_number"
						  @input="onChange" @change="onChange" /> -->
							
							<view class="goods_num dis_flex">
								<text v-if="cnum>1" class="iconfont iconiconset0187" @tap.stop="onNum('-')"></text>
								<text v-else class="iconfont iconiconset0187 no"></text>
								<input type="text" v-model="cnum" disabled="">
								<text v-if="cnum<datas.may_retreat_number" class="iconfont icon54" @tap.stop="onNum('+')"></text>
								<text v-else class="iconfont icon54  no"></text>
							</view>
					</view>
					<!-- <text class="iconfont iconnext3"></text> -->
				</view>
				<!-- <picker class="w100" bindchange="bindPickerChange" value="index1}}" range="yuanyin}}" range-key='name'>
					<view class="fuwu_li">
						<view class="d1">退款原因</view>
		
						<view class="fw_msg">
							{{yuanyin[index].name}}
						</view>
						<text class="iconfont iconnext3"></text>
					</view>
				</picker> -->
				<view class="fuwu_li">
					<view class="d1">具体原因:</view>
					<view class="fw_msg">
						
					</view>
				</view>
				<view class="tk_text">
					<textarea placeholder="请描述申请售后服务的具体原因" @input="get_val" :value="yname" maxlength="500"></textarea>
		      <view>{{yname.length}}/500</view>
				</view>
			</view>
			<view class="fw_list">
				<view class="imgbox mb20">
				  <view class="addimg1" v-for="(item,idx) in imgb" :data-idx="idx" @tap="imgdel">
				    <image :src="filter.imgIP(item)" :data-src="filter.imgIP(item)" mode="aspectFill"></image>
				    <!-- <image :rc="item" :data-src="item" mode="aspectFill"></image> -->
				  </view>
				
				  <view v-if="imgb.length<3" class="addimg" @tap="scpic">
				
				    <image src="/static/images/up_pingzheng.png"></image>
				  </view>
				</view>
		    <view class="zp_tip">为了帮您更好的解决问题，请务必上传照片凭证</view>
			</view>
		    <view class="order_tip">提交服务单后,售后专员可能与您电话沟通，请保证手机通畅</view>
			 <view class="sq_tx" @tap="save_val">提交</view>
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
				btnkg:0,
				htmlReset:0,
				datalist:[
					'售后申请',
					'处理中',
				  '申请记录'
				],
				datas:'',
				zhaungtai:[
				  { name: '没收到货,或与卖家协商同意不用退货', value: '1' },
				  { name: '已收到货,需要退货退款', value: '2' },
				  { name: '已收到货,需要换货', value: '3' },
				],
				index:0,
				yuanyin:[
				  { name: '发错了', value: '1' },
				  { name: '商品损坏', value: '2' },
				  { name: '不想要了', value: '3' },
				  { name: '商品与页面描述不符', value: '4' },
				  { name: '商品降价', value: '5' },
				],
				index1:0,
				yname:'',
				imgb:[],
				cnum:1,
				
				
				goods_sele: [],
				xuan: false,
				all: false,
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
		onLoad: function (option) {
			that =this
			if(option.item){
				this.datas=JSON.parse(option.item)
				console.log(option.item)
			}
			
			that.datas= {
                    "id": 38,
                    "ov_id": 403,
                    "g_id": 24,
                    "gd_name": "华为HONOR/荣耀Play4T Pro 手机新品麒麟810芯片 5荣耀官方旗舰店G正品官网智能机mate30 nova6",
                    "gd_mastr_pic": [
                        "/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg"
                    ],
                    "gd_vice_pic": [
                        "/resource/merchant/goods/20200826/3afe80bc7af4be47b2d5209bca1934ec.jpeg"
                    ],
                    "gd_attr": [
                        {
                            "name": "颜色",
                            "value": "蓝色翡翠"
                        },
                        {
                            "name": "内存",
                            "value": "256G"
                        }
                    ],
                    "single_price": "0.01",
                    "number": 1,
                    "may_retreat_number": 3,
                    "s_status": 2,
                    "s_status_value": "已同意",
                    "s_status_refuse": "",
                    "is_return_price": 1
                }
			
		},
		onShow(){
		
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		methods: {
			//数量
			onChange(e) {
				var that =this
			 
			  that.cnum= e.detail
				if(e.detail>that.datas.may_retreat_number){
					that.cnum=that.datas.may_retreat_number
				}
				if(that.cnum<1){
					that.cnum=1
				}
			},
			//加减
			onNum(ad) {
			  let that = this
			  // let ad = e.currentTarget.dataset.ad
			  // let id = e.currentTarget.dataset.id
			  // let thisidx = e.currentTarget.dataset.idx
			  // let thisidx1 = e.currentTarget.dataset.idx1
				var new_num=that.cnum
			  if (new_num < 2 && ad == '-') {
			    console.log('禁止')
			    return false;
			
			  }
				
				if (ad == '-') {
				  new_num--
				} else {
				  new_num++
				}
				console.log(ad)
				console.log(new_num>that.datas.may_retreat_numbe)
				if(new_num>that.datas.may_retreat_number){
					that.cnum=that.datas.may_retreat_number
					return
				}
				if(new_num<1){
					that.cnum=1
					return
				}
			  that.cnum=new_num
				
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
			bindPickerChange: function(e) {
			
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.index= e.detail.value
			},
			bindPickerChange1: function(e) {
			
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.index1= e.detail.value
			},
			save_val(){
				var that =this
				if(!that.yname){
					wx.showToast({
					  icon: 'none',
					  title: '请输入具体原因',
					})
					return
				}
				if(that.imgb.length==0){
					wx.showToast({
					  icon: 'none',
					  title: '请上传凭证',
					})
					return
				}
				wx.showToast({
					icon: 'none',
					title: '操作成功',
				})
				setTimeout(function () {
				  wx.navigateBack()
				}, 1000)
				return
				var imgs=that.imgb.join(',')
				var jkurl='/afterSale/applyAfterSale'
				var data={
					token:that.loginMsg.userToken,
					number:that.cnum,
					content:that.yname,
					ov_id:that.datas.id,
					type:that.index-1+2,
					pic:imgs
				}
				service.post(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							// that.htmlReset=0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							wx.showToast({
								title: '操作成功',
							})
							// reset_type
							var pages = getCurrentPages();   //当前页面
							var prevPage = pages[pages.length - 2];   //上一页面
							prevPage.setData({
							  //直接给上一个页面赋值
							  reset_type: true,
							});
							setTimeout(function () {
							  wx.navigateBack()
							}, 1000)
						} else {
							// that.htmlReset=1
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
						// that.htmlReset=1
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
					
					}
				)
				
				console.log(that.zhaungtai[that.index])
				console.log(that.yuanyin[that.index1])
				console.log(that.yname)
				console.log(that.imgb)
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
			  wx.chooseImage({
			    count: 3,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success(res) {
			      // tempFilePath可以作为img标签的src属性显示图片
			      console.log(res)
			      const tempFilePaths = res.tempFilePaths
			      
			      const imglen = that.imgb.length
			      that.upimg(tempFilePaths, 0)
			     
			    }
			  })
			},
			upimg(imgs, i) {
			  var that = this
			  const imglen = that.imgb.length
			  var newlen = Number(imglen) + Number(i)
			  if (imglen == 3) {
			    wx.showToast({
			      icon: 'none',
			      title: '最多可上传三张'
			    })
			    return
			  }
				var newdata = that.imgb
				newdata.push(imgs[i])
				that.imgb= newdata
				var news1 = that.imgb.length
				if (news1 < 3&& i<imgs.length-1) {
				  i++
				  that.upimg(imgs, i)
				}
				return
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
			  wx.uploadFile({
			    url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
			    filePath: imgs[i],
			    name: 'file',
			    formData: {
			      'type': 1,
			    },
			    success(res) {
			      // console.log(res.data)
			      var ndata = JSON.parse(res.data)
			      if (ndata.code == 1) {
			        console.log(imgs[i], i,ndata.msg)
			        var newdata = that.imgb
			        console.log(i)
			        newdata.push(ndata.msg)
			        that.imgb= newdata
			        var news1 = that.imgb.length
			        if (news1 < 9&& i<imgs.length-1) {
			          i++
			          that.upimg(imgs, i)
			        }
			      } else {
			        wx.showToast({
			          icon: "none",
			          title: "上传失败"
			        })
			      }
			    }
			  })
			},
			//订单详情
			goOrderDetails(e){
				console.log(e.currentTarget.dataset.id)
				wx.navigateTo({
					url:'/pages/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id
				})
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
  background: #f5f5f5;
}
.container{
	min-height: 100vh;
	background: #f5f5f5;
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
	height: 90rpx;
	display: flex;
	align-items: center;
	border-top: 1px solid #eee;
}
.bt0{
  border-top: 0;
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
	height: 150rpx;
	border-top-right-radius: 12rpx;
	border-top-left-radius: 12rpx;
	padding: 12rpx;
	box-sizing: border-box;
	background: #eee;
	font-size: 24rpx;
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
  border-radius: 80rpx;
	background:#ea4628;
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
  margin-top: 50rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  color: #666;
	padding: 0 30upx;
}
/* new */
.goods_num text{
		font-size: 36upx;
		color: #666;
		margin: 0 3upx;
	}
	.goods_num text.no{
		color: #bbb;
	}
	.goods_num input{
		width: 60upx;
		font-size: 37upx;
		color: #333;
		text-align: center;
		font-weight: bold;
	}
	
	
	.order_box1 {
		width: 100%;
	
		height: 246upx;
		position: relative;
	}
	
	.order_tit {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		
		padding-left: 50rpx;
		display: flex;
		align-items: center;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.ot_msg {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #fff;
	}
	
	.ot_msg .d1 {
		font-size: 30rpx;
	}
</style>
