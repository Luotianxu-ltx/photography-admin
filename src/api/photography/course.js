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
  }
}
