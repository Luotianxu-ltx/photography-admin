import request from '@/utils/request'

export default {

  /**
   * 查询
   * @param current
   * @param limit
   * @param searchObj
   * @returns {AxiosPromise}
   */
  getCommentList(current, limit, searchObj) {
    return request({
      url: `/adminservice/course-comment/getAdminList/${current}/${limit}`,
      method: 'post',
      data: searchObj
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
   * 删除
   * @param id
   * @returns {AxiosPromise}
   */
  delete(id) {
    return request({
      url: `/adminservice/course-comment/delete/${id}`,
      method: 'delete'
    })
  },

  /**
   * 批量删除
   * @param idList
   * @returns {AxiosPromise}
   */
  batchRemove(idList) {
    return request({
      url: '/adminservice/course-comment/batchRemove',
      method: 'delete',
      data: idList
    })
  }

}
