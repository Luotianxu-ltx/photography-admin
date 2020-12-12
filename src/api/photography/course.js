import request from '@/utils/request'

export default {
  /**
   * 添加课程
   * @returns {AxiosPromise}
   */
  addCourseInfo(courseInfo) {
    return request({
      url: `/courseservice/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  /**
   * 根据课程id查询课程基本信息
   * @param id 课程id
   * @returns {AxiosPromise}
   */
  getCourseInfo(id) {
    return request({
      url: `/courseservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改课程基本信息
   * @param courseInfo
   * @returns {AxiosPromise}
   */
  updateCourseInfo(courseInfo) {
    return request({
      url: `/courseservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  /**
   * 课程确认信息
   * @param id
   * @returns {AxiosPromise}
   */
  getPublishCourseInfo(id) {
    return request({
      url: `/courseservice/course/getPublishInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 课程最终发布
   * @param id
   * @returns {AxiosPromise}
   * @constructor
   */
  publishCourse(id) {
    return request({
      url: `/courseservice/course/publishCourse/${id}`,
      method: 'get'
    })
  },
  /**
   * 课程列表
   * @param id
   * @returns {AxiosPromise}
   */
  getListCourse(current, limit, searchObj) {
    return request({
      url: `/courseservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  /**
   * 下载excel
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: `/courseservice/course/download`,
      method: 'get'
    })
  }
}
