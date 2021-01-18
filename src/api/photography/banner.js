import request from '@/utils/request'

export default {
  /**
   * 获取轮播图
   * @param page
   * @param limit
   * @returns {AxiosPromise}
   */
  getList(page, limit) {
    return request({
      url: `/h5service/pageBanner/${page}/${limit}`,
      method: 'get'
    })
  },

  /**
   * 根据id删除轮播图
   * @param id
   * @returns {AxiosPromise}
   */
  delete(id) {
    return request({
      url: `/h5service/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 新增轮播图
   * @param form
   * @returns {AxiosPromise}
   */
  saveBanner(form) {
    return request({
      url: '/h5service/addBanner',
      method: 'post',
      data: form
    })
  },

  /**
   * 根据id查询轮播图
   * @param id
   * @returns {AxiosPromise}
   */
  getBanner(id) {
    return request({
      url: `/h5service/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 修改
   * @param form
   * @returns {AxiosPromise}
   */
  updateBanner(form) {
    return request({
      url: '/h5service/update',
      method: 'post',
      data: form
    })
  }
}
