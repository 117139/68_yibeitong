<template>
	<view class="minh100">
		<view class="cu-list menu-avatar">
			<view class="cu-item car_li" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in datas" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="car_l">
					<view class="setting1 " :data-id="item.id" @tap="select_car(item,index)">
						<text :class="item.active==1?'active':''" class="iconfont iconduigou-copy fz26 mr5"></text>
					</view>
					<image class="car_li_img" :src="item.pic" mode="aspectFit"></image>
					<view class="flex_1">
						<view class="goods_name">{{item.name}}</view>
						<view class="goods_gg">
							<text v-for="(item1,index1) in item.gg">{{item1}}</text>
						</view>
						<view class="goods_pri_num dis_flex aic ju_b">
							<view class="goods_pri">￥<text>{{item.pri}}</text></view>
							<view class="goods_num dis_flex">
								<text v-if="item.num>1" class="iconfont iconiconset0187" @tap.stop="onNum(item,'-')"></text>
								<text v-else class="iconfont iconiconset0187 no"></text>
								<input type="text" v-model="item.num" disabled="">
								<text class="iconfont icon54" @tap.stop="onNum(item,'+')"></text>
							</view>
						</view>
					</view>
				</view>
				<view class="move">
					<view class="bg-red" @tap="del_car(item)">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		data() {
			return {
				pltype: 1,
				title: '列表',
				btnkg: 0,
				modalName: null,
				alltype:false,
				page:1,
				pagesize:20,
				datas: [],
				listTouchStart: 0,
				listTouchDirection: null,
			}
		},
		components: {
		    uniSwipeAction,
		    uniSwipeActionItem
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas'])
		},
		onLoad() {
			that=this
			that.datas=[
				{
					pic:'/static/images/goods_type_03.jpg',
					name:'MODULE悦写 4合1多功能笔 中性笔 与铅笔结合',
					gg:['4合1多功能笔','多色'],
					pri:'39.99',
					num:1,
					id:1
				},
				{
					pic:'/static/images/goods_type_05.jpg',
					name:'FREETIE 固特异工装帆布鞋 高密度飞织春夏款',
					gg:['炭黑（春夏款）','42'],
					pri:'209',
					num:1,
					id:2
				},
				{
					pic:'/static/images/goods_type_07.jpg',
					name:'法国Dior迪奥 烈焰蓝金唇膏999滋润3.5g/盒',
					gg:['#999滋润'],
					pri:'269',
					num:1,
					id:3
				}, 
				{
					pic:'/static/images/goods_type_03.jpg',
					name:'MODULE悦写 4合1多功能笔 中性笔 与铅笔结合',
					gg:['4合1多功能笔','多色'],
					pri:'39.99',
					num:1,
					id:4
				},
				{
					pic:'/static/images/goods_type_05.jpg',
					name:'FREETIE 固特异工装帆布鞋 高密度飞织春夏款',
					gg:['#999滋润'],
					pri:'206',
					num:1,
					id:5
				},
				{
					pic:'/static/images/goods_type_07.jpg',
					name:'法国Dior迪奥 烈焰蓝金唇膏999滋润3.5g/盒',
					gg:['4合1多功能笔', '多色'],
					pri:'269',
					num:1,
					id:6
				}, 
			]
			// this.getdata()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
			this.page=1
		  this.getdata()
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			// this.getdata()
		},
		methods: {
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
					console.log(e.currentTarget.dataset.target)
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			select_car(item) {
				if (item.active == 1) {
					Vue.set(item, 'active', 0)
				} else {
					Vue.set(item, 'active', 1)
				}
			},
			//加减
			onNum(item,ad) {
			  let that = this
			  console.log(item)
			  // let ad = e.currentTarget.dataset.ad
			  // let id = e.currentTarget.dataset.id
			  // let thisidx = e.currentTarget.dataset.idx
			  // let thisidx1 = e.currentTarget.dataset.idx1
			
			  if (item < 2 && ad == '-') {
			    console.log('禁止')
			    return false;
			
			  }
				var new_num=item.num
				if (ad == '-') {
				  new_num--
				} else {
				  new_num++
				}
				Vue.set(item, 'num', new_num)
			  return
			  var jkurl= '/cart/incOrDec'
				var datas={
					token: that.loginMsg.userToken,
					g_id:that.data_list[thisidx].g_id,
					v_id:that.data_list[thisidx].v_id,
					type:ad == '-'?'dec':'inc',
					sum:1
				}
			 service.P_post(jkurl, datas).then(res => {
			 	that.btn_kg=0
			 	console.log(res)
			 	if (res.code == 1) {
			 		var datas = res.data
			 		// console.log(typeof datas)
			 			
			 		if (typeof datas == 'string') {
			 			datas = JSON.parse(datas)
			 		}
			 	
			 		if (ad == '-') {
			 		  that.data_list[thisidx].number--
			 		} else {
			 		  that.data_list[thisidx].number++
			 		}
			 	
			 	}
			 }).catch(e => {
			 	that.btn_kg=0
			 	console.log(e)
			 	uni.showToast({
			 		icon: 'none',
			 		title: '操作失败'
			 	})
			 })
				
			},
			
			getdata(){
				// /api/my/myCollect
				var that =this
				var data = {
					token:that.loginDatas.token,
					page:that.page,
					per_page:that.pagesize
				}
				var jkurl = '/api/my/issue'
				console.log(that.btnkg)
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.post(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							
							var datas = res.data.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if(that.page==1){
								that.datas=datas
								that.page++
								that.btnkg=0
							}else{
								that.btnkg=0
								if(datas.length==0){
									uni.showToast({
										icon:'none',
										title:'暂无更多数据'
									})
									return
								}
								that.datas=that.datas.concat(datas)
								that.page++
							}
							
								
								
				
						} else {
							that.btnkg=0
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
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			
			back_fuc() {
				uni.navigateBack()
			},
			call_tel(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel + ''
				});
			},
			
			sc_all(){
				var that=this
				var datas=that.datas
				var arr=[]
				for(var i=0;i<datas.length;i++){
					if(that.alltype==true){
						Vue.set(datas[i], 'active', false);
						
					}else{
						Vue.set(datas[i], 'active', true);
						
					}
					
				}
				that.alltype=!that.alltype
			},
			sc_fuc(){
				var that =this
				console.log(this.datas)
				var datas=this.datas
				var arr=[]
				for(var i=0;i<datas.length;i++){
					if(datas[i].active){
						arr.push(datas[i].id)
					}
				}
				Dialog.confirm({
					message: '确定要删除这些房源吗？',
				}).then(() => {
					console.log('close');
					var data = {
						ids:arr.join(','),
						token:that.loginDatas.token,
					}
					console.log(data)
					// return
					//selectSaraylDetailByUserCard
					var jkurl = '/api/my/issueDelete'
					
					
					service.post(jkurl, data,
						function(res) {
							
							// if (res.data.code == 1) {
							if (res.data.code == 1) {
								
								
								
									
									uni.showToast({
										icon:'none',
										title:'操作成功'
									})
									that.page=1
									that.getdata()
									that.btnkg=0
					
							} else {
								that.btnkg=0
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
							that.btnkg=0
							
								uni.showToast({
									icon: 'none',
									title: '获取数据失败'
								})
						
						}
					)
					
				});
				console.log(arr)
			},
			// sc_d_fuc(e){
			del_car(id){
				var that =this
				uni.showModal({
				    title: '提示',
				    content: '是否删除该商品',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										uni.showToast({
											icon:'none',
											title:'操作成功'
										})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			
			
			jump(e) {
				var that = this
			
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}
				var datas = e.currentTarget.dataset
			
				console.log(datas.url)
				uni.navigateTo({
					url: e.currentTarget.dataset.url,
				});
			},
			pl_fuc() {
				console.log(1)
				this.pltype = !this.pltype
				var datas=this.datas
				var arr=[]
				for(var i=0;i<datas.length;i++){
					Vue.set(datas[i], 'active', false);
				}
			}
		}
	}
</script>

<style scoped>
	.minh100{
		background: #F6F7F9;
	}
	.car_li{
		height: 218upx!important;
		background: #fff;
		margin-top: 25upx;
	}
	.car_l{
		width: 100vw;
		padding: 26upx 30upx;
		display: flex;
		align-items: center;
	}
	.setting1 {
		font-size: 36upx;
		color: #F1F1F1;
		margin-right: 25upx;
		flex: none;
	}
	
	.active {
		color: #FD383B;
	}
	.cu-list>.cu-item .move{
		width: 164upx;
	}
	.cu-list>.cu-item{
		transition: all .3s ease-in-out 0s;
	}
	.cu-list>.cu-item.move-cur {
	    -webkit-transform: translateX(-164upx);
	    transform: translateX(-164upx);
	}
	.car_li_img{
		width: 163upx;
		height: 163upx;
		/* background: #EEEEEE; */
		margin-right: 29upx;
		box-shadow: 0px 0px 5px 0px rgba(192, 192, 192, 0.4);
		border-radius: 2px;
	}
	.goods_name{
		font-size: 27upx;
		color: #333333;
		line-height: 42upx;
		margin-bottom: 10upx;
	}
	.goods_gg text{
		font-size: 22upx;
		color: #999;
		margin-right: 8upx;
	}
	.goods_pri_num{
		margin-top: 30upx;
	}
	.goods_pri{
		color: #FD383B;
		font-size: 22upx;
	}
	.goods_pri text{
		font-size: 28upx;
	}
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
</style>
