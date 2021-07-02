<template>
	<view style="background-color: #f7f7f7;">
		<uni-row v-for="(item,index) in info" :key="index" style="margin-top: 20rpx;background-color: #ffffff;">
			<uni-col :span="4">
				<view v-if="item.userSex=='男'">
					<image @click="toNearHome(item.userId)" class="user_image" style="border-radius: 30px;"
						src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214939_muavg.thumb.1000_0.jpg">
					</image>
				</view>
				<view v-if="item.userSex!='男'">
					<image @click="toNearHome(item.userId)" class="user_image"
						src="https://c-ssl.duitang.com/uploads/item/201809/25/20180925214938_pyznn.thumb.1000_0.jpg">
					</image>
				</view>
			</uni-col>
			<uni-col :span="7" class="user_name">
				<view class="light"><text>{{item.userName}}</text></view>
			</uni-col>
			<uni-col :span="8" class="user_name">
				<view class="light"><text>距离:{{item.userDistance | distanceFormat}} m</text></view>
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
				jia:"0.000001",
				attentionId: "",
				position:{
					userId:uni.getStorageSync("loginUser").userId,
					userAddress:"",
					userLongitude:"",
					userLatitude:""
				}
			}
		},
		onLoad(){
			this.getUserPosition(this.position.userId);
			
			setTimeout(res=>{
				this.getOtherPeople();
			},6000);
		},
		methods: {
			toNearHome(id){
				uni.navigateTo({
					url:"/pages/friend/friendInfo?id="+id
				})
			},
			open(id) {
				this.attentionId = id;
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				var that = this;
				this.$myRequest({
					url: '/addFriend',
					data: {
						userId: this.position.userId,
						friendId: this.attentionId,
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if(res.data.code==200){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							var foucs = uni.getStorageSync("foucs")
							uni.setStorageSync("foucs",foucs+1)
							that.$refs.popup.close()
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				});
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
								title:res.data.userMsg,
								icon:'none'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:"../message"
								});
							},1000);
						} else {
							uni.showToast({
								title:res.data.userMsg,
								icon:'none'
							})
							this.info = res.data.list
						}
					}
				});
			},
			getUserPosition(userId){
				var that = this;
				uni.getLocation({
					type:'wgs84',
					success: function (res) {
						//var add = res.address.country+res.address.province+res.address.city+res.address.district+res.address.street+res.address.streetNum
						var add = "user"+userId+"的详细信息";
						that.position.userAddress = add;
						that.position.userLatitude = res.latitude;
						that.position.userLongitude = res.longitude;
						that.setPosition(userId);
					}
				})
			},
			setPosition(userId){
				var that = this;
				console.log(this.position)
				this.$myRequest({
					url: '/setUserPosition',
					data: {
						userId: this.position.userId,
						longitude: this.position.userLongitude,
						latitude:this.position.userLatitude,
						userInfo:this.position.userAddress
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						console.log(res)
						if (res.data.code != 200) {
							uni.showToast({
								title:"获取位置信息失败!",
								icon:'none'
							})
							return
						}
						uni.showLoading({})
						setTimeout(function(){
							uni.hideLoading()
							return that.getOtherPeople()
						},2000)
					}
				});
			}
			
		}
		,filters:{
			distanceFormat(m){
				if(m.length>5){
					var m1 = m.substr(0,5);
					return m1;
				}
				return m;
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
