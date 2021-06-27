<template>
	<view>
		<infoUpdModel @send="getParam" :param="info"></infoUpdModel>
	</view>
</template>

<script>
	import infoUpdModel from '../../../../components/myself/infoUpd.vue'
	export default {
		data() {
			return {
				info: {
					param: "",
					id: ""
				}	
			}
		},
		onLoad(options) {
			this.info.param = options.param
			this.info.id = options.id
			console.log(this.id)
			console.log(options.id)
		},
		methods: {
			getParam(res) {
				this.param = res
			}
		},
		components: {
			infoUpdModel
		}
	}
</script>

<style>
</style>
