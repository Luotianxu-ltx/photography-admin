import request from '@/utils/request'

export default {
  /**
   * 获取列表数据
   * @param page
   * @param limit
   * @param searchObj
   * @returns {AxiosPromise}
   */
  getPageList(page, limit, searchObj) {
    return request({
      url: `/aclservice/acl-user/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  /**
   * 根据id查询管理员信息
   * @param id
   * @returns {AxiosPromise}
   */
  getById(id) {
    return request({
      url: `/aclservice/acl-user/get/${id}`,
      method: 'get'
    })
  },
  /**
   * 新增管理员
   * @param user
   * @returns {AxiosPromise}
   */
  save(user) {
    return request({
      url: `/aclservice/acl-user/save`,
      method: 'post',
      data: user
    })
  },
  /**
   * 修改管理员
   * @param user
   * @returns {AxiosPromise}
   */
  updateById(user) {
    return request({
      url: `/aclservice/acl-user/update`,
      method: 'post',
      data: user
    })
  },
  getAssign(userId) {
    return request({
      url: `/aclservice/acl-user/toAssign/${userId}`,
      method: 'get'
    })
  },
  saveAssign(userId, roleId) {
    return request({
      url: `/aclservice/acl-user/doAssign`,
      method: 'post',
      params: { userId, roleId }
    })
  },
  /**
   * 根据id删除管理员
   * @param id
   * @returns {AxiosPromise}
   */
  removeById(id) {
    return request({
      url: `/aclservice/acl-user/remove/${id}`,
      method: 'delete'
    })
  },
  /**
   * 批量删除管理员
   * @param idList
   * @returns {AxiosPromise}
   */
  removeRows(idList) {
    return request({
      url: `/aclservice/acl-user/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
