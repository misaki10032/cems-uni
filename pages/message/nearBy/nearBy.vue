<template>
	<view style="background-color: #f7f7f7;">
		<uni-row v-for="(item,index) in info" :key="index" style="margin-top: 20rpx;background-color: #fff;">
			<uni-col :span="4">
				<view v-if="item.userSex=='男'">
					<image class="user_image" style="border-radius: 30px;"
						src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214939_muavg.thumb.1000_0.jpg">
					</image>
				</view>
				<view v-if="item.userSex!='男'">
					<image class="user_image"
						src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214938_pyznn.thumb.1000_0.jpg">
					</image>
				</view>
			</uni-col>
			<uni-col :span="7" class="user_name">
				<view class="light"><text>{{item.userName}}</text></view>
			</uni-col>
			<!-- 			<uni-col :span="0" class="user_name">
				<view class="light"><text>{{item.userSex}}</text></view>
			</uni-col> -->
			<uni-col :span="8" class="user_name">
				<view class="light"><text>距离:{{item.userDistance}} m</text></view>
			</uni-col>
			<uni-col :span="5" style="margin-top: 22rpx;">
				<view class="light"><button style="background-color: #c7070e;color: #ffffff;" size="mini"
						@click="open(item.userId)">关注</button></view>
			</uni-col>
		</uni-row>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" type="warning" content="关注该用户" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				info: [],
				attentionId: "",
				position:{
					userId:uni.getStorageSync("loginUser").userId
				}
			}
		},
		onLoad(){
			this.getOtherPeople();
		},
		methods: {
			open(id) {
				this.attentionId = id;
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				this.$myRequest({
					url: '/addFriend',
					data: {
						userId: this.position.userId,
						friendId: this.attentionId,
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				});
				uni.showToast({
					title: "成功关注 : 用户 " + this.attentionId,
					icon: "none"
				})
				this.$refs.popup.close()
			},
			getOtherPeople(){
				this.$myRequest({
					url: '/getOtherPeople',
					data: {
						userId: this.position.userId,
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						console.log(res)
						if (res.data.code != 200) {
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						} else {
							uni.showToast({
								title:res.data.userMsg,
								icon:'none'
							})
							this.info = res.data.list
						}
					}
				});
			}
			
		}
	}
</script>

<style>
	.user_image {
		width: 100rpx;
		height: 100rpx;
	}

	.user_name {
		margin-top: 30rpx;
	}
</style>
