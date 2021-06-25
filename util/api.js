const BASEURL = "http://192.168.31.227:9999"
export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASEURL + options.url,
			method: options.method,
			data: options.data || {},
			success: res => {
				if(res.data.status != 0){
					return uni.showToast({
						title: "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: err => {
				uni.showToast({
					title: "网络异常"
				})
				reject(err)
			}
		})
	})
}
