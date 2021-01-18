import request from '@/utils/request'

export default {

  /**
   * 按条件分页查询
   * @param current
   * @param limit
   * @param searchObj
   * @returns {AxiosPromise}
   */
  getPageList(current, limit, searchObj) {
    return request({
      url: `/h5service/user/userPageList/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  /**
   * 删除
   * @param id
   * @returns {AxiosPromise}
   */
  deleteById(id) {
    return request({
      url: `/h5service/user/delete/${id}`,
      method: 'delete'
    })
  },

  /**
   * 是否禁用
   * @param id
   * @returns {AxiosPromise}
   */
  isDisabled(id) {
    return request({
      url: `/h5service/user/isDisabled/${id}`,
      method: 'get'
    })
  },

  /**
   * 新增
   * @param form
   * @returns {AxiosPromise}
   */
  register(form) {
    return request({
      url: `/h5service/user/register`,
      method: 'post',
      data: form
    })
  },

  /**
   * 根据id删除
   * @param form
   * @returns {AxiosPromise}
   */
  updateById(form) {
    return request({
      url: '/h5service/user/updateById',
      method: 'post',
      data: form
    })
  },

  /**
   * 根据id查询
   * @param id
   * @returns {AxiosPromise}
   */
  selectById(id) {
    return request({
      url: `h5service/user/select/${id}`,
      method: 'get'
    })
  }
}
