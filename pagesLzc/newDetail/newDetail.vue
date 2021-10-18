<template>
	<view class="contox xmfwb_box">
		<!-- <rich-text :nodes="desc.content" ></rich-text> -->
		<view v-html="get_fwb(desc.content)"></view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				id:1,
				desc:""
			}
		},
		onLoad(option) {
			var that = this;
			if(option.id){
				that.id = option.id
			}
			that.getData()
		},
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getData(){
				var jkurl = "article.Article/info"
				var data = {
					id:this.id
				}
				service.P_get(jkurl,data).then(res=>{
					if(res.code == 1){
						this.desc = res.data;
					}else{
						if(res.msg){
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"请求失败",
								icon:"none"
							})
						}
					}
				}).catch(e=>{
					console.log(e)
					uni.showToast({
						title:"请求异常",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style scoped>
.contox{
	width: 750rpx;
	padding: 30rpx;
	box-sizing: border-box;
	background: #fff;
	min-height: 100vh;
}
</style>
