import request from '@/utils/request'
// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
// 移除指定员工
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
// 根据id获取员工基本信息
export function getBaseInfoById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
// 根据id保存员工的基本信息
export function saveBaseInfoById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
// 读取用户详情的基础信息
export function getPersonalById(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}
// 保存指定用户的基础信息
export function savePersonalById(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}
// 获取岗位信息
export function getJobInfo(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}
// 保存员工岗位信息
export function saveJobInfo(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
// 给员工分配角色
export function assignRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
export function getPersonalDetail() {}
