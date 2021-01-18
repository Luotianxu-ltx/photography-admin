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
      url: `/orderservice/course-order/getPageList/${current}/${limit}`,
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
      url: `/orderservice/course-order/delete/${id}`,
      method: 'delete'
    })
  },

  /**
   * 获取课程列表
   * @returns {AxiosPromise}
   */
  getCourseList() {
    return request({
      url: '/adminservice/courseservice/course/list',
      method: 'get'
    })
  },

  /**
   * 下载
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: '/orderservice/course-order/download',
      method: 'get'
    })
  }

}
