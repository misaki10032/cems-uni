<template>
	<view class="post">
		<scroll-view scroll-y="true" class="post-scroll-y">
			<view class="post-title">
				<view class="post-title-name">
					<text>
						{{post.foTitle}}
					</text>
				</view>
				<view class="post-name-info">
					<text>
						{{post.auserName}}
					</text>
				</view>
				<view class="post-title-info">
					<text>发布时间 {{post.agmtCreate}}</text>
				</view>
			</view>
			<view class="post-head">
				<uni-card class="post-card">
					<view class="post-head-info">
						<view class="post-head-info-img">
							<image src="https://img2.baidu.com/it/u=1205915504,3217808836&fm=26&fmt=auto&gp=0.jpg"></image>
						</view>
						<view class="post-head-info-data">
							{{post.foData}}
						</view>
					</view>
				</uni-card>
			</view>
			<text>评论<uni-icons type="chatboxes"></uni-icons></text>
			<view class="post-body">
				<view class="post-body-info" v-for="commen in post.comments" :key="commen.cid">
					<uni-card>
						<view class="post-info-head">
							<view class="post-body-info-img">
								<image src="https://img0.baidu.com/it/u=3353211517,995971476&fm=26&fmt=auto&gp=0.jpg"></image>
							</view>
							<view class="post-body-people">
								<view class="post-body-people-title">
									<text>{{commen.cuserName}}</text>
								</view>
								<view class="post-body-people-title">
									<text>{{commen.cgmtCreate}}</text>
									<text @click="addReply(commen.cid,commen.cuserId)"><uni-icons type="paperplane"></uni-icons>回复</text>
								</view>
							</view>
						</view>
						<view class="post-body-info-body">
							{{commen.commData}}
						</view>
						<view class="post-body-info-more" v-if="commen.replies.length != 0">
							<uni-collapse accordion="true">
								<uni-collapse-item title="查看更多">
									<view class="more" v-for="(recommen,index) in commen.replies" :key="index">
										<view class="post-info-head">
											<view class="post-body-info-img">
												<image src="https://img0.baidu.com/it/u=3353211517,995971476&fm=26&fmt=auto&gp=0.jpg"></image>
											</view>
											<view class="post-body-people">
												<view class="post-body-people-title">
													<text>
														{{recommen.rcommuserName}}<uni-icons type="paperplane"></uni-icons>{{recommen.commReUserName}}
													</text>
												</view>
												<view class="post-body-people-title">
													<text>{{recommen.rgmtCreate}}</text>
													<text @click="addReply(commen.cid,recommen.rcommuser)">
														<uni-icons type="paperplane"></uni-icons>回复
													</text>
												</view>
											</view>
										</view>
										<view class="post-body-info-body">
											{{recommen.commReData}}
										</view>
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view>
					</uni-card>
				</view>
			</view>
			<view class="post-bottom">
				<uni-popup ref="popup" type="bottom" background-color="#fff">
					<uni-easyinput  v-model="reply.commReData" focus placeholder="在此输入您想说的话" :adjust-position="false"></uni-easyinput>
					<button type="primary" @click="addReplys">发送</button>
				</uni-popup>
			</view>
		</scroll-view>
		<view class="post-bottom">
			<uni-easyinput v-model="data" type="text" placeholder="在此输入您想说的话" :adjust-position="false"></uni-easyinput>
			<button type="primary" @click="addComment">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				post: {},
				data: "",
				indata: "",
				incid: "",
				inuid: "",
				reply: {
					commenReply: "",
					commReData: "",
					rCommuser: "",
					commReUser: ""
				},
				arti: {
						cUserId: "",
						artId: "",
						commData: ""
					}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getPostInfo(options.id)
		},
		methods: {
			open() {
				this.$refs.popup.open('top')
			},
			close() {
				this.indata = ""
				this.$refs.popup.close()
			},
			addReply(cid,uid){
				var user = uni.getStorageSync("loginUser");
				if (user == null || user == "" || user.userPname == null || user.userPname == "") {
				  uni.navigateTo({
					url: "/pages/login/login"
				  })
				  return
				}
				this.incid = cid
				this.inuid = uid
				this.open()
			},
			getPostInfo(id){
				this.$myRequest({
					url: "/toArticleInfo?id=" + id,
					method: "GET",
					success: res => {
						if(res.data.code == 200){
							console.log(res.data)
							this.post = res.data.article
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			addComment(){
				var user = uni.getStorageSync("loginUser");
				if (user == null || user == "" || user.userPname == null || user.userPname == "") {
				  uni.navigateTo({
					url: "/pages/login/login"
				  })
				  return
				}
				if(this.data == null || this.data == undefined || this.data == ""){
					uni.showToast({
						title: "评论为空空，合理吗? en",
						icon: "none"
					})
					return
				}
				this.$myRequest({
					url: "/addComment",
					method: "GET",
					data: {
						cUserId: uni.getStorageSync("loginUser").userId,
						artId: this.post.id,
						commData: this.data
					},
					success: res => {
						console.log(res)
						if(res.data.code == 200){
							uni.showToast({
								title: "评论成功",
								icon: "success"
							})
							this.data = ""
							this.getPostInfo(this.id)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
					
				})
			},
			addReplys(){
				if(this.reply.commReData == null || this.reply.commReData == undefined || this.reply.commReData == ""){
					uni.showToast({
						title: "评论为空空，合理吗? en",
						icon: "none"
					})
					return
				}
				this.$myRequest({
					url: "/addReply",
					method: "GET",
					data:{
						commReData: this.reply.commReData,
						commReply: this.incid,
						commReUser: this.inuid,
						rCommuser: uni.getStorageSync("loginUser").userId
					},
					success: res => {
						if(res.data.code == 200){
							uni.showToast({
								title: "评论成功",
								icon: "success"
							})
							this.reply.commReData = ""
							this.getPostInfo(this.id)
							this.close()
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.post{
		width: 750rpx;
		.post-scroll-y{			
			height: 1400rpx;
			text{
				margin-left: 30rpx;
			}
			.post-title{
				margin: 0 30rpx;
				.post-title-name{
					text-align: center;
					font-size: 40rpx;
					text{
						margin-right: 30rpx;
					}
					text:nth-child(2){
						font-size: 25rpx;
					}
				}
				.post-name-info{
					text-align: center;
				}
				.post-title-info{
					text-align: center;
				}
			}
			.post-head{
				width: 750rpx;
				height: auto;
				display: flex;
				.post-card{
					padding-top: 70rpx;
				}
				.post-head-info{
					display: flex;
					height: auto;
					width: 100%;
					.post-head-info-img{
						width: 100rpx;
						height: 100rpx;
						image {
							width: 100rpx;
							height: 100%;
							border-radius: 50rpx;
							margin-top: -400rpx;
						}
					}
					.post-head-info-data{
						margin-left: 80rpx;
						margin-top: -60rpx;
					}
				}
			}
			.post-body{
				width: 750rpx;
				.post-body-info{
					width: 100%;
					height: auto;
					display: flex;
					flex-wrap: wrap;
					.post-info-head{
						width: 100%;
						display: flex;
						.post-body-info-img{
							width: 100rpx;
							height: 100rpx;
							image {
								width: 100%;
								height: 100%;
								border-radius: 50rpx;
							}
						}
						.post-body-people{
							margin-left: 10rpx;
							margin-top: 0rpx;
							view:nth-child(1){
								text{
									color: #003e81;
								}
							}
							.post-body-people-title{
								display: flex;
								text{
									font-size: 25rpx;
								}
								text:nth-child(2){
									margin-right: 40rpx;
									color: #221b6f;
								}
							}
						}
					}
					.post-body-info-body{
						margin-left: 140rpx;
						color: #057404;
						height: auto;
					}
					.post-body-info-more{
						width: 100%;
						margin-top: 10rpx;
						.more{
							margin: 20rpx;
							border-bottom: 1rpx solid #BEBEBE;
						}
					}
				}
			}
		}
		.post-bottom{
			margin-left: 20rpx;
			width: 730rpx;
			display: flex;
			position: absolute;
			bottom: 10rpx;
			button{
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
			}
		}
	}
</style>
