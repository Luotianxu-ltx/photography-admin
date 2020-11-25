import request from '@/utils/request'

export default {
  /**
   * 查询课程一级分类
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
   * 根据id查询课程一级分类
   * @param id
   * @returns {AxiosPromise}
   */
  getOneListById(id) {
    return request({
      url: `/courseservice/course-subject-one/getCourseSubjectOneById/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改一级分类列表
   * @param form
   * @returns {AxiosPromise}
   */
  updateCourseSubjectOne(form) {
    return request({
      url: `/courseservice/course-subject-one/updateCourseSubjectOne`,
      method: 'post',
      data: form
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
  },
  /**
   * 新增课程一级分类
   * @param form
   * @returns {AxiosPromise}
   */
  addCourseSubjectOne(form) {
    return request({
      url: `/courseservice/course-subject-one/addList`,
      method: 'post',
      data: form
    })
  },
  /**
   * 下载课程一级分类excel
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: `/courseservice/course-subject-one/download`,
      method: 'get'
    })
  },
  /**
   * 新增二级课程分类
   * @param parentId 一级课程分类id
   * @param form 二级课程分类
   * @returns {*}
   */
  addCourseSubjectTwo(data) {
    return request({
      url: `/courseservice/course-subject-two/addList`,
      method: 'post',
      data: data
    })
  },
  /**
   * 根据id查询课程二级分类
   * @param id 课程二级分类id
   * @returns {AxiosPromise}
   */
  getTwoListById(id) {
    return request({
      url: `/courseservice/course-subject-two/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改课程二级分类
   * @param form
   * @returns {AxiosPromise}
   */
  updateCourseSubjectTwo(form) {
    return request({
      url: `/courseservice/course-subject-two/updateList`,
      method: 'post',
      data: form
    })
  },
  /**
   * 删除课程二级分类
   * @param id
   * @returns {AxiosPromise}
   */
  deleteCourseSubjectTwo(id) {
    return request({
      url: `/courseservice/course-subject-two/delete/${id}`,
      method: 'delete'
    })
  },
  /**
   * 下载课程二级分类excel
   * @returns {AxiosPromise}
   */
  downTwo(id) {
    return request({
      url: `/courseservice/course-subject-two/download/${id}`,
      method: 'get'
    })
  },
  /**
   * 获取树形结构
   * @returns {AxiosPromise}
   */
  getAllListTree() {
    return request({
      url: `/courseservice/course-subject-one/getAllSubject`,
      method: 'get'
    })
  }
}
