<template>
  <div class="com-container">
    <div ref="courseShow" class="com-chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import chalk from '../../../assets/echarts-theme/chalk'
export default {
  data() {
    return {
      allData: null
    }
  },
  mounted() {
    this.initCourseShowChart()
    this.getCourseShowData()
  },
  methods: {
    initCourseShowChart() {
      this.courseShowChat = echarts.init(this.$refs.courseShow, 'chalk')
      // 对图表初始化配置
      const initCourseShowOption = {
        title: {
          text: '▎课程销售占比',
          textStyle: {
            fontSize: 20
          },
          left: 20,
          top: 20
        },
        legend: {
          top: '5%',
          icon: 'circle'
        },
        tooltip: {
          show: true
        },
        series: {
          type: 'pie',
          emphasis: {
            label: {
              show: true
            }
          }
        }
      }
      this.courseShowChat.setOption(initCourseShowOption)
    },
    getCourseShowData() {
      this.updateCourseShowChart()
    },
    updateCourseShowChart() {
      const courseData = [
        {
          name: '人像摄影',
          value: 100
        },
        {
          name: '风景摄影',
          value: 150
        },
        {
          name: '纪实摄影',
          value: 200
        },
        {
          name: '景物摄影',
          value: 170
        },
        {
          name: '婚纱摄影',
          value: 190
        }
      ]
      const dataCourseShowoption = {
        series: {
          data: courseData
        }

      }
      this.courseShowChat.setOption(dataCourseShowoption)
    }
  }
}
</script>

<style scoped>
/deep/canvas {
  border-radius: 20px;
}
</style>
