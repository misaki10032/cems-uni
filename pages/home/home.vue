<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
            <view class="avator" @click="toMyself">
              <img src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg">
            </view>
            <view class="phone-number">{{ user.userPname }}</view>
            <view class="role">{{ user.userRole }}</view>
          </view>
					<view class="nav">
						<view class="nav_item" v-for="(n,index) in nav" :key="index" @click="toDetials(n.url)">
							<view>{{n.num}}</view>
							<view>{{n.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li" v-for="(hm,index) in menu" :key="index" @click="toUrl(hm.url)">
					<view>
						{{hm.title}}
						<text>></text>
					</view>
				</view>
				<view class="li" @click="logOut">
          <view>退出登录
            <text>></text>
          </view>
        </view>

      </view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
        headImg: {},
        menu: [
          {
            "title": "我的帖子",
            "url": "/pages/aboutUs/aboutUs"
          },
          {
            "title": "我的评论",
            "url": "/pages/aboutUs/aboutUs"
          },
          {
            "title": "账号安全",
            "url": "/pages/safe/safe"
          },
          {
            "title": "权限申请",
            "url": "/pages/safe/safe"
          },
          {
            "title": "关于我们",
            "url": "/pages/aboutUs/aboutUs"
          }
        ],
				nav: [{
						"title": "我关注的",
						"num": 0,
						"url": "/pages/home/currentMenu/attention/attention"
					},
					{
						"title": "被关注",
						"num": 0,
						"url": "/pages/home/currentMenu/unattention/unattention"
					},
					{
						"title": "足迹",
						"num": 0,
						"url": "/pages/home/currentMenu/footPrints/footPrints"
					},
					{
						"title": "余额",
						"num": uni.getStorageSync("loginUser").userMoney,
						"url": "/pages/home/currentMenu/moneyCheat/moneyCheat"
					}
				],
				user:uni.getStorageSync("loginUser")
			}
		},
		onShow() {
			/* 页面加载*/
			var user = uni.getStorageSync("loginUser");
			if(user==null||user==""||user.userPname==null||user.userPname==""){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return
			}
			if(user.userRole=='complete'){
				user.userRole = "委托人";
			}else{
				user.userRole = "代理人";
			}
			this.user = user;
		},
		onPullDownRefresh() {
			/* 下拉刷新的逻辑处理 */
			console.log("下拉刷新")
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			alert("真的没有了哟~")
		},
		methods: {
			logOut(){
				uni.showModal({
					title: "温馨提示",
					content: "您确定要退出吗",
					showCancel: true,
					confirmColor: "#DD524D",
					success: res => {
						if(res.confirm){
							uni.clearStorageSync();
							uni.redirectTo({
								url: '/pages/login/login'
							})
						}
						if(res.cancel){
							return
						}
					},
					
				})
				
			},
			toTask() {
				uni.switchTab({
					url: '/pages/task/task'
				})
			},
			toUrl(url) {
				uni.navigateTo({
					url
				})
			},
			toMyself() {
				uni.navigateTo({
					url: "/pages/home/myself/myself"
				})
			},
			toDetials(url) {
				uni.navigateTo({
					url
				})
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.headImg = res.tempFilePaths
					},
					fail() {
						alert("系统繁忙，稍后再试")
					}
				})
			}
		}
	}
</script>

<style lang="scss">

	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 290upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #b50e03;
		}
	}

	.box {
    width: 650 upx;
    height: 300 upx;
    border-radius: 20 upx;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 5 upx 20 upx 0 upx rgba(0, 0, 150, .2);

    /* 导航 */
    .nav {
      display: flex;
      border-bottom: 1 rpx solid #eee;

			/* 图标+文字 */
			.nav_item {

				width: 33.3%;
				text-align: center;
				margin-top: 15rpx;

				view {
					margin: 10rpx auto;
				}
			}
		}

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
				font-size: 40rpx;
			}
			.role {
				text-align: center;
				font-size: 20rpx;
				color: #767676;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}
		
		view:nth-child(1){
			margin-top: 40rpx;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			text {
				position: absolute;
				right: 30rpx;
				color: #ccc;
			}
			

			text {
				position: absolute;
				right: 30rpx;
				color: #ccc;
			}
			
			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
