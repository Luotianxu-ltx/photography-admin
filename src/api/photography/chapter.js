import request from '@/utils/request'

export default {
  /**
   * 根据课程id获取章节和小节数据列表
   * @param courseId 课程id
   * @returns {AxiosPromise}
   */
  getAllChapterVideo(courseId) {
    return request({
      url: `/adminservice/courseservice/course-chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
  /**
   * 新增章节
   * @param chapter
   * @returns {AxiosPromise}
   */
  addChapter(chapter) {
    return request({
      url: `/adminservice/courseservice/course-chapter/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  /**
   * 根据id查询章节
   * @param chapterId
   * @returns {AxiosPromise}
   */
  getChapter(chapterId) {
    return request({
      url: `/adminservice/courseservice/course-chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  /**
   * 修改章节
   * @param chapter
   * @returns {AxiosPromise}
   */
  updateChapter(chapter) {
    return request({
      url: `/adminservice/courseservice/course-chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  /**
   * 删除章节
   * @param chapterId
   * @returns {AxiosPromise}
   */
  deleteChapter(chapterId) {
    return request({
      url: `/adminservice/courseservice/course-chapter/${chapterId}`,
      method: 'delete'
    })
  }
}
