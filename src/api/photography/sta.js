import request from '@/utils/request'

export default {

  /**
   * 生成统计数据
   * @param day
   * @returns {AxiosPromise}
   */
  createStaData(day) {
    return request({
      url: `/statisticsservice/sta/registerCount/${day}`,
      method: 'post'
    })
  },

  getDataSta(searchObj) {
    return request({
      url: `/statisticsservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }
}
