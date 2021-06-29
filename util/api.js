// const BASEURL = "http://192.168.31.227:9999/uniApp" 
const BASEURL = "http://192.168.31.165:9999/uniApp"
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
