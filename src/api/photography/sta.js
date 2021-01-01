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
  }
}
