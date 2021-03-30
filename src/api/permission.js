import request from '@/utils/request'
// 获取权限列表
export function getPermission() {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}
// 添加权限
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
// 删除权限
export function removePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
// 权限详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}
// 更新权限详情
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
