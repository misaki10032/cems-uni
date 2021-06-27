<template>
	<view class="content">

		<view class="from">
			<view class="msg">若您忘记了密码，通过邮箱申诉重新设置新密码。</view>
			<view class="input-controls">
				<image class="img" src="/static/login/phone.png"></image>
				<input class="input" type="text" v-model="mobile" placeholder="请输入您的手机号" />
			</view>
			<view class="input-controls">
				<image class="img" src="/static/login/email.png"></image>
				<input class="input" type="text" v-model="email" placeholder="请输入您绑定的邮箱" />
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
        mobile: "",
        email: ''
      }
    },
    onLoad() {
    },
    computed: {},
    methods: {
      next() {
        if (this.mobile == '' || this.mobile == undefined || this.mobile == null) {
          uni.showToast({
            icon: 'none',
            title: '请输入手机号'
          });
          return;
        }
        var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if (!phone.test(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
          return;
        }
        if (this.email == '' || this.email == undefined || this.email == null) {
          uni.showToast({
            icon: 'none',
            title: '请输入邮箱'
          });
          return;
        }
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(this.email)) {
          uni.showToast({
            title: "请输入格式正确的邮箱",
            icon: "none"
          })
          return;
        }
        this.$myRequest({
          url: "/getUserEmil?phone=" + this.mobile + "&email=" + this.email, // 获取短信接口
          method: 'get',
          success: (res) => {
            if (res.data.code != 200) {
              uni.showModal({
                title: "温馨提示",
                content: "该邮箱/手机不存在，是否前往注册?",
                confirmColor: "#4CD964",
                success: res => {
                  if (res.confirm) {
                    uni.navigateTo({
                      url: "/pages/register/register"
                    })
                  }
                  if (res.cancel) {
                    return
                  }
                }
              })
            } else {
              uni.setStorageSync("user", res.data.user)
              uni.navigateTo({
                url: "/pages/backPwd/backPwdTwice"
              })
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
