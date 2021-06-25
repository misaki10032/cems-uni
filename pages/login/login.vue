<template>
	<view class="content">
		<view class="header">
			<image src="/static/logo.png"></image>
		</view>
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/logo.png"></image>
				<input class="biaoti" v-model="mobile" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/logo.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
			</view>
			
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="login()">
			<text>登录</text>
		</view>
		
		<view class="xieyi">
			<navigator url="/pages/backPwd/backPwd" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="/pages/register/register" open-type="navigate">注册账户</navigator>
			<text>|</text>
			<navigator url="/pages/index/index" open-type="switchTab" >返回首页</navigator>
		</view>
	</view>
</template>

<script>
	
	export default {
		onLoad(){
		},
		data() {
			return {
				mobile:'',
				password:''
			};
		},
		methods: {
			toIndex(){
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
		    login() {
				// console.log(md5(this.password + 'app'));return;
				if (this.mobile.length != 11) {
				     uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}
		        if (this.password.length < 2) {
		            uni.showToast({
		                icon: 'none',
		                title: '密码不正确'
		            });
		            return;
		        }

				uni.request({
				    url: 'http://192.168.31.227:9999/uniApp/uniAppLogin',
				    data: {
						num:this.mobile,
						pwd:this.password
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							var token = uni.getStorageSync('token');
							console.log(token);
							uni.setStorageSync('token',token);
							uni.setStorageSync('loginUser',res.data.loginUser);
							uni.switchTab({
								url:'../index/index'
							})
						}
				    }
				});
		    }
		}
	}
</script>

<style>
	page{
		padding-top: 60rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	.header {
		width:161upx;
		height:161upx;
		background:rgba(63,205,235,1);
		box-shadow:0upx 12upx 13upx 0upx rgba(63,205,235,0.47);
		border-radius:50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 60upx;
		height: 60upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width:470upx;
		height:100upx;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		border-radius:50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
	}
	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.xieyi text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>