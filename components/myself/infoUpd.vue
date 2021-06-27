<template>
	<view class="content">
		<view class="from">
			<view class="input-controls">
				<input class="input" @input="btnOk" v-model="nparam" type="text" maxlength="32"/>
			</view>
		</view>
		<button class="btn" hover-class="btn-hover" :disabled="btn" @click="confirmBack">
			确定
		</button>
	</view>
</template>

<script>
	export default {
		props: ['param'],
		data() {
			return {
				nparam: "",
				nid: "",
				btn: true,
				user: uni.getStorageSync("loginUser")
			}
		},
		mounted() {
			this.nparam = this.$props.param.param
			this.nid = this.$props.param.id
		},
		methods: {
			confirmBack(){
				if(this.nid == 1){
					this.user.userName = this.nparam
				}else if(this.nid == 2){
					this.user.userDec = this.nparam
				}
				else if(this.nid == 3){
					this.user.userPname = this.nparam
				}
				else if(this.nid == 4){
					var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					if(!myreg.test(this.nparam)){
						uni.showToast({
							title: "请输入格式正确的邮箱",
							icon: "none"
						})
						return;
					}
					this.user.userEmail = this.nparam
				}
				else if(this.nid == 5){
					this.user.userHouse = this.nparam
				}
				this.$myRequest({
					url: "/revUserInfo",
					data: this.user,
					method: "POST",
					success: res => {
						if(res.data.code == 200){
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
							setTimeout(() => {
                uni.navigateBack({})
              }, 500)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "success"
							})
							setTimeout(() => {
                uni.navigateBack({})
              }, 500)
						}
					}
				})
			},
			btnOk(){
				this.btn = false
			}
		}
	}
</script>

<style>
	@import url("../../static/css/common.css");
</style>
