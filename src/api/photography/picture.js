import request from '@/utils/request'

export default {

  /**
   * 分页查询
   * @param current
   * @param limit
   * @param searchObj
   * @returns {AxiosPromise}
   */
  getPictureList(current, limit, searchObj) {
    return request({
      url: `/h5service/picture/getListPicture/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  down() {
    return request({
      url: `/h5service/picture/download`,
      method: 'get'
    })
  }
}
