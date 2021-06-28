<template>
  <view>
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog :before-close="true" :duration="2000" message="成功消息" mode="input" @close="close"
                        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>

export default {
  methods: {
    open() {
      this.$refs.popup.open()
    },
    /**
     * 点击取消按钮触发
     * @param {Object} done
     */
    close() {
      // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
      // ...
      this.$refs.popup.close()
    },
    /**
     * 点击确认按钮触发
     * @param {Object} done
     * @param {Object} value
     */
    confirm(value) {
      // 输入框的值
      console.log(value)
      // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
      // ...
      this.$refs.popup.close()
    }
  }
}
</script>

<style>
</style>
