<script>
	export default {
		/* 只触发一次，app启动加载 */
		onLaunch() {
			
		},
		/* 显示触发  */
		onShow() {

    },
		/* 隐藏触发 */
		onHide() {
			console.log('App Hide')
		},
		/* 异常触发 */
		onError() {
			console.log("App Error")
		}
	}
</script>

<style>
	/*每个页面公共css */


</style>
