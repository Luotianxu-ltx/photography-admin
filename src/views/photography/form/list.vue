<template>
  <div class="app-container">
    <div ref="courseShow" class="com-page" style="width: 100%;height: 500px" />
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
          text: '▎地区销售排行',
          left: 20,
          top: 20
        },
        gird: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: {
          type: 'bar',
          color: arg => {
            if (arg.value > 300) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#0BA82C'
                },
                {
                  offset: 1,
                  color: '#4FF778'
                }
              ])
            } else if (arg.value > 200) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#2E72BF'
                },
                {
                  offset: 1,
                  color: '#23E5E5'
                }
              ])
            } else {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: 'blue'
                }
              ])
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
      const courseShowName = ['北京', '天津', '云南', '西藏', '海南', '四川', '河北', '浙江', '重庆', '山东']
      const courseShowValue = ['100', '200', '150', '300', '450', '340', '256', '450', '620', '430']
      const dataCourseShowoption = {
        xAxis: {
          data: courseShowName
        },
        series: {
          data: courseShowValue
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
