import request from '@/utils/request'

export default {

  /**
   * 分页查询
   * @param current
   * @param limit
   * @param searchObj
   * @returns {AxiosPromise}
   */
  getPageList(current, limit, searchObj) {
    return request({
      url: `/h5service/article/getPageArticle/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  /**
   * 删除
   * @param id
   * @returns {AxiosPromise}
   */
  delete(id) {
    return request({
      url: `/h5service/article/deleteArticle/${id}`,
      method: 'delete'
    })
  },

  /**
   * 新增
   * @param data
   * @returns {AxiosPromise}
   */
  add(data) {
    return request({
      url: `/h5service/article/add`,
      method: 'post',
      data: data
    })
  },

  /**
   * 多选删除
   * @param idList
   * @returns {AxiosPromise}
   */
  deleteAll(idList) {
    return request({
      url: `/h5service/article/deleteAll`,
      method: 'delete',
      data: idList
    })
  },

  /**
   * 下载Excel
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: `/h5service/article/download`,
      method: 'get'
    })
  }

}
