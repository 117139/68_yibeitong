<template>
	<view class="minh100">
		<image class="cz_bg" src="../../static/images/cz_bg_02.png" mode="aspectFill"></image>
		<view class="hd_box">
			<view class="hd_box_bg">
				<view class="hd_box_tit">
					<view>电话号码</view><text>北京市海淀区移动服务</text>
				</view>
				<view class="tel_box">
					<input type="number" v-model="phone">
				</view>
				<view class="cz_mon">请选择充值金额</view>
				<view class="cz_list">
					<view class="cz_li" :class="cz_cur==index?'cur':''" v-for="(item,index) in cz_list" @tap="cz_cur=index">
						<image v-if="cz_cur==index" src="../../static/images/cz_select_05.png" mode="aspectFill"></image>
						<text>{{item.name}}元</text>
					</view>
					<view class="cz_li" :class="cz_cur==-1?'cur':''" @tap="cz_cur=-1">
						<image v-if="cz_cur==index" src="../../static/images/cz_select_05.png" mode="aspectFill"></image>
						<input class="other_mon" type="number" v-model="other_mon" placeholder="其他金额">
					</view>
				</view>
				<view class="cz_btn" @tap="sub">立即充值</view>
			</view>
		</view>
		
		<view v-if="show_tk" class="tk_big_box dis_flex aic ju_c" @touchmove.stop.prevent='test'>
			<view class="tk_show_box">
				<image class="tk_imgbg" src="../../static/images/hf_tk_03.jpg" mode="aspectFit"></image>
				<view class="tk_show_msg">
					<view class="tk_msg1">恭喜您获得现金红包</view>
					<view class="tk_msg2">0.09<text>元</text></view>
					<view class="tk_msg3">红包已发到你的账户余额，请查收</view>
				</view>
			</view>
			<text class="iconfont iconguanbi off_btn" @tap="off_fuc"></text>
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
				phone:'',
				cz_list:[
					{
						name:'10',
						id:10
					},
					{
						name:'20',
						id:20
					},
					{
						name:'30',
						id:30
					},
					{
						name:'50',
						id:50
					},
					{
						name:'100',
						id:100
					},
					{
						name:'200',
						id:200
					},
					{
						name:'300',
						id:300
					},
					{
						name:'500',
						id:500
					},
				],
				cz_cur:0,
				other_mon:'',
				show_tk:false
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
		onLoad() {
			that=this
			that.phone='17898347891'
		},
		methods: {
			test() {},
			off_fuc(){
				that.show_tk=false
			},
			sub(){
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
					return
				}
				if(that.cz_cur==-1){
					if(!that.other_mon){
						uni.showToast({
							icon:'none',
							title:'请输入充值金额'
						})
						
					}else if(that.other_mon>=1){
						uni.showToast({
							icon:'none',
							title:that.phone+'充值'+that.other_mon+'元'
						})
						
						setTimeout(function(){
							that.show_tk=true
						},1000)
					}else{
						uni.showToast({
							icon:'none',
							title:'充值金额不能小于1元'
						})
					}
					
				}else{
					uni.showToast({
						icon:'none',
						title:that.phone+'充值'+that.cz_list[that.cz_cur].name+'元'
					})
					setTimeout(function(){
						that.show_tk=true
					},1000)
				}
			}
		}
	}
</script>

<style scoped>
	.minh100{
		position: relative;
		background: linear-gradient(180deg, #FE846C, #F73328, #FF9D78);
	}
	.cz_bg{
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 1007upx;
	}
	.hd_box{
		width: 100%;
		position: relative;
		z-index: 1;
		padding: 220upx 30upx 0;
		min-height: 100vh;
	}
	.hd_box_bg{
		width: 100%;
		min-height: calc(100vh - 220upx);
		background: #FFFFFF;
		border-radius: 4upx;
		padding: 10upx 26upx 50upx;
	}
	.hd_box_tit{
		width: 100%;
		line-height: 100upx;
		display: flex;
		align-items: center;
		font-size: 26upx;
		color: 33px;
	}
	.hd_box_tit text{
		font-size: 26upx;
		color: #999;
		margin-left: 35upx;
	}
	.tel_box{
		padding-bottom: 30upx;
		border-bottom: 1px solid #0381EB;
	}
	.tel_box input{
		width: 100%;
		font-size: 60upx;
		height: auto;
		color: #303030;
	}
	.cz_mon{
		font-size: 26upx;
		color: #333;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
	}
	.cz_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.cz_li{
		width: 202upx;
		height: 117upx;
		background: #FFFFFF;
		border: 1px solid rgba(205, 205, 205, .79);
		border-radius: 4upx;
		position: relative;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 15upx;
		margin-bottom: 15upx;
		/* font-weight: bold; */
		font-size: 32upx;
	}
	.other_mon{
		width: 100%;
		font-size: 32upx;
		color: #333;
		text-align: center;
	}
	.cz_li:nth-child(3n){
		margin-right: 0;
	}
	.cz_li.cur{
		border: 1px solid #F65552;
		color: #F45458;
	}
	.cz_li.cur image{
		position: absolute;
		top: 0;
		right: 0;
		width: 53upx;
		height: 56upx;
	}
	.cz_btn{
		font-size: 30upx;
		color: #fff;
		width: 616upx;
		height: 81upx;
		background: #F45458;
		border-radius: 41upx;
		margin: 100upx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tk_big_box {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 990;
		background: rgba(0, 0, 0, .8);
		flex-direction: column;
	}
	.tk_show_box{
		width: 570upx;
		position: relative;
	}
	.tk_imgbg{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 570upx;
		height: 671upx;
		z-index: 991;
	}
	.tk_show_msg{
		position: relative;
		z-index: 992;
		width: 570upx;
		height: 671upx;
		border-radius: 15upx;
		padding-top: 130upx;
		padding-bottom: 45upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tk_msg1{
		font-size: 20upx;
		color: #CFAA5F;
	}
	.tk_msg2{
		font-size: 60upx;
		color: #D72022;
		display: flex;
		align-items: baseline;
		margin-top: 30upx;
	}
	.tk_msg2 text{
		font-size: 22upx;
	}
	.tk_msg3{
		font-size: 22upx;
		color: #FFE9B7;
		margin-top: 335upx;
	}
	.off_btn{
		font-size: 42upx;
		color: #DFDFDF;
		margin-top: 30upx;
	}
</style>
