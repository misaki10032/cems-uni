<template>
	<view class="friend-info">
		<view class="friend-info-pics" @click="choosePicsImg">
			<image :src="pics"></image>
		</view>
		<view class="friend-info-head">
			<view class="friend-info-head-img">
				<image src="https://img1.baidu.com/it/u=1993408415,981167132&fm=26&fmt=auto&gp=0.jpg"></image>
			</view>
			<view class="friend-info-head-info">
				<view class="friend-info-head-info-main">
					<text>昵称: {{user.userPname}}</text>
				</view>
				<view class="friend-info-head-info-main">
					<text>账号: {{user.userPhone}}</text>
				</view>
				<view class="friend-info-head-info-handup" @click="plus">
					<uni-icons type="hand-thumbsup"></uni-icons>  
					<text>{{num}}</text>
				</view>
			</view>
		</view>
		<view class="friend-info-body">
			
			<view class="friend-info-body-other">
				<uni-icons type="person" size="12"></uni-icons>
				<text>{{user.userName}} | {{user.userBirth | formatAge}} | {{user.userBirth | formatDate}} | {{user.userSex}} | {{user.userHouse}}</text>
			</view>
			<view class="friend-info-body-other">
				<uni-icons type="email" size="12"></uni-icons>
				<text>{{user.userEmail}}</text>
			</view>
			<view class="friend-info-body-other">
				<uni-icons type="chatbubble" size="12"></uni-icons>
				<text>{{user.userDec}}</text>
			</view>
		</view>
		<text @click="plusImg">添加图片</text>
		<view class="friend-info-tail">
			<view class="friend-info-tail-chooseImg">
				<view class="friend-info-tail-chooseImg-tips" @click="plusImg" v-if="tipsFlag">
					<uni-icons type="plusempty"></uni-icons>
					<text>展示最好的自己</text>
				</view>
				<view class="friend-info-tail-chooseImg-pics">
					<image :src="img" v-for="(img,index) in imgs" :key="index" @click="previewImg(img)"></image>
				</view>
			</view>
		</view>
		
		<view class="friend-info-btn"> 
			<button @click="callit" type="warn">语音通话</button>
			<button @click="toMsg" type="primary">发送消息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num : 3425,
				pics: "",
				tipsFlag: true,
				imgs: [],
				user: {}
			}
		},
		onShow(options){
			
		},
		onLoad(options) {
			this.getUserById(options.id)
			this.pics = "https://wallpaper.infinitynewtab.com/wallpaper/"+options.id+".jpg"
			
		},
		methods: {
			plus(){
				let count = 0
				count++
				if(count == 10){
					setTimeout(() => {
						uni.showToast({
							title: "您每天只能给10个人点赞",
							icon: "none"
						})
					},24*60*1000)
					return
				}
				this.num++
			},
			callit(){
				uni.makePhoneCall({
					phoneNumber:this.user.userPhone
				})
			},
			toMsg() {
				
			},
			getUserById(id){
				this.$myRequest({
					url: "/getThisUser",
					method: "GET",
					data:{
						id:id
					},
					success: res => {
						console.log(res.data)
						this.user = res.data.userInfo
					}
				})
			},
			plusImg(){
				uni.chooseImage({
					count: 9,
					success: res => {
						console.log(res)
						this.imgs = res.tempFilePaths
						uni.showToast({
							title: "上传成功",
							icon: "success"
						})
						this.tipsFlag = !this.tipsFlag
					}
				})
			},
			previewImg(current){
				const urls = this.imgs.map(item => {
					return item
				})
				uni.previewImage({
					current,
					urls
				})
			},
			choosePicsImg() {
				uni.chooseImage({
					count: 1,
					success: res => {
						uni.showLoading({
							title: "正在加载"
						})
						setTimeout(() => {
							uni.showToast({
								title: "更换成功",
								icon: "success"
							})
						},300)
						uni.hideLoading()
						this.pics = res.tempFilePaths
					}
				})
			}
		},
		filters: {
			formatAge: function(age){
				var date = new Date(age).getFullYear()
				var curDate = new Date().getFullYear()
				return (curDate - date) + "岁"
			},
			formatDate: function(value) {
				var date = new Date(value);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			 }
		}
	}
</script>

<style lang="scss">
	.friend-info{
		width: 750rpx;
		.friend-info-pics{
			width: 750rpx;
			height: 380rpx;
			image{
				width: 750rpx;
				height: 100%;
			}
		}
		.friend-info-head{
			margin: 30rpx;
			display: flex;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			.friend-info-head-img{
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
				}
			}
			.friend-info-head-info{
				margin-left: 40rpx;
				.friend-info-head-info-main{
					
				}
				.friend-info-head-info-handup{
					position: fixed;
					top: 420rpx;
					right: 100rpx;
				}
			}
		}
		.friend-info-body{
			margin: 30rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			.friend-info-body-other{
				margin-top: 20rpx;
				font-size: 24rpx;
				text{
					margin-left: 15rpx;
				}
			}
		}
		text{
			margin-left: 30rpx;
			font-size: 25rpx;
		}
		.friend-info-tail{
			margin: 10rpx 30rpx 24rpx 30rpx;
			width: 690rpx;
			height: 550rpx;
			border: 1rpx solid #eee;
			.friend-info-tail-chooseImg{
				width: 100%;
				.friend-info-tail-chooseImg-tips{
					text-align: center;
					padding-top: 270rpx;
				}
				.friend-info-tail-chooseImg-pics{
					width: 100%;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					image{
						width: 226rpx;
						padding: 2rpx;
						height: 180rpx;
					}
				}
			}
		}
		.friend-info-btn{
			margin: 0rpx 30rpx;
			display: flex;
			button{
				width: 50%;
			}
		}
	}
</style>
