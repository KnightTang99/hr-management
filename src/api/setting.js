import request from '@/utils/request'
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}
// 获取公司信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`,
    method: 'GET'
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 移除角色
export function removeRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}
// 更新角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
