import request from '@/utils/request'

export default {
  getNestedTreeList() {
    return request({
      url: `/aclservice/acl-permission`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `/aclservice/acl-permission/remove/${id}`,
      method: 'delete'
    })
  },
  saveLevelOne(menu) {
    return request({
      url: `/aclservice/acl-permission/save`,
      method: 'post',
      data: menu
    })
  },
  update(menu) {
    return request({
      url: `/aclservice/acl-permission/update`,
      method: 'put',
      data: menu
    })
  },
  toAssign(roleId) {
    return request({
      url: `/aclservice/acl-permission/toAssign/${roleId}`,
      method: 'get'
    })
  },
  doAssign(roleId, permissionId) {
    return request({
      url: `/aclservice/acl-permission/doAssign`,
      method: 'post',
      params: { roleId, permissionId }
    })
  }
}
