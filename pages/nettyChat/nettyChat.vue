<template>
	<view class="chat_view">
		<view class="chat_data">
			<uni-row v-for="(msg,index) in chat_value" :key="index">
				<uni-col :span="24">
					<uni-col :span="5"><text class="text_green">{{msg.userName}}</text></uni-col>
					<uni-col :span="15" :offset="1"><text class="text_green">{{msg.dateTime}}</text></uni-col>
				</uni-col>
				<uni-col :span="24">
					<text>{{msg.userMsg}}</text>
				</uni-col>
			</uni-row>
		</view>
		<view class="chat_input">
			<uni-row>
				<uni-col :span="20">
					<uni-easyinput v-model="value" placeholder="请输入内容"></uni-easyinput>
				</uni-col>
				<uni-col :span="4">
					<button size="mini" type="primary" @click="sendMsg(value)">发送</button>
				</uni-col>
			</uni-row>
		</view>
		<view>
			{{data_value}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value : "",
				chat_value:[],
				socketTask:null,
				is_open_socket: false,
				data_value : ""
			}
		},
		onLoad() {
			this.connectSocketInit();
		},
		beforeDestroy() {
			this.closeSocket();
		},
		methods: {
			connectSocketInit() {
				this.socketTask = uni.connectSocket({
					url: "ws://192.168.31.228:9000/chat",
					success(data) {
						console.log("websocket连接成功");
					},
				})
				this.socketTask.onOpen(res=> {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					this.socketTask.onMessage(res=> {
						console.log("收到服务器内容：" + res.data);
						this.data_value = res.data
						this.chat_value.push(JSON.parse(res.data))
						console.log(this.chat_value);
					});
				})
				this.socketTask.onClose(res=>{
					console.log("已经被关闭了")
				})
			},
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			sendMsg(msg) {
				console.log(this.is_open_socket)
				if (this.is_open_socket) {
					var user = uni.getStorageSync("loginUser");
					this.socketTask.send({
						data: user.userPname+"&&"+msg,
						async success() {
							console.log("消息发送成功!");
						},
					});
					this.value = ""
					
				}
			}
						
			
		}
	}
</script>

<style>
	.chat_view{	
		
	}
	.chat_data{
		padding: 25rpx;
	}
		
	.chat_input{
		padding: 25rpx;
		
	}
	button{
		height: 70rpx;
		border-radius: 0 15rpx 15rpx 0;
	}
	.text_green{
		color: #045503;
	}
</style>
