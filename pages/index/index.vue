<template>
	<!-- 父view -->
	<view class="home">
    <!-- 轮播图 -->
    <swiper indicator-dots circular autoplay>
      <swiper-item v-for="img in rotationImgArr" :key="img.id">
        <image :src="img"></image>
      </swiper-item>
    </swiper>
    <tasks :hotTasks="hotTasks"></tasks>
    <button v-if="more_dis" class="btn" size="mini" type="default" @click="moreTask">加载更多</button>
    <view v-if="over_dis" class="over">
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
      index: 0,
      rotationImgArr: [
        "https://img2.baidu.com/it/u=2994123101,43895145&fm=26&fmt=auto&gp=0.jpg",
        "https://img1.baidu.com/it/u=4189823403,3419626601&fm=26&fmt=auto&gp=0.jpg",
        "https://img1.baidu.com/it/u=4067331960,3438608414&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=3012717581,3918222610&fm=26&fmt=auto&gp=0.jpg",
        "https://img1.baidu.com/it/u=1182459655,2369734023&fm=26&fmt=auto&gp=0.jpg"
      ],
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
    /* 获取轮播图数据 */
    navItemClick(url) {
      uni.navigateTo({
        url
      })
    },
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

.home {

		/* 轮播图 */
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		/* 推荐任务/单子 */
		.recommend_tasks {
			overflow: hidden;
			margin-top: 20rpx;
			/* 热门单子 */
				.recommend_tasks_title {
          height: 80rpx;
          line-height: 80rpx;
          font-size: 50rpx;
          color: #b50e03;
          text-align: center;
          letter-spacing: 20rpx;
          background: #FFFFFF;
          margin: 5rpx 0;
        }
    }
}


.cond {
  margin: 30rpx 30rpx;
  display: flex;

  .condition {
    margin-left: 5rpx;
    padding: 0 5rpx;
    display: flex;
    width: 200rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #007AFF;
    text-align: center;

    image {
      width: 30rpx;
      height: 20rpx;
      margin-top: 17rpx;
      margin-left: 4rpx;
    }

    text {
      font-size: 20rpx;
      margin-left: 20rpx;
    }
  }

  .btnsarch {
    width: 470rpx;
    height: 50rpx;
    display: flex;
    box-sizing: border-box;

    input {
      width: 320rpx;
      height: 40rpx;
      border: 2rpx solid #c5464a;
      padding: 2rpx 4rpx 2rpx 10rpx;
      border-radius: 5rpx;
      background: transparent;
    }

    button {
      height: 50rpx;
      width: auto;
      cursor: pointer;
      margin-left: 20rpx;
      background: #c5464a;
      font-size: 24rpx;
      line-height: 50rpx;
      color: #F9F0DA;
    }

  }
}


.btn {
  margin-left: 295rpx;
}

.over {
  width: 100%;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  font-size: 28rpx;
  color: #aaaaaa;
}
</style>
