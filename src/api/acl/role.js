import request from '@/utils/request'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `/aclservice/acl-role/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  getRoleById(id) {
    return request({
      url: `/aclservice/acl-role/getRoleById/${id}`,
      method: 'get'
    })
  },

  save(role) {
    return request({
      url: `/aclservice/acl-role/save`,
      method: 'post',
      data: role
    })
  },

  updateById(role) {
    return request({
      url: `/aclservice/acl-role/update`,
      method: 'post',
      data: role
    })
  },
  getAssign(roleId) {
    return request({
      url: `/aclservice/acl-role/toAssign/${roleId}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `/aclservice/acl-role/remove/${id}`,
      method: 'delete'
    })
  },
  removeRows(idList) {
    return request({
      url: `/aclservice/acl-role/batchRemove`,
      method: 'delete',
      data: idList
    })
  }

}
