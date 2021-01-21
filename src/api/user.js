import request from '@/utils/request'

/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: '/aclservice/acl-user/login',
    method: 'post',
    data
  })
}

/**
 * 根据token获取管理员信息
 * @param token
 * @returns {AxiosPromise}
 */
export function getInfo(token) {
  return request({
    url: '/aclservice/acl-user/getAdminInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
