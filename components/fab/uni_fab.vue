<template>
	<view>
		<uni-fab ref="fab" :pattern="pattern" moveable :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	export default {
		props: ['content'],
		data() {
			return {
				pattern: {
					color: "#550000",
					selectedColor: "#65e",
					backgroundColor: "#ffffff"
				}
			}
		},
		onShow() {
			
		},
		methods: {
			trigger(e){
				if(e.item.text == '发贴'){
					uni.navigateTo({
						url: "/pages/index/post/post"
					})
				}
				if(e.item.text == '发单') {
					uni.navigateTo({
						url: "/pages/task/details/entrust"
					})
				}
			}
		}
	}
</script>

<style>
	uni-fab {  
	        position: fixed;  
	        justify-content: center;  
	        align-items: center;  
	        z-index: 10;  
	    }
</style>
