<template>
  <div class="com-container">
    <div class="com-chart" ref="courseShow"></div>
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
          text: '▎课程销售统计',
          textStyle: {
            fontSize: 20
          },
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 44,
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 33,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              barBorderRadius: [0, 33, 33, 0],
              // 指明颜色渐变方向
              // 指明不同百分比之下颜色的值
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#ab6ee5'
                }
              ])
            }
          }
        ]
      }
      this.courseShowChat.setOption(initCourseShowOption)
    },
    getCourseShowData() {
      this.updateCourseShowChart()
    },
    updateCourseShowChart() {
      const courseShowName = ['人像摄影', '建筑摄影', '人文摄影', '风景摄影']
      const courseShowValue = ['100', '200', '150', '300']
      const dataCourseShowoption = {
        yAxis: {
          data: courseShowName
        },
        series: [
          {
            data: courseShowValue
          }
        ]
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
