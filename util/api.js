const BASEURL = "http://139.196.94.36:9999/uniApp"
export const myRequest = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASEURL + options.url,
            method: options.method,
            data: options.data,
            dataType: options.dataType,
            success: options.success,
            fail: options.fail
        })
	})
}