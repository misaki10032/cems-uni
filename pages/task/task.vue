<template>
	<view>
		<view class="cond">
			<view class="condition">
				<picker @change="bindPickerChange" @click="isFlag()" @cancel="isFlag" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
				<image :src="flag == true ? '/static/search/up.png' : '/static/search/on.png'" mode=""></image>
				<text>{{total}}条</text>
			</view>
			<view class="btnsarch">
        <input v-model="text" placeholder=" 内容 | 类型 | 时间 " type="text">
        <button type="default" @click="searchTasks">搜索</button>
      </view>
		</view>
		<tasks :hotTasks="hotTasks"></tasks>
		<button class="btn" size="mini" type="default" @click="moreTask" v-if="more_dis">加载更多</button>
		<view class="over" v-if="over_dis">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script>
	import tasks from '../../components/task_list/task_list.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 8,
				over_dis: false,
				more_dis: true,
				flag: true,
				text: "",
				total: 0,
				hotTasks: [],
				array: ['全部', '已被接', '可接单', '已完成'],
				index: 0
			}
		},
		onShow() {
			this.pageIndex = 1
			this.hotTasks = []
			this.more_dis = true
			this.over_dis = false
			this.getTasks()
		},
		methods: {
			getTasks(callback) {
				this.$myRequest({
					url: "/getEnts?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize,
					method: "GET",
					success: (res) => {
						console.log(res)
						this.hotTasks = [...this.hotTasks, ...res.data.data]
						this.total = res.data.total
						callback && callback()
					}
				})
			},
			moreTask() {
				if (this.total <= (this.pageIndex * this.pageSize)) {
					this.more_dis = false
					this.over_dis = true
					return
				}
				this.pageIndex++
				this.getTasks()
			},
			/* 触底触发 */
			onReachBottom() {
				/* if (this.hotTasks.length < this.pageIndex * 10) { */
				if (this.total <= (this.pageIndex * this.pageSize)) {
					this.more_dis = false
					return this.over_dis = true
				}
				this.pageIndex++
				this.getTasks()
			},
			/* 下拉刷新 */
			onPullDownRefresh() {
				this.pageIndex = 1
				this.hotTasks = []
				this.over_dis = false
        setTimeout(() => {
          this.getTasks(() => {
            /* 数据请求成功  关闭刷新 */
            uni.stopPullDownRefresh()
          })
        }, 1000)
      },
      isFlag() {
        this.flag = !this.flag
      },
      bindPickerChange(res) {
        this.isFlag()
        this.index = res.target.value
        if (this.index == 0) {
          this.pageIndex = 1
          this.hotTasks = []
          this.more_dis = true
          this.over_dis = false
          this.getTasks()
          return
        }
        const entPlan = this.array[this.index]
        this.$myRequest({
          url: "/getEntsByPlan?entPlan=" + entPlan + "&pageIndex=" + this.pageIndex + "&pageSize=" + this
              .pageSize,
          method: "GET",
          success: res => {
            console.log(res)
            this.hotTasks = res.data.data
            this.total = res.data.total
          }
        })
      },
      searchTasks() {
        if (this.text == "" || this.text == null || this.text == undefined) {
          this.pageIndex = 1
          this.hotTasks = []
          this.more_dis = true
          this.over_dis = false
          return this.getTasks()
        }

        const entPlan = this.array[this.index]
        this.$myRequest({
          url: "/getEntsByText?entPlan=" + entPlan + "&text=" + this.text + "&pageIndex=" + this
              .pageIndex + "&pageSize=" + this.pageSize,
          method: "GET",
          success: res => {
            this.hotTasks = res.data.data
            this.total = res.data.total
          }
        })
			}
		},
		components: {
			tasks
		}
	}
</script>

<style lang="scss">
.cond {
  margin: 30 rpx 30 rpx;
  display: flex;

  .condition {
    margin-left: 5 rpx;
    padding: 0 5 rpx;
    display: flex;
    width: 200 rpx;
    height: 50 rpx;
    line-height: 50 rpx;
    color: #007AFF;
    text-align: center;

    image {
      width: 30 rpx;
      height: 20 rpx;
      margin-top: 17 rpx;
      margin-left: 4 rpx;
    }

    text {
      font-size: 20 rpx;
      margin-left: 20 rpx;
    }
  }

  .btnsarch {
    width: 470 rpx;
    height: 50 rpx;
    display: flex;
    box-sizing: border-box;

    input {
      width: 320 rpx;
      height: 40 rpx;
      border: 2 rpx solid #c5464a;
      padding: 2 rpx 4 rpx 2 rpx 10 rpx;
      border-radius: 5 rpx;
      background: transparent;
    }

    button {
      height: 50 rpx;
      width: auto;
      cursor: pointer;
      margin-left: 20 rpx;
      background: #c5464a;
      font-size: 24 rpx;
      line-height: 50 rpx;
      color: #F9F0DA;
    }

  }
	}


	.btn {
		margin-left: 295rpx;
	}

	.over {
    width: 100%;
    height: 50 rpx;
    text-align: center;
    line-height: 50 rpx;
    font-size: 28 rpx;
    color: #aaaaaa;
  }
</style>
