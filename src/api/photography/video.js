import request from '@/utils/request'

export default {
  /**
   * 新增小节
   * @param video
   * @returns {AxiosPromise}
   */
  addVideo(video) {
    return request({
      url: `/adminservice/courseservice/course-video/addVideo`,
      method: 'post',
      data: video
    })
  },
  /**
   * 修改小节
   * @param video
   * @returns {AxiosPromise}
   */
  updateChapter(video) {
    return request({
      url: `/adminservice/courseservice/course-video/update`,
      method: 'post',
      data: video
    })
  },
  /**
   * 删除小节
   * @param id
   * @returns {AxiosPromise}
   */
  deleteVideo(id) {
    return request({
      url: `/adminservice/courseservice/course-video/${id}`,
      method: 'delete'
    })
  },
  /**
   * 删除视频
   * @param id 视频id
   * @returns {AxiosPromise}
   */
  deleteAlyvod(id) {
    return request({
      url: `/vodservice/video/removeAlyVideo/${id}`,
      method: 'delete'
    })
  },

  /**
   * 根据id查询小节信息
   * @param videoId
   * @returns {AxiosPromise}
   */
  getVideoInfo(videoId) {
    return request({
      url: `/adminservice/courseservice/course-video/getVideoInfo/${videoId}`,
      method: 'get'
    })
  }
}
