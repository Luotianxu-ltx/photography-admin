import request from '@/utils/request'

export default {
  /**
   * 获取一级分类列表
   * @param current 当前页
   * @param limit 每页记录数
   * @param searchObj 查询条件
   * @returns {AxiosPromise}
   */
  getCourseSubjectOneListPage(current, limit, searchObj) {
    return request({
      url: `/courseservice/course-subject-one/pageCourseSubjectOne/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  /**
   * 删除一级分类列表
   * @param id 一级分类id
   * @returns {AxiosPromise}
   */
  deleteCourseSubjectOne(id) {
    return request({
      url: `/courseservice/course-subject-one/delete/${id}`,
      method: 'delete'
    })
  },
  /**
   * 获取二级分类列表
   * @param current 当前页
   * @param limit 每页记录数
   * @param searchObj 查询条件
   * @returns {AxiosPromise}
   */
  getCourseSubjectTwoListPage(parentId, current, limit, serchObj) {
    return request({
      url: `/courseservice/course-subject-two/pageCourseSubjectTwo/${parentId}/${current}/${limit}`,
      method: 'post',
      data: serchObj
    })
  }
}
