import request from '@/utils/request'
// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
export function removeEmployeeItem(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
//  新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
// 批量导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
