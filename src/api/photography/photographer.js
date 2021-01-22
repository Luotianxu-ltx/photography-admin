import request from '@/utils/request'

export default {

  /**
   * 根据条件分页查询摄影师
   * @param current 当前页
   * @param limit 每页记录数
   * @param photographerQuery 查询条件
   * @returns {AxiosPromise}
   */
  getPhotographerListPage(current, limit, searchObj) {
    return request({
      url: `/adminservice/photographerservice/photographer/pagePhotographerCondition/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  /**
   * 根据id删除摄影师
   * @param id 摄影师id
   * @returns {AxiosPromise}
   */
  deletePhotographerId(id) {
    return request({
      url: `/adminservice/photographerservice/photographer/${id}`,
      method: 'delete'
    })
  },

  /**
   * 添加摄影师
   * @param photographer
   * @returns {AxiosPromise}
   */
  addPhotographer(photographer) {
    return request({
      url: `/adminservice/photographerservice/photographer/addPhotographer`,
      method: 'post',
      data: photographer
    })
  },

  /**
   * 根据id查询摄影师
   * @param id
   * @returns {AxiosPromise}
   */
  getPhotographerInfo(id) {
    return request({
      url: `/adminservice/photographerservice/photographer/getPhotographer/${id}`,
      method: 'get'
    })
  },

  /**
   * 修改摄影师
   * @param photographer
   * @returns {AxiosPromise}
   */
  updatePhtotgrapher(photographer) {
    return request({
      url: `/adminservice/photographerservice/photographer/updatePhotographer`,
      method: 'post',
      data: photographer
    })
  },
  /**
   * 下载excel
   * @returns {AxiosPromise}
   */
  down() {
    return request({
      url: `/adminservice/photographerservice/photographer/download`,
      method: 'get'
    })
  },
  /**
   * 查询所有摄影师
   * @returns {AxiosPromise}
   */
  getAllList() {
    return request({
      url: `/adminservice/photographerservice/photographer/list`,
      method: 'get'
    })
  },

  deleteAll(idList) {
    return request({
      url: '/adminservice/photographerservice/photographer/batchRemove',
      method: 'delete',
      data: idList
    })
  }
}
