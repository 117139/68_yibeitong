<template>
	<view class="minh100 container">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
		  <!-- <view class="hengxian"></view> -->
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block v-for="(item,idx) in data_list">
		      <view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'>{{item}}</view>
		    </block>
		
		  </view>
			<view class="zanwu" v-if="datas.length==0">暂无内容</view>
		  <view v-else class="goodsBox w100">
		    <view class="goodsBox contbox">
		      <view class="goods" v-for="(item,idx) in datas">
		        <view class="dianpu_tit">
		         
		          <text class="flex_1 ">订单号：{{item.order.o_order_num}}</text>
		          <text v-if="item.order.o_paystatus==1" >待支付</text>
		          <text v-if="item.order.o_ddstatus==2&&item.order.o_paystatus==2" style="color: #FF4141;">待发货</text>
		          <text v-if="item.order.o_paystatus==3" style="color: #FF4141;">已退款</text>
		          <text v-if="item.order.o_paystatus==4" style="color: #FF4141;">已取消</text>
		          <text  v-if="item.order.o_ddstatus==4||item.order.o_ddstatus==5" style="color: #FF4141;">待收货</text>
		          <text  v-if="item.order.o_ddstatus==1" style="color: #FF4141;">已完成</text>
		        </view>
						
		        <block v-for="(item1,idx1) in item.order_goods">
		          <view class="goods1" @tap="jump" :data-url="'/pagesA/OrderDetails/OrderDetails?id='+item.order.o_id+'&type='+type">
		           
		            <view class="goodsImg">
									<image v-if="item1.gd_vice_pic.length>0" class="goodsImg" :src="getimg(item1.gd_vice_pic[0])" mode="aspectFill"></image>
									<image v-else class="goodsImg" :src="getimg(item1.gd_mastr_pic[0])" mode="aspectFill"></image>
									<!-- <image class="goodsImg" :src="getimg(item1.photo)" mode="aspectFill"></image> -->
		            </view>
		            <view class="goodsinr">
		              <view class="goodsname fz30 c30">{{item1.gd_name}}</view>
		              <view class="goodspri"><text v-for="(item2,idx2) in item1.gd_attr">{{item2.value+' '}}</text></view>
		              <view class="goodspri1"><text >¥</text>{{item1.single_price}}</view>
		            </view>
		          </view>
							<view v-if="item1.is_comment==2||item1.is_advocacy==2" class="o_cz">
								<view v-if="item1.is_comment==2" @tap.stop="jump" :data-url="'/pagesA/order_pj/order_pj?id='+item1.ov_id">评价</view>
							  <!-- <view v-if="item1.is_advocacy==2" @tap.stop="jump_fabu(item1)" data-url="/pagesA/daiyan_fabu/daiyan_fabu">我要代言</view> -->
							</view>
		        </block>
		
		        <view class="o_xj">
		          <view>共{{getnum(idx)}}件</view>
							<view>
                订单总价 <text style="font-size: 24upx;">¥</text> <text>{{item.order.o_price}}</text>
		          </view>
		
		        </view>
		        <view  v-if="item.order.o_ddstatus!=3" class="o_cz">
		          <!-- <view v-if="item1.is_comment==2" @tap.stop="jump" data-url="/pages_goods/goods_pj/goods_pj">评价</view> -->
		          <!-- <view v-if="type==0||type==4}}" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view> -->
							 <block v-if="item.order.o_paystatus==1">
								 <view class="qx" @tap.stop="order_pay(item.order.o_id)">立即付款</view>
								 <!-- <view  @tap.stop="cancelOrder(item.order.o_id)">取消订单</view> -->
							 </block>
							 <block v-else-if="item.order.o_ddstatus==1">
								 <!-- <view  class="qx" @tap.stop="del_order(item.order.o_id)">删除订单</view> -->
								 <view @tap.stop="jump" :data-url="'/pagesA/Order_wuliu/Order_wuliu?id='+item.order.o_id">查看物流</view>
							 </block>
							 <block v-else>
								 <view class="qx"  @tap.stop="get_goods(item.order.o_id)">确认收货</view>
								 <view @tap.stop="jump" :data-url="'/pagesA/Order_wuliu/Order_wuliu?id='+item.order.o_id">查看物流</view>
							 </block>
		          
		          <!-- <view v-if="item.order.o_paystatus==1" class="qx" @tap.stop='del_order(item.order.o_id)'>取消订单</view> -->
		        </view>
		      </view>
		    </view>
		  </view>
			
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		 
		
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
				data_list:[
					'全部订单',
					'待付款',
					'待发货',
					'待收货',
				  '待评价'
				],
				datas:[],
				page:1,
				size:20,
				type:0,    //99全部订单  1：代付款 2：待收货 3：待评价  4：待代言
				
				shopNum:[],
				sum:0,
				otype:-2,
				
				
				
				goods_sele: [],
				// goods_sele: [],
				xuan: false,
				all: false,
				show_num:0
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
		
			
			this.onRetry()
		},
		onShow(){
			if(this.show_num>0){
				this.page=1
				this.goods_sele=[]
				this.all=false
				this.onRetry()
			}
			
			// this.getOrderList('onshow')
		},
		onHide() {
			this.show_num++
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
			...mapMutations(['dy_fb_fuc']),
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
			order_pay(id){
				var that =this
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '支付成功'
				// })
				// return
				var jkurl='/order/goPay'
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					ids:id
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
			
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						service.wxpay(res.data, 'fwb').then(res => {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							service.wxlogin('token')
							setTimeout(function() {
								that.onRetry()
							}, 1000)
						}).catch(e => {
							that.btnkg = 0
							uni.showToast({
								icon: 'none',
								title: '微信支付失败'
							})
										
						})
				
				
				
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			del_order(id){
				var that =this
				uni.showModal({
				    title: '提示',
				    content: '是否删除该订单',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										return
										var jkurl='/order/cancel'
										var data={
											token:that.loginMsg.userToken,
											id:id
										}
										service.post(jkurl, data,
											function(res) {
												
												// if (res.data.code == 1) {
												if (res.data.code == 1) {
													var datas = res.data.data
													// console.log(typeof datas)
													that.htmlReset=0
													if (typeof datas == 'string') {
														datas = JSON.parse(datas)
													}
													uni.showToast({
														icon: 'none',
														title: '操作成功'
													})
													that.onRetry()
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
														title: '操作失败'
													})
											
											}
										)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//取消该订单
			cancelOrder(id){
				let that =this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
			
				wx.showModal({
					title: '提示',
					content: '是否取消该订单?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							return
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			},
			//确认收货
			get_goods(id){
				var that =this
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '操作成功'
				// })
				// return
				var jkurl='/order/confirmReceipt'
				var datas={
					token: that.$store.state.loginDatas.userToken||'',
					id:id
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(()=>{
							that.onRetry()
						},1000)
						// for(var i=0; i<that.datas.length;i++){
						// 	if(that.datas[i].order.o_id==id){
								
						// 		// that.datas[i].is_friend=2
						// 		// that.$set(that.datas,i,that.datas[i])
						// 		that.datas.splice(i, 1)
						// 	}
						// }
				
				
				
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			},
			getnum(idx){
				var that =this
				var list=that.datas[idx].order_goods
				var znum=0
				for(var i=0;i<list.length;i++){
					znum=znum+list[i].number*1
				}
				return znum
			},
			getdatalist(){
				
				let that =this
				var jkurl='/order'
				var data={
					token: that.$store.state.loginDatas.userToken||'',
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
			jump_fabu(item){
			  let that = this
				if(!item){
					if(that.goods_sele.length==0){
						uni.showToast({
							icon:'none',
							title:'请先选择商品'
						})
						return
					}
					console.log(that.goods_sele)
					that.dy_fb_fuc(that.goods_sele)
				}else{
					var arr=[]
					arr.push(item)
					that.dy_fb_fuc(arr)
				}
			 
				
				
				wx.navigateTo({
				  url: '/pagesA/daiyan_fabu/daiyan_fabu',
				})
		
			  
			},
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
				if(that.type== e.currentTarget.dataset.type) return
			  that.type= e.currentTarget.dataset.type
				// that.getOrderList()
				this.onRetry()
			},
			select(idx,idx1,item) {
			  let that = this
			  // console.log(e.currentTarget.dataset.selec)
			  // console.log(e.currentTarget.dataset.selec1)
			  let sid = idx
			  let sid1 = idx1
			  // console.log(this.data.goods_sele[sid].xuan)
			  if (!that.datas[sid].order_goods[sid1].xuan) {
			    // that.goods_sele[sid][sid1].xuan = true
			    // that.goods_sele=that.goods_sele
					that.$set(that.datas[sid].order_goods[sid1],'xuan',true)
					var push_kg=true
					for(var i=0;i<that.goods_sele.length;i++){
						if(that.goods_sele[i].ov_id==item.ov_id){
							push_kg=false
						}
					}
					if(push_kg){
						that.goods_sele.push(item)
					}
			  } else {
					that.$set(that.datas[sid].order_goods[sid1],'xuan',false)
					for(var i=0;i<that.goods_sele.length;i++){
						console.log(that.goods_sele[i].ov_id,item.ov_id)
						console.log(that.goods_sele[i].ov_id==item.ov_id)
						if(that.goods_sele[i].ov_id==item.ov_id){
							
							that.goods_sele.splice(i,1)
						}
					}
			    // that.goods_sele[sid][sid1].xuan = false
			    // that.goods_sele= that.goods_sele
			  }
			  let qx = true
			  for (let i in that.datas) {
			    for (let j in that.datas[i].order_goods){
			      if (!that.datas[i].order_goods[j].xuan) {
			        qx = false
			        break
			      }
			    }
			  }
			  console.log(qx)
			  //触发全选
			  if (qx == true) {
			    that.all= true
			  } else {
			    that.all= false
			  }
			  // //计算总价
			  // that.countpri()
			},
			selecAll() {
				var that =this
			  let kg
			  if (that.all == false) {
			    kg = true
					var new_sele=[]
					for (var i=0;i<that.datas.length;i++) {
					  
					  for (var j=0;j<that.datas[i].order_goods.length;j++) {
							console.log(i,j)
							console.log(that.datas[i].order_goods[j])
					    that.$set(that.datas[i].order_goods[j],'xuan',kg)
							new_sele.push(that.datas[i].order_goods[j])
					  }
					}
					that.goods_sele=new_sele
			  } else {
					kg=false
					that.goods_sele=[]
			    for (var i=0 ;i<that.datas.length;i++) {
			      
			      for (var j=0;j<that.datas[i].order_goods.length;j++) {
			        that.$set(that.datas[i].order_goods[j],'xuan',kg)
			      }
			    }
			  }
			  that.all= kg
			 
			},
			gopinlun(e){
				wx.navigateTo({
					url:'/pages/fabiaopl/fabiaopl?oid='+e.currentTarget.dataset.oid
				})
			},
		
			/*计算价格*/
			countpri(){
				let heji=0
				let var2= this.goods
				for (let i in var2) {
						heji +=var2[i].num*(var2[i].pri*100)
						let zj=var2[i].num*(var2[i].pri*100)
						if(zj==0){
							this.setData({
								sum:'0.00'
							})
							return
						}else{
							zj=zj+"'"
						}
						if(zj.length<4){
							zj='0000'+zj
							zj=zj.substr(-4);
							// console.log(zj)
						}
						
						let zj1 = zj.substring(0, zj.length-3);
						let zj2 = zj.substring( zj.length-3, zj.length-1);
						// console.log(zj1+'.'+zj2)
						zj=zj1+'.'+zj2
						this.goods[i].zj=zj
						this.goods=this.goods
				}
				// console.log(heji)
				if(heji==0){
					this.sum='0.00'
					return
				}else{
					heji=heji+"'"
				}
				if(heji.length<4){
					heji='0000'+heji
					heji=heji.substr(-4);
					// console.log(heji)
				}
				
				let hj1 = heji.substring(0, heji.length-3);
				let hj2 = heji.substring( heji.length-3, heji.length-1);
				// console.log(hj1+'.'+hj2)
				heji=hj1+'.'+hj2
				this.sum=heji
			},
			
			shouhuoBtn(e){
				let that =this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let oid=e.currentTarget.dataset.oid
				wx.showModal({
					title: '提示',
					content: '是否确认收货?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(that.data.btnkg==1){
								return
							}else{
								that.btnkg=1
							}
							wx.request({
								url:  app.IPurl+'/api/order',
								data:{
									status:1,
									order_id:oid,
									token:wx.getStorageSync('token')
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded' 
								},
								dataType:'json',
								method:'PUT',
								success(res) {
									
									if(res.data.code==1){
										wx.showToast({
											title: '收货成功',
											duration: 1000
										});
										setTimeout(function(){
											var pages=[1,1,1,1,1]
											var goods=[ [],[],[],[],[], ]
											that.pages=pages
											that.goods=goods
											that.btnkg=0
											that.getOrderList()
										},1000)
									}else{
										that.btnkg=0
										if(res.data.msg){
											wx.showToast({
												title: res.data.msg,
												duration: 2000,
												icon:'none'
											});
										}else{
											wx.showToast({
												title: '网络异常',
												duration: 2000,
												icon:'none'
											});
										}
									}
									
								
								},
								fail() {
									that.btnkg=0
									 wx.showToast({
									 	title: '操作失败',
									 	duration: 1000
									 });
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
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
			//付款
			pay(e){
			  var that =this
				let oid=e.currentTarget.dataset.code
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				app.Pay(oid,'info')
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
page{
  background: #f8f8f8;
}
.container{
	min-height: 100vh;
	background: #F5F5F5;
	padding-top: 80rpx;
  padding-bottom: 100rpx;
}
.tab_box{
  position: fixed;
  top: 0;
	/* #ifdef H5 */
	top: calc(44px + env(safe-area-inset-top));
	/* #endif */
  z-index: 90;
  font-size: 30rpx;
	width: 100%;
	height: 76upx;
	line-height: 76upx;
	left: 0;
	right: 0;
	 background: #f8f8f8;
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
  border-bottom: 6rpx solid #FE4141;
	color: #FE4141;
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
	width: 190upx;
	height: 190upx;
	border-radius: 5upx;
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
	/* padding: 10rpx 0; */
	box-sizing: border-box;
	background-color: #f8f8f8;
}
.goodsImg image{
	width: 100%;
	height:100%;
}



/*  */
.dianpu_tit{
	display: flex;
	align-items: center;
	padding: 20rpx 28rpx ;
	box-sizing: border-box;
	font-size: 22rpx;
	color: #666;
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
	background: #FFFFFF;
	box-shadow: 0px 5px 11px 0px rgba(192, 192, 192, 0.14);
	border-radius: 5px 5px 5px 5px;
  /* border-bottom: 20rpx solid #F5F5F5; */
	/* margin-bottom: 20rpx; */
}
.goods+.goods{
	margin-top: 20upx;
}
.goods1{
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	/* border-bottom: 1px solid #ddd; */
  border-top: 1px solid #eee;
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
	width: 200rpx;
	height: 200rpx;
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
  height: 200rpx;
	flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}
.goodsname{
	font-size: 28rpx;
	color: #333333;
	margin-bottom: 10upx;
	font-weight: bold;
}
.goodspri{
	font-size: 24rpx;
	color: #666;
	margin-bottom: 20upx;
}
.scx{
	text-decoration:line-through;
}
.goodspri1{
	font-size: 32rpx;
	color: #FD383B;
	display: flex;
	align-items: center;
	font-weight: bold;
}
.goodspri1 text{
	font-size: 24upx;
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
  font-size: 22rpx;
	color: #666;
  border-bottom: 1px solid #eee;
}
.o_xj text{
	color: #FD383B;
	font-size: 32upx;
	font-weight: bold;
	margin-left: 5upx;
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
.o_cz{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;  
  padding: 20rpx 28rpx ;
  box-sizing: border-box;
}
.o_cz view{
 width: 128upx;
 height: 59upx;
 background: #FFFFFF;
 border: 1px solid #666666;
 border-radius: 5upx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-size: 22rpx;
  margin-left: 20rpx;
}
.o_cz .qx{
  color: #fff;
  background: linear-gradient(-34deg, #FC3B27, #FF6D5A);
  box-shadow: 0px 3upx 6upx 0px rgba(255, 30, 30, 0.35);
	border: 0;
}


.vbottom{
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	z-index: 99;
	background-color: #fff;
	display: flex;
	align-items: center;
}
.selecAll{
	padding-left: 28rpx;
	margin-right: 30rpx;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #f75852;
}
.all.xuanze1{
	margin-right: 8rpx;
}
.all.xuanze2{
	
	/* border: 1px solid #FE0042; */
	display: flex;
	justify-content: center;
	align-items: center;
}
.heji{
	/* flex: 1; */
	margin-right: 10rpx;
	font-size: 32rpx;
	color: #f75852;
	/* font-weight: bold; */
	text-align: right;
}
.jiesuan{
	/* width: 210rpx;
	height: 100rpx;
	background: #f75852; */
  width:174rpx;
  height:57rpx;
  background:rgba(244,116,22,1);
  border-radius:29px;
	color: #fff;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
  margin-right: 28rpx;
}
.jiesuan1{
  background: #B5B5B5;
}
</style>
