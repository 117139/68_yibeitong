<template>
	<view class="minh100">
		<!-- 说明 -->
		<!-- 生成海报 -->
		<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
		<!-- 图片展示由自己实现 -->
		<!-- <view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini">长按图片保存到手机</button>
					<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view>
			</view>
		</view> -->
		<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage1"></image>
		<button type="primary" size="default" @tap.prevent.stop="saveImage()">保存图片</button>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// const { wxml, style } = require('./demo.js')
	import _app from '../../utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	var that;
	export default {
		data() {
			return {
				width: 750,
				height: 1334,

				sheetshow: true,
				xdxy_type: 1,



				poster: {
					width: 750,
					height: 1334
				},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				count: 0
			}
		},
		props: ['postersData'],
		created() {
			that = this;
			this.shareFc();
		},
		methods: {
			drawImage() {
				let _this = this;
				var drawimg = new Wxml2Canvas({
					width: _this.data.width,
					height: _this.data.height,
					element: 'canvas1',
					background: '#fff',
					progress(percent) {},
					finish(url) {
						wx.hideLoading();
						wx.saveImageToPhotosAlbum({
							filePath: url
						})
					},
					error(res) {}
				});

				let data = {
					list: [{ //绘制矩形
							type: 'rect',
							x: 0,
							y: 50,
							style: {
								width: _this.data.width,
								height: _this.data.height - 60,
								fill: '#fff'
							}
						},
						{ //根据wxml绘制,
							type: 'wxml',
							class: '.hb_canvas .draw_canvas',
							limit: '.hb_canvas',
							x: 5,
							y: 70
						}
					]
				}
				drawimg.draw(data);
			},
			getPosterHandle() {
				wx.showLoading({
					title: '海报生成中...',
				})
				this.drawImage();
			},
			async shareFc() {
				let _this = this;
				console.log(service.imgurl+'/static/images/share_img_02.jpg')
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10,
							backgroundColor:'#fff'
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [
								{
									type: 'image',
									id: 'productImage',
									url: service.imgurl+'/static/images/share_img_02.jpg',
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .3;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										width=750
										height=925
										addHeight=404
										setBgObj({
											width,
											height: height + addHeight,
											backgroundColor:'#fff'
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									id: 'productName',
									text: '阿一古',
									color: '#000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										console.log('allInfoCallback', 1)
										const productImage = drawArray.find(item => item.id === 'productImage')
										console.log('allInfoCallback', 2)
										console.log('allInfoCallback getBgObj', getBgObj)
										const addHeight = getBgObj().height - productImage.dHeight;
										console.log('allInfoCallback', 3)
										return {
											size: 26,
											lineFeed: {
												maxWidth: 200,
												lineNum: 1
											},
											dx:312,
											dy:1033
										}
									}
								},
								{
									type: 'text',
									text: '邀请您加入依辈通',
									color: '#f1505c',
									serialNum: 2,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 26,
											color:'#999999',
											lineFeed: {
												maxWidth: 300,
												lineNum: 1
											},
											dx:312,
											dy:1101
										}
									}
								},
								{
									type: 'text',
									text: '———— 长按识别或扫描二维码进入 ————',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 28,
											color:'#999999',
											lineFeed: {
												maxWidth: 750,
												lineNum: 1
											},
											textAlign:'center',
											// dx:108,
											dx:350,
											// dx:0,
											// dy:1175
											dy:1200
										}
									}
								},
								{
									type: 'qrcode',
									text: '123456',
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										const widthSize = getBgObj().width * .4;
										const heightSize = addHeight;
										const countSize = widthSize > heightSize ? heightSize : widthSize;
										// countSize=172
										const size = countSize * .9;
											_app.log(getBgObj().width)
											_app.log(getBgObj().height)
										return {
											// size: size,
											// dx: getBgObj().width - countSize * .95,
											// dy: getBgObj().height - countSize * .95
											size:172,
											dx:123,
											dy:979
										}
									}
								}
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					_this.poster.finalPath = d.poster.tempFilePath;
					_this.qrShow = true;
					_this.src = d.poster.tempFilePath
					return
					wx.uploadFile({
						url: service.IPurl + '/upload/streamImg', //仅为示例，非真实的接口地址
						filePath: d.poster.tempFilePath,
						name: 'file',
						formData: {
							'type': 1,
						},
						success(res) {
							// console.log(res.data)
							var ndata = JSON.parse(res.data)
							if (ndata.code == 1) {
								// console.log(imgs[i], i,ndata.msg)
								// var newdata = that.imgb
								// console.log(i)
								// newdata.push(ndata.msg)
								_this.src = ndata.msg
								wx.showToast({
									icon: "none",
									title: "上传成功"
								})
							} else {
								wx.showToast({
									icon: "none",
									title: "上传失败"
								})
							}
						}
					})
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				var that = this;
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('操作成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('操作成功');
				setTimeout(function() {
					that.hideQr();
				}, 1000)
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				// this.qrShow = false;
				that.$emit('hideQr');
			}
		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
	.minh100{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30upx;
		
		/* justify-content: center; */
	}
	.posterImage1{
		width: 600upx;
		height: 1067upx;
		margin: 0 auto 30upx;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	}
</style>
