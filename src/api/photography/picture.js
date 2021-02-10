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

  /**
   * 下载Excel
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: `/h5service/picture/download`,
      method: 'get'
    })
  },

  /**
   * 根据id删除
   * @param id
   * @returns {AxiosPromise}
   */
  deleteById(id) {
    return request({
      url: `/h5service/picture/delete/${id}`,
      method: 'delete'
    })
  },

  /**
   * 多选删除
   * @param idList
   * @returns {AxiosPromise}
   */
  deleteAll(idList) {
    return request({
      url: `/h5service/picture/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
