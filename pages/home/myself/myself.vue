<template>
	<view class="myself" :info="info">
		<view>
			<text>头像</text>
			<image :src="img" @click="chooseImg"></image>
		</view>
		<view @click="infoUpd(1,info.userName)">
			<text>真实姓名</text>
			<text>{{info.userName}}</text>
			<text>></text>
		</view>
		<view @click="infoUpd(2,info.userDec)">
      <text>个性签名</text>
      <text>{{ resInfo.newDec }}</text>
      <text>></text>
    </view>
		<view @click="infoUpd(3,info.userPname)">
			<text>昵称</text>
			<text>{{info.userPname}}</text>
			<text>></text>
		</view>
		<view>
			<text>联系手机</text>
			<text>{{info.userPhone}}</text>
		</view>
		<view @click="infoUpd(4,info.userEmail)">
			<text>联系邮箱</text>
			<text>{{info.userEmail}}</text>
			<text>></text>
		</view>
		<view>
			<text>用户性别</text>
			<picker @click="isFlag()" @cancel="isFlag" :range="array" @change="changeSex">
				<view class="uni-input">{{info.userSex}}</view>
			</picker>
			<image :src="flag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
		</view>
    <view>
      <text>出生年月</text>
      <picker :end="endDate" :value="info.userBirth | formatDate" mode="date" selector-type="picker" @cancel="isdFlag"
              @change="bindDateChange" @click="isdFlag()">
        <view class="uni-input">{{ info.userBirth | formatDate }}</view>
      </picker>
      <image :src="dflag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
    </view>
    <view @click="infoUpd(5,info.userHouse)">
      <text>家庭住址</text>
      <text>{{ resInfo.newUserHouse }}</text>
      <text>></text>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        info: {},
        resInfo: {
          newUserHouse: "",
          newDec: ""
        },
        img: "https://img1.baidu.com/it/u=1182459655,2369734023&fm=26&fmt=auto&gp=0.jpg",
        flag: true,
        dflag: true,
        array: ['男', '女'],
        index: 0
      }
		},
    onShow() {
      this.flushthis();
    },
    mounted() {

    },
    computed: {
      endDate() {
        return new Date().getDate();
      }
    },
    onPullDownRefresh() {

    },
    methods: {
      flushthis() {
        const user = uni.getStorageSync("loginUser")
        let id = user.userId
        this.$myRequest({
          url: "/getThisUser?id=" + id,
          method: "GET",
          success: res => {
            if (res.data.code == 200) {
              uni.removeStorageSync("loginUser")
              uni.setStorageSync("loginUser", res.data.userInfo)
              this.info = res.data.userInfo;
              this.resInfo = res.data.userInfo;

              if (this.info.userDec.length > 16) {
                this.resInfo.newDec = this.info.userDec.substr(0, 16) + "..."
              } else {
                this.resInfo.newDec = this.info.userDec
              }
              if (this.info.userHouse.length > 16) {
                this.resInfo.newUserHouse = this.info.userHouse.substr(0, 16) + "..."
              } else {
                this.resInfo.newUserHouse = this.info.userHouse
              }
            }
						if (res.data.code != 200) {
							uni.clearStorage()
							setTimeout(() => {
								uni.showToast({
									title: res.data.msg,
									icon: "loading"
								})
								uni.redirectTo({
									url: "/pages/login/login"
								})
							}, 1500)
						}
					}
				})
			}
			,
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.img = res.tempFilePaths
					},
					fail() {
						
					}
				})
			},
			infoUpd(id, res) {
				uni.navigateTo({
					url: "/pages/home/myself/myselfUpd/myselfUpd?param=" + res + "&id=" + id
				})
			},
			changeSex(res) {
				this.index = res.target.value
				this.info.userSex = this.array[this.index]
				this.$myRequest({
					url: "/revUserInfo",
					data: this.info,
					method: "POST",
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						}
						this.flushthis();
					}
				})
			},
			isFlag() {
				this.flag = !this.flag
			},
			isdFlag() {
				this.dflag = !this.dflag
			},
			bindDateChange: function(e) {
				this.info.userBirth = e.target.value
				this.$myRequest({
					url: "/revUserInfo",
					data: this.info,
					method: "POST",
					success: res => {

						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
						}
					}
				})
			}
		},
		filters: {
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
	.myself {
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50rpx;
			position: relative;
			right: -520rpx;
		}

		view:nth-child(7) {
			.uni-input {
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				position: absolute;
				right: 20rpx;
				top: 600rpx;
			}

			image {
				width: 30rpx;
				height: 20rpx;
				position: absolute;
				right: 15rpx;
				top: 650rpx;
			}
		}
		
		view:nth-child(8) {
			.uni-input {
        width: 660rpx;
        height: 60rpx;
        text-align: right;
        position: absolute;
        top: 680rpx;

      }
		
			image {
				width: 30rpx;
				height: 20rpx;
				position: absolute;
				right: 15rpx;
				top: 730rpx;
			}
		}

		view {
			margin: 30rpx 20rpx;
			line-height: 60rpx;
			width: 750rpx;
			height: auto;
			border-bottom: 1rpx solid #eee;

			text:nth-child(2) {
				position: absolute;
				right: 50rpx;
				font-size: 30rpx;
			}

			text:nth-child(3) {
				color: #ccc;
				position: absolute;
				right: 20rpx;
			}
		}
	}
</style>
