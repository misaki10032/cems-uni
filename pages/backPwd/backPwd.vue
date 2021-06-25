<template>
	<view class="content">
		
		<view class="from">
			<view class="msg">若您忘记了密码，可在此重新设置新密码。</view>
			<view class="input-controls">
				<image class="img" src="/static/image/phone.png"></image>
				<input class="input" type="number" v-model="mobile" maxlength="11" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="btn" hover-class="btn-hover" @tap="next()">
			<text>下一步</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:''
			}
		},
		onLoad(){
		},
		computed:{
		},
		methods: {
			next() {
				var mobile =  this.mobile;
				if (mobile == '' || mobile == undefined || mobile == null) {
				     uni.showToast({
				        icon: 'none',
				        title: '请输入手机号'
				    });
				    return;
				}
				if (mobile.length != 11) {
					uni.showToast({
					    icon: 'none',
					    title: '手机号格式不对'
					});
					return;
				}
				uni.request({
				    // url: 'http://***/forget.html',
					url: this.$url + '/api/v1.sms/getsms', // 获取短信接口
				    data: {
						mobile:mobile,
						type:2
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=1){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({
								title:res.data.msg,
							});
							setTimeout(function(){
								uni.navigateTo({
									url:'reset?mobile=' + mobile
								});
							},2000)
						}
				    }
				});
				
			}
		}
	}
</script>
<style>
	@import url("../../static/css/common.css");
</style>