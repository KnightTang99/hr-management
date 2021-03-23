import request from '@/utils/request'
// 获取组织架构
export function getDepartments() {
  return request({
    url: 'company/department',
    method: 'GET'
  })
}
// 删除组织架构下的部门的接口
export function delDepartments(id) {
  return request({
    url: `company/department/${id}`,
    method: 'DELETE'
  })
}
// 新增部门接口
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 员工详情接口
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 根据id修改部门
export function editDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
