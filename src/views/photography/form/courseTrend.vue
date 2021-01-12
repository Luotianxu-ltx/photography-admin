<template>
  <div class="com-container">
    <div ref="courseTrend" class="com-chart" />
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
    this.initCourseShowTrend()
    this.getCourseShowTrend()
  },
  methods: {
    initCourseShowTrend() {
      this.courseTrendChat = echarts.init(this.$refs.courseTrend, 'chalk')
      // 对图表初始化配置
      const initCourseTrendOption = {
        title: {
          text: '▎课程销售趋势',
          textStyle: {
            fontSize: 20
          },
          left: 20,
          top: 15
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'circle'
        }
      }
      this.courseTrendChat.setOption(initCourseTrendOption)
    },
    getCourseShowTrend() {
      this.updateCourseTrendChart()
    },
    updateCourseTrendChart() {
      const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      const courseShowValue1 = ['100', '200', '150', '300', '500', '300', '800', '100', '100', '500', '400', '600']
      const courseShowValue2 = ['200', '450', '600', '320', '120', '450', '650', '700', '150', '350', '123', '650']
      const courseShowValue3 = ['350', '421', '352', '153', '264', '374', '243', '163', '345', '513', '546', '420']
      const legendArr = ['人像摄影', '风景摄影', '纪实摄影']

      const dataCourseTrendShowoption = {
        xAxis: {
          data: month
        },
        legend: {
          data: legendArr
        },
        series: [
          {
            name: '人像摄影',
            type: 'line',
            data: courseShowValue1,
            stack: 'map',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(11,168,44,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(11,168,44,0)'
                }
              ])
            }
          },
          {
            name: '风景摄影',
            type: 'line',
            data: courseShowValue2,
            stack: 'map',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(44,110,255,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(44,110,255,0)'
                }
              ])
            }
          },
          {
            name: '纪实摄影',
            type: 'line',
            data: courseShowValue3,
            stack: 'map',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(22,242,217,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(22,242,217,0)'
                }
              ])
            }
          }
        ]
      }
      this.courseTrendChat.setOption(dataCourseTrendShowoption)
    }
  }
}
</script>

<style scoped>
/deep/canvas {
  border-radius: 20px;
}
</style>
