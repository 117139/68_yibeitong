<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view v-if="datas" class="xieyi_main" v-html="get_fwb(datas)"></view>
			<block v-else>
					<view class="xieyi_main">
						<image src="../../static/images/about_03.jpg" style="width: 100%;height: 1097upx;" mode="aspectFit"></image>
					</view>
			</block>
		</block>
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
				datas:'',
				htmlReset:-1,
			}
		},
		onLoad() {
			that=this
			that.htmlReset=0
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.minh100{
		background: #F8F8F8;
	}
</style>
