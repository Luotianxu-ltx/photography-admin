<template>
  <div class="com-container">
    <div ref="map" class="com-page" style="width: 100%;height: 100%" />
  </div>
</template>

<script>
import echarts from 'echarts'
import chalk from '../../../assets/echarts-theme/chalk'
import china from '../../../../public/map/china.json'
import { getProvinceMapInfo } from '../../../utils/map_utils'
export default {
  data() {
    return {
      allData: null
    }
  },
  mounted() {
    this.initMap()
    this.getCourseMapTrend()
  },
  methods: {
    initMap() {
      this.MapChat = echarts.init(this.$refs.map, 'chalk')
      echarts.registerMap('china', china)
      // 对图表初始化配置
      const initCourseMapOption = {
        title: {
          text: '▎商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%'
        }
      }
      this.MapChat.setOption(initCourseMapOption)
      this.MapChat.on('click', arg => {
        const provinceInfo = getProvinceMapInfo(arg.name)
        // 获取这个省份的地图数据
      })
    },
    getCourseMapTrend() {
      this.updateCourseMapChart()
    },
    updateCourseMapChart() {
      const map = [{ name: '人像', value: [117.283042, 31.86119] },
        { name: '人像', value: [125.3245, 43.886841] },
        { name: '人像', value: [104.065735, 30.659462] }]

      const dataCourseMapShowOption = {
        series: {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: map
        }
      }
      this.MapChat.setOption(dataCourseMapShowOption)
    }
  }
}
</script>

<style scoped>
/deep/canvas {
  border-radius: 20px;
}
</style>
