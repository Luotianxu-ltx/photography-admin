<template>
  <div class="screen-container">
    <header class="screen-header">
      <span class="title">摄影交流平台</span>
      <div class="title-right">
        <div class="datetime">{{ systemDateTime }}</div>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div class="screen-body">
          <div id="left-top" style="width: 400px;height: 300px">
            <course-show />
          </div>
        </div>
        <div class="screen-body">
          <div id="left-bottom" style="width: 400px;height: 300px">
            <course-trend />
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" style="width: 500px;height: 400px">
          <!-- 商家分布图表 -->
          <single-map />
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" style="width: 400px;height: 300px">
          <!-- 热销商品占比图表 -->
          <hot />
        </div>
        <div id="right-bottom" style="width: 400px;height: 300px">
          <!-- 库存销量分析图表 -->
          <list />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import courseShow from '@/views/photography/form/courseShow'
import courseTrend from '@/views/photography/form/courseTrend'
import map from '@/views/photography/form/map'
import list from '@/views/photography/form/list'
import hot from '@/views/photography/form/hot'

export default {
  components: {
    courseShow,
    courseTrend,
    'single-map': map,
    list,
    hot
  },
  data() {
    return {
      // 当前的系统时间
      systemDateTime: null,
      // 用于保存当前系统日期的定时器id
      timerID: null
    }
  },
  created() {
    this.currentTime()
  },
  methods: {
    // 当前系统时间
    currentTime() {
      this.systemDateTime = new Date().toLocaleString()
      this.timerID && clearInterval(this.timerID)
      this.timerID = setInterval(() => {
        this.systemDateTime = new Date().toLocaleString()
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
html,body,#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 45px;
  font-size: 20px;
  position: relative;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-80%);
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 5px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      margin-top: 100px;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 53%;
      position: relative;
    }
    #right-bottom {
      height: 31%;
      position: relative;
    }
  }
}
</style>
