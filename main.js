import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'


Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest


/* const token = uni.getStorage({
	key: "token",
	success: res => {
		console.log(res)
	}
})
if (token == null) {
	uni.redirectTo({
		url: "/pages/login/login"
	})
} */

App.mpType = 'app'
Vue.codeBase = "utf-8"
const app = new Vue({
	...App
})
app.$mount()
